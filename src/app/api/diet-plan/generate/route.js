export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { generateDietPlan } from '@/lib/anthropic';
import prisma from '@/lib/prisma';

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, name, age, gender, weight, height, activityLevel, goal, diseases, preferences, symptoms } = body;

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
    }

    const planData = await generateDietPlan({ name, age, gender, weight, height, activityLevel, goal, diseases, preferences, symptoms });

    // Save to DB
    const savedPlan = await prisma.dietPlan.create({
      data: {
        userId: userId,
        name: `Plan for ${name} - ${new Date().toLocaleDateString()}`,
        dailyCalories: Math.round(planData.dailyCalories),
        protein: Math.round(planData.macros.protein),
        carbs: Math.round(planData.macros.carbs),
        fat: Math.round(planData.macros.fat),
        fiber: Math.round(planData.macros.fiber || 30),
        bmi: parseFloat(planData.bmi),
        bmiCategory: planData.bmiCategory,
        weekPlan: planData.mealPlan,
        organicFoods: planData.organicFoods,
        sunnahFoods: planData.sunnahFoods,
        herbalDrinks: planData.herbalDrinks,
        healthNotes: planData.healthNotes,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, plan: savedPlan });
  } catch (error) {
    console.error('Diet Plan API Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
