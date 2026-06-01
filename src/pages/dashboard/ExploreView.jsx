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
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState('')
  const [signerName, setSignerName] = useState(`${user?.first_name || ''} ${user?.last_name || ''}`.trim())
  const [signerDate, setSignerDate] = useState(new Date().toISOString().split('T')[0])
  const accentColor = v.color === 'green' ? 'var(--green)' : 'var(--terracotta)'
  const s = v.structure

  const constitutionRows = s ? [
    ['Account type',        STRUCTURE_LABELS.accountType[s.accountType]],
    ['Pay-in frequency',    STRUCTURE_LABELS.payInFrequency[s.payInFrequency]],
    ['Pool size goal',      s.poolTarget ? `$${s.poolTarget.toLocaleString()}` : '-'],
    ['Min. contribution',   s.minContribution ? `$${s.minContribution.toLocaleString()} / period` : '-'],
    ['Payout structure',    STRUCTURE_LABELS.payoutStructure[s.payoutStructure]],
    ['Amendment threshold', STRUCTURE_LABELS.amendmentThreshold[s.amendmentThreshold]],
    ['Vote quorum',         STRUCTURE_LABELS.quorum[s.quorum]],
    ['Member admission',    s.memberAdmission ? STRUCTURE_LABELS.memberAdmission[s.memberAdmission] : '-'],
    ['Dishonorable exit',   STRUCTURE_LABELS.dishonorableExit[s.dishonorableExit]],
    ['Probation period',    STRUCTURE_LABELS.probationPeriod[s.probationPeriod]],
    ['Late payment policy', STRUCTURE_LABELS.latePaymentPolicy[s.latePaymentPolicy]],
    ['Exit notice period',  s.exitNoticePeriod ? STRUCTURE_LABELS.exitNoticePeriod[s.exitNoticePeriod] : '-'],
  ].filter(([, val]) => val && val !== 'undefined') : []

  // Prose label maps for the formal document
  const ACCT   = { hysa: 'High-Yield Savings (HYSA)', checking: 'Checking Account', brokerage: 'Brokerage Account' }
  const FREQ   = { weekly: 'weekly', biweekly: 'bi-weekly', monthly: 'monthly' }
  const PAYOUT_L = { rotating: 'Rotating (ROSCA)', voted: 'Voted Allocation' }
  const THRESH = { majority: 'a simple majority (>50%)', two_thirds: 'a two-thirds supermajority (≥67%)', unanimous: 'unanimous consent (100%)' }
  const QUORUM_L = { any: 'any member may cast a vote', two_thirds: 'at least two-thirds of members must vote', all: 'all members must vote' }
  const ADMIT  = { vote_required: 'requires a full village vote', invite_no_vote: 'is granted upon invitation by an existing member, without a vote', any_member: 'may be granted freely by any current member' }
  const PROB   = { none: 'no probationary period', '1_month': 'one (1) month', '3_months': 'three (3) months', '6_months': 'six (6) months' }
  const LATE   = {
    grace_7: 'A seven-day grace period applies; payments not received within this window will be flagged to all members.',
    immediate_penalty: 'An immediate penalty fee shall be assessed on any late payment.',
    removal_3_missed: 'A member shall be removed from the village upon three (3) consecutive missed payments.',
    voted: 'Consequences for late payment shall be determined by village vote on a case-by-case basis.',
  }
  const EXIT_F = {
    withheld: "that member's contributed funds shall be withheld by the village",
    returned_no_interest: "that member's contributed funds shall be returned in full, without interest",
    returned_with_interest: "that member's contributed funds shall be returned in full, with accrued interest",
  }
  const NOTICE = {
    immediate: 'no advance notice is required',
    '1_month': "one (1) month's advance notice",
    '2_months': "two (2) months' advance notice",
    '3_months': "three (3) months' advance notice",
    '1_cycle': "one (1) full contribution cycle's advance notice",
  }

  const F = ({ children }) => (
    <span style={{ fontWeight: 600, borderBottom: '1.5px solid var(--ink)', paddingBottom: 1 }}>{children}</span>
  )

  const articles = s ? [
    {
      title: 'Article I — Name and Purpose',
      clauses: [
        <>This organization is known as <F>{v.name}</F>{v.handle ? <>, identified by the handle <F>{v.handle}</F></> : ''}.</>,
        v.location ? <>The village is based in <F>{v.location}</F>.</> : null,
        <>The primary financial goal of this village is <F>{v.goal}</F>.</>,
        v.headline ? <>{v.headline}</> : null,
      ].filter(Boolean),
    },
    {
      title: 'Article II — Membership',
      clauses: [
        <>Admission of new members <F>{ADMIT[s.memberAdmission] || s.memberAdmission}</F>.</>,
        <>New members shall serve a probationary period of <F>{PROB[s.probationPeriod] || s.probationPeriod}</F>. During probation, members may not vote on binding village resolutions.</>,
        <>The village may have a maximum of twenty (20) active members at any time.</>,
      ],
    },
    {
      title: 'Article III — Contributions and Banking',
      clauses: [
        <>Village funds shall be held in a <F>{ACCT[s.accountType] || s.accountType}</F> account in the name of the village.</>,
        <>Members shall make contributions on a <F>{FREQ[s.payInFrequency] || s.payInFrequency}</F> basis.</>,
        s.minContribution
          ? <>The minimum contribution per period is <F>${Number(s.minContribution).toLocaleString()}</F>.</>
          : <>No minimum contribution amount has been set; members contribute as mutually agreed.</>,
        s.poolTarget ? <>The village has set a pool target of <F>${Number(s.poolTarget).toLocaleString()}</F>.</> : null,
        s.accountType === 'brokerage' && s.portfolioAllocation
          ? <>The brokerage portfolio shall be allocated as: <F>{s.portfolioAllocation.equities}% equities</F>, <F>{s.portfolioAllocation.bonds}% bonds</F>, and <F>{s.portfolioAllocation.cash ?? (100 - s.portfolioAllocation.equities - s.portfolioAllocation.bonds)}% cash</F>.</>
          : null,
      ].filter(Boolean),
    },
    {
      title: 'Article IV — Payout Structure',
      clauses: [
        <>This village uses a <F>{PAYOUT_L[s.payoutStructure] || s.payoutStructure}</F> payout structure.</>,
        s.payoutStructure === 'rotating'
          ? <>Each member shall receive the full pooled amount once per contribution cycle, in a rotation order established at founding. Members who join after founding are added to the end of the rotation.</>
          : <>Disbursements from the pool shall be proposed and authorized by member vote in accordance with this constitution.</>,
      ],
    },
    {
      title: 'Article V — Governance',
      clauses: [
        <>Amendments to this constitution require <F>{THRESH[s.amendmentThreshold] || s.amendmentThreshold}</F>.</>,
        <>For any vote to be binding, <F>{QUORUM_L[s.quorum] || s.quorum}</F>.</>,
        <>Members in their probationary period may not vote on binding resolutions.</>,
      ],
    },
    {
      title: 'Article VI — Member Conduct and Exit',
      clauses: [
        <><F>{LATE[s.latePaymentPolicy] || s.latePaymentPolicy}</F></>,
        <>Upon dishonorable exit or expulsion, <F>{EXIT_F[s.dishonorableExit] || s.dishonorableExit}</F>.</>,
        <>A member wishing to leave in good standing must provide <F>{NOTICE[s.exitNoticePeriod] || s.exitNoticePeriod}</F> prior to their departure.</>,
        <>Any member with a pending payout or unresolved financial obligation to the village remains bound by these terms until that obligation is settled.</>,
      ],
    },
  ] : []

  const formattedDate = signerDate
    ? new Date(signerDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  const inputSt = {
    width: '100%', padding: '11px 14px', boxSizing: 'border-box',
    fontFamily: 'var(--sans)', fontSize: 14,
    background: 'var(--cream-mid)', border: '1px solid var(--rule)',
    borderRadius: 2, outline: 'none', color: 'var(--ink)',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(30,25,18,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onCancel}>
      <div style={{
        background: 'var(--cream)', border: '1px solid var(--rule)',
        padding: '32px',
        width: step === 1 ? 620 : 520, maxWidth: '94vw', maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(30,25,18,0.18)',
      }} onClick={e => e.stopPropagation()}>

        {/* ── Step 0: Request + constitution summary ── */}
        {step === 0 && (
          <div style={{ overflowY: 'auto' }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{v.name}</h3>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: accentColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Request to join
              </div>
            </div>

            {constitutionRows.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 10 }}>
                  Village Constitution
                </div>
                <div style={{ background: 'var(--cream-mid)', border: '1px solid var(--rule)', overflow: 'hidden' }}>
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
              <button className="btn btn-primary" style={{ padding: '9px 18px', fontSize: 11 }} onClick={() => setStep(1)}>
                Review constitution <ArrowRight size={12} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 1: Formal constitution + signing ── */}
        {step === 1 && (
          <>
            <div style={{ marginBottom: 14, flexShrink: 0 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{v.name}</h3>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Prospective Member Agreement
              </div>
            </div>

            {/* Scrollable document */}
            <div style={{
              border: '1px solid var(--rule)',
              padding: '36px 40px 32px',
              overflowY: 'auto',
              flex: 1,
              minHeight: 0,
              maxHeight: '50vh',
              marginBottom: 18,
            }}>
              <div style={{ textAlign: 'center', marginBottom: 22 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 10 }}>
                  Village Constitution
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700, lineHeight: 1.2, marginBottom: 6 }}>
                  {v.name}
                </div>
                {v.handle && (
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em', marginBottom: 4 }}>
                    {v.handle}
                  </div>
                )}
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
                  Founded {v.founded}{v.location ? ` · ${v.location}` : ''}
                </div>
              </div>

              <div style={{ borderTop: '2px solid var(--ink)', borderBottom: '1px solid var(--rule)', height: 3, marginBottom: 22 }} />

              <p style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.85, color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: 26 }}>
                This agreement is submitted by the prospective member as a condition of applying to join{' '}
                <span style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--ink)' }}>{v.name}</span>.
                {' '}These terms are not yet binding — they will take effect upon formal admission to the village, as ratified by the existing membership in accordance with the admission policy set forth in Article II.
              </p>

              {articles.map((article, ai) => (
                <div key={ai} style={{ marginBottom: 22 }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 700, marginBottom: 8, paddingBottom: 5, borderBottom: '1px solid var(--rule)' }}>
                    {article.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {article.clauses.map((clause, ci) => (
                      <div key={ci} style={{ display: 'flex', gap: 12 }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', flexShrink: 0, paddingTop: 3, letterSpacing: '0.04em', minWidth: 26 }}>
                          {ai + 1}.{ci + 1}
                        </span>
                        <span style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.75, color: 'var(--ink)' }}>
                          {clause}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Signature block inside document */}
              <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 20, marginTop: 4 }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 700, marginBottom: 8, paddingBottom: 5, borderBottom: '1px solid var(--rule)' }}>
                  Signatures
                </div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 18 }}>
                  By signing below, the prospective member confirms having read this constitution and agrees to be bound by its terms upon admission to the village.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, alignItems: 'end' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 5 }}>
                      Prospective Member
                    </div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 17, fontStyle: 'italic', minHeight: 28, borderBottom: '1px solid var(--ink)', paddingBottom: 3, color: signerName ? 'var(--ink)' : 'transparent' }}>
                      {signerName || '—'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 5 }}>
                      Date
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 12, minHeight: 28, borderBottom: '1px solid var(--ink)', paddingBottom: 3, color: 'var(--ink)' }}>
                      {formattedDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'end', marginBottom: 16, flexShrink: 0 }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
                  Sign with your full name
                </div>
                <input
                  value={signerName}
                  onChange={e => setSignerName(e.target.value)}
                  placeholder="Your full legal name"
                  style={{ ...inputSt, fontFamily: 'var(--serif)', fontSize: 15, fontStyle: 'italic' }}
                  autoFocus
                />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
                  Date
                </div>
                <input
                  type="date"
                  value={signerDate}
                  onChange={e => setSignerDate(e.target.value)}
                  style={{ ...inputSt, fontFamily: 'var(--mono)', fontSize: 12, width: 'auto' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <button className="btn btn-terra" style={{ padding: '10px 20px', fontSize: 11 }} onClick={() => setStep(0)}>
                ← Back
              </button>
              <button
                className="btn btn-primary"
                disabled={!signerName.trim()}
                style={{ flex: 1, justifyContent: 'center', fontSize: 11, opacity: signerName.trim() ? 1 : 0.4 }}
                onClick={() => onConfirm(message)}
              >
                Send request <ArrowRight size={12} />
              </button>
            </div>
          </>
        )}
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
