import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY || API_KEY === 'your-gemini-api-key-here') {
    console.error('❌ Please set GEMINI_API_KEY in .env file');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        console.log('🔍 Fetching available models...\n');

        const models = await genAI.listModels();

        console.log('✅ Available models:\n');

        for (const model of models) {
            console.log(`📦 ${model.name}`);
            console.log(`   Display Name: ${model.displayName}`);
            console.log(`   Description: ${model.description}`);
            console.log(`   Supported Methods: ${model.supportedGenerationMethods.join(', ')}`);
            console.log('');
        }
    } catch (error) {
        console.error('❌ Error listing models:', error.message);
    }
}

listModels();
