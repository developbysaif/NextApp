import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'REPLACE_WITH_KEY');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const body = await request.json();
        const { message, user_data } = body;

        const prompt = `You are a health assistant for an organic food store called 'OrganicFresh'.
        Generate a personalized diet plan based on the following user data:
        Name: ${user_data?.name || 'User'}
        Age: ${user_data?.age || 'N/A'}
        Weight: ${user_data?.weight || 'N/A'} kg
        Goal: ${user_data?.goal || 'N/A'}
        Medical Conditions: ${user_data?.medicalConditions || 'None'}
        Preferences: ${user_data?.preferences || 'None'}
        
        Provide the response in JSON format with fields: response (text summary), diet_plan (daily meals), foods_to_include (array), foods_to_avoid (array).`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Try to parse JSON from response, otherwise return as text
        let resultJson;
        try {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            resultJson = jsonMatch ? JSON.parse(jsonMatch[0]) : { response: text };
        } catch (e) {
            resultJson = { response: text };
        }

        return NextResponse.json(resultJson);
    } catch (error) {
        console.error('AI Error:', error);
        return NextResponse.json({
            success: false,
            message: 'AI Service Error',
            error: error.message,
            response: "I'm sorry, I'm having trouble generating your diet plan right now. Please try again later."
        }, { status: 500 });
    }
}
