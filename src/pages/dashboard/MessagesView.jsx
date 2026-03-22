import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Send, MessageSquare } from 'lucide-react'

export default function MessagesView({ activeDMId, setActiveDMId }) {
  const { dms, sendDM } = useAuth()
  const active = activeDMId
    ? dms.find(d => d.personId === activeDMId) || dms[0] || null
    : dms[0] || null

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {/* Conversation list */}
      <div style={{
        width: 272, flexShrink: 0,
        borderRight: '1px solid var(--rule)',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>
        <div style={{ padding: '28px 24px 16px', borderBottom: '1px solid var(--rule)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>Messages</h2>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>
            {dms.length} conversation{dms.length !== 1 ? 's' : ''}
          </div>
        </div>

        {dms.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <MessageSquare size={28} color="var(--rule)" style={{ marginBottom: 14 }} />
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em', lineHeight: 1.7 }}>
              No messages yet.<br />Connect with people in Explore.
            </div>
          </div>
        ) : (
          dms.map(dm => (
            <ConversationRow
              key={dm.personId}
              dm={dm}
              isActive={active?.personId === dm.personId}
              onClick={() => setActiveDMId(dm.personId)}
            />
          ))
        )}
      </div>

      {/* Chat panel */}
      {active ? (
        <ChatPanel dm={active} sendDM={sendDM} />
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
          <MessageSquare size={36} color="var(--rule)" />
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
            Select a conversation
          </div>
        </div>
      )}
    </div>
  )
}

function ConversationRow({ dm, isActive, onClick }) {
  const lastMsg = dm.messages[dm.messages.length - 1]
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '14px 20px', textAlign: 'left',
      background: isActive ? 'rgba(42,74,30,0.06)' : 'transparent',
      border: 'none', borderBottom: '1px solid var(--rule)',
      borderLeft: `3px solid ${isActive ? 'var(--green)' : 'transparent'}`,
      cursor: 'pointer', transition: 'background 0.15s',
    }}
    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--cream-mid)' }}
    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          background: 'var(--cream-dark)', color: 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
        }}>{dm.person.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>
            {dm.person.name}
          </div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)',
            letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {lastMsg
              ? (lastMsg.mine ? `You: ${lastMsg.text}` : lastMsg.text)
              : dm.person.headline}
          </div>
        </div>
      </div>
    </button>
  )
}

function ChatPanel({ dm, sendDM }) {
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [dm.messages])

  const handleSend = () => {
    if (!text.trim()) return
    sendDM(dm.personId, text.trim())
    setText('')
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

      {/* Header */}
      <div style={{
        padding: '18px 32px', borderBottom: '1px solid var(--rule)',
        display: 'flex', alignItems: 'center', gap: 14,
        background: 'var(--cream)',
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: 'var(--cream-dark)', color: 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
        }}>{dm.person.initials}</div>
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600 }}>{dm.person.name}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
            {dm.person.location} · {dm.person.goal}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
        {dm.messages.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '48px 0',
            fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em', lineHeight: 1.8,
          }}>
            Say hello to {dm.person.name.split(' ')[0]}.<br />
            <span style={{ fontSize: 10 }}>You matched {dm.person.match}% on financial goals.</span>
          </div>
        )}

        {dm.messages.map((msg, i) => {
          const prev = dm.messages[i - 1]
          const groupStart = !prev || prev.mine !== msg.mine
          return (
            <div key={msg.id} style={{
              display: 'flex', flexDirection: msg.mine ? 'row-reverse' : 'row',
              gap: 10, marginBottom: groupStart ? 20 : 6, alignItems: 'flex-end',
            }}>
              {groupStart && !msg.mine && (
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--cream-dark)', color: 'var(--ink)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--mono)', fontSize: 10,
                }}>{dm.person.initials}</div>
              )}
              {(!groupStart || msg.mine) && <div style={{ width: 28, flexShrink: 0 }} />}
              <div style={{ maxWidth: '65%' }}>
                <div style={{
                  padding: '10px 14px',
                  background: msg.mine ? 'var(--green)' : 'var(--cream-mid)',
                  color: msg.mine ? 'var(--cream)' : 'var(--ink)',
                  borderRadius: msg.mine ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
                  fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.5,
                }}>
                  {msg.text}
                </div>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)',
                  marginTop: 4, letterSpacing: '0.04em',
                  textAlign: msg.mine ? 'right' : 'left',
                }}>{msg.time}</div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '16px 32px', borderTop: '1px solid var(--rule)',
        display: 'flex', gap: 12, alignItems: 'center',
        background: 'var(--cream)',
      }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder={`Message ${dm.person.name.split(' ')[0]}…`}
          style={{
            flex: 1, padding: '12px 16px',
            fontFamily: 'var(--sans)', fontSize: 14,
            background: 'var(--cream-mid)', border: '1px solid var(--rule)',
            borderRadius: 2, outline: 'none', color: 'var(--ink)',
          }}
        />
        <button onClick={handleSend} className="btn btn-primary" style={{ padding: '12px 18px' }}>
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}
