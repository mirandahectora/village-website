import { ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'
import { useInView, revealStyle } from '../hooks/useInView'
import { FlickeringGrid } from '../components/ui/flickering-grid'
import { useMobile } from '../hooks/useMobile'

const TAM_DATA = [
  {
    label: 'Total Addressable Market',
    value: '$113B',
    sublabel: 'General population, U.S.',
    color: 'green',
    desc: '47 million adults who are credit invisible or unscoreable. Based on $100/month average savings rate for informal finance clubs (low-end estimate). Implies $2.03B ARR at Village\'s 1.8% average revenue rate.',
  },
  {
    label: 'Serviceable Addressable Market',
    value: '$3.5B',
    sublabel: 'Stage 1 launch markets',
    color: 'terra',
    desc: '1.45 million adults credit invisible or unscoreable in Stage 1 locations. Based on $100/month average savings rate for informal finance clubs (low-end estimate). Implies $63M ARR at Village\'s 1.8% average revenue rate.',
  },
  {
    label: 'Serviceable Obtainable Market',
    value: '$3M',
    sublabel: 'Year 1 Post-Launch Capture Goal',
    color: 'green',
    desc: 'Goal of 5,000 users across all Villages in Stage 1 locations. Based on $50/month average savings rate. Implies $54K ARR at Village\'s 1.8% average revenue rate.',
  },
]


const TIMELINE_PHASES = [
  {
    num: '01',
    phase: 'Found',
    color: 'green',
    milestones: [
      {
        date: 'Apr 2026',
        title: 'Legal Incorporation',
        desc: 'Incorporate, establish governance documents, and set up foundational banking relationships. Define the cooperative legal framework Village operates under.',
      },
      {
        date: 'June 2026',
        title: 'BaaS and Escrow Structure',
        desc: 'Partner with a Banking-as-a-Service provider and build the escrow infrastructure that sits beneath every village. Certify fund isolation and audit trail systems.',
      },
      {
        date: 'Jul 2026',
        title: 'Server & Ledger Deployment',
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
        date: 'Aug 2026',
        title: 'NYC/SF Testing Groups',
        desc: 'Closed alpha with invited community groups in New York and San Francisco. First real villages formed, first funds pooled.',
      },
      {
        date: 'Sep 2026',
        title: 'Recommendations System',
        desc: 'Developing a user/village recommendation system for future users interested in using Village, but which don\'t have an immediate social group to create a Village with. For use in public launch as seceondary feature.',
      },
      {
        date: 'Oct 2026',
        title: 'Waitlist Beta Launch',
        desc: 'Open the waitlist to the general public in New York and San Francisco. Begin community outreach and anchor partnership recruitment in all three cities.',
      },
    ],
  },
  {
    num: '03',
    phase: 'Grow',
    color: 'green',
    milestones: [
      {
        date: 'Jan 2027',
        title: 'LA/Boston Market Entries',
        desc: 'Expand into Los Angeles and Boston, targeting high-density communities with existing mutual aid infrastructure and underbanked populations.',
      },
      {
        date: 'Year 1',
        title: 'Solidify Market Participation',
        desc: 'Deepen presence across Stage 1 market areas as network effects take hold. Consolidate the user base and refine village governance models across active markets.',
      },
      {
        date: 'Year 2',
        title: 'Northeast, Midwest & West Coast Expansion',
        desc: 'Roll out to cities across the Northeast, Midwest, and West Coast, targeting high-density communities with existing mutual aid infrastructure.',
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
        title: 'Brokerage Account Villages',
        desc: 'Expand Village into direct investment: communities pool funds into shared brokerage accounts, voting democratically on allocations across stocks, index funds, and other instruments.',
      },
      {
        date: 'Year 4+',
        title: 'LATAM Expansion & Public-Private Partnerships',
        desc: 'Launch in Mexico City, São Paulo, Bogotá, Santo Domingo, San Juan, and other high-density ROSCA markets. Tanda cultural heritage makes adoption structurally natural. Pursue public-private partnerships to expand financial inclusion at scale.',
      },
    ],
  },
]


export default function Investors() {
  return (
    <main className="page">
      <InvestorHero />
      <TamSection />
      <TimelineSection />
      <InvestorCta />
    </main>
  )
}

function InvestorHero() {
  const isMobile = useMobile()
  return (
    <section style={{
      borderBottom: '1px solid var(--rule)',
      maxWidth: 1280, margin: '0 auto',
      display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
      borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
    }}>
      <div style={{
        padding: isMobile ? '48px 24px' : '80px 48px',
        borderRight: isMobile ? 'none' : '1px solid var(--rule)',
        borderBottom: isMobile ? '1px solid var(--rule)' : 'none',
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
      <div style={{ padding: isMobile ? '40px 24px' : '80px 64px' }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.6, marginBottom: 40, fontWeight: 400, maxWidth: 640 }}>
          Village is an early-stage cooperative finance platform targeting a $113B addressable market, beginning with 47M credit-invisible Americans and expanding globally.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="mailto:hector.miranda@yale.edu" className="btn btn-primary">
            Investor Inquiries <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

function TamSection() {
  const [ref, vis] = useInView()
  const isMobile = useMobile()
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      <div ref={ref} style={{
        maxWidth: 1280, margin: '0 auto', padding: isMobile ? '32px 24px' : '48px 32px',
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
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderTop: '1px solid var(--rule)',
      }}>
        {TAM_DATA.map((t, i) => {
          const [tRef, tVis] = useInView()
          const accent = t.color === 'green' ? 'var(--green)' : 'var(--terracotta)'
          return (
            <div key={i} ref={tRef} style={{
              borderRight: !isMobile ? '1px solid var(--rule)' : 'none',
              borderBottom: '1px solid var(--rule)',
              ...revealStyle(tVis, isMobile ? 0 : i * 100),
            }}>
              <div style={{ padding: isMobile ? '28px 24px 20px' : '36px 40px 28px', borderBottom: '1px solid var(--rule)', borderTop: `3px solid ${accent}` }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(44px, 4vw, 64px)', fontWeight: 900, color: accent, lineHeight: 1, marginBottom: 8 }}>{t.value}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em', marginBottom: 16 }}>{t.sublabel}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{t.label}</div>
              </div>
              <div style={{ padding: isMobile ? '20px 24px 28px' : '28px 40px 36px' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8 }}>{t.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        padding: isMobile ? '32px 24px' : '40px 56px',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 20 : 48, alignItems: 'center',
        background: 'var(--cream-mid)',
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 2 }}>
          Market context<br />
          <span style={{ color: 'var(--green)', fontSize: 28, fontFamily: 'var(--serif)', fontWeight: 700, letterSpacing: 0 }}>$50B+</span><br />
          South African stokvels alone, annually
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.8 }}>
          Financial clubs such as stokvels or rotating savings and credit associations (ROSCAs) operate in every country on earth. They are the dominant financial institution for billions of people, and they run on spreadsheets, WhatsApp, and trust. Village provides the technological and legal infrastructure that turns informal community savings into a regulated, scalable, and auditable financial system.
        </p>
      </div>
    </section>
  )
}



function TimelineSection() {
  const [ref, vis] = useInView()
  const isMobile = useMobile()
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      <div ref={ref} style={{
        maxWidth: 1280, margin: '0 auto', padding: isMobile ? '32px 24px' : '48px 32px',
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
  const isMobile = useMobile()
  const accent = phase.color === 'green' ? 'var(--green)' : 'var(--terracotta)'
  const accentBg = phase.color === 'green' ? 'rgba(42,74,30,0.06)' : 'rgba(192,80,48,0.06)'
  return (
    <div>
      <div ref={hRef} style={{
        display: 'grid', gridTemplateColumns: isMobile ? '56px 1fr' : '110px 1fr',
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
        <div style={{ padding: isMobile ? '16px 20px' : '20px 40px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <h3 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 1.8vw, 24px)',
            fontWeight: 900, color: accent, letterSpacing: '0.01em',
          }}>
            {phase.phase}
          </h3>
          <div style={{ height: 1, flex: 1, background: `${accent}30` }} />
        </div>
      </div>
      {phase.milestones.map((m, i) => <TimelineMilestone key={i} m={m} i={i} accent={accent} />)}
    </div>
  )
}

function TimelineMilestone({ m, i, accent }) {
  const [ref, vis] = useInView()
  const [checked, setChecked] = useState(false)
  const isMobile = useMobile()
  return (
    <div ref={ref} style={{
      display: 'grid', gridTemplateColumns: isMobile ? '56px 1fr' : '110px 1fr',
      borderBottom: '1px solid var(--rule)',
      ...revealStyle(vis, i * 80),
    }}>
      <div style={{
        borderRight: '1px solid var(--rule)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: 24, paddingBottom: 20, gap: 10,
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: isMobile ? 9 : 10, fontWeight: 500,
          color: accent, letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.4,
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
      <div style={{
        padding: isMobile ? '20px 20px 24px' : '28px 40px 32px',
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
  const isMobile = useMobile()
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: isMobile ? '32px 24px' : '48px 32px',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        position: 'relative', overflow: 'hidden',
      }}>
        <FlickeringGrid color="#2A4A1E" maxOpacity={0.1} flickerChance={0.06} squareSize={4} gridGap={6} />
        <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}>Get in touch</h2>
      </div>

      <div ref={ref} style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
        ...revealStyle(vis, 0),
      }}>
        <div style={{ padding: isMobile ? '40px 24px' : '64px 56px', borderRight: isMobile ? 'none' : '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            Investors
          </div>
          <h3 style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', lineHeight: 1.2, marginBottom: 16 }}>
            Looking to invest<br />in Village?
          </h3>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: 32 }}>
            We're raising a pre-seed round. If you invest at the intersection of fintech, cooperative economics, or financial inclusion, we'd like to talk.
          </p>
          <a href="mailto:hector.miranda@yale.edu" style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
            color: 'var(--green)', textDecoration: 'none',
            borderBottom: '1px solid var(--green)', paddingBottom: 2,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            hector.miranda@yale.edu <ArrowRight size={12} />
          </a>
        </div>

        <div style={{ padding: isMobile ? '40px 24px' : '64px 56px', borderBottom: '1px solid var(--rule)', background: 'var(--cream-mid)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--terracotta)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            Press & Media
          </div>
          <h3 style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', lineHeight: 1.2, marginBottom: 16 }}>
            Covering cooperative<br />finance?
          </h3>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: 32 }}>
            We're happy to speak on the record about Village, our operations, and the broader case for community-owned financial infrastructure.
          </p>
          <a href="mailto:richard.george@yale.edu" style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
            color: 'var(--terracotta)', textDecoration: 'none',
            borderBottom: '1px solid var(--terracotta)', paddingBottom: 2,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            richard.george@yale.edu <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  )
}
