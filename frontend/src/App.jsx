import { useState, useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs.min.js';
import EmojiPicker from 'emoji-picker-react';
import './App.css';

const BACKEND_URL = 'http://localhost:8080/ws';

// Reliable animated stickers (Google Noto Emoji)
const STICKERS = [
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f929/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f602/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.gif',
];

// Convert a Blob to base64 string
const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // "data:audio/webm;base64,..."
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

// Compress image to ensure it easily fits within the WebSocket limits
const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Compress to JPEG
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
        resolve(compressedBase64);
      };
    };
  });
};

function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      alert('Microphone access denied. Please allow microphone access and try again.');
    }
  }, []);

  const stop = useCallback(() =>
    new Promise((resolve) => {
      const mr = mediaRecorderRef.current;
      if (!mr) return resolve(null);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || 'audio/webm' });
        mr.stream.getTracks().forEach((t) => t.stop());
        resolve(blob);
      };
      mr.stop();
      clearInterval(timerRef.current);
      setRecording(false);
      setSeconds(0);
    }), []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  return { recording, seconds, start, stop };
}

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function VoicePlayer({ audioData, isOwn }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); } else { el.play(); }
  };

  return (
    <div className={`voice-player ${isOwn ? 'own' : ''}`}>
      <audio
        ref={audioRef}
        src={audioData}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setProgress(0); }}
        onTimeUpdate={(e) => setProgress(e.target.currentTime / (e.target.duration || 1))}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      />
      <button className="play-btn" onClick={toggle} title={playing ? 'Pause' : 'Play'}>
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>
      <div className="voice-track">
        <div className="voice-bar">
          <div className="voice-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="voice-duration">
          {audioRef.current && playing
            ? formatTime(Math.floor(audioRef.current.currentTime))
            : formatTime(Math.floor(duration))}
        </span>
      </div>
      <span className="voice-label">🎙</span>
    </div>
  );
}

const avatarColor = (name) => {
  const colors = ['#7c6ff7', '#f06292', '#4db6ac', '#ffb74d', '#4fc3f7', '#aed581'];
  return colors[name ? name.charCodeAt(0) % colors.length : 0];
};

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  
  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { recording, seconds, start: startRec, stop: stopRec } = useRecorder();

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const connect = useCallback(() => {
    setConnecting(true);
    const client = new Client({
      webSocketFactory: () => new SockJS(BACKEND_URL),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        setConnecting(false);
        client.subscribe('/topic/messages', (frame) => {
          const msg = JSON.parse(frame.body);
          console.log('Received message:', msg); // Debug log
          const now = new Date();
          setMessages((prev) => [
            ...prev,
            { ...msg, timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), id: Date.now() + Math.random() },
          ]);
          setOnlineUsers((prev) => prev.includes(msg.sender) ? prev : [...prev, msg.sender]);
        });
      },
      onDisconnect: () => { setConnected(false); setConnecting(false); },
      onStompError: (frame) => { console.error('STOMP error:', frame); setConnecting(false); },
    });
    client.activate();
    clientRef.current = client;
  }, []);

  const disconnect = useCallback(() => {
    clientRef.current?.deactivate();
    setConnected(false); setJoined(false);
    setMessages([]); setUsername(''); setOnlineUsers([]);
  }, []);

  useEffect(() => () => clientRef.current?.deactivate(), []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    connect();
    setJoined(true);
    setOnlineUsers([username]);
    setMessages([{
      sender: 'System', content: `${username} joined the chat`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystem: true, id: 'welcome', type: 'text',
    }]);
  };

  const publishMessage = (payload) => {
    if (!clientRef.current || !connected) return;
    try {
      clientRef.current.publish({ destination: '/app/chat', body: JSON.stringify(payload) });
    } catch (err) {
      console.error('Failed to publish message:', err);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !connected) return;
    publishMessage({ sender: username, content: input, type: 'text' });
    setInput('');
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSend(e);
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const handleStickerSend = (stickerUrl) => {
    publishMessage({ sender: username, content: '', type: 'sticker', fileData: stickerUrl });
    setShowStickerPicker(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !connected) return;

    try {
      const base64Image = await compressImage(file);
      publishMessage({ sender: username, content: '', type: 'image', fileData: base64Image });
    } catch (err) {
      console.error('Image compression failed', err);
      alert('Failed to process image');
    }
    
    // Reset input
    e.target.value = '';
  };

  const handleMicClick = async () => {
    if (!recording) {
      await startRec();
    } else {
      const blob = await stopRec();
      if (!blob || !connected) return;

      if (blob.size < 1000) {
        console.warn('Voice blob is empty or too small — no microphone audio captured.');
        alert('No audio was captured. Make sure your microphone is connected and allowed.');
        return;
      }

      if (blob.size > 750_000) {
        alert('Recording is too long (max ~30 seconds). Please record a shorter message.');
        return;
      }

      const base64 = await blobToBase64(blob);
      publishMessage({ sender: username, content: '', type: 'voice', audioData: base64 });
    }
  };

  const groupedMessages = messages.reduce((acc, msg, idx) => {
    const prev = messages[idx - 1];
    const grouped = prev && prev.sender === msg.sender && !msg.isSystem && !prev.isSystem;
    acc.push({ ...msg, grouped });
    return acc;
  }, []);

  if (!joined) {
    return (
      <div className="app join-screen">
        <div className="join-left">
          <div className="brand">
            <span className="brand-icon">💬</span>
            <div>
              <h1>NexusChat</h1>
              <p>Real-time team messaging</p>
            </div>
          </div>
          <div className="feature-list">
            <div className="feature-item"><span>⚡</span><div><strong>Instant Delivery</strong><p>Messages delivered in milliseconds via WebSockets</p></div></div>
            <div className="feature-item"><span>🎙</span><div><strong>Voice Messages</strong><p>Record and send audio clips directly in the chat</p></div></div>
            <div className="feature-item"><span>🖼️</span><div><strong>Rich Media</strong><p>Send images, emojis, and animated stickers instantly</p></div></div>
            <div className="feature-item"><span>👥</span><div><strong>Multi-User</strong><p>Unlimited users in the same room simultaneously</p></div></div>
          </div>
          <div className="stack-badges">
            <span className="badge">React</span><span className="badge">Vite</span>
            <span className="badge">Spring Boot</span><span className="badge">STOMP</span><span className="badge">SockJS</span>
          </div>
        </div>
        <div className="join-right">
          <div className="join-card">
            <h2>Welcome back</h2>
            <p className="join-sub">Enter your display name to join the chat room</p>
            <form onSubmit={handleJoin} className="join-form">
              <label htmlFor="username-input">Display Name</label>
              <div className="input-wrapper">
                <span className="input-prefix">@</span>
                <input id="username-input" type="text" placeholder="e.g. Alice, Bob..." value={username}
                  onChange={(e) => setUsername(e.target.value)} autoFocus maxLength={30} />
              </div>
              <button id="join-btn" type="submit" disabled={!username.trim()}>Join Chat Room →</button>
              <p className="hint">Open in multiple tabs to simulate multiple users</p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app chat-layout">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-brand"><span className="brand-icon-sm">💬</span><span>NexusChat</span></div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">CHANNELS</div>
          <div className="channel active"><span>#</span> general</div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">ONLINE — {onlineUsers.length}</div>
          <div className="user-list">
            {onlineUsers.map((u) => (
              <div key={u} className={`user-item ${u === username ? 'is-self' : ''}`}>
                <div className="user-avatar" style={{ background: avatarColor(u) }}>{u[0]?.toUpperCase()}</div>
                <span className="user-name">{u}</span>
                {u === username && <span className="you-tag">you</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="self-info">
            <div className="user-avatar sm" style={{ background: avatarColor(username) }}>{username[0]?.toUpperCase()}</div>
            <div className="self-meta">
              <span className="self-name">{username}</span>
              <span className={`self-status ${connected ? 'online' : 'offline'}`}>
                <span className="dot" /> {connecting ? 'Connecting…' : connected ? 'Online' : 'Disconnected'}
              </span>
            </div>
          </div>
          <button id="disconnect-btn" className="leave-btn" onClick={disconnect} title="Leave">⏏</button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main">
        <header className="topbar">
          <div className="topbar-left">
            <span className="channel-hash">#</span>
            <span className="channel-name">general</span>
            <span className="topbar-divider" />
            <span className="topbar-desc">Text &amp; voice messaging — everyone can see &amp; hear</span>
          </div>
          <div className="topbar-right">
            <div className={`conn-status ${connected ? 'live' : 'dead'}`}>
              <span className="dot" />{connecting ? 'Connecting…' : connected ? 'Live' : 'Disconnected'}
            </div>
            <div className="msg-count">{messages.filter(m => !m.isSystem).length} messages</div>
          </div>
        </header>

        <main className="messages-pane" id="messages-area">
          <div className="channel-welcome">
            <div className="welcome-icon">#</div>
            <h3>Welcome to #general</h3>
            <p>Send text, voice notes, images, emojis, and stickers!</p>
          </div>

          {groupedMessages.map((msg) => {
            if (msg.isSystem) return (
              <div key={msg.id} className="system-msg"><span>{msg.content}</span></div>
            );
            const isOwn = msg.sender === username;
            
            // Helper to render content based on type
            const renderContent = () => {
              if (msg.type === 'voice') {
                return <VoicePlayer audioData={msg.audioData} isOwn={isOwn} />;
              } else if (msg.type === 'image') {
                return (
                  <div className="msg-media-container">
                    <img src={msg.fileData} alt="uploaded" className="msg-image" onError={(e) => console.error('Image load error', e)} />
                  </div>
                );
              } else if (msg.type === 'sticker') {
                return (
                  <div className="msg-media-container">
                    <img src={msg.fileData} alt="sticker" className="msg-sticker" onError={(e) => console.error('Sticker load error', e)} />
                  </div>
                );
              } else {
                return <div className={`msg-bubble ${isOwn ? 'own' : ''}`}>{msg.content}</div>;
              }
            };

            return (
              <div key={msg.id} className={`msg-row ${msg.grouped ? 'grouped' : ''}`}>
                {!msg.grouped
                  ? <div className="msg-avatar" style={{ background: avatarColor(msg.sender) }}>{msg.sender[0]?.toUpperCase()}</div>
                  : <div className="msg-avatar-spacer" />
                }
                <div className="msg-body">
                  {!msg.grouped && (
                    <div className="msg-meta">
                      <span className={`msg-sender ${isOwn ? 'is-self' : ''}`}>{isOwn ? `${msg.sender} (you)` : msg.sender}</span>
                      <span className="msg-time">{msg.timestamp}</span>
                    </div>
                  )}
                  {renderContent()}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </main>

        <footer className="input-bar">
          {recording && (
            <div className="recording-banner">
              <span className="rec-dot" />
              <span>Recording… {formatTime(seconds)}</span>
              <span className="rec-hint">Click the mic again to send</span>
            </div>
          )}
          
          <div className="pickers-container">
             {showEmojiPicker && (
               <div className="emoji-picker-wrapper">
                 <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
               </div>
             )}
             
             {showStickerPicker && (
               <div className="sticker-picker-wrapper">
                 <h4>Stickers</h4>
                 <div className="sticker-grid">
                   {STICKERS.map((sticker, idx) => (
                     <img 
                       key={idx} 
                       src={sticker} 
                       alt={`sticker ${idx}`} 
                       onClick={() => handleStickerSend(sticker)}
                     />
                   ))}
                 </div>
               </div>
             )}
          </div>

          <form onSubmit={handleSend} className="input-form">
            <div className={`input-box ${!connected ? 'disabled' : ''}`}>
              
              {/* Image Upload Button */}
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <button
                type="button"
                className="media-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={!connected || recording}
                title="Upload Image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
              </button>

              {/* Sticker Button */}
              <button
                type="button"
                className={`media-btn ${showStickerPicker ? 'active' : ''}`}
                onClick={() => { setShowStickerPicker(!showStickerPicker); setShowEmojiPicker(false); }}
                disabled={!connected || recording}
                title="Stickers"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              </button>

              {/* Emoji Button */}
              <button
                type="button"
                className={`media-btn ${showEmojiPicker ? 'active' : ''}`}
                onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowStickerPicker(false); }}
                disabled={!connected || recording}
                title="Emojis"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
              </button>

              {/* Mic button */}
              <button
                id="mic-btn"
                type="button"
                className={`mic-btn ${recording ? 'recording' : ''}`}
                onClick={handleMicClick}
                disabled={!connected}
                title={recording ? 'Stop & send voice message' : 'Start voice recording'}
              >
                {recording ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg>
                )}
              </button>

              <input
                id="message-input"
                type="text"
                placeholder={recording ? 'Recording… click mic to send' : connected ? `Message #general as ${username}…` : 'Connecting to server…'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!connected || recording}
                maxLength={500}
                autoComplete="off"
              />
              <button id="send-btn" type="submit" disabled={!connected || !input.trim() || recording} className="send-btn">
                Send
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
            {!connected && !connecting && (
              <p className="conn-warn">⚠ Not connected — make sure Spring Boot is running on port 8080</p>
            )}
          </form>
        </footer>
      </div>
    </div>
  );
}

export default App;
