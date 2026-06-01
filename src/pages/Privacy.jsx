import { useMobile } from '../hooks/useMobile'

const SECTIONS = [
  {
    num: '1.',
    title: 'Information We Collect',
    content: (
      <>
        <p><strong>Information you provide through our interest form.</strong> The only personal information we collect is information you choose to submit through our voluntary interest form. Depending on the fields you complete, this may include:</p>
        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your location or ZIP code</li>
          <li>Any other information you choose to include in a message or comment field</li>
        </ul>
        <p>Providing this information is entirely voluntary. You can use the Site without submitting the interest form.</p>
        <p><strong>Information collected automatically.</strong> When you visit the Site, our hosting provider and any analytics tools we use may automatically collect limited technical information, such as your IP address, browser type, device information, pages viewed, and the date and time of your visit. This information is used to operate, secure, and improve the Site.</p>
        <p>We do not collect financial account information, government identifiers, or sensitive personal information through the Site.</p>
      </>
    ),
  },
  {
    num: '2.',
    title: 'How We Use Your Information',
    content: (
      <>
        <p>We use the information you submit to:</p>
        <ul>
          <li>Respond to your inquiry and contact you about Village;</li>
          <li>Notify you about updates, early access, or the availability of our product;</li>
          <li>Understand interest in our offering and improve the Site; and</li>
          <li>Comply with legal obligations.</li>
        </ul>
        <p>We will only use your information for the purposes for which you provided it, or for compatible purposes consistent with this policy.</p>
      </>
    ),
  },
  {
    num: '3.',
    title: 'How We Share Your Information',
    content: (
      <>
        <p>We do not sell, rent, or trade your personal information.</p>
        <p>We may share your information with service providers who help us operate the Site and manage communications, strictly to the extent necessary for them to perform services for us. These may include:</p>
        <ul>
          <li>Our website hosting provider (Netlify);</li>
          <li>Our form submission and email service providers (Google Workspace).</li>
        </ul>
        <p>These providers are authorized to use your information only as necessary to provide services to us.</p>
        <p>We may also disclose information if required by law, to comply with legal process, or to protect the rights, property, or safety of Village, our users, or others.</p>
      </>
    ),
  },
  {
    num: '4.',
    title: 'Data Retention',
    content: (
      <p>We retain the information you submit for as long as necessary to respond to your interest and communicate with you about Village, or as required by law. You may ask us to delete your information at any time using the contact details below.</p>
    ),
  },
  {
    num: '5.',
    title: 'Security',
    content: (
      <p>We take reasonable measures to protect the information you submit against loss, misuse, and unauthorized access. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>
    ),
  },
  {
    num: '6.',
    title: 'Your Privacy Choices and Rights',
    content: (
      <>
        <p>You may contact us at any time to access, correct, or delete the information you have submitted, or to opt out of further communications.</p>
        <p><strong>California residents.</strong> If you are a California resident, you may have the right to request access to the personal information we hold about you, request its deletion, and not be discriminated against for exercising these rights. We do not sell or share your personal information for cross-context behavioral advertising. To make a request, contact us using the details below.</p>
        <p><strong>Other jurisdictions.</strong> Depending on where you live, you may have additional rights over your personal information, including the rights to access, correct, delete, or restrict its use. We will honor these rights as required by applicable law.</p>
        <p>To exercise any of these rights, email us at the address in the "Contact Us" section. We may need to verify your identity before responding.</p>
      </>
    ),
  },
  {
    num: '7.',
    title: "Children's Privacy",
    content: (
      <p>The Site is not directed to children under the age of 16, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.</p>
    ),
  },
  {
    num: '8.',
    title: 'Third-Party Links',
    content: (
      <p>The Site may contain links to third-party websites. We are not responsible for the privacy practices of those sites, and we encourage you to review their privacy policies.</p>
    ),
  },
  {
    num: '9.',
    title: 'Changes to This Policy',
    content: (
      <p>We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. Material changes will be communicated through the Site. Your continued use of the Site after any change indicates your acceptance of the updated policy.</p>
    ),
  },
  {
    num: '10.',
    title: 'Contact Us',
    content: (
      <>
        <p>If you have questions about this Privacy Policy or wish to exercise your privacy rights, contact us at:</p>
        <p>
          <strong>Village Finance, Corp.</strong><br />
          Email:{' '}
          <a href="mailto:mirandahectora04@gmail.com" style={{ color: 'var(--green)', textDecoration: 'none', borderBottom: '1px solid var(--green)' }}>
            mirandahectora04@gmail.com
          </a>
        </p>
      </>
    ),
  },
]

const prose = {
  fontFamily: 'var(--sans)',
  fontSize: 15,
  color: 'var(--ink-muted)',
  lineHeight: 1.85,
}

export default function Privacy() {
  const isMobile = useMobile()
  const pad = isMobile ? '40px 24px' : '72px 80px'

  return (
    <main className="page">
      {/* Header */}
      <section style={{
        maxWidth: 1280, margin: '0 auto',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        padding: isMobile ? '48px 24px' : '80px 80px',
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 16 }}>
          Legal
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, marginBottom: 16 }}>
          Privacy Policy
        </h1>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
          Last updated: June 1, 2026
        </div>
      </section>

      {/* Preamble */}
      <section style={{
        maxWidth: 1280, margin: '0 auto',
        borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        padding: pad,
      }}>
        <p style={{ ...prose, maxWidth: 720 }}>
          Village Finance, Corp. ("Village," "we," "us," or "our") operates the website located at{' '}
          <a href="https://villagefinance.netlify.app" style={{ color: 'var(--green)', textDecoration: 'none', borderBottom: '1px solid var(--green)' }}>
            villagefinance.netlify.app
          </a>{' '}
          (the "Site"). This Privacy Policy explains what information we collect through the Site, how we use it, and the choices you have.
        </p>
        <p style={{ ...prose, maxWidth: 720, marginTop: 20 }}>
          This policy applies only to the Site. It does not cover any product, application, or service we may offer in the future, which will be governed by separate terms and privacy notices provided at that time.
        </p>
        <p style={{ ...prose, maxWidth: 720, marginTop: 20 }}>
          By using the Site or submitting information through it, you agree to the practices described in this policy.
        </p>
      </section>

      {/* Sections */}
      {SECTIONS.map((s, i) => (
        <section key={i} style={{
          maxWidth: 1280, margin: '0 auto',
          borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)',
          borderBottom: '1px solid var(--rule)',
          padding: pad,
          background: i % 2 === 1 ? 'var(--cream-mid)' : 'transparent',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? 16 : 48, maxWidth: 860 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>{s.num}</div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>{s.title}</h2>
            </div>
            <div style={{
              ...prose,
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <style>{`
                .privacy-content p { margin: 0; }
                .privacy-content ul { padding-left: 20px; margin: 0; display: flex; flex-direction: column; gap: 6px; }
                .privacy-content li { line-height: 1.7; }
                .privacy-content strong { color: var(--ink); font-weight: 600; }
              `}</style>
              <div className="privacy-content">{s.content}</div>
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
