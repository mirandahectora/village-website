import { ArrowRight, TrendingUp, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useInView, revealStyle } from '../hooks/useInView'
import { FlickeringGrid } from '../components/ui/flickering-grid'

const TAM_DATA = [
  {
    label: 'Total Addressable Market',
    value: '$4.2T',
    sublabel: 'US consumer credit + cooperative finance',
    color: 'green',
    desc: '57M unbanked or underbanked Americans. $2.2T in credit union assets. A $15T consumer lending market structurally inaccessible to the communities that need it most.',
  },
  {
    label: 'Serviceable Addressable Market',
    value: '$380B',
    sublabel: 'Community cooperative finance segment',
    color: 'terra',
    desc: 'Informal savings circles, stokvels, ROSCAs, and credit cooperatives manage an estimated $380B globally, with virtually no digital infrastructure. Village is the infrastructure layer.',
  },
  {
    label: 'Serviceable Obtainable Market',
    value: '$2.1B',
    sublabel: '5-year target: US metro + LATAM',
    color: 'green',
    desc: 'New York, Chicago, San Francisco, Boston, Philadelphia, and LATAM expansion. Village targets the 18M adults in underbanked metro communities who already participate in informal savings groups.',
  },
]

const AUM_PROJECTIONS = [
  { year: 'Year 1', label: 'NYC Alpha', aum: '$12M',   users: '4,500',   villages: '320',  fee: '$240K',   pct: 6 },
  { year: 'Year 2', label: 'US Expansion', aum: '$110M',  users: '42,000',  villages: '2,900', fee: '$1.65M',  pct: 55 },
  { year: 'Year 3', label: 'National + LATAM', aum: '$520M',  users: '190,000', villages: '13,000', fee: '$5.2M',   pct: 100 },
  { year: 'Year 4', label: 'Scale', aum: '$1.4B',  users: '500,000', villages: '35,000', fee: '$10.5M',  pct: 100 },
  { year: 'Year 5', label: 'Mature Platform', aum: '$3.2B',  users: '1.1M',    villages: '80,000', fee: '$19.2M',  pct: 100 },
]

const TIMELINE_PHASES = [
  {
    num: '01',
    phase: 'Found',
    color: 'green',
    milestones: [
      {
        date: 'Apr 2026',
        title: 'Legal Structure',
        desc: 'Incorporate, establish governance documents, and set up foundational banking relationships. Define the cooperative legal framework Village operates under.',
      },
      {
        date: 'May 2026',
        title: 'Escrow & BaaS Setup',
        desc: 'Partner with a Banking-as-a-Service provider and build the escrow infrastructure that sits beneath every village. Certify fund isolation and audit trail systems.',
      },
      {
        date: 'Jul 2026',
        title: 'Algorithm Development',
        desc: '212-variable financial profile dataset. KNN matching with autoencoder architecture. Proprietary scoring model validated on synthetic population data across 12 demographic cohorts.',
      },
      {
        date: 'Oct 2026',
        title: 'Server Deployment',
        desc: 'Backend infrastructure live: API layer, democratic voting engine, member portal, and data pipeline all deployed and load-tested.',
      },
    ],
  },
  {
    num: '02',
    phase: 'Build',
    color: 'terra',
    milestones: [
      {
        date: 'Jan 2027',
        title: 'Alpha Deployment: NYC',
        desc: 'Closed alpha with invited community groups across the five boroughs. First real villages formed, first funds pooled.',
      },
      {
        date: 'Mar 2027',
        title: 'Community Group Testing',
        desc: 'Partner with unions, campus organizations, and immigrant networks for structured testing cycles. Collect qualitative and quantitative feedback on matching, governance, and payout flows.',
      },
      {
        date: 'Jun 2027',
        title: 'Algorithm & Service Recalibration',
        desc: 'Retrain matching models on real financial data and user behavior. Refine constitution templates, contribution flows, and democratic voting UX based on live usage.',
      },
      {
        date: 'Oct 2027',
        title: 'Public Waitlist Opens',
        desc: 'Open the waitlist to the general public in New York, San Francisco, and Boston. Begin community outreach and anchor partnership recruitment in all three cities.',
      },
    ],
  },
  {
    num: '03',
    phase: 'Grow',
    color: 'green',
    milestones: [
      {
        date: 'Feb 2028',
        title: 'Select Testing Groups',
        desc: 'Onboard screened cohorts from the waitlist in NYC, San Francisco, and Boston. Prioritise communities with existing trust structures: unions, faith groups, diaspora networks.',
      },
      {
        date: 'May 2028',
        title: 'Public Beta',
        desc: 'Open the platform to all waitlisted members across the three launch cities. Village is live for any qualified community group.',
      },
      {
        date: 'Nov 2028',
        title: 'Phase 2 City Expansion',
        desc: 'Roll out to Chicago, Austin, Atlanta, and Seattle, targeting high-density communities with existing mutual aid infrastructure and underbanked populations.',
      },
    ],
  },
  {
    num: '04',
    phase: 'Long Term',
    color: 'terra',
    milestones: [
      {
        date: 'Year 3',
        title: 'Reverse Credit Pilot',
        desc: 'Test the reverse credit model with mature villages: community-pooled liquidity drawn by members without incurring personal debt. The pooled fund as collateral. The community as underwriter.',
      },
      {
        date: 'Year 3–4',
        title: 'LATAM Expansion',
        desc: 'Launch in Mexico City, São Paulo, Bogotá, and other high-density ROSCA markets. Tanda cultural heritage makes adoption structurally natural.',
      },
      {
        date: 'Year 4–5',
        title: 'Africa & South Asia',
        desc: 'Enter markets with existing community finance traditions in South Africa and cooperative finance communities across India, Bangladesh, and the broader South Asian diaspora.',
      },
    ],
  },
]



export default function Investors() {
  return (
    <main className="page">
      <InvestorHero />
      <TamSection />
      <AumSection />
      <TimelineSection />
      <InvestorCta />
    </main>
  )
}

function InvestorHero() {
  return (
    <section style={{
      borderBottom: '1px solid var(--rule)',
      maxWidth: 1280, margin: '0 auto',
      display: 'grid', gridTemplateColumns: '1fr 2fr',
      borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
    }}>
      <div style={{
        padding: '80px 48px', borderRight: '1px solid var(--rule)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1.05, marginBottom: 24 }}>
            Building the<br />
            <em style={{ color: 'var(--terracotta)' }}>financial system</em><br />
            people deserve.
          </h1>
        </div>
      </div>
      <div style={{ padding: '80px 64px' }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.6, marginBottom: 40, fontWeight: 400, maxWidth: 640 }}>
          Village is an early-stage cooperative finance platform targeting the $380B informal savings market, beginning with 57M underbanked Americans and expanding globally.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--rule)', marginBottom: 40 }}>
          {[
            { label: 'Founded', value: '2025' },
            { label: 'Stage', value: 'Pre-Seed' },
            { label: 'HQ', value: 'NYC' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '24px 28px', borderRight: i < 2 ? '1px solid var(--rule)' : 'none' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="mailto:invest@village.finance" className="btn btn-primary">
            Investor Inquiries <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

function TamSection() {
  const [ref, vis] = useInView()
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      <div ref={ref} style={{
        maxWidth: 1280, margin: '0 auto', padding: '48px 32px',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        position: 'relative', overflow: 'hidden',
        ...revealStyle(vis, 0),
      }}>
        <FlickeringGrid color="#2A4A1E" maxOpacity={0.1} flickerChance={0.06} squareSize={4} gridGap={6} />
        <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}>Market Opportunity</h2>
      </div>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderTop: '1px solid var(--rule)',
      }}>
        {TAM_DATA.map((t, i) => {
          const [tRef, tVis] = useInView()
          const accent = t.color === 'green' ? 'var(--green)' : 'var(--terracotta)'
          return (
            <div key={i} ref={tRef} style={{
              borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
              ...revealStyle(tVis, i * 100),
            }}>
              <div style={{ padding: '36px 40px 28px', borderBottom: '1px solid var(--rule)', borderTop: `3px solid ${accent}` }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(44px, 4vw, 64px)', fontWeight: 900, color: accent, lineHeight: 1, marginBottom: 8 }}>{t.value}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em', marginBottom: 16 }}>{t.sublabel}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{t.label}</div>
              </div>
              <div style={{ padding: '28px 40px 36px' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8 }}>{t.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        padding: '40px 56px',
        display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'center',
        background: 'var(--cream-mid)',
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 2 }}>
          Market context<br />
          <span style={{ color: 'var(--green)', fontSize: 28, fontFamily: 'var(--serif)', fontWeight: 700, letterSpacing: 0 }}>$50B+</span><br />
          South African stokvels alone, annually
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.8 }}>
          Rotating savings and credit associations (ROSCAs) operate in every country on earth. They are the dominant financial institution for billions of people, and they run on spreadsheets, WhatsApp, and trust. Village provides the technological and legal infrastructure that turns informal community savings into a regulated, scalable, and auditable financial system.
        </p>
      </div>
    </section>
  )
}

function AumSection() {
  const [ref, vis] = useInView()
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      <div ref={ref} style={{
        maxWidth: 1280, margin: '0 auto', padding: '48px 32px',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        position: 'relative', overflow: 'hidden',
        ...revealStyle(vis, 0),
      }}>
        <FlickeringGrid color="#2A4A1E" maxOpacity={0.1} flickerChance={0.06} squareSize={4} gridGap={6} />
        <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}>AUM Projections</h2>
      </div>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
      }}>
        {AUM_PROJECTIONS.map((row, i) => {
          const [rRef, rVis] = useInView()
          const accent = i % 2 === 0 ? 'var(--green)' : 'var(--terracotta)'
          return (
            <div key={row.year} ref={rRef} style={{
              display: 'grid', gridTemplateColumns: '160px 140px 1fr 140px 160px',
              alignItems: 'center', gap: 0,
              borderBottom: '1px solid var(--rule)',
              ...revealStyle(rVis, i * 60),
            }}>
              <div style={{ padding: '28px 32px', borderRight: '1px solid var(--rule)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>{row.year}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em', marginTop: 4 }}>{row.label}</div>
              </div>
              <div style={{ padding: '28px 16px', borderRight: '1px solid var(--rule)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 900, color: accent }}>{row.aum}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.08em', marginTop: 4 }}>AUM</div>
              </div>
              <div style={{ padding: '28px 32px', borderRight: '1px solid var(--rule)' }}>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                  {i === 0 && 'NYC closed alpha: first real villages, first pooled funds.'}
                  {i === 1 && 'US city expansion across NYC, San Francisco, and Boston.'}
                  {i === 2 && 'National rollout plus LATAM pilot in Mexico City and São Paulo.'}
                  {i === 3 && 'Platform at scale: reverse credit pilot underway.'}
                  {i === 4 && 'Mature platform across US, LATAM, and early Africa & South Asia entry.'}
                </div>
              </div>
              <div style={{ padding: '28px 24px', borderRight: '1px solid var(--rule)', textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600 }}>{row.users}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.08em', marginTop: 4 }}>members</div>
              </div>
              <div style={{ padding: '28px 32px', textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600, color: accent }}>{row.fee}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.08em', marginTop: 4 }}>annual revenue</div>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
      }}>
        {/* Image panel */}
        <div style={{
          borderRight: '1px solid var(--rule)',
          minHeight: 280,
          overflow: 'hidden',
          background: 'var(--cream-mid)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src="/aum-visual.jpg"
            alt="Village community"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement.style.background = 'var(--cream-mid)'
            }}
          />
        </div>
        {/* Revenue model panel */}
        <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>
            REVENUE MODEL
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8 }}>
            Village earns 2% on pooled contributions (declining to 1% at scale). Revenue is non-extractive: no subscription, no exit fees. Projections assume conservative 40% annual member retention and 8% average income pooled.
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const [ref, vis] = useInView()
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      <div ref={ref} style={{
        maxWidth: 1280, margin: '0 auto', padding: '48px 32px',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        position: 'relative', overflow: 'hidden',
        ...revealStyle(vis, 0),
      }}>
        <FlickeringGrid color="#2A4A1E" maxOpacity={0.1} flickerChance={0.06} squareSize={4} gridGap={6} />
        <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}>Growth Timeline</h2>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        {TIMELINE_PHASES.map((phase) => <TimelinePhase key={phase.num} phase={phase} />)}
      </div>
    </section>
  )
}

function TimelinePhase({ phase }) {
  const [hRef, hVis] = useInView()
  const accent = phase.color === 'green' ? 'var(--green)' : 'var(--terracotta)'
  const accentBg = phase.color === 'green' ? 'rgba(42,74,30,0.06)' : 'rgba(192,80,48,0.06)'
  return (
    <div>
      {/* Phase header */}
      <div ref={hRef} style={{
        display: 'grid', gridTemplateColumns: '110px 1fr',
        borderBottom: '1px solid var(--rule)',
        background: accentBg,
        ...revealStyle(hVis, 0),
      }}>
        <div style={{
          borderRight: '1px solid var(--rule)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: accent, letterSpacing: '0.12em' }}>
            {phase.num}
          </span>
        </div>
        <div style={{ padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <h3 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 1.8vw, 24px)',
            fontWeight: 900, color: accent, letterSpacing: '0.01em',
          }}>
            {phase.phase}
          </h3>
          <div style={{ height: 1, flex: 1, background: `${accent}30` }} />
        </div>
      </div>
      {/* Milestones */}
      {phase.milestones.map((m, i) => <TimelineMilestone key={i} m={m} i={i} accent={accent} />)}
    </div>
  )
}

function TimelineMilestone({ m, i, accent }) {
  const [ref, vis] = useInView()
  const [checked, setChecked] = useState(false)
  return (
    <div ref={ref} style={{
      display: 'grid', gridTemplateColumns: '110px 1fr',
      borderBottom: '1px solid var(--rule)',
      ...revealStyle(vis, i * 80),
    }}>
      {/* Left gutter with date and checkbox */}
      <div style={{
        borderRight: '1px solid var(--rule)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: 30, paddingBottom: 24, gap: 12,
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500,
          color: accent, letterSpacing: '0.06em', textAlign: 'center', lineHeight: 1.4,
        }}>{m.date}</span>
        <button
          onClick={() => setChecked(c => !c)}
          title={checked ? 'Mark incomplete' : 'Mark complete'}
          style={{
            width: 20, height: 20,
            border: `1.5px solid ${checked ? accent : 'var(--rule)'}`,
            borderRadius: 4,
            background: checked ? accent : 'transparent',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0, flexShrink: 0,
            transition: 'background 0.15s, border-color 0.15s',
          }}
        >
          {checked && <Check size={12} color="var(--cream)" strokeWidth={3} />}
        </button>
      </div>
      {/* Content */}
      <div style={{
        padding: '28px 40px 32px',
        opacity: checked ? 0.45 : 1,
        transition: 'opacity 0.2s',
      }}>
        <h4 style={{ fontSize: 'clamp(14px, 1.3vw, 17px)', marginBottom: 10, lineHeight: 1.3 }}>{m.title}</h4>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8, maxWidth: 680 }}>{m.desc}</p>
      </div>
    </div>
  )
}


function InvestorCta() {
  const [ref, vis] = useInView()
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      {/* Header */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '48px 32px',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        position: 'relative', overflow: 'hidden',
      }}>
        <FlickeringGrid color="#2A4A1E" maxOpacity={0.1} flickerChance={0.06} squareSize={4} gridGap={6} />
        <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}>Get in touch</h2>
      </div>

      {/* Contact grid */}
      <div ref={ref} style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
        ...revealStyle(vis, 0),
      }}>
        {/* Investors */}
        <div style={{ padding: '64px 56px', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            Investors
          </div>
          <h3 style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', lineHeight: 1.2, marginBottom: 16 }}>
            Looking to invest<br />in Village?
          </h3>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: 32 }}>
            We're raising a pre-seed round. If you invest at the intersection of fintech, cooperative economics, or financial inclusion, we'd like to talk.
          </p>
          <a href="mailto:invest@village.finance" style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
            color: 'var(--green)', textDecoration: 'none',
            borderBottom: '1px solid var(--green)', paddingBottom: 2,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            invest@village.finance <ArrowRight size={12} />
          </a>
        </div>

        {/* Press */}
        <div style={{ padding: '64px 56px', borderBottom: '1px solid var(--rule)', background: 'var(--cream-mid)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--terracotta)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            Press & Media
          </div>
          <h3 style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', lineHeight: 1.2, marginBottom: 16 }}>
            Covering cooperative<br />finance?
          </h3>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: 32 }}>
            We're happy to speak on the record about Village, our operations, and the broader case for community-owned financial infrastructure.
          </p>
          <a href="mailto:press@village.finance" style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
            color: 'var(--terracotta)', textDecoration: 'none',
            borderBottom: '1px solid var(--terracotta)', paddingBottom: 2,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            press@village.finance <ArrowRight size={12} />
          </a>
        </div>

      </div>
    </section>
  )
}
