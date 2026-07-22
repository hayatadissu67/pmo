import React, { useState, useRef, useEffect } from 'react';

export default function AIAssistant({ projectsList = [], selectedProject = null }) {
  // Select context project
  const [activeProjectId, setActiveProjectId] = useState(
    selectedProject?.id || projectsList[0]?.id || '1'
  );

  const currentProject =
    projectsList.find((p) => p.id === activeProjectId) || {
      code: 'PRJ-2026-001',
      title: 'Enterprise PMO Control Tower',
      status: 'In Progress',
      progress: 68,
    };

  // Chat conversation state
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello! I'm your PMO AI Assistant. I have loaded context for **${currentProject.code} - ${currentProject.title}**. How can I help you manage this project today?`,
      timestamp: 'Just now',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Suggested Quick Prompts
  const quickPrompts = [
    { label: '⚠️ Risk Assessment', query: 'Analyze potential risks and bottlenecks for this project.' },
    { label: '📊 Generate Status Summary', query: 'Give me an executive status summary to send to stakeholders.' },
    { label: '📅 Timeline Check', query: 'Is this project on track to meet its schedule and milestones?' },
    { label: '📋 Action Items', query: 'List top 3 priority action items for the team this week.' },
  ];

  // Send Message Handler
  const handleSendMessage = (textToSend) => {
    const messageText = textToSend || inputMessage;
    if (!messageText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulated AI response generation
    setTimeout(() => {
      let aiResponseText = `I analyzed **${currentProject.title}** (${currentProject.code}). Everything looks stable with a completion rate of ${currentProject.progress}%. Let me know if you need specific risk metrics or report exports!`;

      const lower = messageText.toLowerCase();
      if (lower.includes('risk') || lower.includes('bottleneck')) {
        aiResponseText = `⚠️ **Risk Analysis for ${currentProject.code}:**\n1. **Resource Constraints:** QA team capacity is at 90% load.\n2. **Dependency Risk:** API integration phase depends on third-party verification.\n3. **Recommendation:** Schedule an alignment meeting with lead developers before next sprint.`;
      } else if (lower.includes('summary') || lower.includes('status')) {
        aiResponseText = `📊 **Executive Summary (${currentProject.title}):**\n- **Current Progress:** ${currentProject.progress}%\n- **Current Phase:** ${currentProject.status}\n- **Health Indicator:** On Track 🟢\n- **Key Accomplishment:** Core API gateway deployment completed.`;
      } else if (lower.includes('timeline') || lower.includes('schedule')) {
        aiResponseText = `📅 **Schedule Status:**\n- The project is currently **On Schedule**.\n- Next key milestone is due in 12 days.\n- Buffer time remaining: 5 business days.`;
      } else if (lower.includes('action') || lower.includes('priority')) {
        aiResponseText = `📋 **Top 3 Priorities for ${currentProject.code}:**\n1. Finalize architectural review sign-off.\n2. Resolve open code review comments on the backend branch.\n3. Prepare deployment checklist for staging environment.`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* 1. HEADER: Assistant Control & Context Selector */}
      <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-base shadow-sm">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              AI PMO Assistant
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-semibold border border-emerald-500/30">
                Online
              </span>
            </h3>
            <p className="text-xs text-slate-400">Contextual project analytics & intelligent support</p>
          </div>
        </div>

        {/* Active Context Selector */}
        {projectsList.length > 0 && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Project Context:</span>
            <select
              value={activeProjectId}
              onChange={(e) => {
                setActiveProjectId(e.target.value);
                const proj = projectsList.find((p) => p.id === e.target.value);
                setMessages((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    sender: 'ai',
                    text: `Switched context to **${proj?.code} - ${proj?.title}**. How can I help with this project?`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
              }}
              className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            >
              {projectsList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} ({p.progress}%)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 2. CHAT MESSAGES CONTAINER */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-8 h-8 rounded-lg bg-[#0A3A82] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs">
                  AI
                </div>
              )}

              <div className={`max-w-2xl space-y-1 ${isAI ? 'items-start' : 'items-end'}`}>
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    isAI
                      ? 'bg-white text-slate-800 border border-slate-200/80 shadow-2xs whitespace-pre-line'
                      : 'bg-blue-600 text-white font-medium shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className={`text-[10px] text-slate-400 block px-1 ${isAI ? 'text-left' : 'text-right'}`}>
                  {msg.timestamp}
                </span>
              </div>

              {!isAI && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs">
                  PM
                </div>
              )}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0A3A82] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              AI
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. QUICK SUGGESTIONS BAR */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-2">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp.query)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* 4. MESSAGE INPUT BOX */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask AI about ${currentProject.code}... (e.g. risk analysis, schedule check)`}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="px-5 py-3 bg-[#0A3A82] hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <span>Send</span>
            <span>🚀</span>
          </button>
        </form>
      </div>

    </div>
  );
}