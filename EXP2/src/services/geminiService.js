// Gemini Service - Uses backend API for secure API key handling

const BACKEND_URL = 'http://localhost:5000';

let conversationHistory = [];

// System prompt for campus assistant context
const SYSTEM_PROMPT = {
    role: 'system',
    content: `You are a helpful Smart Campus Assistant for a university. You help students with:
- Campus navigation and building locations
- Class schedules and academic information  
- Events and activities
- Library resources and hours
- Dining options and meal plans
- Transportation and parking
- General campus life questions
- Study tips and academic support

Provide concise, helpful, and friendly responses. Keep answers brief (2-3 sentences when possible).
If asked about specific campus details you don't know, acknowledge this politely and suggest contacting the relevant department.
Always maintain a supportive and encouraging tone.`
};

// Initialize the service
export const initializeGemini = () => {
    console.log('Initializing Gemini service (using backend)...');
    // Reset conversation history with system prompt
    conversationHistory = [SYSTEM_PROMPT];
    console.log('Gemini service initialized successfully');
    return true;
};

// Start a new chat session
export const startNewChat = () => {
    // Reset conversation history with system prompt
    conversationHistory = [SYSTEM_PROMPT];
    console.log('Chat started successfully');
    return true;
};

// Send a message and get AI response
export const sendMessage = async (message) => {
    console.log('Sending message to backend:', message);

    // Add user message to history
    conversationHistory.push({
        role: 'user',
        content: message
    });

    try {
        console.log('Sending request to backend API...');
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: conversationHistory
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend API error:', errorData);
            throw new Error(errorData.error || 'Backend request failed');
        }

        const data = await response.json();
        console.log('Got response from backend');

        const assistantMessage = data.choices[0].message.content;

        // Add assistant response to history
        conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });

        console.log('Response text:', assistantMessage);
        return assistantMessage;
    } catch (error) {
        console.error('Detailed error sending message:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);

        // Handle specific error cases
        if (error.message?.includes('fetch') || error.message?.includes('Failed to fetch')) {
            throw new Error('Cannot connect to backend server. Make sure the server is running on http://localhost:5000');
        } else if (error.message?.includes('API key')) {
            throw new Error('Gemini API key not configured on backend server. Please check server/.env file.');
        } else if (error.message?.includes('rate limit') || error.message?.includes('quota')) {
            throw new Error('API rate limit exceeded. Please try again in a moment.');
        }

        throw error;
    }
};

// Reset chat history
export const resetChat = () => {
    conversationHistory = [SYSTEM_PROMPT];
    return true;
};

// Check if Gemini is available (always true since we use backend)
export const isGeminiAvailable = () => {
    return true; // Backend handles API key
};

export default {
    initializeGemini,
    startNewChat,
    sendMessage,
    resetChat,
    isGeminiAvailable,
};
