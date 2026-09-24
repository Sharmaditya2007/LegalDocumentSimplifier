import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  MessageSquare,
  Send,
  Sparkles,
  FileText,
  Trash2,
  Download,
  ShieldCheck,
  Building,
  ArrowRight,
  Bot,
  User,
  Quote,
  Scale
} from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import RiskBadge from '../components/common/RiskBadge';

const DocumentChatPage = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useNotification();
  const messagesEndRef = useRef(null);

  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(searchParams.get('doc') || '');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Suggested Prompts
  const quickPrompts = [
    'What happens if I terminate this agreement early?',
    'Are there hidden fees, late penalties, or auto-renewals?',
    'What are my primary obligations under this contract?',
    'What is the payment schedule and invoicing deadline?',
    'What are the liability caps and indemnification requirements?'
  ];

  // Fetch documents
  useEffect(() => {
    api.get('/documents')
      .then(res => {
        if (res.data.success) {
          const docs = res.data.documents || [];
          setDocuments(docs);
          if (!selectedDocId && docs.length > 0) {
            setSelectedDocId(docs[0]._id);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Fetch chat history and doc details when doc changes
  useEffect(() => {
    if (!selectedDocId) return;

    // Load Document
    api.get(`/documents/${selectedDocId}`)
      .then(res => {
        if (res.data.success) setSelectedDoc(res.data.document);
      })
      .catch(() => {});

    // Load Chat History
    api.get(`/chat/${selectedDocId}`)
      .then(res => {
        if (res.data.success) {
          setMessages(res.data.chat?.messages || []);
        }
      })
      .catch(() => {});
  }, [selectedDocId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (queryToSend) => {
    const text = queryToSend || inputQuery;
    if (!text || !text.trim() || !selectedDocId) return;

    const userMessage = {
      id: 'temp_' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await api.post(`/chat/${selectedDocId}`, { question: text });
      if (res.data.success) {
        setMessages(res.data.chat.messages);
      }
    } catch (err) {
      addToast({
        title: 'Error Answering',
        message: err.response?.data?.message || 'Failed to get answer from AI.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (!selectedDocId) return;
    try {
      await api.delete(`/chat/${selectedDocId}`);
      setMessages([]);
      addToast({ title: 'Cleared', message: 'Chat history deleted.', type: 'info' });
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-80px)] flex flex-col font-sans">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400">
            <Sparkles className="w-4 h-4" />
            <span>Conversational Citation Copilot</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-heading mt-0.5">
            Grounded Contract Analysis Q&A
          </h1>
        </div>

        {selectedDoc && (
          <div className="flex items-center gap-2">
            <Link
              to={`/documents/${selectedDoc._id}`}
              className="px-3.5 py-1.5 rounded-xl border border-slate-700 bg-obsidian-900 text-xs font-semibold text-slate-300 hover:text-white hover:border-brand-500/50 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-brand-400" />
              <span>Full Audit View</span>
            </Link>

            <button
              onClick={handleClearChat}
              className="p-1.5 rounded-xl border border-slate-700 bg-obsidian-900 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-all"
              title="Clear Conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Chat Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0 pt-4">
        {/* Left Document Switcher Panel */}
        <div className="hidden lg:flex flex-col glass-panel rounded-3xl p-4 border border-slate-800 overflow-hidden shadow-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-3 block font-heading">
            Monitored Documents
          </span>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {documents.map((doc) => (
              <button
                key={doc._id}
                onClick={() => setSelectedDocId(doc._id)}
                className={`w-full text-left p-3 rounded-2xl transition-all border ${
                  selectedDocId === doc._id
                    ? 'bg-brand-600/15 border-brand-500/50 text-white shadow-glow'
                    : 'border-slate-800/80 bg-obsidian-950/40 hover:bg-obsidian-900 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <RiskBadge level={doc.riskLevel} size="sm" showIcon={false} />
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-xs font-bold truncate text-white">{doc.title}</h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {doc.analysis?.contractType || 'Legal Agreement'}
                </p>
              </button>
            ))}
          </div>

          {selectedDoc && (
            <div className="mt-3 p-3 rounded-2xl bg-obsidian-950 border border-slate-800 text-[11px] space-y-1">
              <span className="font-bold text-slate-200 block">Context Grounding:</span>
              <p className="text-slate-400 truncate">{selectedDoc.analysis?.parties?.join(' & ') || 'Bilateral'}</p>
              <p className="text-emerald-400 font-medium flex items-center gap-1">
                <span>✓ Verified with section citations</span>
              </p>
            </div>
          )}
        </div>

        {/* Center / Right Chat Conversation Window */}
        <div className="lg:col-span-3 glass-panel rounded-3xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
          {/* Mobile Document Dropdown */}
          <div className="lg:hidden p-3 border-b border-slate-800 bg-obsidian-950">
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-700 bg-obsidian-900 text-white"
            >
              {documents.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.title} ({d.riskLevel?.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-400 flex items-center justify-center mb-4">
                  <Bot className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white font-heading">
                  Ask Anything About "{selectedDoc?.title || 'This Agreement'}"
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Our Legal Intelligence Copilot reads every clause and answers strictly based on this document with verified section citations.
                </p>

                {/* Quick Prompts */}
                <div className="mt-6 w-full space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1 font-heading">
                    Suggested Questions:
                  </span>
                  {quickPrompts.slice(0, 3).map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="w-full text-left p-3 rounded-xl border border-slate-800 hover:border-brand-500/50 bg-obsidian-950/70 hover:bg-obsidian-900 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center justify-between group"
                    >
                      <span className="truncate pr-2">{prompt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={msg.id || i}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-brand-600 text-white rounded-br-sm'
                        : 'glass-panel bg-obsidian-950/90 border border-slate-800 text-slate-200 rounded-bl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>

                    {/* Citations Box */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Quote className="w-3 h-3 text-brand-400" /> Citations:
                        </span>
                        {msg.citations.map((cite, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-500/15 text-brand-300 border border-brand-500/30"
                          >
                            {cite}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-obsidian-900 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))
            )}

            {loading && (
              <div className="flex gap-3 items-center text-xs text-slate-400">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shrink-0 animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Reading contract context and analyzing legal provisions...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pill Strip */}
          {messages.length > 0 && (
            <div className="px-4 py-2 border-t border-slate-800/80 bg-obsidian-950/40 overflow-x-auto flex gap-2">
              {quickPrompts.slice(0, 3).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-3 py-1 rounded-full text-[11px] font-medium bg-obsidian-900 hover:bg-brand-600 hover:text-white border border-slate-800 text-slate-300 whitespace-nowrap transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input Field */}
          <div className="p-4 border-t border-slate-800 bg-obsidian-950/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={`Ask anything about ${selectedDoc?.title || 'this document'}...`}
                className="flex-1 px-4 py-3 rounded-2xl text-xs sm:text-sm bg-obsidian-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="p-3 rounded-2xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white shadow-glow transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentChatPage;
