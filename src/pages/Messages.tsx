import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Send, Paperclip, ArrowRight, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import { EmptyState, InitialsAvatar } from "@/components/common";
import { Button } from "@/components/ui/button";

function ConversationList({ activeId, onSelect }: { activeId?: string; onSelect: (id: string) => void }) {
  const { conversations } = useApp();
  if (conversations.length === 0) {
    return <EmptyState type="messages" title="لا توجد محادثات" desc="عند التواصل مع مصمم أو شركة ستظهر محادثاتك هنا" />;
  }
  return (
    <ul className="divide-y divide-sand">
      {conversations.map((c) => (
        <li key={c.id}>
          <button
            onClick={() => onSelect(c.id)}
            aria-current={activeId === c.id ? "true" : undefined}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-3.5 text-right transition hover:bg-plum-mist/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold",
              activeId === c.id && "bg-plum-mist"
            )}
          >
            <div className="relative">
              <InitialsAvatar name={c.name} size="md" />
              {c.online && <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-bold text-ink">{c.name}</span>
                <span className="shrink-0 text-[11px] text-mutedtext">{c.time}</span>
              </div>
              <div className="mt-0.5 flex items-center justify-between gap-2">
                <span className="truncate text-xs text-mutedtext">{c.lastMessage}</span>
                {c.unread > 0 && (
                  <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-black text-plum">{c.unread}</span>
                )}
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function MessagesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { conversations, sendMessage } = useApp();
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const conv = conversations.find((c) => c.id === id);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conv?.messages.length]);

  const send = () => {
    if (!text.trim() || !conv) return;
    sendMessage(conv.id, text.trim());
    setText("");
  };

  return (
    <div className="h-[calc(100vh-220px)] min-h-[480px] lg:h-[calc(100vh-140px)]">
      <div className="grid h-full gap-0 overflow-hidden rounded-3xl border border-sand bg-white card-shadow lg:grid-cols-3">
        {/* list */}
        <div className={cn("flex-col border-l border-sand lg:flex", conv ? "hidden" : "flex")}>
          <div className="border-b border-sand px-5 py-4">
            <h1 className="text-lg font-black text-ink">الرسائل</h1>
            <p className="text-xs text-mutedtext">{conversations.length} محادثات</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList activeId={id} onSelect={(cid) => navigate(`/messages/${cid}`)} />
          </div>
        </div>

        {/* chat */}
        <div className={cn("flex-col lg:col-span-2 lg:flex", conv ? "flex" : "hidden")}>
          {conv ? (
            <>
              <div className="flex items-center gap-3 border-b border-sand px-4 py-3">
                <button onClick={() => navigate("/messages")} className="rounded-full p-2 hover:bg-plum-mist lg:hidden" aria-label="عودة للمحادثات">
                  <ArrowRight className="h-5 w-5 text-plum" />
                </button>
                <div className="relative">
                  <InitialsAvatar name={conv.name} size="sm" />
                  {conv.online && <span className="absolute bottom-0 left-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-ink">{conv.name}</div>
                  <div className="text-[11px] text-mutedtext">{conv.role} · {conv.online ? "متصل الآن" : "غير متصل"}</div>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto bg-cream/60 p-4">
                {conv.messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.fromMe ? "justify-start flex-row-reverse" : "justify-start")}>
                    <div className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed card-shadow",
                      m.fromMe ? "rounded-tl-sm bg-plum text-cream" : "rounded-tr-sm bg-white text-ink"
                    )}>
                      <p>{m.text}</p>
                      <div className={cn("mt-1 flex items-center gap-1 text-[10px]", m.fromMe ? "justify-start text-cream/60" : "justify-end text-mutedtext")}>
                        {m.time}
                        {m.fromMe && <CheckCheck className="h-3 w-3" />}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="border-t border-sand p-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost" size="icon" aria-label="إرفاق ملف"
                    className="shrink-0 text-mutedtext hover:text-plum"
                    onClick={() => toast.info("إرفاق الملفات متاح في النسخة الكاملة", { description: "يمكنك حاليًا إرسال رسائل نصية" })}
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                    placeholder="اكتب رسالتك…"
                    aria-label="اكتب رسالة"
                    className="h-11 flex-1 rounded-full border border-sand bg-cream px-4 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                  />
                  <Button onClick={send} disabled={!text.trim()} aria-label="إرسال" className="h-11 w-11 shrink-0 rounded-full bg-plum p-0 text-gold hover:bg-plum-light disabled:opacity-40">
                    <Send className="h-5 w-5 -scale-x-100" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden flex-1 items-center justify-center lg:flex">
              <EmptyState type="messages" title="اختر محادثة" desc="اختر محادثة من القائمة لعرض الرسائل" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
