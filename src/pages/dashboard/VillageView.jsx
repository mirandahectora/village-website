import { useState, useRef, useEffect, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  TrendingUp, Users, MessageCircle, Vote,
  CheckCircle2, XCircle, Minus, Send, Clock,
  DollarSign, Activity, AlertCircle, UserCheck, Plus, FileText,
  Link2, Copy, Check,
} from 'lucide-react'

function Avatar({ photo, initials, size = 32, border, borderColor }) {
  const inner = photo
    ? <img src={photo} alt={initials} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
    : <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--cream-dark)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: size * 0.3, fontWeight: 600 }}>{initials}</div>
  if (!border) return <div style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, overflow: 'hidden' }}>{inner}</div>
  return (
    <div style={{ width: size + 4, height: size + 4, borderRadius: '50%', flexShrink: 0, background: borderColor || 'var(--cream-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden' }}>{inner}</div>
    </div>
  )
}

const TABS = [
  { id: 'overview',     icon: <Activity size={14} />,  label: 'Overview' },
  { id: 'chat',         icon: <MessageCircle size={14} />, label: 'Chat' },
  { id: 'votes',        icon: <Vote size={14} />,      label: 'Votes' },
  { id: 'members',      icon: <Users size={14} />,     label: 'Members' },
  { id: 'constitution', icon: <FileText size={14} />,  label: 'Constitution' },
]

export default function VillageView({ village, tab, setTab, onLeave }) {
  const { castVote, cancelVote, sendMessage, draftResolution, user } = useAuth()
  const openVotes = village.votes.filter(v => v.status === 'open' && !v.myVote)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <div style={{
        padding: '32px 40px 0',
        borderBottom: '1px solid var(--rule)',
        background: 'var(--cream)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {village.photo && (
              <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src={village.photo} alt={village.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{village.name}</h1>
                {village.handle && (
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>{village.handle}</span>
                )}
              </div>
            </div>
          </div>

          {openVotes.length > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px',
              background: 'rgba(192,80,48,0.08)',
              border: '1px solid var(--terracotta)',
              borderRadius: 2,
              cursor: 'pointer',
            }} onClick={() => setTab('votes')}>
              <AlertCircle size={14} color="var(--terracotta)" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--terracotta)', letterSpacing: '0.06em' }}>
                {openVotes.length} open vote{openVotes.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--rule)', marginBottom: '-1px' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
              color: tab === t.id ? 'var(--ink)' : 'var(--ink-muted)',
              borderBottom: tab === t.id ? '2px solid var(--ink)' : '2px solid transparent',
              transition: 'color 0.15s',
            }}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {tab === 'overview'     && <OverviewTab village={village} />}
        {tab === 'chat'         && <ChatTab village={village} sendMessage={sendMessage} />}
        {tab === 'votes'        && <VotesTab village={village} castVote={castVote} cancelVote={cancelVote} draftResolution={draftResolution} user={user} />}
        {tab === 'members'      && <MembersTab village={village} draftResolution={draftResolution} onLeave={onLeave} />}
        {tab === 'constitution' && <ConstitutionTab village={village} draftResolution={draftResolution} />}
      </div>
    </div>
  )
}

/* ── OVERVIEW ─────────────────────────────────── */
const SCALES = {
  weekly:   [{ ytd: true, label: 'YTD' }, { n: 4, label: '1 mo' }, { n: 13, label: '3 mo' }, { n: 26, label: '6 mo' }, { n: 52, label: '1 yr' }, { n: 104, label: '2 yr' }, { n: 260, label: '5 yr' }],
  biweekly: [{ ytd: true, label: 'YTD' }, { n: 2, label: '1 mo' }, { n: 6, label: '3 mo' }, { n: 13, label: '6 mo' }, { n: 26, label: '1 yr' }, { n: 52, label: '2 yr' }, { n: 130, label: '5 yr' }],
  monthly:  [{ ytd: true, label: 'YTD' }, { n: 3, label: '3 mo' }, { n: 6, label: '6 mo' }, { n: 12, label: '1 yr' }, { n: 24, label: '2 yr' }, { n: 36, label: '3 yr' }, { n: 60, label: '5 yr' }],
}

function OverviewTab({ village }) {
  const accentColor = village.color === 'green' ? 'var(--green)' : 'var(--terracotta)'

  const freq = village.structure?.payInFrequency || 'monthly'
  const scales = SCALES[freq] || SCALES.monthly
  const [scaleIdx, setScaleIdx] = useState(0)

  const now = new Date()
  const chartRef = useRef(null)
  const [chartSize, setChartSize] = useState({ w: 600, h: 200 })
  useEffect(() => {
    if (!chartRef.current) return
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect
      setChartSize({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(chartRef.current)
    return () => ro.disconnect()
  }, [])

  const ytdN = (() => {
    const jan1 = new Date(now.getFullYear(), 0, 1)
    const dayOfYear = Math.ceil((now - jan1) / 86400000)
    if (freq === 'weekly')   return Math.max(1, Math.ceil(dayOfYear / 7))
    if (freq === 'biweekly') return Math.max(1, Math.ceil(dayOfYear / 14))
    return Math.max(1, now.getMonth() + 1)
  })()

  const n = scales[scaleIdx].ytd ? ytdN : scales[scaleIdx].n

  const MONTHS = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 }
  const parseDate = (str) => {
    const [m, d] = str.split(' ')
    const date = new Date(now.getFullYear(), MONTHS[m], parseInt(d))
    if (date > now) date.setFullYear(now.getFullYear() - 1)
    return date
  }

  const windowStart = (() => {
    if (scales[scaleIdx].ytd) return new Date(now.getFullYear(), 0, 1)
    const msPerPeriod = freq === 'weekly' ? 7 * 86400000 : freq === 'biweekly' ? 14 * 86400000 : null
    return msPerPeriod
      ? new Date(now - n * msPerPeriod)
      : new Date(now.getFullYear(), now.getMonth() - n, 1)
  })()

  const chartData = useMemo(() => {
    const allEvents = village.recentActivity
      .filter(a => (a.type === 'contribution' || a.type === 'allocation') && a.amount)
      .map(a => ({ ts: parseDate(a.date), type: a.type, amount: a.amount }))
      .sort((a, b) => b.ts - a.ts) // newest first

    // Reconstruct running balance backwards from current pooled
    let balance = village.pooled
    const withBalances = allEvents.map(e => {
      const snapshot = balance
      const delta = e.type === 'contribution' ? e.amount : -e.amount
      if (e.type === 'contribution') balance -= e.amount
      else balance += e.amount
      return { ts: e.ts, value: snapshot, delta, label: e.ts.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
    }).reverse() // chronological

    const inWindow = withBalances.filter(e => e.ts >= windowStart)

    // Always end at today with current balance
    const todayLabel = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    if (inWindow.length === 0 || inWindow[inWindow.length - 1].ts.toDateString() !== now.toDateString()) {
      inWindow.push({ ts: now, value: village.pooled, delta: null, label: todayLabel })
    }

    return inWindow.length > 1 ? inWindow : [{ ts: windowStart, value: 0, delta: null, label: windowStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...inWindow]
  }, [n, scaleIdx, village.pooled, village.recentActivity])

  const maxVal = Math.max(...chartData.map(d => d.value), 1)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Chart + activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', flex: 1, overflow: 'hidden' }}>

        {/* Balance chart */}
        <div style={{ padding: '32px 40px', borderRight: '1px solid var(--rule)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em' }}>POOL GROWTH</div>
            <div style={{ display: 'flex', gap: 2 }}>
              {scales.map((s, i) => (
                <button key={i} onClick={() => setScaleIdx(i)} style={{
                  padding: '3px 8px', border: '1px solid',
                  borderColor: scaleIdx === i ? 'var(--ink)' : 'var(--rule)',
                  background: scaleIdx === i ? 'var(--ink)' : 'transparent',
                  color: scaleIdx === i ? 'var(--cream)' : 'var(--ink-muted)',
                  fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.05em',
                  cursor: 'pointer', borderRadius: 2,
                }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Line chart */}
          {(() => {
            const W = chartSize.w, H = chartSize.h
            const span = now - windowStart || 1
            const spanYears = span / (365.25 * 86400000)
            const multiYear = spanYears >= 1.5
            const padL = 36, padR = 40, padT = 20, padB = multiYear ? 30 : 20
            const innerW = W - padL - padR
            const innerH = H - padT - padB
            const first = chartData[0], last = chartData[chartData.length - 1]
            const firstTs = first?.ts ?? windowStart
            const px = ts => padL + ((ts - firstTs) / span) * innerW
            const py = v => padT + innerH - (v / maxVal) * innerH
            const points = chartData.map(d => `${px(d.ts)},${py(d.value)}`).join(' ')
            const areaPoints = `${px(first.ts)},${padT + innerH} ${points} ${px(last.ts)},${padT + innerH}`
            return (
              <div ref={chartRef} style={{ height: 180, flexShrink: 0, position: 'relative' }}>
                {/* SVG: geometry only, no text */}
                <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="lineArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={accentColor} stopOpacity="0.15" />
                      <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
                    <line key={i} x1={padL} y1={py(maxVal * f)} x2={W - padR} y2={py(maxVal * f)}
                      stroke="var(--rule)" strokeWidth="0.5" strokeDasharray="4 4" />
                  ))}
                  <polygon points={areaPoints} fill="url(#lineArea)" />
                  <polyline points={points} fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
                  <circle cx={px(last.ts)} cy={py(last.value)} r="3" fill={accentColor} />
                  <line x1={padL} y1={padT} x2={W - padR} y2={padT} stroke={accentColor} strokeWidth="1" strokeDasharray="6 3" opacity="0.4" />
                  {/* Hover hit targets */}
                  {chartData.map((d, i) => (
                    <circle key={i} cx={px(d.ts)} cy={py(d.value)} r="10" fill="transparent"
                      style={{ cursor: 'crosshair' }}
                      onMouseEnter={() => setHoveredIdx(i)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    />
                  ))}
                  {/* Hover dot */}
                  {hoveredIdx !== null && (() => {
                    const d = chartData[hoveredIdx]
                    return <circle cx={px(d.ts)} cy={py(d.value)} r="4" fill={accentColor} stroke="var(--cream)" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
                  })()}
                </svg>

                {/* Y-axis labels — HTML, never stretched */}
                {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
                  <div key={i} style={{
                    position: 'absolute', left: 0,
                    top: `${(py(maxVal * f) / H) * 100}%`,
                    transform: 'translateY(-50%)',
                    fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', lineHeight: 1,
                  }}>${Math.round(maxVal * f / 1000)}k</div>
                ))}

                {/* Target label */}
                <div style={{
                  position: 'absolute', right: 0,
                  top: `${(padT / H) * 100}%`,
                  transform: 'translateY(-50%)',
                  fontFamily: 'var(--mono)', fontSize: 9, color: accentColor, opacity: 0.6,
                }}>Target</div>

                {/* X-axis ticks */}
                {(() => {
                  const chartEnd = now

                  // Month ticks: 1st+15th for single-year, 1st only for multi-year
                  const allMonthTicks = []
                  const cursor = new Date(firstTs.getFullYear(), firstTs.getMonth(), 1)
                  while (cursor <= chartEnd) {
                    for (const day of multiYear ? [1] : [1, 15]) {
                      const t = new Date(cursor.getFullYear(), cursor.getMonth(), day)
                      if (t >= firstTs && t <= chartEnd) allMonthTicks.push(t)
                    }
                    cursor.setMonth(cursor.getMonth() + 1)
                  }
                  const monthTicks = []
                  let lastX = -Infinity
                  for (const t of allMonthTicks) {
                    const x = px(t)
                    if (x - lastX >= 52) { monthTicks.push(t); lastX = x }
                  }

                  // Year ticks: Jan 1 of each year in range, for multi-year spans only
                  const yearTicks = []
                  if (multiYear) {
                    for (let y = firstTs.getFullYear(); y <= chartEnd.getFullYear(); y++) {
                      const t = new Date(y, 0, 1)
                      if (t >= firstTs && t <= chartEnd) yearTicks.push(t)
                    }
                  }

                  const monthFmt = t => multiYear
                    ? t.toLocaleDateString('en-US', { month: 'short' })
                    : t.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

                  return <>
                    {monthTicks.map((t, i) => (
                      <div key={i} style={{
                        position: 'absolute', bottom: multiYear ? 13 : 0,
                        left: `${(px(t) / W) * 100}%`,
                        transform: 'translateX(-50%)',
                        fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', lineHeight: 1,
                        whiteSpace: 'nowrap',
                      }}>{monthFmt(t)}</div>
                    ))}
                    {yearTicks.map((t, i) => (
                      <div key={i} style={{
                        position: 'absolute', bottom: 0,
                        left: `${(px(t) / W) * 100}%`,
                        transform: 'translateX(-50%)',
                        fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600,
                        color: 'var(--ink)', lineHeight: 1, whiteSpace: 'nowrap',
                      }}>{t.getFullYear()}</div>
                    ))}
                  </>
                })()}

                {/* Hover tooltip */}
                {hoveredIdx !== null && (() => {
                  const d = chartData[hoveredIdx]
                  const xPct = px(d.ts) / W
                  const yPct = py(d.value) / H
                  const alignRight = xPct > 0.65
                  return (
                    <div style={{
                      position: 'absolute',
                      left: alignRight ? 'auto' : `${xPct * 100}%`,
                      right: alignRight ? `${(1 - xPct) * 100}%` : 'auto',
                      top: `${Math.max(0, yPct * 100 - 16)}%`,
                      transform: alignRight ? 'translateX(8px)' : 'translateX(-50%)',
                      background: 'var(--ink)',
                      color: 'var(--cream)',
                      padding: '6px 10px',
                      borderRadius: 2,
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      letterSpacing: '0.04em',
                      lineHeight: 1.5,
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                    }}>
                      <div>{d.label}</div>
                      <div style={{ color: 'var(--cream)', opacity: 0.7 }}>${d.value.toLocaleString()}</div>
                      {d.delta !== null && (
                        <div style={{ color: d.delta > 0 ? 'var(--green)' : 'var(--terracotta)' }}>
                          {d.delta > 0 ? '+' : '−'}${Math.abs(d.delta).toLocaleString()}
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            )
          })()}

          {/* Member contribution status */}
          {village.memberList?.length > 0 && (() => {
            const contributed = village.memberList.filter(m => m.status === 'active')
            const contributedPct = Math.round((contributed.length / village.memberList.length) * 100)
            return (
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--rule)', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Member Contributions
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
                    {village.intervalLabel} · {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <div style={{ overflowY: 'auto', minHeight: 80, maxHeight: 120, marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {village.memberList.map(m => (
                      <div key={m.id} title={`${m.name}: ${m.status === 'active' ? 'contributed' : 'pending'}`}>
                        <Avatar photo={m.photo} initials={m.initials} size={28} border borderColor={m.status === 'active' ? accentColor : 'var(--ink-muted)'} />
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 4, background: 'var(--cream-dark)', borderRadius: 2 }}>
                    <div style={{ height: '100%', width: `${contributedPct}%`, background: accentColor, borderRadius: 2, transition: 'width 0.6s ease' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: accentColor, fontWeight: 600, letterSpacing: '0.04em', flexShrink: 0 }}>
                    {contributed.length} / {village.memberList.length} · {contributedPct}%
                  </span>
                </div>
              </div>
            )
          })()}
          <SecondaryChart village={village} accentColor={accentColor} />
        </div>

        {/* Summary stats + Recent activity */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
            <AccountSummary village={village} accentColor={accentColor} />
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--rule)', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Recent Activity
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {village.recentActivity.map((item, i) => (
                <ActivityRow key={i} item={item} last={i === village.recentActivity.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

function AccountSummary({ village, accentColor }) {
  const accountType = village.structure?.accountType || 'hysa'
  const pooled = village.pooled || 0
  const target = village.target || 1
  const pct = Math.round((pooled / target) * 100)

  const totalContributions = (village.recentActivity || [])
    .filter(a => a.type === 'contribution')
    .reduce((s, a) => s + (a.amount || 0), 0)
  const totalAllocations = (village.recentActivity || [])
    .filter(a => a.type === 'allocation')
    .reduce((s, a) => s + (a.amount || 0), 0)

  let stats = []
  if (accountType === 'hysa') {
    const apy = 4.85
    const interestEarned = Math.round(pooled * (apy / 100) * (3 / 12))
    stats = [
      { label: 'Pool Balance',     value: `$${pooled.toLocaleString()}` },
      { label: 'APY',              value: `${apy}%` },
      { label: 'Interest Earned',  value: `$${interestEarned.toLocaleString()}` },
      { label: 'Members',          value: village.members },
    ]
  } else if (accountType === 'checking') {
    stats = [
      { label: 'Pool Balance',         value: `$${pooled.toLocaleString()}` },
      { label: 'Total Contributed',    value: `$${totalContributions.toLocaleString()}` },
      { label: 'Total Allocated',      value: `$${totalAllocations.toLocaleString()}` },
      { label: 'Members',              value: village.members },
    ]
  } else if (accountType === 'brokerage') {
    const estimatedReturn = 7.2
    const unrealizedGain = Math.round(pooled * (estimatedReturn / 100) * (6 / 12))
    stats = [
      { label: 'Portfolio Value',      value: `$${pooled.toLocaleString()}` },
      { label: 'Est. Annual Return',   value: `${estimatedReturn}%` },
      { label: 'Unrealized Gain',      value: `+$${unrealizedGain.toLocaleString()}`, positive: true },
      { label: 'Members',              value: village.members },
    ]
  }

  const accountLabels = { hysa: 'High-Yield Savings', checking: 'Checking', brokerage: 'Brokerage' }

  // For HYSA: ring shows pooled (green) vs interest earned (orange)
  const hysaInterest = accountType === 'hysa'
    ? Math.round(pooled * (4.85 / 100) * (3 / 12))
    : 0

  const ringSegments = accountType === 'hysa'
    ? [
        { frac: Math.min(pooled / target, 1), color: accentColor },
        { frac: Math.min(hysaInterest / target, Math.max(0, 1 - pooled / target)), color: 'var(--terracotta)' },
        { frac: Math.max(0, 1 - (pooled + hysaInterest) / target), color: 'var(--rule)' },
      ]
    : [
        { frac: Math.min(pooled / target, 1), color: accentColor },
        { frac: Math.min(totalAllocations / target, Math.max(0, 1 - pooled / target)), color: 'var(--terracotta)' },
      ]

  const ringLegend = accountType === 'hysa'
    ? [
        { label: 'Pooled', color: accentColor, value: `$${pooled.toLocaleString()}` },
        { label: 'Interest', color: 'var(--terracotta)', value: `$${hysaInterest.toLocaleString()}` },
      ]
    : [
        { label: 'Pooled', color: accentColor, value: `$${pooled.toLocaleString()}` },
        { label: 'Allocated', color: 'var(--terracotta)', value: `$${totalAllocations.toLocaleString()}` },
      ]

  const ringCenterLabel = accountType === 'hysa' ? `${pct}%` : `${pct}%`

  return (
    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--rule)', flexShrink: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Account Summary
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
          {accountLabels[accountType] || accountType}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>
              {s.label}
            </div>
            <span style={{
              fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 700,
              color: s.positive ? 'var(--green)' : 'var(--ink)',
            }}>{s.value}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ flex: 1 }}>
          {ringLegend.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', flex: 1 }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink)', fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', marginTop: 4, letterSpacing: '0.04em' }}>
            {accountType === 'hysa'
              ? `${pct}% of $${target.toLocaleString()} goal`
              : `${pct}% of $${target.toLocaleString()} target`}
          </div>
        </div>
        <RingChart size={72} strokeWidth={8} centerLabel={ringCenterLabel}
          segments={ringSegments}
        />
      </div>
    </div>
  )
}

function ActivityRow({ item, last }) {
  const icons = {
    contribution: <DollarSign size={12} />,
    vote:         <Vote size={12} />,
    allocation:   <TrendingUp size={12} />,
    join:         <UserCheck size={12} />,
  }
  const colors = {
    contribution: 'var(--green)',
    vote:         'var(--terracotta)',
    allocation:   'var(--green)',
    join:         'var(--ink-muted)',
  }
  return (
    <div style={{
      padding: '14px 28px', display: 'flex', gap: 12, alignItems: 'flex-start',
      borderBottom: last ? 'none' : '1px solid var(--rule)',
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
        background: `${colors[item.type]}15`,
        color: colors[item.type],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icons[item.type]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.4, color: 'var(--ink)' }}>
          {item.note}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', marginTop: 2, letterSpacing: '0.04em' }}>
          {item.actor} · {item.date}
        </div>
      </div>
      {item.amount && (
        <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 700, color: colors[item.type], flexShrink: 0 }}>
          +${item.amount.toLocaleString()}
        </div>
      )}
    </div>
  )
}

/* ── RING CHART ────────────────────────────────── */
function RingChart({ segments, size = 80, strokeWidth = 8, centerLabel, hoveredIdx = null, pinnedIdx = null, onSegmentHover, onSegmentClick }) {
  const cx = size / 2, cy = size / 2
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  let runningFrac = 0
  const valid = segments.filter(s => s.frac > 0.005)
  const activeIdx = pinnedIdx ?? hoveredIdx
  return (
    <svg width={size} height={size} style={{ flexShrink: 0, overflow: 'visible' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--cream-dark)" strokeWidth={strokeWidth} />
      {valid.map((seg, i) => {
        const dash = Math.max(0, seg.frac * circ - 1.5)
        const startAngle = runningFrac * 360 - 90
        runningFrac += seg.frac
        const isActive = activeIdx === null || activeIdx === i
        const isPinned = pinnedIdx === i
        return (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color}
            strokeWidth={activeIdx === i ? strokeWidth + 2 : strokeWidth}
            strokeDasharray={`${dash} ${circ}`}
            transform={`rotate(${startAngle} ${cx} ${cy})`}
            strokeLinecap="butt"
            opacity={isActive ? 1 : 0.25}
            style={{ transition: 'opacity 0.15s, stroke-width 0.15s', cursor: 'pointer' }}
            onMouseEnter={() => onSegmentHover?.(i)}
            onMouseLeave={() => onSegmentHover?.(null)}
            onClick={e => { e.stopPropagation(); onSegmentClick?.(isPinned ? null : i) }}
          />
        )
      })}
      {centerLabel && (
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
          fontFamily="var(--mono)" fontSize={11} fontWeight="700" fill="var(--ink)">
          {centerLabel}
        </text>
      )}
    </svg>
  )
}

/* ── PORTFOLIO HOLDINGS ─────────────────────────── */
const VILLAGE_HOLDINGS = {
  'v-005': {
    equities: [
      { ticker: 'VTI',  name: 'Vanguard Total Stock Market ETF',  pct: 45, price: 261.42 },
      { ticker: 'VXUS', name: 'Vanguard Total Intl. Stock ETF',   pct: 20, price: 63.18  },
      { ticker: 'VWO',  name: 'Vanguard Emerging Markets ETF',    pct: 10, price: 44.85  },
    ],
    bonds: [
      { ticker: 'BND',  name: 'Vanguard Total Bond Market ETF',   pct: 10, price: 73.54  },
      { ticker: 'VTIP', name: 'Vanguard Inflation-Protected ETF', pct: 6,  price: 48.92  },
      { ticker: 'VCIT', name: 'Vanguard Corp. Bond Intermediate', pct: 4,  price: 78.31  },
    ],
    cash: [
      { ticker: 'VMFXX', name: 'Vanguard Federal Money Market',   pct: 5,  price: 1.00   },
    ],
  },
  'v-006': {
    equities: [
      { ticker: 'QQQ',  name: 'Invesco Nasdaq-100 ETF',           pct: 40, price: 492.17 },
      { ticker: 'VTI',  name: 'Vanguard Total Stock Market ETF',  pct: 35, price: 261.42 },
      { ticker: 'AAPL / NVDA / MSFT', name: 'Direct equity positions', pct: 15, price: null },
    ],
    bonds: [
      { ticker: 'LQD',  name: 'iShares IG Corporate Bond ETF',    pct: 5,  price: 108.63 },
    ],
    cash: [
      { ticker: 'FDLXX', name: 'Fidelity Treasury-Only Money Market', pct: 5, price: 1.00 },
    ],
  },
  'e3': {
    equities: [
      { ticker: 'VTI',  name: 'Vanguard Total US Market ETF',      pct: 50, price: 261.42 },
      { ticker: 'VXUS', name: 'Vanguard Total International ETF',  pct: 30, price: 63.18  },
    ],
    bonds: [
      { ticker: 'BND',  name: 'Vanguard Total Bond Market ETF',    pct: 15, price: 73.54  },
      { ticker: 'BNDX', name: 'Vanguard Total International Bond', pct: 5,  price: 47.26  },
    ],
  },
  'e6': {
    equities: [
      { ticker: 'VTI', name: 'Vanguard Total Market ETF',          pct: 45, price: 261.42 },
      { ticker: 'QQQ', name: 'Invesco Nasdaq-100 ETF',             pct: 25, price: 492.17 },
      { ticker: 'VGT', name: 'Vanguard Technology Sector ETF',     pct: 15, price: 581.34 },
    ],
    bonds: [
      { ticker: 'BND', name: 'Vanguard Total Bond Market ETF',     pct: 7,  price: 73.54  },
      { ticker: 'HYG', name: 'iShares High Yield Corporate ETF',   pct: 3,  price: 76.82  },
    ],
    cash: [
      { ticker: 'VMFXX', name: 'Vanguard Money Market Fund',       pct: 5,  price: 1.00   },
    ],
  },
}

/* ── SECONDARY CHART ───────────────────────────── */
function SecondaryChart({ village, accentColor }) {
  const [hoveredBar, setHoveredBar] = useState(null)
  const [pinnedBar, setPinnedBar] = useState(null)
  const [projMonths, setProjMonths] = useState(0)
  const [hoveredAlloc, setHoveredAlloc] = useState(null)
  const [pinnedAlloc, setPinnedAlloc] = useState(null)
  const [tooltipAbove, setTooltipAbove] = useState(false)
  const allocRef = useRef(null)
  const barChartRef = useRef(null)
  const accountType = village.structure?.accountType || 'hysa'

  useEffect(() => {
    const handler = e => {
      if (allocRef.current && !allocRef.current.contains(e.target)) {
        setPinnedAlloc(null)
      }
      if (barChartRef.current && !barChartRef.current.contains(e.target)) {
        setPinnedBar(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  const now = new Date()
  const MONTHS_MAP = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 }
  const parseDate = str => {
    const parts = str.split(' ')
    const date = new Date(now.getFullYear(), MONTHS_MAP[parts[0]], parseInt(parts[1]))
    if (date > now) date.setFullYear(now.getFullYear() - 1)
    return date
  }

  if (accountType === 'brokerage') {
    const alloc = village.structure?.portfolioAllocation || { equities: 80, bonds: 15, cash: 5 }
    const pooled = village.pooled || 0
    const colorMap = { equities: accentColor, bonds: 'var(--ink-muted)', cash: 'var(--cream-dark)', reits: 'var(--terracotta)' }
    const items = Object.entries(alloc).map(([key, pct]) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      pct,
      value: Math.round(pooled * pct / 100),
      color: colorMap[key] || 'var(--ink-muted)',
    }))
    const villageHoldings = VILLAGE_HOLDINGS[village.id] || {}
    return (
      <div ref={allocRef} style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--rule)', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
          Portfolio Allocation
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <RingChart size={80} strokeWidth={9}
            segments={items.map(item => ({ frac: item.pct / 100, color: item.color }))}
            centerLabel={`$${Math.round(pooled / 1000)}k`}
            hoveredIdx={hoveredAlloc}
            pinnedIdx={pinnedAlloc}
            onSegmentHover={setHoveredAlloc}
            onSegmentClick={setPinnedAlloc}
          />
          <div style={{ flex: 1 }}>
            {items.map((item, i) => {
              const holdings = villageHoldings[item.key] || []
              const isPinned = pinnedAlloc === i
              const isHovered = hoveredAlloc === i || isPinned
              const showTooltip = isHovered && holdings.length > 0
              return (
                <div key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, position: 'relative', cursor: 'default' }}
                  onMouseEnter={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setTooltipAbove(rect.bottom + 160 > window.innerHeight)
                    setHoveredAlloc(i)
                  }}
                  onMouseLeave={() => setHoveredAlloc(null)}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: isHovered ? 'var(--ink)' : 'var(--ink-muted)', flex: 1, transition: 'color 0.15s' }}>
                    {item.label} · {item.pct}%
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink)', fontWeight: 600 }}>
                    ${item.value.toLocaleString()}
                  </span>
                  {showTooltip && (
                    <div
                      onMouseDown={e => e.stopPropagation()}
                      style={{
                        position: 'absolute', right: 0,
                        ...(tooltipAbove ? { bottom: 'calc(100% + 6px)' } : { top: 'calc(100% + 6px)' }),
                        background: 'var(--cream)',
                        border: `1px solid ${isPinned ? item.color : 'var(--rule)'}`,
                        padding: '10px 12px', zIndex: 20,
                        boxShadow: '0 4px 16px rgba(30,25,18,0.12)',
                        minWidth: 260, pointerEvents: isPinned ? 'auto' : 'none',
                      }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: item.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                        {item.label} Holdings
                      </div>
                      {holdings.map((h, j) => {
                        const holdingValue = Math.round(pooled * h.pct / 100)
                        const shares = h.price != null ? Math.floor(holdingValue / h.price) : null
                        return (
                          <div key={j} style={{
                            display: 'grid', gridTemplateColumns: '1fr auto',
                            alignItems: 'start', gap: 12,
                            marginBottom: j < holdings.length - 1 ? 8 : 0,
                            paddingBottom: j < holdings.length - 1 ? 8 : 0,
                            borderBottom: j < holdings.length - 1 ? '1px solid var(--rule)' : 'none',
                          }}>
                            <div>
                              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink)', fontWeight: 600, marginBottom: 2 }}>
                                {h.ticker}
                              </div>
                              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', lineHeight: 1.4 }}>
                                {h.name}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink)', fontWeight: 600 }}>
                                ${holdingValue.toLocaleString()}
                              </div>
                              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)' }}>
                                {shares != null ? `${shares.toLocaleString()} sh · ` : ''}{h.pct}%
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const contribEvents = (village.recentActivity || [])
    .filter(a => a.type === 'contribution' && a.amount)
    .map(a => ({ ts: parseDate(a.date), amount: a.amount, label: a.date }))
    .sort((a, b) => a.ts - b.ts)

  if (contribEvents.length === 0) return null

  // ── HYSA: monthly interest earned bar chart ──
  if (accountType === 'hysa') {
    const MONTHLY_RATE = 0.045 / 12

    // Historical: interest earned each contribution period
    let poolBalance = 0
    let totalInterest = 0
    const histBars = []
    contribEvents.forEach((e, idx) => {
      const prevTs = idx === 0 ? e.ts : contribEvents[idx - 1].ts
      const months = Math.max(0, (e.ts - prevTs) / (30.44 * 86400000))
      const periodInterest = poolBalance * MONTHLY_RATE * months
      totalInterest += periodInterest
      poolBalance += e.amount
      histBars.push({ ts: e.ts, label: e.label, amount: periodInterest, isProjected: false })
    })

    // Average monthly contribution for projection
    const lastTs = contribEvents[contribEvents.length - 1].ts
    const historyMonths = Math.max(1, (lastTs - contribEvents[0].ts) / (30.44 * 86400000))
    const avgMonthlyContrib = poolBalance / historyMonths

    // Projected: one bar per month
    const projBars = []
    if (projMonths > 0) {
      let p = poolBalance
      for (let m = 1; m <= projMonths; m++) {
        const monthInterest = p * MONTHLY_RATE
        p += avgMonthlyContrib
        const ts = new Date(lastTs)
        ts.setMonth(ts.getMonth() + m)
        projBars.push({
          ts,
          label: ts.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          amount: monthInterest,
          isProjected: true,
        })
      }
    }

    const allBars = [...histBars, ...projBars]
    const maxAmount = Math.max(...allBars.map(b => b.amount), 1)
    const BAR_H = 80, Y_W = 36
    const yTicks = [0, Math.round(maxAmount / 2), Math.round(maxAmount)]

    const hysaFreq = village.structure?.payInFrequency || 'monthly'
    const hysaScales = SCALES[hysaFreq] || SCALES.monthly
    const toMonths = (s) => {
      if (hysaFreq === 'monthly') return s.n
      if (hysaFreq === 'weekly') return Math.round(s.n / 4.345)
      if (hysaFreq === 'biweekly') return Math.round(s.n * 2 / 4.345)
      return s.n
    }
    const PROJ_OPTIONS = [
      { label: 'Now', months: 0 },
      ...hysaScales.filter(s => !s.ytd).map(s => ({ label: s.label, months: toMonths(s) })),
    ]

    return (
      <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--rule)', flexShrink: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Monthly Interest Earned
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: accentColor, fontWeight: 600 }}>
            +${Math.round(totalInterest).toLocaleString()} total
          </div>
        </div>

        {/* Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: `${Y_W}px 1fr` }}>
          {/* Y-axis */}
          <div style={{ position: 'relative', height: BAR_H }}>
            {yTicks.map((tick, i) => (
              <div key={i} style={{
                position: 'absolute', right: 6, bottom: `${(tick / maxAmount) * 100}%`,
                transform: 'translateY(50%)', fontFamily: 'var(--mono)', fontSize: 8,
                color: 'var(--ink-muted)', lineHeight: 1, whiteSpace: 'nowrap',
              }}>{tick >= 1000 ? `$${(tick / 1000).toFixed(1)}k` : `$${Math.round(tick)}`}</div>
            ))}
          </div>

          {/* Bar area */}
          <div ref={barChartRef} style={{ position: 'relative', height: BAR_H }}>
            {yTicks.map((tick, i) => (
              <div key={i} style={{
                position: 'absolute', left: 0, right: 0, bottom: `${(tick / maxAmount) * 100}%`,
                borderTop: `1px ${tick === 0 ? 'solid' : 'dashed'} var(--rule)`,
              }} />
            ))}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: '100%' }}>
              {allBars.map((b, i) => {
                const isPinned = pinnedBar === i
                const isActive = isPinned || hoveredBar === i
                const nearLeft = i < allBars.length * 0.3
                const nearRight = i > allBars.length * 0.7
                const barH = Math.max(Math.round((b.amount / maxAmount) * BAR_H), 2)
                return (
                  <div key={i}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={e => { e.stopPropagation(); setPinnedBar(isPinned ? null : i) }}
                    style={{
                      flex: 1, position: 'relative', height: `${barH}px`,
                      background: accentColor,
                      opacity: b.isProjected
                        ? (isActive ? 0.55 : 0.25)
                        : (isActive ? 1 : 0.4 + (i / Math.max(histBars.length - 1, 1)) * 0.6),
                      borderRadius: '2px 2px 0 0',
                      cursor: 'pointer', transition: 'opacity 0.15s',
                    }}
                  >
                    {isActive && (
                      <div onMouseDown={e => e.stopPropagation()} style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 8px)',
                        left: nearRight ? 'auto' : nearLeft ? 0 : '50%',
                        right: nearRight ? 0 : 'auto',
                        transform: (!nearLeft && !nearRight) ? 'translateX(-50%)' : 'none',
                        background: 'var(--ink)', color: 'var(--cream)',
                        padding: '7px 10px', borderRadius: 2,
                        fontFamily: 'var(--mono)', fontSize: 10,
                        letterSpacing: '0.04em', lineHeight: 1.6,
                        whiteSpace: 'nowrap', zIndex: 20,
                        pointerEvents: isPinned ? 'auto' : 'none',
                      }}>
                        <div style={{ fontSize: 9, opacity: 0.6 }}>
                          {b.isProjected ? 'projected · ' : ''}
                          {b.ts.toLocaleDateString('en-US', { month: 'short', day: b.isProjected ? undefined : 'numeric', year: 'numeric' })}
                        </div>
                        <div style={{ color: accentColor }}>+${b.amount.toFixed(2)} interest</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* X-axis tick labels — matches pool growth chart style */}
        {(() => {
          const n = allBars.length
          if (n === 0) return null
          const firstTs = allBars[0].ts
          const lastTs = allBars[n - 1].ts
          const spanYears = (lastTs.getFullYear() - firstTs.getFullYear()) +
            (lastTs.getMonth() - firstTs.getMonth()) / 12
          const multiYear = spanYears > 1.5

          // Bar index → left% (center of each bar in flex layout)
          const toLeft = (i) => n <= 1 ? 50 : (i / (n - 1)) * 100

          // Month ticks: every step-th bar
          const step = n <= 8 ? 1 : n <= 18 ? 2 : n <= 36 ? 4 : n <= 72 ? 6 : 12
          const monthTickIdxs = allBars.reduce((acc, _, i) => {
            if (i % step === 0 || i === n - 1) acc.push(i)
            return acc
          }, [])

          const monthFmt = (b) => multiYear
            ? b.ts.toLocaleDateString('en-US', { month: 'short' })
            : b.isProjected
              ? b.ts.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
              : b.ts.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

          // Year ticks: one per Jan bar (or nearest bar to Jan 1 of each year)
          const yearTicks = []
          if (multiYear) {
            for (let y = firstTs.getFullYear(); y <= lastTs.getFullYear(); y++) {
              // find the bar closest to Jan 1 of year y
              const target = new Date(y, 0, 1)
              let closest = null, minDiff = Infinity
              allBars.forEach((b, i) => {
                const diff = Math.abs(b.ts - target)
                if (diff < minDiff) { minDiff = diff; closest = i }
              })
              if (closest !== null && minDiff < 60 * 86400000) yearTicks.push(closest)
            }
          }

          return (
            <div style={{ position: 'relative', height: multiYear ? 26 : 14, marginTop: 4, paddingLeft: Y_W }}>
              {monthTickIdxs.map(i => (
                <div key={i} style={{
                  position: 'absolute',
                  bottom: multiYear ? 13 : 0,
                  left: `${toLeft(i)}%`,
                  transform: 'translateX(-50%)',
                  fontFamily: 'var(--mono)', fontSize: 9,
                  color: 'var(--ink-muted)', lineHeight: 1, whiteSpace: 'nowrap',
                }}>{monthFmt(allBars[i])}</div>
              ))}
              {yearTicks.map(i => (
                <div key={i} style={{
                  position: 'absolute',
                  bottom: 0,
                  left: `${toLeft(i)}%`,
                  transform: 'translateX(-50%)',
                  fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600,
                  color: 'var(--ink)', lineHeight: 1, whiteSpace: 'nowrap',
                }}>{allBars[i].ts.getFullYear()}</div>
              ))}
            </div>
          )
        })()}

        {/* Projection selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 12 }}>
          {PROJ_OPTIONS.map(opt => (
            <button key={opt.months} onClick={() => { setProjMonths(opt.months); setPinnedBar(null) }} style={{
              fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.06em',
              padding: '3px 8px', cursor: 'pointer', border: '1px solid var(--rule)', borderRadius: 2,
              background: projMonths === opt.months ? 'var(--ink)' : 'transparent',
              color: projMonths === opt.months ? 'var(--cream)' : 'var(--ink-muted)',
              transition: 'background 0.15s, color 0.15s',
            }}>{opt.label}</button>
          ))}
        </div>
      </div>
    )
  }

  // ── Checking: cumulative pool contributions bar chart ──
  const checkFreq = village.structure?.payInFrequency || 'monthly'
  const checkScales = SCALES[checkFreq] || SCALES.monthly
  const toMonthsCheck = (s) => {
    if (checkFreq === 'monthly')  return s.n
    if (checkFreq === 'weekly')   return Math.round(s.n / 4.345)
    if (checkFreq === 'biweekly') return Math.round(s.n * 2 / 4.345)
    return s.n
  }
  const CHECK_PROJ_OPTIONS = [
    { label: 'Now', months: 0 },
    ...checkScales.filter(s => !s.ytd).map(s => ({ label: s.label, months: toMonthsCheck(s) })),
  ]

  let running = 0
  const histBars = contribEvents.map(e => {
    running += e.amount
    return { ...e, cumulative: running, isProjected: false }
  })

  const checkLastTs = contribEvents[contribEvents.length - 1].ts
  const checkHistMonths = Math.max(1, (checkLastTs - contribEvents[0].ts) / (30.44 * 86400000))
  const avgMonthlyContrib = running / checkHistMonths
  const periodsPerMonth = checkFreq === 'weekly' ? 4.345 : checkFreq === 'biweekly' ? 2.167 : 1
  const avgPeriodContrib = avgMonthlyContrib / periodsPerMonth

  const checkProjBars = []
  if (projMonths > 0) {
    const periodsToProject = Math.round(projMonths * periodsPerMonth)
    let cum = running
    for (let p = 1; p <= periodsToProject; p++) {
      cum += avgPeriodContrib
      const ts = new Date(checkLastTs)
      if (checkFreq === 'weekly')        ts.setDate(ts.getDate() + 7 * p)
      else if (checkFreq === 'biweekly') ts.setDate(ts.getDate() + 14 * p)
      else                               ts.setMonth(ts.getMonth() + p)
      checkProjBars.push({
        ts, label: ts.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        amount: avgPeriodContrib, cumulative: cum, isProjected: true,
      })
    }
  }

  const allBars = [...histBars, ...checkProjBars]
  const maxCum = allBars[allBars.length - 1].cumulative
  const BAR_H = 80
  const Y_W = 36
  const yTicks = [0, Math.round(maxCum / 2), Math.round(maxCum)]

  return (
    <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--rule)', flexShrink: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Lifetime Pool Contributions
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink)', fontWeight: 600 }}>
          ${Math.round(running).toLocaleString()} total
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `${Y_W}px 1fr` }}>
        <div style={{ position: 'relative', height: BAR_H }}>
          {yTicks.map((tick, i) => (
            <div key={i} style={{
              position: 'absolute', right: 6,
              bottom: `${(tick / maxCum) * 100}%`,
              transform: 'translateY(50%)',
              fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--ink-muted)',
              lineHeight: 1, whiteSpace: 'nowrap',
            }}>{tick >= 1000 ? `$${Math.round(tick / 1000)}k` : `$${tick}`}</div>
          ))}
        </div>
        <div ref={barChartRef} style={{ position: 'relative', height: BAR_H }}>
          {yTicks.map((tick, i) => (
            <div key={i} style={{
              position: 'absolute', left: 0, right: 0,
              bottom: `${(tick / maxCum) * 100}%`,
              borderTop: `1px ${tick === 0 ? 'solid' : 'dashed'} var(--rule)`,
            }} />
          ))}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: '100%' }}>
            {allBars.map((b, i) => {
              const isPinned = pinnedBar === i
              const isActive = isPinned || hoveredBar === i
              const nearLeft = i < allBars.length * 0.3
              const nearRight = i > allBars.length * 0.7
              const barH = Math.max(Math.round((b.cumulative / maxCum) * BAR_H), 2)
              return (
                <div key={i}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                  onClick={e => { e.stopPropagation(); setPinnedBar(isPinned ? null : i) }}
                  style={{
                    flex: 1, position: 'relative', height: `${barH}px`,
                    background: accentColor,
                    opacity: b.isProjected
                      ? (isActive ? 0.55 : 0.25)
                      : (isActive ? 1 : 0.35 + (i / Math.max(histBars.length - 1, 1)) * 0.65),
                    borderRadius: '2px 2px 0 0',
                    cursor: 'pointer', transition: 'opacity 0.15s',
                  }}
                >
                  {isActive && (
                    <div onMouseDown={e => e.stopPropagation()} style={{
                      position: 'absolute',
                      bottom: 'calc(100% + 8px)',
                      left: nearRight ? 'auto' : nearLeft ? 0 : '50%',
                      right: nearRight ? 0 : 'auto',
                      transform: (!nearLeft && !nearRight) ? 'translateX(-50%)' : 'none',
                      background: 'var(--ink)', color: 'var(--cream)',
                      padding: '7px 10px', borderRadius: 2,
                      fontFamily: 'var(--mono)', fontSize: 10,
                      letterSpacing: '0.04em', lineHeight: 1.6,
                      pointerEvents: isPinned ? 'auto' : 'none',
                      whiteSpace: 'nowrap', zIndex: 20,
                    }}>
                      <div style={{ fontSize: 9, opacity: 0.6 }}>
                        {b.isProjected ? 'projected · ' : ''}
                        {b.ts.toLocaleDateString('en-US', { month: 'short', day: b.isProjected ? undefined : 'numeric', year: 'numeric' })}
                      </div>
                      <div style={{ color: accentColor }}>+${Math.round(b.amount).toLocaleString()}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* X-axis labels */}
      {(() => {
        const n = allBars.length
        if (n === 0) return null
        const firstTs   = allBars[0].ts
        const lastBarTs = allBars[n - 1].ts
        const spanYears = (lastBarTs.getFullYear() - firstTs.getFullYear()) +
          (lastBarTs.getMonth() - firstTs.getMonth()) / 12
        const multiYear = spanYears > 1.5
        const toLeft = (i) => n <= 1 ? 50 : (i / (n - 1)) * 100
        const step = n <= 8 ? 1 : n <= 18 ? 2 : n <= 36 ? 4 : n <= 72 ? 6 : 12
        const tickIdxs = allBars.reduce((acc, _, i) => {
          if (i % step === 0 || i === n - 1) acc.push(i)
          return acc
        }, [])
        const monthFmt = (b) => multiYear
          ? b.ts.toLocaleDateString('en-US', { month: 'short' })
          : b.isProjected
            ? b.ts.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : b.ts.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        const yearTicks = []
        if (multiYear) {
          for (let y = firstTs.getFullYear(); y <= lastBarTs.getFullYear(); y++) {
            const target = new Date(y, 0, 1)
            let closest = null, minDiff = Infinity
            allBars.forEach((b, i) => { const d = Math.abs(b.ts - target); if (d < minDiff) { minDiff = d; closest = i } })
            if (closest !== null && minDiff < 60 * 86400000) yearTicks.push(closest)
          }
        }
        return (
          <div style={{ position: 'relative', height: multiYear ? 26 : 14, marginTop: 4, paddingLeft: Y_W }}>
            {tickIdxs.map(i => (
              <div key={i} style={{
                position: 'absolute', bottom: multiYear ? 13 : 0, left: `${toLeft(i)}%`,
                transform: 'translateX(-50%)', fontFamily: 'var(--mono)', fontSize: 9,
                color: 'var(--ink-muted)', lineHeight: 1, whiteSpace: 'nowrap',
              }}>{monthFmt(allBars[i])}</div>
            ))}
            {yearTicks.map(i => (
              <div key={i} style={{
                position: 'absolute', bottom: 0, left: `${toLeft(i)}%`,
                transform: 'translateX(-50%)', fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600,
                color: 'var(--ink)', lineHeight: 1, whiteSpace: 'nowrap',
              }}>{allBars[i].ts.getFullYear()}</div>
            ))}
          </div>
        )
      })()}

      {/* Projection selector */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 12 }}>
        {CHECK_PROJ_OPTIONS.map(opt => (
          <button key={opt.months} onClick={() => { setProjMonths(opt.months); setPinnedBar(null) }} style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.06em',
            padding: '3px 8px', cursor: 'pointer', border: '1px solid var(--rule)', borderRadius: 2,
            background: projMonths === opt.months ? 'var(--ink)' : 'transparent',
            color: projMonths === opt.months ? 'var(--cream)' : 'var(--ink-muted)',
            transition: 'background 0.15s, color 0.15s',
          }}>{opt.label}</button>
        ))}
      </div>
    </div>
  )
}

/* ── CHAT ─────────────────────────────────────── */
function ChatTab({ village, sendMessage }) {
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [village.chat])

  const handleSend = () => {
    if (!text.trim()) return
    sendMessage(village.id, text.trim())
    setText('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 196px)' }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 40px' }}>
        {village.chat.map((msg, i) => {
          const prev = village.chat[i - 1]
          const showName = !prev || prev.author !== msg.author
          return (
            <div key={msg.id} style={{
              display: 'flex', flexDirection: msg.mine ? 'row-reverse' : 'row',
              gap: 10, marginBottom: showName ? 20 : 6, alignItems: 'flex-start',
            }}>
              {showName && !msg.mine && (
                <Avatar photo={msg.photo} initials={msg.initials} size={30} />
              )}
              {(!showName || msg.mine) && <div style={{ width: 30, flexShrink: 0 }} />}
              <div style={{ maxWidth: '65%' }}>
                {showName && !msg.mine && (
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em', marginBottom: 4 }}>
                    {msg.author}
                  </div>
                )}
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
        padding: '16px 40px',
        borderTop: '1px solid var(--rule)',
        display: 'flex', gap: 12, alignItems: 'center',
        background: 'var(--cream)',
      }}>
        <input
          value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder={`Message ${village.name}…`}
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

/* ── VOTES ────────────────────────────────────── */
function getTimeLeft(expiresAt) {
  if (!expiresAt) return null
  const ms = expiresAt - Date.now()
  if (ms <= 0) return { expired: true, label: 'Expired' }
  const days = Math.floor(ms / (1000 * 60 * 60 * 24))
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  if (days > 0) return { expired: false, label: `${days}d ${hours}h remaining` }
  const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  return { expired: false, label: hours > 0 ? `${hours}h ${mins}m remaining` : `${mins}m remaining` }
}

const RESOLUTION_TYPES = [
  { id: 'allocation',  label: 'Fund Allocation',          desc: 'Disburse pool funds to a member',        hasAmount: true,     placeholder: 'e.g. Allocate $2,000 to Amara K.: Education Loan' },
  { id: 'membership',  label: 'Membership Vote',           desc: 'Admit or remove a member',               hasAmount: false,    placeholder: 'e.g. Admit Sofia C. as full member' },
  { id: 'amendment',   label: 'Constitutional Amendment',  desc: 'Change village rules or structure',      hasAmount: false,    placeholder: 'e.g. Extend probation period to 3 months' },
  { id: 'investment',  label: 'Investment Decision',       desc: 'Change allocation or strategy',          hasAmount: true,     placeholder: 'e.g. Add 5% REIT sleeve to brokerage portfolio' },
  { id: 'emergency',   label: 'Emergency Withdrawal',      desc: 'Expedited access to pool funds',         hasAmount: true,     placeholder: 'e.g. Emergency withdrawal for Keisha W.: medical' },
  { id: 'other',       label: 'Other',                     desc: 'Any other village decision',             hasAmount: 'optional', placeholder: 'e.g. …' },
]

function VotesTab({ village, castVote, cancelVote, draftResolution, user }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ type: '', title: '', description: '', amount: '' })
  const [errors, setErrors] = useState({})

  const open   = village.votes.filter(v => v.status === 'open')
  const closed = village.votes.filter(v => v.status !== 'open')

  const resType = RESOLUTION_TYPES.find(t => t.id === form.type)

  const handleSubmit = () => {
    const e = {}
    if (!form.type) e.type = 'Select a resolution type'
    if (!form.title.trim()) e.title = 'Required'
    if (resType?.hasAmount === true && (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)) e.amount = 'Enter a valid amount'
    if (Object.keys(e).length) { setErrors(e); return }
    draftResolution(village.id, { title: form.title.trim(), description: form.description.trim(), amount: resType?.hasAmount ? form.amount : null })
    setForm({ type: '', title: '', description: '', amount: '' })
    setErrors({})
    setShowForm(false)
  }

  const closeForm = () => { setShowForm(false); setErrors({}) }

  return (
    <div style={{ overflowY: 'auto', height: '100%' }}>
    <div style={{ padding: '32px 40px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Resolutions</h2>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary" style={{ gap: 7, fontSize: 11, padding: '10px 18px', flexShrink: 0 }}>
            <Plus size={13} /> Draft Resolution
          </button>
        )}
      </div>

      {/* Draft form */}
      {showForm && (
        <div style={{ border: '1px solid var(--rule)', padding: '28px', background: 'var(--cream-mid)', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FileText size={15} color="var(--ink-muted)" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>New Resolution</span>
            </div>
            <button onClick={closeForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', padding: 4, display: 'flex' }}>
              <XCircle size={16} />
            </button>
          </div>

          {/* Type */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>Resolution type *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {RESOLUTION_TYPES.map(t => {
                const active = form.type === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, type: t.id }))}
                    style={{
                      padding: '10px 12px', textAlign: 'left', cursor: 'pointer',
                      background: active ? 'var(--green)' : 'var(--cream)',
                      border: `1px solid ${errors.type && !form.type ? 'var(--terracotta)' : active ? 'var(--green)' : 'var(--rule)'}`,
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, color: active ? 'var(--cream)' : 'var(--ink)', marginBottom: 2 }}>{t.label}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: active ? 'rgba(244,238,226,0.7)' : 'var(--ink-muted)', lineHeight: 1.4 }}>{t.desc}</div>
                  </button>
                )
              })}
            </div>
            {errors.type && <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--terracotta)', marginTop: 4 }}>{errors.type}</div>}
          </div>

          {/* Title */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Title *</label>
            <input
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder={resType?.placeholder ?? 'e.g. Allocate $2,000 to Amara K.: Education Loan'}
              style={{
                width: '100%', padding: '12px 14px', boxSizing: 'border-box',
                fontFamily: 'var(--sans)', fontSize: 14,
                background: 'var(--cream)', border: `1px solid ${errors.title ? 'var(--terracotta)' : 'var(--rule)'}`,
                outline: 'none', color: 'var(--ink)', borderRadius: 2,
              }}
            />
            {errors.title && <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--terracotta)', marginTop: 4 }}>{errors.title}</div>}
          </div>

          {/* Description */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
              Description <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: 9 }}>(optional)</span>
            </label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Add context for other members…"
              rows={3}
              style={{
                width: '100%', padding: '12px 14px', boxSizing: 'border-box',
                fontFamily: 'var(--sans)', fontSize: 14, resize: 'vertical',
                background: 'var(--cream)', border: '1px solid var(--rule)',
                outline: 'none', color: 'var(--ink)', borderRadius: 2,
              }}
            />
          </div>

          {/* Amount */}
          {resType && resType.hasAmount && (
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
              Amount {resType.hasAmount === 'optional' ? <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: 9 }}>(optional)</span> : '*'}
            </label>
            <div style={{ position: 'relative', maxWidth: 220 }}>
              <span style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--ink-muted)',
                pointerEvents: 'none',
              }}>$</span>
              <input
                type="number" min="1"
                value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                placeholder="0"
                style={{
                  width: '100%', padding: '12px 14px 12px 28px', boxSizing: 'border-box',
                  fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700,
                  background: 'var(--cream)', border: `1px solid ${errors.amount ? 'var(--terracotta)' : 'var(--rule)'}`,
                  outline: 'none', color: 'var(--ink)', borderRadius: 2,
                }}
              />
            </div>
            {errors.amount && <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--terracotta)', marginTop: 4 }}>{errors.amount}</div>}
          </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={handleSubmit} className="btn btn-primary" style={{ fontSize: 11, padding: '10px 20px' }}>
              Submit Resolution
            </button>
            <button onClick={closeForm} className="btn btn-outline" style={{ fontSize: 11, padding: '10px 20px' }}>
              Cancel
            </button>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={10} /> Voting opens for 3 days after submission
            </span>
          </div>
        </div>
      )}

      {/* Open */}
      {open.length > 0 && (
        <>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 20 }}>Requires your vote</h2>
          </div>
          {open.map(v => <VoteCard key={v.id} vote={v} villageId={village.id} castVote={castVote} cancelVote={cancelVote} user={user} memberCount={village.memberList.length} />)}
        </>
      )}

      {/* Closed */}
      {closed.length > 0 && (
        <>
          <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', margin: `${open.length > 0 ? '40px' : '0'} 0 20px` }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}></span>
            <h2 style={{ fontSize: 20 }}>Past decisions</h2>
          </div>
          {closed.map(v => <VoteCard key={v.id} vote={v} villageId={village.id} castVote={castVote} memberCount={village.memberList.length} />)}
        </>
      )}

      {open.length === 0 && closed.length === 0 && !showForm && (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <Vote size={32} color="var(--rule)" style={{ marginBottom: 16 }} />
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
            No resolutions yet. Draft the first one.
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

function VoteCard({ vote, villageId, castVote, cancelVote, user, memberCount }) {
  const total      = vote.yes + vote.no + vote.abstain
  const eligible   = memberCount || vote.total || total
  const yesPct     = eligible > 0 ? Math.round((vote.yes     / eligible) * 100) : 0
  const noPct      = eligible > 0 ? Math.round((vote.no      / eligible) * 100) : 0
  const abstainPct = eligible > 0 ? Math.round((vote.abstain / eligible) * 100) : 0
  const notVotedPct = Math.max(0, 100 - yesPct - noPct - abstainPct)
  const isOpen = vote.status === 'open'
  const timeLeft = getTimeLeft(vote.expiresAt)
  const myName = user ? `${user.first_name} ${user.last_name?.[0]}.` : ''
  const isMine = isOpen && vote.proposedBy === myName
  const [pendingVote, setPendingVote] = useState(null)
  const [confirmCancel, setConfirmCancel] = useState(false)

  return (
    <div style={{
      border: '1px solid var(--rule)', marginBottom: 16,
      background: isOpen && !vote.myVote ? 'var(--cream-mid)' : 'transparent',
    }}>
      {/* Card header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: vote.description ? 10 : 8 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 700, maxWidth: '78%', lineHeight: 1.3 }}>
            {vote.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isMine && !confirmCancel && (
              <button
                onClick={() => setConfirmCancel(true)}
                style={{
                  fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '4px 10px', border: '1px solid var(--rule)', borderRadius: 2,
                  background: 'transparent', color: 'var(--ink-muted)', cursor: 'pointer',
                }}
              >
                Cancel vote
              </button>
            )}
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: vote.status === 'passed' ? 'var(--green)' : vote.status === 'open' ? 'var(--terracotta)' : 'var(--ink-muted)',
            }}>
              {vote.status === 'passed' ? 'Passed' : vote.status === 'open' ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>

        {confirmCancel && (
          <div style={{
            padding: '12px 14px', marginBottom: 12,
            background: 'rgba(192,80,48,0.08)', border: '1px solid var(--terracotta)', borderRadius: 2,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', flex: 1, lineHeight: 1.4 }}>
              Cancel this vote? It will be permanently removed.
            </span>
            <button
              onClick={() => { cancelVote(villageId, vote.id); setConfirmCancel(false) }}
              className="btn btn-terra"
              style={{ fontSize: 11, padding: '7px 14px', flexShrink: 0 }}
            >
              Confirm
            </button>
            <button
              onClick={() => setConfirmCancel(false)}
              className="btn btn-outline"
              style={{ fontSize: 11, padding: '7px 14px', flexShrink: 0 }}
            >
              Back
            </button>
          </div>
        )}

        {vote.description && (
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.55, marginBottom: 10 }}>
            {vote.description}
          </div>
        )}

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
          <span>Proposed by {vote.proposedBy}</span>
          {vote.amount != null && (
            <span style={{ fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>
              ${Number(vote.amount).toLocaleString()}
            </span>
          )}
          <span>{eligible} voters</span>
          {timeLeft && (
            <span style={{
              display: 'flex', alignItems: 'center', gap: 4,
              color: timeLeft.expired ? 'var(--ink-muted)' : isOpen ? 'var(--terracotta)' : 'var(--ink-muted)',
            }}>
              <Clock size={9} />
              {timeLeft.label}
            </span>
          )}
        </div>
      </div>

      {/* Tally */}
      <div style={{ padding: '16px 24px', borderBottom: isOpen && !vote.myVote ? '1px solid var(--rule)' : 'none' }}>
        {/* Segmented bar: green=yes · grey=not voted · terracotta=no */}
        {(() => {
          const segs = [
            yesPct     > 0 && { style: { width: `${yesPct}%`,     minWidth: 4, transition: 'width 0.6s ease' }, bg: 'var(--green)'      },
            notVotedPct > 0 && { style: { width: `${notVotedPct}%`, minWidth: 4 },                              bg: 'var(--cream-dark)' },
            abstainPct > 0 && { style: { width: `${abstainPct}%`, minWidth: 4, transition: 'width 0.6s ease' }, bg: 'var(--ink-muted)'  },
            noPct      > 0 && { style: { width: `${noPct}%`,      minWidth: 4, transition: 'width 0.6s ease' }, bg: 'var(--terracotta)' },
          ].filter(Boolean)
          return (
            <div style={{ display: 'flex', height: 8 }}>
              {segs.map((seg, i) => (
                <>
                  {i > 0 && <div key={`gap-${i}`} style={{ width: 2, flexShrink: 0, background: 'var(--cream)' }} />}
                  <div key={i} style={{
                    ...seg.style,
                    background: seg.bg,
                    borderRadius: i === 0 && i === segs.length - 1 ? 4
                      : i === 0 ? '4px 0 0 4px'
                      : i === segs.length - 1 ? '0 4px 4px 0'
                      : 0,
                  }} />
                </>
              ))}
            </div>
          )
        })()}
        {/* Legend */}
        <div style={{ display: 'flex', gap: 20, marginTop: 10, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
          <span style={{ color: 'var(--green)' }}>Yes {vote.yes}</span>
          <span style={{ color: 'var(--terracotta)' }}>No {vote.no}</span>
          {vote.abstain > 0 && <span>Abstain {vote.abstain}</span>}
          <span style={{ marginLeft: 'auto' }}>{total} of {vote.total} voted</span>
        </div>
      </div>

      {/* Voting buttons */}
      {isOpen && !vote.myVote && !pendingVote && (
        <div style={{ padding: '16px 24px', display: 'flex', gap: 10 }}>
          <button onClick={() => setPendingVote('yes')} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 11, gap: 6 }}>
            <CheckCircle2 size={13} /> Vote Yes
          </button>
          <button onClick={() => setPendingVote('no')} className="btn btn-outline" style={{ padding: '10px 20px', fontSize: 11, gap: 6, color: 'var(--terracotta)', borderColor: 'var(--terracotta)' }}>
            <XCircle size={13} /> Vote No
          </button>
          <button onClick={() => setPendingVote('abstain')} style={{
            padding: '10px 20px', background: 'transparent', border: '1px solid var(--rule)',
            cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11,
            color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 2,
          }}>
            <Minus size={13} /> Abstain
          </button>
        </div>
      )}

      {/* Confirm vote */}
      {isOpen && !vote.myVote && pendingVote && (
        <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--rule)' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em', flex: 1 }}>
            Confirm vote:{' '}
            <strong style={{ color: pendingVote === 'yes' ? 'var(--green)' : pendingVote === 'no' ? 'var(--terracotta)' : 'var(--ink)' }}>
              {pendingVote.charAt(0).toUpperCase() + pendingVote.slice(1)}
            </strong>
          </span>
          <button
            onClick={() => { castVote(villageId, vote.id, pendingVote); setPendingVote(null) }}
            className={pendingVote === 'no' ? 'btn btn-terra' : 'btn btn-primary'}
            style={{ fontSize: 11, padding: '8px 18px' }}
          >
            Confirm
          </button>
          <button
            onClick={() => setPendingVote(null)}
            className="btn btn-outline"
            style={{ fontSize: 11, padding: '8px 18px' }}
          >
            Back
          </button>
        </div>
      )}
      {vote.myVote && (
        <div style={{ padding: '12px 24px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
          You voted: <strong style={{ color: vote.myVote === 'yes' ? 'var(--green)' : vote.myVote === 'no' ? 'var(--terracotta)' : 'var(--ink-muted)' }}>{vote.myVote.charAt(0).toUpperCase() + vote.myVote.slice(1)}</strong>
        </div>
      )}
    </div>
  )
}

/* ── CONSTITUTION ─────────────────────────────── */
const STRUCTURE_LABELS = {
  accountType:        { hysa: 'High-Yield Savings (HYSA)', checking: 'Checking', brokerage: 'Brokerage' },
  payInFrequency:     { weekly: 'Weekly', biweekly: 'Bi-weekly', monthly: 'Monthly' },
  payoutStructure:    { rotating: 'Rotating (ROSCA)', voted: 'Voted allocation', proportional: 'Proportional draw' },
  amendmentThreshold: { majority: 'Simple majority (>50%)', two_thirds: 'Two-thirds (≥67%)', unanimous: 'Unanimous (100%)' },
  quorum:             { any: 'Any member may vote', two_thirds: '2/3 of members must vote', all: 'All members must vote' },
  dishonorableExit:  { withheld: 'Funds withheld', returned_no_interest: 'Returned without interest', returned_with_interest: 'Returned with interest' },
  probationPeriod:    { none: 'None', '1_month': '1 month', '3_months': '3 months', '6_months': '6 months' },
  latePaymentPolicy:  { grace_7: '7-day grace period, then flagged', immediate_penalty: 'Immediate penalty fee applied', removal_3_missed: 'Removal after 3 consecutive missed payments', voted: 'Handled by member vote' },
  exitNoticePeriod:   { immediate: 'Immediate (no notice required)', '1_month': '1 month', '2_months': '2 months', '3_months': '3 months', '1_cycle': '1 full contribution cycle' },
  memberAdmission:    { vote_required: 'Vote required for all new members', invite_no_vote: 'Invited members admitted without a vote', any_member: 'Any member can admit others freely' },
}

const AMEND_OPTIONS = {
  payInFrequency:     Object.entries(STRUCTURE_LABELS.payInFrequency),
  payoutStructure:    Object.entries(STRUCTURE_LABELS.payoutStructure),
  amendmentThreshold: Object.entries(STRUCTURE_LABELS.amendmentThreshold),
  quorum:             Object.entries(STRUCTURE_LABELS.quorum),
  dishonorableExit:  Object.entries(STRUCTURE_LABELS.dishonorableExit),
  probationPeriod:    Object.entries(STRUCTURE_LABELS.probationPeriod),
  latePaymentPolicy:  Object.entries(STRUCTURE_LABELS.latePaymentPolicy),
  exitNoticePeriod:   Object.entries(STRUCTURE_LABELS.exitNoticePeriod),
  memberAdmission:    Object.entries(STRUCTURE_LABELS.memberAdmission),
}

function ConstitutionTab({ village, draftResolution }) {
  const s = village.structure
  const [amendMode, setAmendMode] = useState(false)
  const [amendingField, setAmendingField] = useState(null)
  const [proposed, setProposed] = useState('')
  const [amendDesc, setAmendDesc] = useState('')

  const sections = [
    {
      title: 'Financial Structure',
      rows: [
        { label: 'Account type',        field: null,                 val: s?.accountType    ? STRUCTURE_LABELS.accountType[s.accountType]       : '-' },
        { label: 'Pay-in frequency',    field: 'payInFrequency',     val: s?.payInFrequency ? STRUCTURE_LABELS.payInFrequency[s.payInFrequency] : '-' },
        { label: 'Pool size goal',      field: 'poolTarget',         val: s?.poolTarget     ? `$${Number(s.poolTarget).toLocaleString()}`        : '-' },
        { label: 'Minimum contribution',field: 'minContribution',    val: s?.minContribution ? `$${Number(s.minContribution).toLocaleString()} / period` : '-' },
        { label: 'Payout structure',    field: 'payoutStructure',    val: s?.payoutStructure ? STRUCTURE_LABELS.payoutStructure[s.payoutStructure] : '-' },
      ],
    },
    {
      title: 'Governance',
      rows: [
        { label: 'Amendment threshold', field: 'amendmentThreshold', val: s?.amendmentThreshold ? STRUCTURE_LABELS.amendmentThreshold[s.amendmentThreshold] : '-' },
        { label: 'Vote quorum',         field: 'quorum',             val: s?.quorum             ? STRUCTURE_LABELS.quorum[s.quorum]                          : '-' },
        { label: 'Member admission',    field: 'memberAdmission',    val: s?.memberAdmission    ? STRUCTURE_LABELS.memberAdmission[s.memberAdmission]        : '-' },
      ],
    },
    {
      title: 'Member Conduct',
      rows: [
        { label: 'Probationary period', field: 'probationPeriod',   val: s?.probationPeriod   ? STRUCTURE_LABELS.probationPeriod[s.probationPeriod]     : '-' },
        { label: 'Late payment policy', field: 'latePaymentPolicy', val: s?.latePaymentPolicy ? STRUCTURE_LABELS.latePaymentPolicy[s.latePaymentPolicy] : '-' },
        { label: 'Dishonorable exit',  field: 'dishonorableExit', val: s?.dishonorableExit ? STRUCTURE_LABELS.dishonorableExit[s.dishonorableExit] : '-' },
        { label: 'Exit notice period',  field: 'exitNoticePeriod',  val: s?.exitNoticePeriod  ? STRUCTURE_LABELS.exitNoticePeriod[s.exitNoticePeriod]   : '-' },
      ],
    },
  ]

  const openAmend = (field, currentVal) => {
    setAmendingField(field)
    setAmendDesc('')
    const opts = AMEND_OPTIONS[field]
    if (opts) {
      const current = Object.entries(STRUCTURE_LABELS[field] || {}).find(([, v]) => v === currentVal)
      setProposed(current ? current[0] : opts[0][0])
    } else {
      setProposed('')
    }
  }

  const submitAmend = (label) => {
    if (!amendDesc.trim()) return
    draftResolution(village.id, {
      title: `Amend constitution: ${label}`,
      description: amendDesc.trim(),
      amount: null,
    })
    setAmendingField(null)
    setAmendDesc('')
  }

  const selectSt = {
    fontFamily: 'var(--sans)', fontSize: 13, padding: '6px 10px',
    border: '1px solid var(--rule)', borderRadius: 2,
    background: 'var(--cream)', color: 'var(--ink)', outline: 'none',
  }

  return (
    <div style={{ overflowY: 'auto', height: '100%' }}>
    <div style={{ padding: '40px 40px', maxWidth: 720 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Village Constitution</h2>
        {s && (
          <button
            onClick={() => { setAmendMode(m => !m); setAmendingField(null) }}
            className={amendMode ? 'btn btn-outline' : 'btn btn-primary'}
            style={{ fontSize: 11, padding: '9px 18px' }}
          >
            {amendMode ? 'Cancel' : 'Propose Amendment'}
          </button>
        )}
      </div>

      {!s ? (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
          No constitution on file for this village.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {sections.map(section => (
            <div key={section.title}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12,
              }}>
                {section.title}
              </div>
              <div style={{ border: '1px solid var(--rule)', borderRadius: 2, overflow: 'hidden' }}>
                {section.rows.map(({ label, field, val }, i) => (
                  <div key={label}>
                    <div style={{
                      display: 'grid', gridTemplateColumns: amendMode ? '220px 1fr auto' : '220px 1fr',
                      padding: '13px 20px', alignItems: 'center',
                      borderBottom: (i < section.rows.length - 1 || amendingField === field) ? '1px solid var(--rule)' : 'none',
                      background: i % 2 === 0 ? 'transparent' : 'var(--cream-mid)',
                    }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
                        {label}
                      </span>
                      <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>
                        {val}
                      </span>
                      {amendMode && (field ? (
                        <button
                          onClick={() => amendingField === field ? setAmendingField(null) : openAmend(field, val)}
                          style={{
                            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.08em',
                            textTransform: 'uppercase', padding: '4px 10px',
                            border: '1px solid var(--rule)', borderRadius: 2,
                            background: amendingField === field ? 'var(--cream-dark)' : 'transparent',
                            color: 'var(--ink-muted)', cursor: 'pointer',
                          }}
                        >
                          {amendingField === field ? 'Cancel' : 'Amend'}
                        </button>
                      ) : (
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.06em', padding: '4px 10px' }}>
                          Fixed
                        </span>
                      ))}
                    </div>

                    {amendMode && amendingField !== null && amendingField === field && (
                      <div style={{
                        padding: '16px 20px', background: 'var(--cream-mid)',
                        borderBottom: i < section.rows.length - 1 ? '1px solid var(--rule)' : 'none',
                        display: 'flex', flexDirection: 'column', gap: 10,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em', flexShrink: 0 }}>
                            Propose change to:
                          </span>
                          {AMEND_OPTIONS[field] ? (
                            <select value={proposed} onChange={e => setProposed(e.target.value)} style={selectSt}>
                              {AMEND_OPTIONS[field].map(([k, v]) => (
                                <option key={k} value={k}>{v}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              value={proposed}
                              onChange={e => setProposed(e.target.value)}
                              placeholder="New value…"
                              style={{ ...selectSt, flex: 1 }}
                            />
                          )}
                        </div>
                        <textarea
                          value={amendDesc}
                          onChange={e => setAmendDesc(e.target.value)}
                          placeholder="Reason for this amendment (required)…"
                          rows={3}
                          style={{
                            width: '100%', padding: '10px 12px', boxSizing: 'border-box',
                            fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.6,
                            background: 'var(--cream)', border: `1px solid ${amendDesc.trim() ? 'var(--rule)' : 'var(--terracotta)'}`,
                            borderRadius: 2, outline: 'none', color: 'var(--ink)', resize: 'vertical',
                          }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => submitAmend(label)}
                            className="btn btn-primary"
                            style={{ fontSize: 11, padding: '7px 16px', opacity: amendDesc.trim() ? 1 : 0.4 }}
                          >
                            Start vote
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

const PERMISSION_GROUPS = [
  {
    id: 'actions',
    label: 'Actions without a vote',
    desc: 'Members can take these actions directly, without initiating a village vote.',
    perms: [
      { id: 'invite_members',      label: 'Invite new members',            desc: 'Generate and share invite codes' },
      { id: 'propose_resolutions', label: 'Draft resolutions',             desc: 'Any member can open a new resolution' },
      { id: 'send_messages',       label: 'Send chat messages',            desc: 'Post in the village chat' },
      { id: 'request_join',        label: 'Accept join requests',          desc: 'Approve pending applicants without a membership vote' },
    ],
  },
  {
    id: 'restricted',
    label: 'Require a vote',
    desc: 'These actions always require a full village vote, regardless of other settings.',
    perms: [
      { id: 'allocate_funds',      label: 'Allocate funds',                desc: 'Disbursements must be voted on' },
      { id: 'remove_members',      label: 'Remove members',                desc: 'Removal requires a majority vote' },
      { id: 'amend_constitution',  label: 'Amend the constitution',        desc: 'Rule changes require a supermajority' },
    ],
  },
  {
    id: 'visibility',
    label: 'Visibility',
    desc: 'Control what information members can see.',
    perms: [
      { id: 'view_pool_balance',   label: 'View full pool balance',        desc: 'Members can see the total pooled amount' },
      { id: 'view_contributions',  label: 'View individual contributions', desc: "Members can see each other's contribution amounts" },
    ],
  },
]

const DEFAULT_PERMS = {
  invite_members: true,
  propose_resolutions: true,
  send_messages: true,
  request_join: false,
  allocate_funds: true,
  remove_members: true,
  amend_constitution: true,
  view_pool_balance: true,
  view_contributions: false,
}

/* ── MEMBERS ──────────────────────────────────── */
function MembersTab({ village, draftResolution, onLeave }) {
  const { leaveVillage } = useAuth()
  const total = village.memberList.reduce((s, m) => s + m.contrib, 0)
  const [subtab, setSubtab] = useState('roster')
  const [requests, setRequests] = useState(village.joinRequests || [])
  const [modal, setModal] = useState(null) // { type: 'remove'|'add', member?: obj }
  const [confirmLeave, setConfirmLeave] = useState(false)
  const [note, setNote] = useState('')
  const [addName, setAddName] = useState('')
  const [removeSearch, setRemoveSearch] = useState('')
  const [removeOpen, setRemoveOpen] = useState(false)
  const [removeTarget, setRemoveTarget] = useState(null)
  const [confirmRemove, setConfirmRemove] = useState(false)
  const [inviteModal, setInviteModal] = useState(false)
  const [inviteCode, setInviteCode] = useState(null)
  const [copied, setCopied] = useState(false)
  const [showPerms, setShowPerms] = useState(false)
  const [perms, setPerms] = useState(DEFAULT_PERMS)
  const [permsSaved, setPermsSaved] = useState(false)

  const savePerms = () => { setPermsSaved(true); setTimeout(() => { setPermsSaved(false); setShowPerms(false) }, 900) }

  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const seg = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    setInviteCode(`VLG-${seg(4)}-${seg(4)}`)
    setCopied(false)
  }

  const openInvite = () => { generateCode(); setInviteModal(true) }
  const closeInvite = () => { setInviteModal(false); setInviteCode(null); setCopied(false) }

  const copyCode = () => {
    if (inviteCode) { navigator.clipboard.writeText(inviteCode); setCopied(true) }
  }

  const otherMembers = village.memberList.filter(m => m.id !== 'me')
  const filteredMembers = otherMembers.filter(m =>
    m.name.toLowerCase().includes(removeSearch.toLowerCase())
  )

  const closeModal = () => { setModal(null); setNote(''); setAddName(''); setRemoveSearch(''); setRemoveOpen(false); setRemoveTarget(null); setConfirmRemove(false) }

  const submitVote = () => {
    if (modal.type === 'remove') {
      if (!removeTarget) return
      draftResolution(village.id, {
        title: `Remove ${removeTarget.name} from village`,
        description: note.trim() || '',
        amount: null,
      })
    } else {
      if (!addName.trim()) return
      draftResolution(village.id, {
        title: `Add ${addName.trim()} as a new member`,
        description: note.trim() || '',
        amount: null,
      })
    }
    closeModal()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '32px 40px', boxSizing: 'border-box' }}>

      {/* Vote modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(30,25,18,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={closeModal}>
          <div style={{ background: 'var(--cream)', border: '1px solid var(--rule)', width: 440, padding: '28px', boxShadow: '0 12px 40px rgba(30,25,18,0.18)' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {modal.type === 'remove' ? 'Vote to remove member' : 'Vote to add member'}
              </span>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex' }}>
                <XCircle size={16} />
              </button>
            </div>

            {modal.type === 'remove' && (
              <div style={{ marginBottom: 14, position: 'relative' }}>
                <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Select member *</label>
                {removeTarget ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 13px', border: '1px solid var(--rule)', borderRadius: 2, background: 'var(--cream)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar photo={removeTarget.photo} initials={removeTarget.initials} size={26} />
                      <span style={{ fontFamily: 'var(--sans)', fontSize: 14 }}>{removeTarget.name}</span>
                    </div>
                    <button onClick={() => setRemoveTarget(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex', padding: 0 }}>
                      <XCircle size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      value={removeSearch}
                      onChange={e => { setRemoveSearch(e.target.value); setRemoveOpen(true) }}
                      onFocus={() => setRemoveOpen(true)}
                      onBlur={() => setTimeout(() => setRemoveOpen(false), 150)}
                      placeholder="Search by name…"
                      style={{ width: '100%', padding: '11px 13px', boxSizing: 'border-box', fontFamily: 'var(--sans)', fontSize: 14, background: 'var(--cream)', border: '1px solid var(--rule)', outline: 'none', color: 'var(--ink)', borderRadius: 2 }}
                    />
                    {removeOpen && filteredMembers.length > 0 && (
                      <div style={{ position: 'absolute', left: 0, right: 0, top: '100%', background: 'var(--cream)', border: '1px solid var(--rule)', borderTop: 'none', zIndex: 10, maxHeight: 180, overflowY: 'auto' }}>
                        {filteredMembers.map(m => (
                          <div key={m.id}
                            onMouseDown={e => { e.preventDefault(); setRemoveTarget(m); setRemoveOpen(false); setRemoveSearch('') }}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', cursor: 'pointer', borderBottom: '1px solid var(--rule)' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-mid)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <Avatar photo={m.photo} initials={m.initials} size={26} />
                            <div>
                              <div style={{ fontFamily: 'var(--sans)', fontSize: 13 }}>{m.name}</div>
                              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)' }}>{m.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {modal.type === 'add' && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Member name *</label>
                <input
                  value={addName}
                  onChange={e => setAddName(e.target.value)}
                  placeholder="Full name"
                  style={{ width: '100%', padding: '11px 13px', boxSizing: 'border-box', fontFamily: 'var(--sans)', fontSize: 14, background: 'var(--cream)', border: '1px solid var(--rule)', outline: 'none', color: 'var(--ink)', borderRadius: 2 }}
                />
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
                Reason <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: 9 }}>(optional)</span>
              </label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Provide context for other members…"
                rows={3}
                style={{ width: '100%', padding: '11px 13px', boxSizing: 'border-box', fontFamily: 'var(--sans)', fontSize: 14, background: 'var(--cream)', border: '1px solid var(--rule)', outline: 'none', color: 'var(--ink)', borderRadius: 2, resize: 'vertical', lineHeight: 1.6 }}
              />
            </div>
            {confirmRemove ? (
              <div>
                <div style={{
                  padding: '14px 16px', marginBottom: 16,
                  background: 'rgba(192,80,48,0.08)', border: '1px solid var(--terracotta)', borderRadius: 2,
                }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--terracotta)', letterSpacing: '0.06em', marginBottom: 4 }}>
                    Are you sure?
                  </div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
                    This will open a binding vote to remove <strong>{removeTarget?.name}</strong> from the village. All members will be notified.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setConfirmRemove(false)} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>Back</button>
                  <button onClick={submitVote} className="btn btn-terra" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>
                    Confirm: Start vote
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={closeModal} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>Cancel</button>
                <button
                  onClick={modal.type === 'remove' ? () => setConfirmRemove(true) : submitVote}
                  disabled={modal.type === 'remove' ? !removeTarget : !addName.trim()}
                  className={modal.type === 'remove' ? 'btn btn-terra' : 'btn btn-primary'}
                  style={{ flex: 1, justifyContent: 'center', fontSize: 11, opacity: (modal.type === 'remove' ? !removeTarget : !addName.trim()) ? 0.4 : 1 }}
                >
                  Start vote
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Invite modal */}
      {inviteModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(30,25,18,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={closeInvite}>
          <div style={{ background: 'var(--cream)', border: '1px solid var(--rule)', width: 420, padding: '28px', boxShadow: '0 12px 40px rgba(30,25,18,0.18)' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Invite to village</span>
              <button onClick={closeInvite} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex' }}>
                <XCircle size={16} />
              </button>
            </div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: 24 }}>
              Share this code with someone you'd like to invite. They'll enter it when signing up or from their dashboard. The code expires in 48 hours.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 20 }}>
              <div style={{
                flex: 1, padding: '14px 18px',
                fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 700, letterSpacing: '0.12em',
                background: 'var(--cream-mid)', border: '1px solid var(--rule)', borderRight: 'none',
                color: 'var(--ink)',
              }}>
                {inviteCode}
              </div>
              <button
                onClick={copyCode}
                style={{
                  padding: '14px 16px', background: copied ? 'var(--green)' : 'var(--ink)',
                  border: `1px solid ${copied ? 'var(--green)' : 'var(--ink)'}`,
                  cursor: 'pointer', color: 'var(--cream)', display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
                  transition: 'background 0.2s',
                }}
              >
                {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
              </button>
            </div>
            <button
              onClick={generateCode}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em', padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              ↻ Generate new code
            </button>
          </div>
        </div>
      )}

      {/* Permissions modal */}
      {showPerms && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(30,25,18,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowPerms(false)}>
          <div style={{ background: 'var(--cream)', border: '1px solid var(--rule)', width: 500, maxHeight: '82vh', overflowY: 'auto', padding: '28px', boxShadow: '0 12px 40px rgba(30,25,18,0.18)' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Member permissions</span>
              <button onClick={() => setShowPerms(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex' }}><XCircle size={16} /></button>
            </div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: 24 }}>
              Configure what members can do without a vote. Changes take effect immediately and apply to all members equally.
            </p>
            {PERMISSION_GROUPS.map((group, gi) => (
              <div key={group.id} style={{ marginBottom: gi < PERMISSION_GROUPS.length - 1 ? 28 : 0 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>{group.label}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)', marginBottom: 12 }}>{group.desc}</div>
                <div style={{ border: '1px solid var(--rule)' }}>
                  {group.perms.map((p, pi) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '13px 16px', borderBottom: pi < group.perms.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{p.label}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>{p.desc}</div>
                      </div>
                      <div onClick={() => setPerms(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
                        style={{ width: 36, height: 20, borderRadius: 10, flexShrink: 0, background: perms[p.id] ? 'var(--green)' : 'var(--rule)', position: 'relative', transition: 'background 0.2s', cursor: 'pointer' }}>
                        <div style={{ position: 'absolute', top: 3, left: perms[p.id] ? 18 : 3, width: 14, height: 14, borderRadius: '50%', background: 'var(--cream)', transition: 'left 0.2s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
              <button onClick={() => setShowPerms(false)} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>Cancel</button>
              <button onClick={savePerms} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: 11, gap: 6 }}>
                {permsSaved ? <><Check size={13} /> Saved</> : 'Save permissions'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tabs */}
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--rule)', marginBottom: 28, flexShrink: 0 }}>
        {[
          { id: 'roster', label: 'Roster' },
          { id: 'requests', label: 'Join Requests', badge: requests.length },
        ].map(t => (
          <button key={t.id} onClick={() => setSubtab(t.id)} style={{
            padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 7,
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
            color: subtab === t.id ? 'var(--ink)' : 'var(--ink-muted)',
            borderBottom: subtab === t.id ? '2px solid var(--ink)' : '2px solid transparent',
            marginBottom: '-1px',
          }}>
            {t.label}
            {t.badge > 0 && (
              <span style={{
                background: 'var(--terracotta)', color: 'var(--cream)',
                fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700,
                borderRadius: 999, padding: '1px 6px', lineHeight: 1.6,
              }}>{t.badge}</span>
            )}
          </button>
        ))}
      </div>

      {subtab === 'requests' && (
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {requests.length === 0 ? (
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
                No pending join requests.
              </div>
            </div>
          ) : requests.map(req => (
            <div key={req.id} style={{
              border: '1px solid var(--rule)', marginBottom: 12, padding: '20px 24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: req.message ? 14 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar photo={req.photo} initials={req.initials} size={36} />
                  <div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{req.name}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
                      {req.handle} · {req.location} · {req.requestedAt}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button
                    className="btn btn-outline"
                    style={{ fontSize: 10, padding: '7px 14px' }}
                    onClick={() => setRequests(r => r.filter(x => x.id !== req.id))}
                  >
                    Decline
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ fontSize: 10, padding: '7px 14px', gap: 6 }}
                    onClick={() => {
                      draftResolution(village.id, {
                        title: `Admit ${req.name} as member`,
                        description: req.message ? `From their request: "${req.message}"` : '',
                        amount: null,
                      })
                      setRequests(r => r.filter(x => x.id !== req.id))
                    }}
                  >
                    <Vote size={12} /> Initiate vote
                  </button>
                </div>
              </div>
              {req.message && (
                <div style={{
                  marginTop: 14, padding: '12px 14px',
                  background: 'var(--cream-mid)', border: '1px solid var(--rule)',
                  fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.6,
                }}>
                  "{req.message}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {subtab === 'roster' && <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexShrink: 0 }}>
        <button onClick={openInvite} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, padding: '10px 18px', cursor: 'pointer', fontFamily: 'var(--mono)', letterSpacing: '0.06em', background: 'var(--ink-muted)', color: 'var(--cream)', border: '1px solid var(--ink-muted)' }}>
          <Link2 size={13} /> Invite
        </button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setModal({ type: 'remove' })} className="btn btn-terra" style={{ gap: 7, fontSize: 11, padding: '10px 18px' }}>
            Vote to remove
          </button>
          <button onClick={() => setModal({ type: 'add' })} className="btn btn-primary" style={{ gap: 7, fontSize: 11, padding: '10px 18px' }}>
            <Plus size={13} /> Add member
          </button>
        </div>
      </div>

      {/* Header row */}
      <div style={{
        display: 'grid', gridTemplateColumns: '40px 1fr 100px 120px 80px',
        padding: '10px 16px',
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        borderBottom: '1px solid var(--rule)',
        flexShrink: 0,
      }}>
        <span></span>
        <span>Member</span>
        <span>Joined</span>
        <span>Contributed</span>
        <span>Status</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
      {village.memberList.map((m) => {
        return (
          <div key={m.id} style={{
            display: 'grid', gridTemplateColumns: '40px 1fr 100px 120px 80px',
            padding: '14px 16px', alignItems: 'center',
            borderBottom: '1px solid var(--rule)',
            background: m.name.includes('Hector') ? 'rgba(42,74,30,0.04)' : 'transparent',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { if (!m.name.includes('Hector')) e.currentTarget.style.background = 'var(--cream-mid)' }}
          onMouseLeave={e => { if (!m.name.includes('Hector')) e.currentTarget.style.background = 'transparent' }}
          >
            <Avatar photo={m.photo} initials={m.initials} size={30} />

            <div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: m.name.includes('Hector') ? 600 : 400 }}>
                {m.name} {m.name.includes('Hector') && <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', marginLeft: 6 }}>YOU</span>}
              </div>
            </div>

            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>{m.joined || '-'}</div>

            <div style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700 }}>${m.contrib.toLocaleString()}</div>

            <div>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em',
                color: m.status === 'active' ? 'var(--green)' : 'var(--ink-muted)',
              }}>
                {m.status}
              </span>
            </div>

          </div>
        )
      })}
      </div>

      {/* Total row */}
      <div style={{
        display: 'grid', gridTemplateColumns: '40px 1fr 100px 120px 80px',
        padding: '14px 16px',
        background: 'var(--cream-mid)',
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
        borderTop: '2px solid var(--rule)',
        flexShrink: 0,
      }}>
        <span></span>
        <span style={{ color: 'var(--ink-muted)' }}>Total village pool</span>
        <span></span>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--green)' }}>${total.toLocaleString()}</span>
        <span></span>
      </div>

      {/* Leave village */}
      <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid var(--rule)', flexShrink: 0 }}>
        {!confirmLeave ? (
          <button
            onClick={() => setConfirmLeave(true)}
            className="btn btn-terra"
            style={{ fontSize: 11, padding: '10px 20px' }}
          >
            Leave village
          </button>
        ) : (
          <div style={{ maxWidth: 560 }}>
            <div style={{
              padding: '16px 18px', marginBottom: 16,
              background: 'rgba(192,80,48,0.06)', border: '1px solid var(--terracotta)', borderRadius: 2,
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--terracotta)', letterSpacing: '0.06em', marginBottom: 8 }}>
                Before you go
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.7 }}>
                <li>Leaving is permanent and cannot be undone without{
                  village.structure?.memberAdmission === 'any_member'
                    ? ' a re-invitation from any member'
                    : village.structure?.memberAdmission === 'invite_no_vote'
                      ? ' a re-invitation from an existing member'
                      : ' a member vote to re-admit you'
                }. By confirming your exit, you are giving notice of your intent to leave the village.</li>
                <li>Your contributions to date will be handled per the village's exit policy, unless otherwise specified: <strong>{STRUCTURE_LABELS.dishonorableExit[village.structure?.dishonorableExit] || '-'}</strong>.</li>
                <li>Per the village constitution, your exit notice period is <strong>{STRUCTURE_LABELS.exitNoticePeriod[village.structure?.exitNoticePeriod] || '-'}</strong>. Your membership remains active until that window has passed.</li>
              </ul>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmLeave(false)} className="btn btn-outline" style={{ fontSize: 11, padding: '10px 20px' }}>
                Cancel
              </button>
              <button
                onClick={() => { leaveVillage(village.id); onLeave?.() }}
                className="btn btn-terra"
                style={{ fontSize: 11, padding: '10px 20px' }}
              >
                Confirm: Leave village
              </button>
            </div>
          </div>
        )}
      </div>
      </>}

    </div>
  )
}
