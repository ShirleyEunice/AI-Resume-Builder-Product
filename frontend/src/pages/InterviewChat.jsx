import InterviewSetup from "@/components/interview/InterviewSetup";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import {
  getChatById,
  getChats,
  sendInterviewMessage,
} from "@/services/interviewService";
import {
  Bot,
  Loader2,
  Mic,
  MicOff,
  Plus,
  Send,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "react-router-dom";

// Style markdown output without relying on the typography plugin.
const MD_CLASSES =
  "text-sm leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1";

// Read a message aloud (strips markdown noise first).
const speakText = (raw) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const text = String(raw)
    .replace(/[#*`_>]/g, "")
    .replace(/\n+/g, ". ")
    .trim();
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  window.speechSynthesis.speak(utter);
};

const cancelSpeech = () => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

const InterviewChat = () => {
  const [searchParams] = useSearchParams();
  const initialResumeId = searchParams.get("resumeId") || null;

  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [mode, setMode] = useState("interview");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [speakOn, setSpeakOn] = useState(false);
  const endRef = useRef(null);
  const speakOnRef = useRef(speakOn);
  speakOnRef.current = speakOn;

  const { listening, supported: micSupported, stop: stopMic, toggle: toggleMic } =
    useSpeechRecognition({
      onResult: (text) =>
        setInput((prev) => (prev ? prev + " " : "") + text.trim()),
    });

  const refreshChats = async () => {
    try {
      const data = await getChats();
      setChats(data || []);
    } catch (e) {
      /* non-fatal */
    }
  };

  const loadChat = async (id) => {
    if (!id || id === chatId) return;
    try {
      setLoadingChat(true);
      const chat = await getChatById(id);
      setChatId(chat._id);
      setMode(chat.mode);
      setMessages(chat.messages || []);
    } catch (e) {
      toast.error("Could not load this chat.");
    } finally {
      setLoadingChat(false);
    }
  };

  useEffect(() => {
    refreshChats();
    // Deep-link: open a specific session if ?chatId= is present.
    const urlChatId = searchParams.get("chatId");
    if (urlChatId) loadChat(urlChatId);
    return () => cancelSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleStarted = (session) => {
    setChatId(session.chatId);
    setMode(session.mode);
    setMessages([{ role: "assistant", content: session.firstMessage }]);
    if (speakOnRef.current) speakText(session.firstMessage);
    refreshChats();
  };

  const newChat = () => {
    cancelSpeech();
    setChatId(null);
    setMessages([]);
    setInput("");
  };

  const toggleSpeak = () => {
    setSpeakOn((s) => {
      if (s) cancelSpeech();
      return !s;
    });
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;
    if (listening) stopMic();

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setSending(true);
    try {
      const res = await sendInterviewMessage({ message: text, chatId });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.reply },
      ]);
      if (speakOnRef.current) speakText(res.reply);
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please wait a moment and try again.");
      } else if (error.response?.status === 403) {
        toast.error(error.response?.data?.message || "Not enough credits.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      // roll back the optimistic user message and restore the input
      setMessages((prev) => prev.slice(0, -1));
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const inSession = !!chatId;

  return (
    <div className="flex h-full">
      {/* History sidebar */}
      <aside className="w-64 shrink-0 border-r border-white/10 bg-brand-ink text-white/90 flex flex-col">
        <div className="p-4">
          <button
            onClick={newChat}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-3 py-2.5 text-sm font-semibold text-white shadow-brand hover:bg-teal-600 transition"
          >
            <Plus className="w-4 h-4" /> New Interview
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
          {chats.length === 0 && (
            <p className="px-2 text-xs text-white/40">No sessions yet.</p>
          )}
          {chats.map((c) => (
            <button
              key={c._id}
              onClick={() => loadChat(c._id)}
              className={`w-full text-left rounded-lg px-3 py-2 text-sm transition ${
                c._id === chatId
                  ? "bg-brand-primary/20 text-brand-aqua"
                  : "hover:bg-white/5"
              }`}
            >
              <p className="truncate">{c.title || "Untitled"}</p>
              <p className="text-[10px] uppercase tracking-wide text-white/40 mt-0.5">
                {c.mode === "coach" ? "Coach" : "Interview"}
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 min-w-0">
        {!inSession ? (
          <InterviewSetup
            onStarted={handleStarted}
            initialResumeId={initialResumeId}
          />
        ) : (
          <div className="flex flex-col h-full bg-brand-cloud">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-white px-6 py-3">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  mode === "coach"
                    ? "bg-brand-sand/20 text-brand-accent"
                    : "bg-brand-primary/10 text-brand-primary"
                }`}
              >
                {mode === "coach" ? "Ask a Coach" : "Mock Interview"}
              </span>

              <button
                onClick={toggleSpeak}
                title={speakOn ? "Turn off read-aloud" : "Read answers aloud"}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                  speakOn
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {speakOn ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
                Read aloud
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="max-w-3xl mx-auto space-y-5">
                {loadingChat && (
                  <p className="text-center text-sm text-gray-400">Loading…</p>
                )}

                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${
                      m.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        m.role === "user"
                          ? "bg-brand-ink text-white"
                          : "bg-brand-primary text-white"
                      }`}
                    >
                      {m.role === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[80%] shadow-soft ${
                        m.role === "user"
                          ? "bg-brand-ink text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      <div className={MD_CLASSES}>
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}

                {sending && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3 shadow-soft">
                      <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>
            </div>

            {/* Input */}
            <div className="border-t bg-white px-4 py-3">
              <div className="max-w-3xl mx-auto flex items-end gap-2">
                {micSupported && (
                  <button
                    onClick={toggleMic}
                    title={listening ? "Stop recording" : "Speak your answer"}
                    className={`inline-flex items-center justify-center rounded-xl p-3 transition ${
                      listening
                        ? "bg-red-500 text-white animate-pulse"
                        : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {listening ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>
                )}

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder={
                    listening
                      ? "Listening… speak now"
                      : mode === "coach"
                        ? "Ask anything…"
                        : "Type your answer…"
                  }
                  className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary max-h-40"
                />
                <button
                  onClick={sendMessage}
                  disabled={sending || !input.trim()}
                  className="inline-flex items-center justify-center rounded-xl bg-brand-primary p-3 text-white shadow-brand hover:bg-teal-600 transition disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewChat;
