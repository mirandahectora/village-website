import { FlickeringGrid } from '../components/ui/flickering-grid'
import { useInView, revealStyle } from '../hooks/useInView'

const TEAM = [
  {
    name: 'Richie George',
    focus: 'Co-founder, CXO',
    bio: 'Studies History and Philosophy at Yale. His work focuses on the history of public and private finance and liberal fiscal policy, and how democratic theory can redesign financial institutions from the ground up.',
    img: "/richie.png",
    position: "60% 29%",
    scale: 1.5
  },
  {
    name: 'Hector Miranda Plaza',
    focus: 'Co-founder, CXO',
    bio: 'Statistics, Data Science and Political Science at Yale, with a certificate in German. Brings deep expertise in statistical modelling, deep learning, and geographical systems across political, biomedical, and econometric fields.',
    img: "/hector.jpg",
    position: "center 20%"
  },
  {
    name: 'Matthew Diomidous',
    focus: 'Co-founder, CXO',
    bio: 'Statistics and Data Science at Yale. Academic research focuses on quantitative modelling and data-driven systems design, with strong interest in network dynamics, platform infrastructure, and governance mechanisms.',
    img: "/matt.jpeg",
    position: "center"
  },
]

export default function About() {
  return (
    <main className="page">

      {/* ── HEADER ──────────────────────────────────────── */}
      <section style={{
        borderBottom: '1px solid var(--rule)',
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 2fr',
        borderLeft: '1px solid var(--rule)',
        borderRight: '1px solid var(--rule)',
      }}>
        <div style={{
          padding: '80px 48px',
          borderRight: '1px solid var(--rule)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <h1 style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1.05, marginBottom: 24 }}>
            Built at Yale.<br />
            <em style={{ color: 'var(--terracotta)' }}>Made for Everyone.</em>
          </h1>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: 11,
            color: 'var(--ink-muted)', lineHeight: 1.8, letterSpacing: '0.06em',
          }}>
          </p>
        </div>

        <div style={{ padding: '80px 64px', position: 'relative', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
            alt="Students collaborating"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', filter: 'saturate(0.6)',
              opacity: 0.35,
            }}
          />
          <div style={{ position: 'relative' }}>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2vw, 28px)',
              lineHeight: 1.6, fontWeight: 400, maxWidth: 560,
            }}>
              "What if financial institutions didn't just serve communities?
              What if communities <em>were</em> the institutions?"
            </p>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11,
              color: 'var(--ink-muted)', letterSpacing: '0.08em',
              marginTop: 24,
            }}>The founding question, 2025</div>
          </div>
        </div>
      </section>

      {/* ── ORIGINS ─────────────────────────────────────── */}
      <OriginsSection />

      <MissionVisionSection />

      {/* ── TEAM ────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--rule)' }}>
        {/* Header */}
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '48px 32px',
          borderLeft: '1px solid var(--rule)',
          borderRight: '1px solid var(--rule)',
          borderBottom: '1px solid var(--rule)',
          display: 'flex', gap: 24, alignItems: 'baseline',
          position: 'relative', overflow: 'hidden',
        }}>
          <FlickeringGrid color="#2A4A1E" maxOpacity={0.1} flickerChance={0.06} squareSize={4} gridGap={6} />
          <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}> Meet the Team </h2>
        </div>

        {/* Team grid */}
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          borderLeft: '1px solid var(--rule)',
          borderRight: '1px solid var(--rule)',
          borderTop: '1px solid var(--rule)',
        }}>
          {TEAM.map((member) => (
            <TeamCard m={member} />
          ))}
        </div>
      </section>

      {/* ── JOIN THE TEAM ────────────────────────────────── */}
      <JoinTeamSection />


    </main>
  )
}

function JoinTeamSection() {
  const [ref, vis] = useInView()
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
        borderTop: '1px solid var(--rule)',
      }}>
        <div ref={ref} style={{
          padding: '72px 64px', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
          ...revealStyle(vis, 0),
        }}>
          <h2 style={{ fontSize: 'clamp(26px, 2.5vw, 36px)', marginBottom: 24 }}>
            Join the<br /><em style={{ color: 'var(--terracotta)' }}>founding team.</em>
          </h2>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: 16 }}>
            We're a small, early-stage team building serious financial infrastructure. If you want founding-level ownership and the chance to work on genuinely hard problems (matching algorithms, escrow systems, democratic governance tooling), we want to hear from you.
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.8 }}>
            Send your resume and a note on your preferred role to{' '}
            <a href="mailto:careers@village.finance" style={{ color: 'var(--green)', textDecoration: 'none', borderBottom: '1px solid var(--green)' }}>
              careers@village.finance
            </a>
            . We read everything.
          </p>
        </div>
        <div style={{
          padding: '72px 64px', borderBottom: '1px solid var(--rule)',
          background: 'var(--cream-mid)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32,
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Areas we're hiring in
          </div>
          {[
            { area: 'Engineering', detail: 'Full-stack, ML, fintech infrastructure' },
            { area: 'Product & Design', detail: 'Product management, UX design' },
            { area: 'Operations & Growth', detail: 'Community partnerships, compliance, analytics' },
          ].map((item, i) => (
            <div key={i} style={{ paddingTop: i > 0 ? 32 : 0, borderTop: i > 0 ? '1px solid var(--rule)' : 'none' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{item.area}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OriginsSection() {
  const [ref, vis] = useInView()
  const [refA, visA] = useInView()
  const [refC, visC] = useInView()
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      {/* Header */}
      <div ref={ref} style={{
        maxWidth: 1280, margin: '0 auto', padding: '48px 32px',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        position: 'relative', overflow: 'hidden',
        ...revealStyle(vis, 0),
      }}>
        <FlickeringGrid color="#2A4A1E" maxOpacity={0.1} flickerChance={0.06} squareSize={4} gridGap={6} />
        <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}>Origins</h2>
      </div>

      {/* Row 1: full-width opening */}
      <div ref={refA} style={{
        maxWidth: 1280, margin: '0 auto',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        padding: '72px 64px',
        ...revealStyle(visA, 0),
      }}>
        <p style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2vw, 28px)',
          lineHeight: 1.65, fontWeight: 400, maxWidth: 820,
        }}>
          Village started as a question in a seminar room at Yale in 2025: why does the financial
          system treat community trust as invisible, when it's the thing people actually rely on?
        </p>
      </div>

      {/* Row 2: two-column narrative */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
      }}>
        <div style={{
          borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
          position: 'relative', overflow: 'hidden', minHeight: 360,
        }}>
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
            alt="Community gathering"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, filter: 'saturate(0.6) sepia(0.08)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,26,20,0.35) 0%, transparent 60%)' }} />
        </div>

        <div ref={refC} style={{
          padding: '64px 64px',
          borderBottom: '1px solid var(--rule)',
          background: 'var(--cream-mid)',
          ...revealStyle(visC, 120),
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--terracotta)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            The decision
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.85, marginBottom: 20 }}>
            Village was founded to formalise that model: to give it matching infrastructure,
            democratic governance, and legal scaffolding strong enough that anyone could use it,
            not just those who already knew the right people.
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.85 }}>
            We are building the platform that the stokvel tradition, the tandas, the susus, and
            every informal lending circle deserves: one that scales without losing the thing that
            makes them work: accountability to each other.
          </p>
        </div>
      </div>
    </section>
  )
}

function MissionVisionSection() {
  const [ref, vis] = useInView()
  const [refM, visM] = useInView()
  const [refV, visV] = useInView()
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
        <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}>Mission & Vision</h2>
      </div>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
      }}>
        <div ref={refM} style={{
          padding: '72px 64px',
          borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
          ...revealStyle(visM, 0),
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>
            Mission
          </div>
          <h3 style={{ fontSize: 'clamp(22px, 2vw, 30px)', lineHeight: 1.25, marginBottom: 28 }}>
            Make cooperative finance accessible to{' '}
            <em style={{ color: 'var(--green)' }}>everyone.</em>
          </h3>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.85 }}>
            Village exists to give every person access to the kind of financial support that
            has always existed inside communities, but was never formalised, scaled, or made
            portable. We build infrastructure that turns mutual trust into mutual credit,
            regardless of credit history, zip code, or income.
          </p>
        </div>

        <div ref={refV} style={{
          padding: '72px 64px',
          borderBottom: '1px solid var(--rule)',
          background: 'var(--cream-mid)',
          ...revealStyle(visV, 100),
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--terracotta)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>
            Vision
          </div>
          <h3 style={{ fontSize: 'clamp(22px, 2vw, 30px)', lineHeight: 1.25, marginBottom: 28 }}>
            A world where communities are their own{' '}
            <em style={{ color: 'var(--terracotta)' }}>financial institutions.</em>
          </h3>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.85 }}>
            We envision a financial system where the primary unit of trust is the community,
            not the corporation. Where lending decisions are made by people who know each other,
            governed democratically, and accountable to members, not to shareholders or
            regulators with no stake in the outcome.
          </p>
        </div>
      </div>
    </section>
  )
}

function TeamCard({ m }) {
  return (
    <div style={{
      borderRight: '1px solid var(--rule)',
      borderBottom: '1px solid var(--rule)',
      overflow: 'hidden',
    }}>
      <div style={{ height: 260, overflow: 'hidden', position: 'relative' }}>
        <img src={m.img} alt={m.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: m.position || 'center', transform: `scale(${m.scale || 1})`, transformOrigin: m.position || 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
        }} />
        <div style={{
          position: 'absolute', bottom: 16, left: 20,
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'rgba(244,238,226,0.7)', letterSpacing: '0.1em',
        }}>{m.id}</div>
      </div>

      <div style={{ padding: '28px 28px 36px' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
          {m.name}
        </div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'var(--terracotta)', letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: 8,
        }}>{m.focus}</div>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: 13,
          color: 'var(--ink-muted)', lineHeight: 1.7,
          marginBottom: 20,
        }}>{m.bio}</p>
      </div>
    </div>
  )
}
