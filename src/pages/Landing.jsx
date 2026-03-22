import { useState } from 'react'
import { ArrowRight, Users, Shield, Vote, TrendingUp, UserCheck, DollarSign, Lock } from 'lucide-react'
import { useInView, revealStyle } from '../hooks/useInView'
import { Typewriter } from '../components/ui/typewriter'
import { FlickeringGrid } from '../components/ui/flickering-grid'


const STEPS = [
  {
    num: '01', title: 'Build your financial profile', color: 'green',
    icon: <UserCheck size={24} />,
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80',
    desc: 'Village collects a detailed financial snapshot of your income sources, debts, assets, and goals. This profile establishes your contribution capacity and anchors your village\'s shared priorities.',
  },
  {
    num: '02', title: 'Invite your community', color: 'terra',
    icon: <Users size={24} />,
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80',
    desc: 'Already part of a union, campus group, faith community, or diaspora network? Bring them with you. Village is built for groups that already trust each other.',
  },
  {
    num: '03', title: 'Form your village, set your constitution', color: 'green',
    icon: <Vote size={24} />,
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80',
    desc: 'Once your group is formed, members establish the rules together: contribution intervals, payout conditions, voting thresholds, and shared goals.',
  },
  {
    num: '04', title: 'Pool funds in escrow', color: 'terra',
    icon: <DollarSign size={24} />,
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80',
    desc: 'Members contribute on agreed intervals. All funds are held in escrow: transparent, auditable, and only released by democratic vote.',
  },
  {
    num: '05', title: 'Vote, allocate, and grow', color: 'green',
    icon: <TrendingUp size={24} />,
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80',
    desc: "Members vote democratically on allocations, whether to pay off a member's debt, invest in a shared portfolio, or save for a collective goal.",
  },
]


const FAQ = [
  {
    q: 'How is Village different from a credit union?',
    a: 'Credit unions are regulated institutions with professional management. Village is a peer-managed cooperative. Members govern everything directly. Village provides the infrastructure; your village provides the decisions.',
  },
  {
    q: 'Are there any fees beyond the contribution percentage?',
    a: 'No. Village charges a single percentage on pooled contributions. No monthly subscription, no joining fee, no withdrawal fee, no exit penalty.',
  },
  {
    q: "What if I don't have an existing community to bring?",
    a: "Village's matching algorithm pairs you with members who have compatible goals and similar financial circumstances, drawn from a detailed profile. You build the trust from there.",
  },
  {
    q: 'What happens if my village grows across a tier threshold?',
    a: "Your fee rate adjusts at the next contribution interval. You'll be notified when your village crosses into a new tier.",
  },
  {
    q: 'What if a member stops contributing?',
    a: 'Village constitutions establish non-contribution protocols. Most villages choose graduated warnings followed by a democratic vote to suspend or remove non-contributing members.',
  },
  {
    q: 'How are funds kept safe?',
    a: "All funds are held in escrow, separate from Village's operating accounts. No funds can be released without a democratic village vote. All transactions are fully auditable.",
  },
  {
    q: 'How does the matching algorithm work?',
    a: 'Our KNN algorithm uses a 212-feature financial profile to identify compatible matches. It weighs similarity in goals and contribution capacity against complementarity across financial circumstances.',
  },
  {
    q: 'Does Village take a cut of investment returns?',
    a: 'No. Village only charges on contributions deposited, not on investment returns, interest, or any downstream value your village generates. Your upside is entirely yours.',
  },
]

export default function Landing() {
  return (
    <main className="page">
      <HeroSection />
      <MarqueeBand />
      <WhatIsVillage />
      <StepsSection />
      <AlgorithmicMatchingSection />
      <FaqSection />
      <CtaSection />
    </main>
  )
}

function HeroSection() {
  return (
    <section style={{
      minHeight: 'calc(100vh - 116px)',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      borderBottom: '1px solid var(--rule)',
    }}>
      <div style={{
        padding: '40px 64px 80px 32px',
        borderRight: '1px solid var(--rule)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        minWidth: 0,
      }}>
        <h1 className="fade-up fade-up-2" style={{
          fontSize: 'clamp(52px, 6vw, 88px)', fontWeight: 900,
          lineHeight: 1.0, marginBottom: 0, letterSpacing: '-0.02em',
        }}>
          It takes a<br />
          <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>village</em> to
        </h1>
        <div className="fade-up fade-up-2" style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(52px, 6vw, 88px)', fontWeight: 900,
          lineHeight: 1.0, letterSpacing: '-0.02em',
          height: 'calc(2 * clamp(52px, 6vw, 88px) + 20px)',
          overflow: 'hidden',
          marginBottom: 32,
        }}>
          {' '}
          <Typewriter
            text={['build future wealth.', 'save money for emergencies.', 'pay off debts.', 'fund a project.', 'build something new.', 'be financially independent.', 'thrive.']}
            speed={70}
            waitTime={1800}
            deleteSpeed={40}
            cursorChar="_"
            style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}
          />
        </div>
        <p className="fade-up fade-up-3" style={{
          fontFamily: 'var(--sans)', fontSize: 18, color: 'var(--ink-muted)',
          lineHeight: 1.7, marginBottom: 0,
        }}>
          Village is built on a simple idea: the people around you are your most reliable financial resource.
          We give that trust a robust financial, legal, and democratic governance structure built to last.
        </p>
        <p className="fade-up fade-up-4" style={{
          fontFamily: 'var(--sans)', fontSize: 18, color: 'var(--ink-muted)',
          lineHeight: 1.7, marginTop: 24, marginBottom: 0,
        }}>
          Whether you are looking to invest, save up, pay debts, or start a project with others, Village provides the tools to make it happen.
        </p>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: 600 }}>
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85"
          alt="Community celebration"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.85)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(to right, rgba(196,186,168,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(196,186,168,0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
        <div style={{
          position: 'absolute', bottom: 24, right: 24,
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
          background: 'var(--cream)', color: 'var(--ink)', padding: '8px 14px', border: '1px solid var(--rule)',
        }}>Community pooling / NYC pilot</div>
      </div>
    </section>
  )
}

function MarqueeBand() {
  return (
    <div style={{
      background: 'var(--green)', color: 'var(--cream)', borderBottom: '1px solid var(--rule)',
      padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
    }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em' }}>
        Public waitlist opens <strong style={{ color: 'var(--cream)', fontWeight: 700 }}>Q3 2026</strong>, New York City
      </span>
      <span style={{ width: 1, height: 14, background: 'rgba(244,238,226,0.3)', display: 'inline-block' }} />
      <a href="#waitlist" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--cream)', textDecoration: 'none', borderBottom: '1px solid rgba(244,238,226,0.5)' }}>
        Join the list →
      </a>
      <span style={{ width: 3, height: 14, background: 'rgba(255, 255, 255, 0.3)', display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em' }}>
        Organizational partners for alpha testing wanted
      </span>
      <span style={{ width: 1, height: 14, background: 'rgba(244,238,226,0.3)', display: 'inline-block' }} />
      <a href="#partnerships" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--cream)', textDecoration: 'none', borderBottom: '1px solid rgba(244,238,226,0.5)' }}>
        For organizations →
      </a>
    </div>
  )
}


function WhatIsVillage() {
  const [ref, vis] = useInView()
  const [ref2, vis2] = useInView()
  const [refH, visH] = useInView()
  return (
    <section id="what-is-village" style={{ borderBottom: '1px solid var(--rule)' }}>
      <div ref={refH} style={{
        maxWidth: 1280, margin: '0 auto', padding: '48px 32px',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        position: 'relative', overflow: 'hidden',
        ...revealStyle(visH, 0),
      }}>
        <FlickeringGrid color="#2A4A1E" maxOpacity={0.1} flickerChance={0.06} squareSize={4} gridGap={6} />
        <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}>Our Features</h2>
      </div>
      <div ref={ref} style={{
        display: 'grid', gridTemplateColumns: '1fr 2fr',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
        maxWidth: 1280, margin: '0 auto',
      }}>
        <div style={{
          borderRight: '1px solid var(--rule)',
          display: 'flex', flexDirection: 'column',
          ...revealStyle(vis, 0),
        }}>
          <div style={{ padding: '80px 48px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 3vw, 44px)', marginBottom: 0 }}>
              What is<br /><em style={{ color: 'var(--terracotta)' }}>Village?</em>
            </h2>
          </div>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 280 }}>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
              alt="Community finance"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.65) sepia(0.08)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,26,20,0.4) 0%, transparent 50%)' }} />
          </div>
        </div>
        <div style={{ padding: '80px 64px', ...revealStyle(vis, 120) }} ref={ref2}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.6, marginBottom: 40, fontWeight: 400 }}>
            Village is a cooperative finance platform that lets you form financial clubs within your community, pool funds democratically, and work toward shared financial goals together.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {[
              { icon: <Users size={18} />, title: 'Your Village', desc: 'Villages are groups of 5–30 members working toward shared financial goals. Start one with people you know, or join an existing one.' },
              { icon: <Vote size={18} />, title: 'Democratic Control', desc: 'Once money enters a village, members vote on how to save, invest, and spend the funds.' },
              { icon: <Shield size={18} />, title: 'Escrow Security', desc: 'Village funds are held in escrow accounts through our BaaS partners, ensuring security, transparency, and auditability at all times.' },
              { icon: <TrendingUp size={18} />, title: 'Shared Growth', desc: 'Pooled funds go further. Members access returns and debt payoff at a scale that would be out of reach on their own.' },
              { icon: <Lock size={18} />, title: 'Your Data is Yours', desc: 'We don\'t own any financial data you share with us, and we will never sell or share it with other companies for profit. Full stop.' },
              { icon: <DollarSign size={18} />, title: 'We Win When You Win', desc: 'Village charges a small percentage on contributions. No subscription, no exit fee. We only get paid when your village does.' },
            ].map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function AlgorithmicMatchingSection() {
  const [ref, vis] = useInView()
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }} ref={ref}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderTop: '1px solid var(--rule)',
      }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
          minHeight: 480, ...revealStyle(vis, 0),
        }}>
          <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80" alt="People connecting"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.7)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(196,186,168,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(196,186,168,0.15) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          <div style={{
            position: 'absolute', bottom: 24, left: 24,
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
            background: 'var(--cream)', color: 'var(--ink)', padding: '8px 14px', border: '1px solid var(--rule)',
          }}>212-feature matching algorithm</div>
        </div>
        <div style={{ padding: '72px 64px', borderBottom: '1px solid var(--rule)', ...revealStyle(vis, 160) }}>
          <h2 style={{ fontSize: 'clamp(28px, 2.5vw, 38px)', marginBottom: 24 }}>
            We can find the right <br /><em style={{ color: 'var(--terracotta)' }}>village for you.</em>
          </h2>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: 32 }}>
            Village is designed first for communities that already exist: unions, campus groups, faith networks, diaspora circles. But not everyone has that ready-made social graph. For those who don't, our matching algorithm can build one.
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.8 }}>
            Our matching algorithm draws on 212 financial variables to find members with compatible goals, similar contribution capacity, and complementary financial circumstances. It builds the group; from there, the community takes over.
          </p>
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
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
        <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}>Join Us</h2>
      </div>

      {/* Waitlist row */}
      <div id="waitlist" ref={ref} style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
        ...revealStyle(vis, 0),
      }}>
        {/* Left: copy */}
        <div style={{ padding: '72px 64px', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
          <h3 style={{ fontSize: 'clamp(26px, 2.5vw, 38px)', lineHeight: 1.15, marginBottom: 24 }}>
            Be among the first to find your{' '}
            <em style={{ color: 'var(--green)' }}>village.</em>
          </h3>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.85, marginBottom: 16 }}>
            Village is launching in New York City. Waitlist members get early access, founding-member pricing, and the ability to form a village before the public launch.
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.85 }}>
            We'll be in touch when your spot opens.
          </p>
        </div>

        {/* Right: form */}
        <div style={{ padding: '72px 64px', borderBottom: '1px solid var(--rule)', background: 'var(--cream-mid)' }}>
          <WaitlistForm />
        </div>
      </div>

      {/* Partnerships row */}
      <div id="partnerships" style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 2fr',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
      }}>
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 280, borderRight: '1px solid var(--rule)' }}>
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
            alt="Partnership"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.65) sepia(0.08)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,26,20,0.3) 0%, transparent 60%)' }} />
        </div>

        {/* Content */}
        <div style={{ padding: '64px 64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <h3 style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', lineHeight: 1.2, margin: 0 }}>
              Want to work with us?
            </h3>
            <div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: 24, marginTop: 0 }}>
                Community organisations, credit unions, nonprofits, and financial educators: if our work overlaps with yours, reach out.
              </p>
              <a href="mailto:hello@village.finance" style={{
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
                color: 'var(--ink)', textDecoration: 'none',
                borderBottom: '1px solid var(--ink)', paddingBottom: 2,
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                hello@village.finance <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepsSection() {
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
        <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}>How It Works</h2>
      </div>
      {STEPS.map((step, i) => <StepRow key={step.num} step={step} i={i} />)}
    </section>
  )
}

function StepRow({ step, i }) {
  const [ref, vis] = useInView()
  const isEven = i % 2 === 1
  const accentColor = step.color === 'green' ? 'var(--green)' : 'var(--terracotta)'
  return (
    <div ref={ref} style={{
      maxWidth: 1280, margin: '0 auto',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderTop: '1px solid var(--rule)',
      ...revealStyle(vis, 0),
    }}>
      <div style={{
        order: isEven ? 2 : 1,
        padding: '64px',
        borderRight: isEven ? 'none' : '1px solid var(--rule)',
        borderLeft: isEven ? '1px solid var(--rule)' : 'none',
        borderBottom: '1px solid var(--rule)',
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 48, fontWeight: 300, color: 'var(--cream-dark)', lineHeight: 1, marginBottom: 24, letterSpacing: '-0.02em' }}>{step.num}</div>
        <h3 style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', marginBottom: 20, lineHeight: 1.2 }}>{step.title}</h3>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: 24 }}>{step.desc}</p>
      </div>
      <div style={{
        order: isEven ? 1 : 2,
        position: 'relative', overflow: 'hidden',
        borderRight: isEven ? '1px solid var(--rule)' : 'none',
        borderBottom: '1px solid var(--rule)', minHeight: 380,
      }}>
        <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.7)' }} />
        <div style={{ position: 'absolute', inset: 0, background: isEven ? 'linear-gradient(to right, rgba(192,80,48,0.12), transparent)' : 'linear-gradient(to left, rgba(42,74,30,0.12), transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(196,186,168,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(196,186,168,0.08) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
    </div>
  )
}


function FaqSection() {
  const [ref, vis] = useInView()
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      <div ref={ref} style={{
        maxWidth: 1280, margin: '0 auto', padding: '48px 32px',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        display: 'flex', gap: 24, alignItems: 'baseline',
        position: 'relative', overflow: 'hidden',
        ...revealStyle(vis, 0),
      }}>
        <FlickeringGrid color="#2A4A1E" maxOpacity={0.1} flickerChance={0.06} squareSize={4} gridGap={6} />
        <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', position: 'relative' }}>Common Questions</h2>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderTop: '1px solid var(--rule)' }}>
        {FAQ.map((item, i) => {
          const [ref, vis] = useInView()
          return (
            <div key={i} ref={ref} style={{ padding: '36px 48px', borderRight: i % 2 === 0 ? '1px solid var(--rule)' : 'none', borderBottom: '1px solid var(--rule)', ...revealStyle(vis, (i % 2) * 100) }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>{item.q}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8 }}>{item.a}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div style={{
      padding: '24px', border: '1px solid var(--rule)', background: 'var(--cream)', transition: 'border-color 0.2s, transform 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ color: 'var(--green)', marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6 }}>{desc}</div>
    </div>
  )
}

function WaitlistForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm(f => ({ ...f, [key]: e.target.value })),
  })

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    fontFamily: 'var(--mono)', fontSize: 13,
    background: 'var(--cream)', border: '1px solid var(--rule)',
    color: 'var(--ink)', outline: 'none', borderRadius: 2,
    boxSizing: 'border-box',
  }

  const labelStyle = {
    fontFamily: 'var(--mono)', fontSize: 10,
    color: 'var(--ink-muted)', letterSpacing: '0.1em',
    textTransform: 'uppercase', display: 'block', marginBottom: 8,
  }

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 12 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700 }}>You're on the list.</div>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
          We'll be in touch when your spot opens up. Welcome to Village.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
      style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>First name</label>
          <input type="text" placeholder="Jane" required style={inputStyle} {...field('firstName')} />
        </div>
        <div>
          <label style={labelStyle}>Last name</label>
          <input type="text" placeholder="Smith" required style={inputStyle} {...field('lastName')} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" placeholder="jane@example.com" required style={inputStyle} {...field('email')} />
      </div>
      <div>
        <label style={{ ...labelStyle }}>
          Phone <span style={{ opacity: 0.5, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
        </label>
        <input type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} {...field('phone')} />
      </div>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
        Join Us <ArrowRight size={14} />
      </button>
    </form>
  )
}
