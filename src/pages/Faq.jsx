import { FlickeringGrid } from '../components/ui/flickering-grid'
import { useInView, revealStyle } from '../hooks/useInView'

const FAQ = [
  {
    q: 'How is Village different from a credit union?',
    a: 'Credit unions are geographically bound with professional management. Village is a hub for peer-managed cooperatives not dependent on the location or profession of its members. Village provides the infrastructure; your village provides the decisions.',
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
    a: 'Our proprietary algorithm uses a 212-feature financial profile to identify compatible matches. It weighs similarity in goals and contribution capacity against complementarity across financial circumstances.',
  },
  {
    q: 'Does Village take a cut of investment returns?',
    a: 'No. Village only charges on contributions deposited, not on investment returns, interest, or any downstream value your village generates. Your upside is entirely yours.',
  },
]

export default function Faq() {
  const [refH, visH] = useInView()
  return (
    <main className="page">
      <section style={{ borderBottom: '1px solid var(--rule)' }}>
        <div ref={refH} style={{
          maxWidth: 1280, margin: '0 auto', padding: '48px 32px',
          borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
          display: 'flex', gap: 24, alignItems: 'baseline',
          position: 'relative', overflow: 'hidden',
          ...revealStyle(visH, 0),
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
    </main>
  )
}
