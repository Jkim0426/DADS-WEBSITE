"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────
// DATA — All answers hardcoded. Zero API. Zero cost. Ever.
// Update answers by editing this file and redeploying.
// ─────────────────────────────────────────────────────────

type NodeId = string;

interface ChatOption {
  label: string;
  icon?: string;
  nextId?: NodeId;
  action?: "call" | "contact" | "appointment";
  highlight?: boolean;
}

interface ChatNode {
  id: NodeId;
  answer?: string;
  options: ChatOption[];
}

const NODES: Record<NodeId, ChatNode> = {

  root: {
    id: "root",
    options: [
      { label: "What's included in monthly service?", icon: "🌀", nextId: "monthly" },
      { label: "Do you repair heaters and pumps?",    icon: "🔧", nextId: "repairs" },
      { label: "Do you work on spas?",                icon: "🛁", nextId: "spas"    },
      { label: "How much does service cost?",         icon: "💰", nextId: "pricing" },
      { label: "What areas do you serve?",            icon: "📍", nextId: "area"    },
      { label: "How do I get started?",               icon: "✅", nextId: "start"   },
    ],
  },

  monthly: {
    id: "monthly",
    answer:
      "Our monthly service keeps your pool clean, safe, and properly balanced — every visit:\n\n• Skimming the surface & emptying baskets\n• Brushing walls, steps, and tile line\n• Vacuuming the floor\n• Balancing water chemistry (pH, chlorine, alkalinity)\n• Equipment inspection — pump, filter, heater, lights\n• Backwashing the filter when needed\n\nIf we spot any issues, we'll tell you honestly before touching anything.",
    options: [
      { label: "How much does it cost?",      icon: "💰", nextId: "pricing"     },
      { label: "Do you do repairs too?",      icon: "🔧", nextId: "repairs"     },
      { label: "Request monthly service",     icon: "📋", action: "contact",     highlight: true },
      { label: "← Back",                                  nextId: "root"        },
    ],
  },

  repairs: {
    id: "repairs",
    answer:
      "Yes — repairs are a large part of what we do. We handle:\n\n• Pool pumps and motors (repair or replacement)\n• Heaters — gas and electric (diagnosis, repair, install)\n• Filters — cartridge, DE, and sand\n• Pool and spa lighting (LED upgrades, fixture swaps)\n• Wireless remote control systems\n• Acid wash (full drain, clean, and refill)\n• General troubleshooting and diagnosis\n\nKi Mo handles repairs personally — no subcontractors, no surprises.",
    options: [
      { label: "Something is broken right now", icon: "🚨", nextId: "urgent"        },
      { label: "Schedule a repair visit",       icon: "📅", action: "appointment",  highlight: true },
      { label: "Call us directly",              icon: "📞", action: "call"          },
      { label: "← Back",                                   nextId: "root"          },
    ],
  },

  spas: {
    id: "spas",
    answer:
      "Absolutely. We service spas alongside pools or as a standalone service.\n\nSpa service includes:\n• Water chemistry balancing (spas need more frequent testing)\n• Jet cleaning and inspection\n• Filter cleaning and replacement\n• Heater and pump service\n• Surface inspection\n\nSpas have different chemistry requirements than pools. We know the difference and get it right.",
    options: [
      { label: "Request spa service",      icon: "📋", action: "contact",  highlight: true },
      { label: "How much does it cost?",   icon: "💰", nextId: "pricing"              },
      { label: "← Back",                              nextId: "root"                },
    ],
  },

  pricing: {
    id: "pricing",
    answer:
      "Pricing is custom for each pool — no guesswork.\n\nWhat affects your quote:\n• Pool size and shape\n• Current condition of the water and equipment\n• Service frequency\n• Any repairs or upgrades needed\n\nWhat we guarantee:\n✓ Honest, itemized quotes\n✓ No hidden charges\n✓ Competitive rates\n✓ Monthly plans built around your actual needs\n\nBest next step: a free on-site assessment. No commitment required.",
    options: [
      { label: "Request a free quote",    icon: "✨", action: "contact",  highlight: true },
      { label: "Call to discuss pricing", icon: "📞", action: "call"                 },
      { label: "← Back",                             nextId: "root"                 },
    ],
  },

  area: {
    id: "area",
    answer:
      "We primarily serve the San Fernando Valley, including:\n\nWoodland Hills · Encino · Tarzana · Reseda · Northridge · Calabasas · West Hills · Canoga Park · Chatsworth · Granada Hills · and surrounding communities.\n\nNot sure if we cover your street? Just call — we'll confirm in 60 seconds.",
    options: [
      { label: "Call to confirm my area", icon: "📞", action: "call",     highlight: true },
      { label: "Request service",         icon: "📋", action: "contact"               },
      { label: "← Back",                             nextId: "root"                  },
    ],
  },

  start: {
    id: "start",
    answer:
      "Getting started is easy — here's how it works:\n\n1️⃣  Reach out — call, text, or submit a request\n2️⃣  Free assessment of your pool's condition\n3️⃣  Clear, itemized quote — no pressure\n4️⃣  First service scheduled at your convenience\n\nMost new customers are up and running within a week. Ki Mo has been doing this since 1996.",
    options: [
      { label: "Request service online",    icon: "📋", action: "contact",     highlight: true },
      { label: "Schedule an appointment",   icon: "📅", action: "appointment"              },
      { label: "Call 818-442-1763",         icon: "📞", action: "call"                    },
      { label: "← Back",                               nextId: "root"                    },
    ],
  },

  urgent: {
    id: "urgent",
    answer:
      "For urgent issues — broken pump, no heat, cloudy water — the fastest path is a direct call.\n\nWe prioritize equipment failures to prevent further damage. Ki Mo will help you understand your options quickly and honestly.",
    options: [
      { label: "Call now — 818-442-1763",   icon: "📞", action: "call",     highlight: true },
      { label: "Submit a repair request",   icon: "📋", action: "contact"               },
      { label: "← Back",                               nextId: "root"                  },
    ],
  },
};

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

interface Bubble {
  id: string;
  from: "assistant" | "user";
  text: string;
}

// ─────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [open, setOpen]               = useState(false);
  const [nodeId, setNodeId]           = useState<NodeId>("root");
  const [bubbles, setBubbles]         = useState<Bubble[]>([]);
  const [thinking, setThinking]       = useState(false);
  const [hasUnread, setHasUnread]     = useState(false);
  const scrollRef                     = useRef<HTMLDivElement>(null);

  const node = NODES[nodeId];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [bubbles, thinking]);

  useEffect(() => {
    const t = setTimeout(() => { if (!open) setHasUnread(true); }, 10000);
    return () => clearTimeout(t);
  }, [open]);

  const handleOpen = () => { setOpen(true); setHasUnread(false); };

  const pick = (option: ChatOption) => {
    if (option.action) { doAction(option.action); return; }
    if (!option.nextId) return;

    if (option.nextId === "root") {
      setBubbles([]);
      setNodeId("root");
      return;
    }

    const next = NODES[option.nextId];
    if (!next) return;

    setBubbles(prev => [...prev, {
      id: crypto.randomUUID(),
      from: "user",
      text: option.label.replace(/^←\s*/, ""),
    }]);

    setThinking(true);
    setNodeId(option.nextId);

    setTimeout(() => {
      if (next.answer) {
        setBubbles(prev => [...prev, {
          id: crypto.randomUUID(),
          from: "assistant",
          text: next.answer!,
        }]);
      }
      setThinking(false);
    }, 550);
  };

  const doAction = (action: ChatOption["action"]) => {
    if (action === "call") {
      window.location.href = "tel:+18184421763";
      return;
    }
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector("#contact");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      if (action === "appointment") {
        window.dispatchEvent(new CustomEvent("ace-pool:open-appointment"));
      }
    }, 280);
  };

  return (
    <>
      {/* ── Trigger button ── */}
      <div className="fixed bottom-20 right-5 sm:bottom-6 sm:right-6 z-40">
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              onClick={handleOpen}
              aria-label="Open Ace Pool assistant"
              className="relative w-14 h-14 bg-brand rounded-full shadow-brand-glow flex items-center justify-center hover:bg-brand-light hover:scale-110 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-aqua"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-aqua rounded-full border-2 border-white animate-pulse" />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Ace Pool assistant"
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[22rem] flex flex-col rounded-3xl shadow-luxury-lg overflow-hidden border border-white/10 bg-white"
            style={{ maxHeight: "min(600px, calc(100svh - 140px))" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-navy flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-brand to-aqua flex items-center justify-center flex-shrink-0">
                  <Droplet />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-navy" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-white">Ace Pool Assistant</p>
                  <p className="font-body text-[11px] text-white/50">Ask a question · Get in touch</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable conversation */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto bg-[#f0f4f8] px-4 py-4 space-y-3"
              role="log"
              aria-live="polite"
            >
              <AssistantBubble text={"Hi! 👋 I'm the Ace Pool assistant — I can answer common questions and help connect you with Ki Mo. What can I help you with?"} delay={0.05} />

              {bubbles.map((b) =>
                b.from === "assistant"
                  ? <AssistantBubble key={b.id} text={b.text} />
                  : <UserBubble key={b.id} text={b.text} />
              )}

              {thinking && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand to-aqua flex items-center justify-center flex-shrink-0">
                    <Droplet small />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-luxury">
                    <div className="flex gap-1.5 items-center h-4">
                      {[0,1,2].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand/50 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="h-2" />
            </div>

            {/* Option buttons */}
            {!thinking && (
              <motion.div
                key={nodeId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className="bg-[#f0f4f8] border-t border-navy/8 px-4 pt-3 pb-4 flex-shrink-0 space-y-2"
              >
                <p className="font-body text-[10px] font-semibold text-navy/35 uppercase tracking-widest mb-3 px-1">
                  {nodeId === "root" ? "Choose a topic" : "What would you like to do?"}
                </p>

                {node.options.map((opt, i) => {
                  const isBack = opt.label.startsWith("←");
                  const isCallHighlight = opt.highlight && opt.action === "call";
                  const isAquaHighlight = opt.highlight && opt.action !== "call";

                  return (
                    <motion.button
                      key={opt.label}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 }}
                      onClick={() => pick(opt)}
                      className={[
                        "w-full text-left flex items-center gap-3 rounded-xl font-body text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand",
                        isBack
                          ? "px-2 py-2 text-[11px] text-navy/40 hover:text-navy/60"
                          : isCallHighlight
                          ? "px-4 py-3 bg-brand text-white shadow-brand-glow/40 hover:bg-brand-light"
                          : isAquaHighlight
                          ? "px-4 py-3 bg-aqua text-navy shadow-aqua-glow/40 hover:bg-aqua-light"
                          : "px-4 py-3 bg-white text-navy shadow-luxury hover:shadow-luxury-lg border border-navy/5",
                      ].join(" ")}
                    >
                      {opt.icon && !isBack && (
                        <span className="text-base leading-none flex-shrink-0" aria-hidden="true">
                          {opt.icon}
                        </span>
                      )}
                      <span className="flex-1 leading-snug">{opt.label}</span>
                      {!isBack && !opt.highlight && (
                        <svg className="w-3.5 h-3.5 text-navy/25 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}

            {/* Footer */}
            <div className="px-5 py-3 bg-white border-t border-navy/8 flex items-center justify-between flex-shrink-0">
              <p className="font-body text-[10px] text-navy/35">Or call directly</p>
              <a
                href="tel:+18184421763"
                className="font-body text-xs font-semibold text-brand hover:text-navy transition-colors"
                aria-label="Call Ace Pool"
              >
                818-442-1763
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function AssistantBubble({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay }}
      className="flex items-end gap-2"
    >
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand to-aqua flex items-center justify-center flex-shrink-0 mb-0.5">
        <Droplet small />
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-luxury max-w-[85%]">
        <p className="font-body text-sm text-navy leading-relaxed whitespace-pre-wrap">{text}</p>
      </div>
    </motion.div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-end"
    >
      <div className="bg-navy text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[82%]">
        <p className="font-body text-sm leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

function Droplet({ small }: { small?: boolean }) {
  return (
    <svg
      className={small ? "w-3.5 h-3.5 text-white" : "w-5 h-5 text-white"}
      viewBox="0 0 32 40"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 1 C16 1, 4 16, 4 26 C4 34 9.3 39 16 39 C22.7 39 28 34 28 26 C28 16 16 1 16 1Z" />
    </svg>
  );
}

