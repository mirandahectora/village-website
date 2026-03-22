import { useState } from 'react'
import { Compass, Users, Zap, ArrowRight, Link2, XCircle } from 'lucide-react'
import { EXPLORE_VILLAGES, useAuth } from '../../context/AuthContext'

const MATCHED_PEOPLE = [
  { id: 'p1', initials: 'SC', name: 'Sofia C.',  username: 'sofiac',  handle: '@sofia_c',  goal: 'Education Debt', location: 'New Haven, CT',  match: 96, photo: 'https://randomuser.me/api/portraits/women/66.jpg', headline: 'Grad student making a real dent in federal loans. Consistent saver, finally seeing progress.' },
  { id: 'p2', initials: 'JA', name: 'Jordan A.', username: 'jordana', handle: '@jordan_a', goal: 'Education Debt', location: 'NYC, NY',        match: 91, photo: 'https://randomuser.me/api/portraits/men/21.jpg',   headline: 'On income-driven repayment and paying down debt with intention. Slowly but surely.' },
  { id: 'p3', initials: 'LM', name: 'Lena M.',   username: 'lenam',   handle: '@lena.m',   goal: 'Emergency Fund', location: 'Brooklyn, NY',   match: 84, photo: 'https://randomuser.me/api/portraits/women/22.jpg', headline: 'Freelancer learning to build stability on a variable income. Six months saved is the goal.' },
  { id: 'p4', initials: 'TP', name: 'Theo P.',   username: 'theop',   handle: '@theo_p',   goal: 'Education Debt', location: 'Boston, MA',     match: 82, photo: 'https://randomuser.me/api/portraits/men/33.jpg',   headline: 'Recent grad navigating private loans on an entry-level salary. Chipping away every month.' },
  { id: 'p5', initials: 'MO', name: 'Maya O.',   username: 'mayao',   handle: '@maya.o',   goal: 'Home Purchase',  location: 'NYC, NY',        match: 74, photo: 'https://randomuser.me/api/portraits/women/34.jpg', headline: 'Dual income, one big dream. We\'re saving for our first home in NYC and not giving up.' },
  { id: 'p6', initials: 'RS', name: 'Ravi S.',   username: 'ravis',   handle: '@ravi_s',   goal: 'Education Debt', location: 'New Haven, CT',  match: 71, photo: 'https://randomuser.me/api/portraits/men/45.jpg',   headline: 'PhD researcher making the most of a stipend. Low debt, long horizon, building toward something.' },
]

export default function ExploreView({ onStartDM }) {
  const [subview, setSubview] = useState('villages') // 'villages' | 'people'

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '32px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Compass size={20} color="var(--terracotta)" />
          <h1 style={{ fontSize: 26 }}>Explore</h1>
        </div>

        {/* Sub-tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--rule)' }}>
          {[
            { id: 'villages', label: 'Villages', icon: <Users size={13} /> },
            { id: 'people',   label: 'People',   icon: <Zap size={13} /> },
          ].map(t => (
            <button key={t.id} onClick={() => setSubview(t.id)} style={{
              padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
              color: subview === t.id ? 'var(--ink)' : 'var(--ink-muted)',
              borderBottom: subview === t.id ? '2px solid var(--ink)' : '2px solid transparent',
              marginBottom: '-1px',
            }}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>
      </div>

      {subview === 'villages' && <VillagesGrid />}
      {subview === 'people'   && <PeopleGrid onStartDM={onStartDM} />}
    </div>
  )
}

function InviteCodeModal({ onClose }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleJoin = () => {
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) { setError('Paste your invite code above.'); return }
    if (!/^VLG-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(trimmed)) {
      setError('That doesn\'t look like a valid invite code. Format: VLG-XXXX-XXXX'); return
    }
    setError('')
    setSuccess(true)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(30,25,18,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--cream)', border: '1px solid var(--rule)',
        width: 440, padding: '28px',
        boxShadow: '0 12px 40px rgba(30,25,18,0.18)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Join with invite code</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex' }}>
            <XCircle size={16} />
          </button>
        </div>

        {success ? (
          <div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: 24 }}>
              Your request has been sent to the village. The members will be notified and can vote to admit you.
            </p>
            <div style={{
              padding: '14px 16px', marginBottom: 24,
              background: 'rgba(42,74,30,0.08)', border: '1px solid var(--green)',
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', letterSpacing: '0.08em', marginBottom: 3 }}>REQUEST SENT</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink)' }}>{code.trim().toUpperCase()}</div>
            </div>
            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: 11 }} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: 20 }}>
              Got an invite from a village member? Paste the code below to send a join request directly to that village.
            </p>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
                Invite code
              </label>
              <input
                value={code}
                onChange={e => { setCode(e.target.value); setError('') }}
                placeholder="VLG-XXXX-XXXX"
                spellCheck={false}
                style={{
                  width: '100%', padding: '13px 16px', boxSizing: 'border-box',
                  fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 700, letterSpacing: '0.1em',
                  background: 'var(--cream-mid)', border: `1px solid ${error ? 'var(--terracotta)' : 'var(--rule)'}`,
                  outline: 'none', color: 'var(--ink)', borderRadius: 2,
                }}
                onFocus={e => { if (!error) e.target.style.borderColor = 'var(--ink-muted)' }}
                onBlur={e => { if (!error) e.target.style.borderColor = 'var(--rule)' }}
                onKeyDown={e => e.key === 'Enter' && handleJoin()}
              />
              {error && <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--terracotta)', marginTop: 5 }}>{error}</div>}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }} onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }} onClick={handleJoin}>
                Join village <ArrowRight size={12} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function VillagesGrid() {
  const { villages, joinVillage } = useAuth()
  const [filterByZip, setFilterByZip] = useState(false)
  const [distance, setDistance] = useState(25)
  const [query, setQuery] = useState('')
  const [showInviteModal, setShowInviteModal] = useState(false)

  const filtered = query.trim()
    ? EXPLORE_VILLAGES.filter(v =>
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.handle.toLowerCase().includes(query.toLowerCase()) ||
        v.location.toLowerCase().includes(query.toLowerCase())
      )
    : EXPLORE_VILLAGES

  return (
    <div style={{ padding: '32px 40px' }}>
      {showInviteModal && <InviteCodeModal onClose={() => setShowInviteModal(false)} />}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name or handle…"
          style={{
            flex: 1, padding: '10px 14px',
            fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.04em',
            background: 'var(--cream-mid)', border: '1px solid var(--rule)',
            borderRadius: 2, outline: 'none', color: 'var(--ink)',
            boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--ink-muted)'}
          onBlur={e => e.target.style.borderColor = 'var(--rule)'}
        />
        <button
          className="btn btn-outline"
          style={{ flexShrink: 0, fontSize: 11, padding: '10px 16px', gap: 7, whiteSpace: 'nowrap' }}
          onClick={() => setShowInviteModal(true)}
        >
          <Link2 size={12} /> Join with invite
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
        {/* Zip filter toggle */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div
            onClick={() => setFilterByZip(f => !f)}
            style={{
              width: 32, height: 18, borderRadius: 9,
              background: filterByZip ? 'var(--green)' : 'var(--rule)',
              position: 'relative', transition: 'background 0.2s', cursor: 'pointer', flexShrink: 0,
            }}
          >
            <div style={{
              position: 'absolute', top: 2, left: filterByZip ? 16 : 2,
              width: 14, height: 14, borderRadius: '50%',
              background: 'var(--cream)', transition: 'left 0.2s',
            }} />
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em', userSelect: 'none' }}>
            Filter by location
          </span>
        </label>

        {/* Distance dropdown — only when zip filter is on */}
        {filterByZip && (
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>Within</span>
            <select
              value={distance}
              onChange={e => setDistance(Number(e.target.value))}
              style={{
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
                padding: '5px 10px', border: '1px solid var(--rule)', borderRadius: 2,
                background: 'var(--cream)', color: 'var(--ink)', cursor: 'pointer', outline: 'none',
              }}
            >
              {[5, 10, 25, 50, 100].map(mi => (
                <option key={mi} value={mi}>{mi} miles</option>
              ))}
            </select>
          </label>
        )}


      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {filtered.map(v => {
          const isMember = !!villages.find(mv => mv.id === v.id)
          return <ExploreVillageCard key={v.id} v={v} isMember={isMember} onJoin={(msg) => joinVillage(v, msg)} />
        })}
      </div>
    </div>
  )
}

const STRUCTURE_LABELS = {
  accountType:        { hysa: 'High-Yield Savings (HYSA)', checking: 'Checking', brokerage: 'Brokerage' },
  payInFrequency:     { weekly: 'Weekly', biweekly: 'Bi-weekly', monthly: 'Monthly' },
  payoutStructure:    { rotating: 'Rotating (ROSCA)', voted: 'Voted allocation', proportional: 'Proportional draw' },
  amendmentThreshold: { majority: 'Simple majority (>50%)', two_thirds: 'Two-thirds (≥67%)', unanimous: 'Unanimous' },
  quorum:             { any: 'Any member may vote', two_thirds: '2/3 of members must vote', all: 'All members must vote' },
  dishonorableExit:  { withheld: 'Funds withheld', returned_no_interest: 'Returned, no interest', returned_with_interest: 'Returned with interest' },
  probationPeriod:    { none: 'None', '1_month': '1 month', '3_months': '3 months', '6_months': '6 months' },
  latePaymentPolicy:  { grace_7: '7-day grace period', immediate_penalty: 'Immediate penalty', removal_3_missed: 'Removal after 3 missed', voted: 'Member vote' },
  exitNoticePeriod:   { immediate: 'Immediate (no notice required)', '1_month': '1 month', '2_months': '2 months', '3_months': '3 months', '1_cycle': '1 full contribution cycle' },
  memberAdmission:    { vote_required: 'Vote required for all new members', invite_no_vote: 'Invited members admitted without a vote', any_member: 'Any member can admit others freely' },
}

function JoinModal({ v, onConfirm, onCancel }) {
  const [message, setMessage] = useState('')
  const accentColor = v.color === 'green' ? 'var(--green)' : 'var(--terracotta)'
  const btnClass = 'btn btn-terra'
  const s = v.structure

  const constitutionRows = s ? [
    ['Account type',         STRUCTURE_LABELS.accountType[s.accountType]],
    ['Pay-in frequency',     STRUCTURE_LABELS.payInFrequency[s.payInFrequency]],
    ['Pool size goal',       s.poolTarget ? `$${s.poolTarget.toLocaleString()}` : '-'],
    ['Min. contribution',    s.minContribution ? `$${s.minContribution.toLocaleString()} / period` : '-'],
    ['Payout structure',     STRUCTURE_LABELS.payoutStructure[s.payoutStructure]],
    ['Amendment threshold',  STRUCTURE_LABELS.amendmentThreshold[s.amendmentThreshold]],
    ['Vote quorum',          STRUCTURE_LABELS.quorum[s.quorum]],
    ['Member admission',     s.memberAdmission ? STRUCTURE_LABELS.memberAdmission[s.memberAdmission] : '-'],
    ['Dishonorable exit',   STRUCTURE_LABELS.dishonorableExit[s.dishonorableExit]],
    ['Probation period',     STRUCTURE_LABELS.probationPeriod[s.probationPeriod]],
    ['Late payment policy',  STRUCTURE_LABELS.latePaymentPolicy[s.latePaymentPolicy]],
    ['Exit notice period',   s.exitNoticePeriod ? STRUCTURE_LABELS.exitNoticePeriod[s.exitNoticePeriod] : '-'],
  ].filter(([, val]) => val && val !== 'undefined') : []

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(30,25,18,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onCancel}>
      <div style={{
        background: 'var(--cream)', border: '1px solid var(--rule)',
        padding: '32px', width: 520, maxWidth: '92vw', maxHeight: '88vh',
        overflowY: 'auto',
        boxShadow: '0 8px 32px rgba(30,25,18,0.18)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{v.name}</h3>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: accentColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Request to join
          </div>
        </div>

        {/* Constitution */}
        {constitutionRows.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 10 }}>
              Village Constitution
            </div>
            <div style={{
              background: 'var(--cream-mid)', border: '1px solid var(--rule)',
              borderRadius: 2, overflow: 'hidden',
            }}>
              {constitutionRows.map(([key, val], i) => (
                <div key={key} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  padding: '9px 14px',
                  borderBottom: i < constitutionRows.length - 1 ? '1px solid var(--rule)' : 'none',
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>{key}</span>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink)', fontWeight: 500 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Message <span style={{ color: 'var(--rule)' }}>(optional)</span>
        </label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Introduce yourself or explain why you'd like to join…"
          rows={3}
          style={{
            width: '100%', padding: '12px 14px', marginBottom: 20,
            fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.6,
            background: 'var(--cream-mid)', border: '1px solid var(--rule)',
            borderRadius: 2, outline: 'none', color: 'var(--ink)',
            resize: 'vertical', boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--ink-muted)'}
          onBlur={e => e.target.style.borderColor = 'var(--rule)'}
        />

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button className="btn btn-outline" style={{ padding: '9px 18px', fontSize: 11 }} onClick={onCancel}>
            Cancel
          </button>
          <button className={btnClass} style={{ padding: '9px 18px', fontSize: 11 }} onClick={() => onConfirm(message)}>
            Send request <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

function ExploreVillageCard({ v, isMember, onJoin }) {
  const accentColor = v.color === 'green' ? 'var(--green)' : 'var(--terracotta)'

  const [showJoin, setShowJoin] = useState(false)

  const handleConfirm = (message) => {
    onJoin(message)
    setShowJoin(false)
  }

  return (
    <>
      {showJoin && <JoinModal v={v} onConfirm={handleConfirm} onCancel={() => setShowJoin(false)} />}
      <div style={{
        border: '1px solid var(--rule)', padding: '24px',
        transition: 'border-color 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        {/* Top row: avatar + stats + match */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0, overflow: 'hidden' }}>
              {v.photo
                ? <img src={v.photo} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                : <div style={{
                    width: '100%', height: '100%', background: accentColor, color: 'var(--cream)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
                  }}>{v.name.split(' ').map(w => w[0]).join('').slice(0, 3)}</div>
              }
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Pool</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700 }}>${(v.pooled / 1000).toFixed(0)}k</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Members</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700 }}>{v.members}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Location</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700 }}>{v.location}</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              padding: '6px 12px',
              background: 'rgba(42,74,30,0.1)',
              border: '1px solid var(--green)',
              borderRadius: 2, marginBottom: 6,
            }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 900, color: 'var(--green)', lineHeight: 1 }}>{v.match}%</div>
            </div>
          </div>
        </div>

        {/* Name + description — full width */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700 }}>{v.name}</h3>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>{v.handle}</span>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.04em', lineHeight: 1.6, marginBottom: 16 }}>
          {v.headline}
        </div>



        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isMember ? (
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', letterSpacing: '0.06em' }}>Member ✓</span>
          ) : (
            <button
              className="btn btn-terra"
              style={{ padding: '8px 16px', fontSize: 10 }}
              onClick={e => { e.stopPropagation(); setShowJoin(true) }}
            >
              Request to join <ArrowRight size={12} />
            </button>
          )}
        </div>
      </div>
    </>
  )
}

function PeopleGrid({ onStartDM }) {
  const [filterByZip, setFilterByZip] = useState(false)
  const [distance, setDistance] = useState(25)
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? MATCHED_PEOPLE.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.handle.toLowerCase().includes(query.toLowerCase())
      )
    : MATCHED_PEOPLE

  return (
    <div style={{ padding: '32px 40px' }}>
      <div style={{ marginBottom: 24 }}>
        {/* Search bar */}
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name or handle…"
          style={{
            width: '100%', padding: '10px 14px', marginBottom: 14,
            fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.04em',
            background: 'var(--cream-mid)', border: '1px solid var(--rule)',
            borderRadius: 2, outline: 'none', color: 'var(--ink)',
            boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--ink-muted)'}
          onBlur={e => e.target.style.borderColor = 'var(--rule)'}
        />

        {/* Filter bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div
              onClick={() => setFilterByZip(f => !f)}
              style={{
                width: 32, height: 18, borderRadius: 9,
                background: filterByZip ? 'var(--green)' : 'var(--rule)',
                position: 'relative', transition: 'background 0.2s', cursor: 'pointer', flexShrink: 0,
              }}
            >
              <div style={{
                position: 'absolute', top: 2, left: filterByZip ? 16 : 2,
                width: 14, height: 14, borderRadius: '50%',
                background: 'var(--cream)', transition: 'left 0.2s',
              }} />
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em', userSelect: 'none' }}>
              Filter by location
            </span>
          </label>

          {filterByZip && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>Within</span>
              <select
                value={distance}
                onChange={e => setDistance(Number(e.target.value))}
                style={{
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
                  padding: '5px 10px', border: '1px solid var(--rule)', borderRadius: 2,
                  background: 'var(--cream)', color: 'var(--ink)', cursor: 'pointer', outline: 'none',
                }}
              >
                {[5, 10, 25, 50, 100].map(mi => (
                  <option key={mi} value={mi}>{mi} miles</option>
                ))}
              </select>
            </label>
          )}

        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filtered.map(p => <PersonCard key={p.id} p={p} onStartDM={onStartDM} />)}
      </div>
    </div>
  )
}

function PersonCard({ p, onStartDM }) {
  const matchColor = 'var(--green)'

  return (
    <div style={{
      border: '1px solid var(--rule)', padding: '20px',
      transition: 'border-color 0.2s, transform 0.2s',
      display: 'flex', flexDirection: 'column',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Avatar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
        {p.photo
          ? <img src={p.photo} alt={p.initials} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' }} />
          : <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--cream-dark)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 600 }}>{p.initials}</div>
        }
      </div>

      {/* Name + handle + location */}
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{p.name}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>{p.handle}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.06em', marginTop: 2 }}>{p.location}</div>
      </div>

      {/* Match badge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
        <div style={{
          padding: '5px 14px',
          background: 'rgba(42,74,30,0.1)',
          border: '1px solid var(--green)',
          borderRadius: 2,
        }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 900, color: matchColor, lineHeight: 1 }}>{p.match}%</div>
        </div>
      </div>

      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.04em', lineHeight: 1.6, marginBottom: 16, textAlign: 'center' }}>
        {p.headline}
      </div>

      <button className="btn btn-terra" style={{ width: '100%', justifyContent: 'center', padding: '9px', fontSize: 10, marginTop: 'auto' }} onClick={() => onStartDM(p)}>
        Connect <ArrowRight size={12} />
      </button>
    </div>
  )
}
