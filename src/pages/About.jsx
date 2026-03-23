import { FlickeringGrid } from '../components/ui/flickering-grid'
import { useInView, revealStyle } from '../hooks/useInView'

const TEAM = [
  {
    name: 'Richie George',
    focus: 'Co-founder, CXO',
    bio: 'B.A. in History and B.A. Philosophy at Yale. I study how public finance has shaped communities in the U.S. and abroad and how democratic theory can rethink local and global finance for the twenty-first century. I also bring expertise from quantitative approaches in cognitive science and public health.',
    img: "/richie.png", 
    position: "60% 29%",
    scale: 1.5
  },
  {
    name: 'Héctor Miranda Plaza',
    focus: 'Co-founder, CXO',
    bio: 'B.A. in Statistics & Data Science and B.A. in Political Science at Yale. I have professional experience with statistical modeling, deep learning, and geographical systems across political, biomedical, and econometric fields. I also study decision-making theory, opinion formation, and governance structures in democratic societies.',
    img: "/hector.jpg",
    position: "center 20%"
  },
  {
    name: 'Matthew Diomidous',
    focus: 'Co-founder, CXO',
    bio: 'B.S. in Statistics & Data Science at Yale. I have academic experience in quantitative modeling and data-driven systems design, with a strong interest in network dynamics, platform infrastructure, and governance mechanisms. I also explore how data-driven insights can inform strategic decision-making and organizational behavior.',
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
        </div>

        <div style={{ padding: '80px 64px', background: 'var(--green)', display: 'flex', alignItems: 'center' }}>
          <div>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2vw, 28px)',
              lineHeight: 1.6, fontWeight: 400, maxWidth: 560, color: 'var(--cream)',
            }}>
              "What if financial institutions didn't just serve communities?
              What if communities <em>were</em> the institutions?"
            </p>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11,
              color: 'rgba(244,238,226,0.6)', letterSpacing: '0.08em',
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
            <TeamCard key={member.name} m={member} />
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
            We're a small, early-stage team building serious financial infrastructure. If you want to work on hard problems about the future of finance with big social impact, we want to hear from you.
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
            { area: 'Engineering', detail: 'Full-stack, ML, fintech infrastructure, security and cryptography' },
            { area: 'Product & Design', detail: 'Product management, marketing, UX/UI design' },
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
            Our Answer
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.85, marginBottom: 20 }}>
            Village was founded to formalize a model of collective finance in the tradition of the stokvels, the tandas, the susus, and
            every informal lending circle in the world. By giving it matching infrastructure,
            democratic governance, and strong legal scaffolding, Village ensures that everyone can power to achieve financial freedom, 
            not just those who already know the right people. 
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.85 }}>
            We are building a platform that democratizees finance, to put the power of financial decision-making back into the hands of
            the many, not just the few.
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
            Make cooperative finance available to{' '}
            <em style={{ color: 'var(--green)' }}>everyone.</em>
          </h3>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.85 }}>
            Village exists to give every person access to the financial support that
            has always existed in communities, but was never formalized, scaled, or accessible from any location.
            We build infrastructure that turns mutual trust into mutual credit,
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
            not the corporation. Where financial decisions are made by people who know each other,
            in groups governed democratically and accountable to members.
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
