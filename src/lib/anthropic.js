let anthropic;

async function getAnthropic() {
  if (!anthropic) {
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key_for_build',
    });
  }
  return anthropic;
}

export async function generateDietPlan(userProfile) {
  const client = await getAnthropic();
  const { name, age, gender, weight, height, activityLevel, goal, diseases, preferences, symptoms } = userProfile;

  // 1. BMI Calculation
  const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
  let bmiCategory = "Normal";
  if (bmi < 18.5) bmiCategory = "Underweight";
  else if (bmi >= 25 && bmi < 30) bmiCategory = "Overweight";
  else if (bmi >= 30) bmiCategory = "Obese";

  // 2. TDEE Calculation (Mifflin-St Jeor)
  // BMR = (10 × weight) + (6.25 × height) - (5 × age) + s
  // s = +5 for male, -161 for female
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  if (gender === 'MALE') bmr += 5;
  else bmr -= 161;

  // Activity Multipliers
  const multipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9
  };
  const multiplier = multipliers[activityLevel] || 1.375;
  let calories = Math.round(bmr * multiplier);

  // 3. Goal Adjustment
  if (goal === 'weight_loss') calories -= 500;
  else if (goal === 'slight_loss') calories -= 250;
  else if (goal === 'muscle_gain') calories += 300;
  else if (goal === 'heavy_gain') calories += 600;

  // 4. Macros Calculation
  const protein = Math.round((calories * 0.3) / 4);
  const carbs = Math.round((calories * 0.4) / 4);
  const fat = Math.round((calories * 0.3) / 9);

  const systemPrompt = `You are a certified Pakistani nutritionist and health expert. Create a personalized Islamic-friendly diet plan for the following person:

- Name: ${name}
- Age: ${age}
- Gender: ${gender}
- Weight: ${weight} kg
- Height: ${height} cm
- BMI: ${bmi}
- Activity Level: ${activityLevel}
- Goal: ${goal}
- Medical Conditions: ${diseases?.length > 0 ? diseases.join(', ') : 'None'}
- Dietary Preferences: ${preferences?.length > 0 ? preferences.join(', ') : 'None'}
- Current Symptoms: ${symptoms?.length > 0 ? symptoms.join(', ') : 'None'}

Daily Calorie Target: ${calories} kcal
Macros: Protein ${protein}g, Carbs ${carbs}g, Fat ${fat}g

IMPORTANT RULES:
1. All meals must be HALAL (no pork, no alcohol)
2. Include Sunnah foods: dates, honey, black seed, olive oil, figs, pomegranate, barley, grapes, milk, yogurt, pumpkin, lentils
3. Use local Pakistani ingredients (desi ghee, roti, daal, sabzi)
4. Consider Sehri and Iftar during Ramadan if applicable
5. Provide herbal drink recommendations (Green tea, Lemon honey water, Ginger tea, Black seed tea)
6. Include Islamic timing for meals

Return the data in the following JSON format:
{
  "bmi": ${bmi},
  "bmiCategory": "${bmiCategory}",
  "dailyCalories": ${calories},
  "macros": { "protein": ${protein}, "carbs": ${carbs}, "fat": ${fat}, "fiber": 30 },
  "mealPlan": { "monday": { "sehri": { "name": "...", "calories": 0, "protein": 0, "carbs": 0, "fat": 0 }, "breakfast": { ... }, "lunch": { ... }, "dinner": { ... }, "snacks": [{ ... }] }, ... rest of week },
  "organicFoods": ["..."],
  "sunnahFoods": ["..."],
  "herbalDrinks": [{ "name": "...", "time": "...", "benefits": "..." }],
  "weeklyPlan": ["..."],
  "healthNotes": "...",
  "doctorRecommendation": "..."
}`;

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 4000,
      system: "You are an expert nutritionist specialized in Pakistani cuisine and Islamic medicine (Tibb-e-Nabwi). Always return only pure JSON.",
      messages: [{ role: 'user', content: systemPrompt }],
    });

    const content = response.content[0].text;
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}') + 1;
    const jsonString = content.slice(jsonStart, jsonEnd);
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Anthropic API Error:', error);
    throw new Error('Failed to generate diet plan');
  }
}
