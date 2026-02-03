import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
const API_KEY = process.env.GEMINI_API_KEY;
let genAI = null;
let model = null;

if (API_KEY && API_KEY !== 'your-gemini-api-key-here') {
    try {
        genAI = new GoogleGenerativeAI(API_KEY);
        // Using gemini-2.0-flash-exp - trying alternative naming
        model = genAI.getGenerativeModel({
            model: 'gemini-3-flash-preview',
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048, // Increased for longer responses
            }
        });
        console.log('✅ Gemini AI initialized successfully with model: gemini-2.0-flash-exp');
    } catch (error) {
        console.error('❌ Failed to initialize Gemini:', error.message);
    }
} else {
    console.warn('⚠️  Gemini API key not configured');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running',
        aiConfigured: !!model
    });
});

// Gemini Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        if (!model) {
            return res.status(500).json({ error: 'Gemini API key not configured on server' });
        }

        console.log('📨 Received chat request');

        // Filter out system messages and convert to Gemini format
        const geminiMessages = messages
            .filter(msg => msg.role !== 'system')
            .map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));

        // If we have history, use chat mode
        if (geminiMessages.length > 1) {
            const chat = model.startChat({
                history: geminiMessages.slice(0, -1),
            });

            const lastMessage = messages[messages.length - 1];
            console.log('💬 Sending to Gemini:', lastMessage.content.substring(0, 50) + '...');

            const result = await chat.sendMessage(lastMessage.content);
            const response = await result.response;
            const text = response.text();

            console.log('✅ Got response from Gemini');

            return res.json({
                choices: [{
                    message: {
                        role: 'assistant',
                        content: text
                    }
                }]
            });
        } else {
            // For first message, use generateContent directly
            const userMessage = messages[messages.length - 1].content;
            console.log('💬 Sending to Gemini (first message):', userMessage.substring(0, 50) + '...');

            const result = await model.generateContent(userMessage);
            const response = await result.response;
            const text = response.text();

            console.log('✅ Got response from Gemini');

            return res.json({
                choices: [{
                    message: {
                        role: 'assistant',
                        content: text
                    }
                }]
            });
        }
    } catch (err) {
        console.error('❌ Server error:', err);
        console.error('Error details:', err.message);
        console.error('Error status:', err.status);

        if (err.status === 404) {
            return res.status(500).json({
                error: 'Model not available. Please check your Gemini API key and model availability.',
                details: err.message
            });
        } else if (err.message?.includes('API_KEY_INVALID')) {
            return res.status(401).json({ error: 'Invalid Gemini API key' });
        } else if (err.message?.includes('quota') || err.message?.includes('RESOURCE_EXHAUSTED')) {
            return res.status(429).json({ error: 'API quota exceeded' });
        }

        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📡 Gemini endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`🔑 API Key configured: ${!!model}`);
});
