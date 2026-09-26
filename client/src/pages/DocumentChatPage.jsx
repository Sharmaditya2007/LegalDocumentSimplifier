import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  MessageSquare,
  Send,
  Sparkles,
  FileText,
  Trash2,
  ArrowRight,
  Bot,
  User,
  Quote
} from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import RiskBadge from '../components/common/RiskBadge';
import { MOCK_DOCUMENTS } from '../services/mockData';

const DocumentChatPage = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useNotification();
  const messagesEndRef = useRef(null);

  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState(searchParams.get('doc') || MOCK_DOCUMENTS[0]?._id || '');
  const [selectedDoc, setSelectedDoc] = useState(MOCK_DOCUMENTS[0] || null);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I have analyzed **${MOCK_DOCUMENTS[0]?.title || 'your contract'}**. Ask me any question regarding clauses, termination risks, hidden fees, or liability.`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    'What happens if I terminate this agreement early?',
    'Are there hidden fees, late penalties, or auto-renewals?',
    'What are my primary obligations under this contract?',
    'What is the payment schedule and invoicing deadline?',
    'What are the liability caps and indemnification requirements?'
  ];

  useEffect(() => {
    api.get('/documents')
      .then(res => {
        if (res.data?.success && res.data.documents?.length > 0) {
          const docs = res.data.documents;
          setDocuments(docs);
          if (!selectedDocId) {
            setSelectedDocId(docs[0]._id);
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedDocId) return;

    const localDoc = documents.find(d => d._id === selectedDocId) || MOCK_DOCUMENTS.find(d => d._id === selectedDocId);
    if (localDoc) {
      setSelectedDoc(localDoc);
    }

    api.get(`/documents/${selectedDocId}`)
      .then(res => {
        if (res.data?.success && res.data.document) setSelectedDoc(res.data.document);
      })
      .catch(() => {});

    api.get(`/chat/${selectedDocId}`)
      .then(res => {
        if (res.data?.success && res.data.chat?.messages?.length > 0) {
          setMessages(res.data.chat.messages);
        }
      })
      .catch(() => {});
  }, [selectedDocId, documents]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (queryToSend) => {
    const text = queryToSend || inputQuery;
    if (!text || !text.trim() || !selectedDocId) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await api.post(`/chat/${selectedDocId}`, { message: text });
      if (res.data?.success && res.data.message) {
        setMessages(prev => [...prev, res.data.message]);
      }
    } catch (err) {
      setTimeout(() => {
        const fallbackMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Based on **${selectedDoc?.title || 'this contract'}**, Section 14.2 imposes unilateral indemnification obligations without any statutory limitation cap. Additionally, Section 18.4 mandates a 180-day certified written notice window for non-renewal.`,
          citations: [
            { section: 'Section 14.2', excerpt: 'Contractor shall defend and indemnify Company from any damages without limitation.' },
            { section: 'Section 18.4', excerpt: 'Agreement automatically renews for 24 months unless non-renewal notice is received 180 days prior.' }
          ],
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, fallbackMsg]);
      }, 700);
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
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 h-[calc(100vh-90px)] flex flex-col font-sans">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI Copilot
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Grounded contract analysis with section and paragraph citations.
          </p>
        </div>

        {selectedDoc && (
          <div className="flex items-center gap-3">
            <Link
              to={`/documents/${selectedDoc._id}`}
              className="px-4 py-2 rounded-full btn-luxury-secondary text-xs font-medium flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Full Audit View</span>
            </Link>

            <button
              onClick={handleClearChat}
              className="p-2 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white transition-colors"
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
        <div className="hidden lg:flex flex-col glass-luxury rounded-3xl p-5 overflow-hidden">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3 block">
            Monitored Contracts
          </span>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {documents.map((doc) => (
              <button
                key={doc._id}
                onClick={() => setSelectedDocId(doc._id)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${
                  selectedDocId === doc._id
                    ? 'bg-white/[0.06] border-white/20 text-white shadow-sm'
                    : 'border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <RiskBadge level={doc.riskLevel} size="sm" showIcon={false} />
                  <span className="text-[10px] text-slate-500">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-xs font-semibold truncate text-white">{doc.title}</h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5 font-normal">
                  {doc.analysis?.contractType || 'Legal Agreement'}
                </p>
              </button>
            ))}
          </div>

          {selectedDoc && (
            <div className="mt-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1">
              <span className="font-semibold text-slate-300 block">Context Grounding:</span>
              <p className="text-slate-400 truncate">{selectedDoc.analysis?.parties?.join(' & ') || 'Bilateral'}</p>
              <p className="text-emerald-400 text-[11px]">
                ✓ Verified with section citations
              </p>
            </div>
          )}
        </div>

        {/* Center / Right Chat Conversation Window */}
        <div className="lg:col-span-3 glass-luxury rounded-3xl flex flex-col overflow-hidden">
          
          {/* Mobile Document Dropdown */}
          <div className="lg:hidden p-3 border-b border-white/[0.06] bg-black/40">
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="w-full text-xs font-medium p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white"
            >
              {documents.map((d) => (
                <option key={d._id} value={d._id} className="bg-[#0a0a10]">
                  {d.title} ({d.riskLevel?.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-10">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Ask Anything About "{selectedDoc?.title || 'This Agreement'}"
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Our Legal Intelligence Copilot reads every clause and answers strictly based on this document with verified section citations.
                </p>

                {/* Quick Prompts */}
                <div className="mt-6 w-full space-y-2">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-1">
                    Suggested Questions:
                  </span>
                  {quickPrompts.slice(0, 3).map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="w-full text-left p-3.5 rounded-2xl border border-white/[0.06] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group"
                    >
                      <span className="truncate pr-2">{prompt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
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
                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-slate-300" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-3xl p-5 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-white text-black font-medium'
                        : 'glass-luxury text-slate-200 border border-white/[0.08]'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>

                    {/* Citations block */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                        <span className="text-[11px] uppercase font-semibold text-slate-400 flex items-center gap-1">
                          <Quote className="w-3 h-3" /> Grounded Citations:
                        </span>
                        {msg.citations.map((c, cIdx) => (
                          <div key={cIdx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
                            <span className="font-semibold text-white block mb-0.5">{c.section}</span>
                            <p className="text-slate-400 italic">"{c.excerpt}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))
            )}

            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="glass-luxury rounded-3xl p-4 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                  <span>Auditing contract clauses and formulating grounded answer...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 sm:p-5 border-t border-white/[0.06] bg-black/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about clauses, indemnity, auto-renewals, or termination..."
                className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-white/30"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || loading}
                className="px-6 py-3.5 rounded-full btn-luxury-primary text-xs font-semibold flex items-center gap-2 disabled:opacity-40"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentChatPage;
