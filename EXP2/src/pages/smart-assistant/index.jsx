import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigation from '../../components/ui/Navigation';
import FloatingAssistant from '../../components/ui/FloatingAssistant';
import Hyperspeed from './components/Hyperspeed';
import * as geminiService from '../../services/geminiService';

import MessageBubble from './components/MessageBubble';
import QuickActionChips from './components/QuickActionChips';
import TypingIndicator from './components/TypingIndicator';
import ConversationHistory from './components/ConversationHistory';
import ChatHeader from './components/ChatHeader';
import { ChatInput } from './components/ChatInput';

const SmartAssistant = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [showHistory, setShowHistory] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(1);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content:
        "Hello! I'm your Smart Campus Assistant powered by AI.\n\nI can help you with:\n• Campus navigation\n• Class schedules\n• Events\n• Library\n• Dining\n• Transport\n• And any other questions!\n\nHow can I help you today?",
      timestamp: new Date(),
      actions: [
        { label: 'View Campus Map', icon: 'Map', onClick: () => navigate('/campus-map') },
        { label: 'My Dashboard', icon: 'LayoutDashboard', onClick: () => navigate('/student-dashboard') }
      ]
    }
  ]);

  // Initialize Gemini on component mount
  useEffect(() => {
    geminiService.initializeGemini();
    geminiService.startNewChat();
  }, []);

  const conversations = [
    { id: 1, title: 'Campus Navigation Help', preview: 'Hello! I’m your Smart Campus Assistant...', timestamp: new Date() },
    { id: 2, title: 'Library Hours Query', preview: 'What are the library hours?', timestamp: new Date() }
  ];

  const aiResponses = {
    building: {
      content: 'I can help you find any building on campus.',
      actions: [{ label: 'Open Map', icon: 'Map', onClick: () => navigate('/campus-map') }]
    },
    schedule: {
      content: "Here's your schedule for today.",
      actions: [{ label: 'View Schedule', icon: 'Calendar', onClick: () => navigate('/student-dashboard') }]
    },
    events: {
      content: 'Upcoming campus events this week.',
      actions: [{ label: 'View Events', icon: 'Calendar', onClick: () => navigate('/events-notices') }]
    },
    default: {
      content: 'Tell me what you’re looking for — I’m here to help!'
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const getAIResponse = (text) => {
    const msg = text.toLowerCase();
    if (msg.includes('building') || msg.includes('location')) return aiResponses.building;
    if (msg.includes('schedule') || msg.includes('class')) return aiResponses.schedule;
    if (msg.includes('event')) return aiResponses.events;
    return aiResponses.default;
  };

  const handleSendMessage = async (text) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, type: 'user', content: text, timestamp: new Date() }
    ]);

    setIsTyping(true);

    try {
      // Check database responses first
      const msg = text.toLowerCase();
      let response = null;
      let actions = null;

      if (msg.includes('building') || msg.includes('location') || msg.includes('where is')) {
        response = 'I can help you find any building on campus.';
        actions = [{ label: 'Open Map', icon: 'Map', onClick: () => navigate('/campus-map') }];
      } else if (msg.includes('schedule') || msg.includes('class') || msg.includes('timetable')) {
        response = "Here's your schedule for today.";
        actions = [{ label: 'View Schedule', icon: 'Calendar', onClick: () => navigate('/student-dashboard') }];
      } else if (msg.includes('event')) {
        response = 'Upcoming campus events this week.';
        actions = [{ label: 'View Events', icon: 'Calendar', onClick: () => navigate('/events-notices') }];
      }

      // If no database match, use Gemini AI
      if (!response) {
        if (geminiService.isGeminiAvailable()) {
          try {
            response = await geminiService.sendMessage(text);
          } catch (error) {
            console.error('Gemini error:', error);
            response = "I apologize, but I'm having trouble connecting to my AI service right now. Please try asking about campus buildings, schedules, or events, or try again in a moment.";
          }
        } else {
          response = "I can help you with campus navigation, schedules, and events. For other questions, please make sure the Gemini API key is configured in the server/.env file.";
        }
      }

      // Add assistant response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            type: 'assistant',
            content: response,
            actions: actions,
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
      }, 800);
    } catch (error) {
      console.error('Error handling message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* 🚀 HYPERSPEED BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <Hyperspeed
          effectOptions={{
            distortion: "turbulentDistortion",
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [12, 80],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 526344,
              islandColor: 657930,
              background: -1,
              shoulderLines: 1250072,
              brokenLines: 1250072,
              leftCars: [14177983, 6770850, 12732332],
              rightCars: [242627, 941733, 3294549],
              sticks: 242627
            }
          }}
        />
      </div>

      {/* 🌑 DARK OVERLAY */}
      <div className="fixed inset-0 bg-[#0A0E27]/40 -z-5" />

      {/* 🧠 APP CONTENT */}
      <div className="relative min-h-screen text-white">
        <Navigation />
        <FloatingAssistant />

        <div className="pt-16 h-screen flex">
          {showHistory && (
            <ConversationHistory
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={(id) => setActiveConversationId(id)}
              onNewConversation={() => setMessages([])}
            />
          )}

          <div className="flex-1 flex flex-col">
            <ChatHeader
              showHistory={showHistory}
              onToggleHistory={() => setShowHistory(!showHistory)}
            />

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <QuickActionChips onActionClick={handleSendMessage} />

              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} isUser={msg.type === 'user'} />
                ))}

                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartAssistant;
