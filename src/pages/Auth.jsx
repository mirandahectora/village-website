import { useState, useRef, useEffect } from 'react'
import US_CITIES from '../lib/usCities'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Eye, EyeOff, Check, Plus, X, Search, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const SIGNUP_STEPS = [
  { id: 1, label: 'Account', title: 'Create your account' },
  { id: 2, label: 'Profile', title: 'Your profile' },
  { id: 3, label: 'Income',  title: 'Income sources' },
  { id: 4, label: 'Debts',   title: 'Debt obligations' },
  { id: 5, label: 'Assets',  title: 'Assets & net worth' },
  { id: 6, label: 'Bank',    title: 'Connect your bank' },
  { id: 7, label: 'Done',    title: "You're all set" },
]

const GOAL_OPTIONS = [
  'Buy a home',
  'Pay off debt',
  'Build emergency fund',
  'Invest for retirement',
  'Fund a project or business',
  'Support my community',
  'Save for education',
  'Other',
]

const MOCK_BANKS = [
  'Ally Bank', 'American Express', 'Bank of America', 'Capital One',
  'Chase', 'Citibank', 'Discover', 'Marcus by Goldman Sachs',
  'Navy Federal', 'PNC Bank', 'SoFi', 'TD Bank', 'US Bank', 'Wells Fargo',
]

export const INCOME_VARS = [
  { key: 'wage_income',                      label: 'Wages / Salary' },
  { key: 'selfemp_income',                   label: 'Self-Employment' },
  { key: 'nontax_invest_income',             label: 'Non-Taxable Investment' },
  { key: 'interest_income',                  label: 'Interest' },
  { key: 'dividends_income',                 label: 'Dividends' },
  { key: 'stocks_bonds_income',              label: 'Stocks & Bonds' },
  { key: 'rent_trust_loyalty_income',        label: 'Rent / Trust / Royalties' },
  { key: 'unemployment_workercomp_income',   label: "Unemployment / Worker's Comp" },
  { key: 'childsupport_alimony_income',      label: 'Child Support / Alimony' },
  { key: 'tanf_ssi_foodstamp_income',        label: 'TANF / SSI / Food Stamps' },
  { key: 'pension_annulity_income',          label: 'Pension / Annuity' },
  { key: 'other_income',                     label: 'Other Income' },
]

export const DEBT_VARS = [
  { key: 'creditcard_debt',        label: 'Credit Card' },
  { key: 'storecard_debt',         label: 'Store Card' },
  { key: 'chargecard_debt',        label: 'Charge Card' },
  { key: 'mortgage1_debt',         label: 'Mortgage (Primary)' },
  { key: 'mortgage2_debt',         label: 'Mortgage (2nd)' },
  { key: 'mortgage3_debt',         label: 'Mortgage (3rd)' },
  { key: 'property1_debt',         label: 'Property Debt (1)' },
  { key: 'property2_debt',         label: 'Property Debt (2)' },
  { key: 'other_property_debt',    label: 'Other Property Debt' },
  { key: 'creditline1_debt',       label: 'Credit Line (1)' },
  { key: 'creditline2_debt',       label: 'Credit Line (2)' },
  { key: 'creditline3_debt',       label: 'Credit Line (3)' },
  { key: 'home_improvement_debt',  label: 'Home Improvement Loan' },
  { key: 'car1_debt',              label: 'Car Loan (1)' },
  { key: 'car2_debt',              label: 'Car Loan (2)' },
  { key: 'car3_debt',              label: 'Car Loan (3)' },
  { key: 'car4_debt',              label: 'Car Loan (4)' },
  { key: 'othervehicle1_debt',     label: 'Other Vehicle Loan (1)' },
  { key: 'othervehicle2_debt',     label: 'Other Vehicle Loan (2)' },
  { key: 'education1_debt',        label: 'Student Loan (1)' },
  { key: 'education2_debt',        label: 'Student Loan (2)' },
  { key: 'education3_debt',        label: 'Student Loan (3)' },
  { key: 'education4_debt',        label: 'Student Loan (4)' },
  { key: 'education5_debt',        label: 'Student Loan (5)' },
  { key: 'education6_debt',        label: 'Student Loan (6)' },
  { key: 'misc_loan1',             label: 'Misc. Loan (1)' },
  { key: 'misc_loan2',             label: 'Misc. Loan (2)' },
  { key: 'misc_loan3',             label: 'Misc. Loan (3)' },
  { key: 'misc_loan4',             label: 'Misc. Loan (4)' },
  { key: 'misc_loan5',             label: 'Misc. Loan (5)' },
  { key: 'misc_loan6',             label: 'Misc. Loan (6)' },
  { key: 'margin_line_debt',       label: 'Margin / Credit Line' },
  { key: 'misc_debt',              label: 'Miscellaneous Debt' },
]

export const ASSET_VARS = [
  { key: 'residence_worth',                    label: 'Primary Residence' },
  { key: 'mobilehome_worth',                   label: 'Mobile Home' },
  { key: 'farmranch_worth',                    label: 'Farm / Ranch' },
  { key: 'investmentproperty1_worth',          label: 'Investment Property (1)' },
  { key: 'investmentproperty2_worth',          label: 'Investment Property (2)' },
  { key: 'vacationproperty_worth',             label: 'Vacation Property' },
  { key: 'other_property_worth',               label: 'Other Property' },
  { key: 'othervehicle1_worth',                label: 'Vehicle (1)' },
  { key: 'othervehicle2_worth',                label: 'Vehicle (2)' },
  { key: 'checkings1_worth',                   label: 'Checking Account (1)' },
  { key: 'checkings2_worth',                   label: 'Checking Account (2)' },
  { key: 'checkings3_worth',                   label: 'Checking Account (3)' },
  { key: 'checkings4_worth',                   label: 'Checking Account (4)' },
  { key: 'checkings5_worth',                   label: 'Checking Account (5)' },
  { key: 'checkings6_worth',                   label: 'Checking Account (6)' },
  { key: 'other_checkings_worth',              label: 'Other Checking' },
  { key: 'savingsmma1_worth',                  label: 'Savings / MMA (1)' },
  { key: 'savingsmma2_worth',                  label: 'Savings / MMA (2)' },
  { key: 'savingsmma3_worth',                  label: 'Savings / MMA (3)' },
  { key: 'savingsmma4_worth',                  label: 'Savings / MMA (4)' },
  { key: 'savingsmma5_worth',                  label: 'Savings / MMA (5)' },
  { key: 'savingsmma6_worth',                  label: 'Savings / MMA (6)' },
  { key: 'other_savingsmma_worth',             label: 'Other Savings / MMA' },
  { key: 'cd_worth',                           label: 'Certificate of Deposit (CD)' },
  { key: 'stockfund_worth',                    label: 'Stock Fund' },
  { key: 'taxfree_bondfund_worth',             label: 'Tax-Free Bond Fund' },
  { key: 'govtback_bondfund_worth',            label: 'Govt-Backed Bond Fund' },
  { key: 'other_bondfund_worth',               label: 'Other Bond Fund' },
  { key: 'combo_mutualfund_worth',             label: 'Combined Mutual Fund' },
  { key: 'govt_savingsbonds_worth',            label: 'Government Savings Bonds' },
  { key: 'mortgagebacked_bonds_worth',         label: 'Mortgage-Backed Bonds' },
  { key: 'govt_bondsbills_worth',              label: 'Government Bonds / T-Bills' },
  { key: 'municipalstate_bonds_worth',         label: 'Municipal / State Bonds' },
  { key: 'public_stocks_worth',                label: 'Public Stocks' },
  { key: 'call_account_worth',                 label: 'Call Account' },
  { key: 'trust_worth',                        label: 'Trust' },
  { key: 'rothira_worth',                      label: 'Roth IRA' },
  { key: 'rollloverira_worth',                 label: 'Rollover IRA' },
  { key: 'regular_other_ira_worth',            label: 'Regular / Other IRA' },
  { key: 'pension_acconut_balance',            label: 'Pension Account Balance' },
  { key: 'keogh_worth',                        label: 'Keogh Plan' },
  { key: 'misc_asset1_worth',                  label: 'Misc. Asset (1)' },
  { key: 'misc_asset2_worth',                  label: 'Misc. Asset (2)' },
  { key: 'misc_asset3_worth',                  label: 'Misc. Asset (3)' },
  { key: 'managing_business1_share_worth',     label: 'Managing Business Share (1)' },
  { key: 'managing_business2_share_worth',     label: 'Managing Business Share (2)' },
  { key: 'other_managingbusiness_share_worth', label: 'Other Managing Business Share' },
  { key: 'partner_bussines_share_worth',       label: 'Partnership Business Share' },
  { key: 'other_partnerbussines_share_worth',  label: 'Other Partnership Share' },
  { key: 'llc_business_share_worth',           label: 'LLC Business Share' },
  { key: 'scorp_business_share_worth',         label: 'S-Corp Business Share' },
  { key: 'other_corpbusiness_share_worth',     label: 'Other Corp Business Share' },
  { key: 'life_policy_worth',                  label: 'Life Insurance Policy' },
  { key: 'other_share_worth',                  label: 'Other Share' },
  { key: 'loans_made_worth',                   label: 'Loans Made (Owed to You)' },
  { key: 'land_contract1_owed_worth',          label: 'Land Contract Owed (1)' },
  { key: 'land_contract2_owed_worth',          label: 'Land Contract Owed (2)' },
  { key: 'other_land_contract_owed_worth',     label: 'Other Land Contract Owed' },
]

export default function Auth() {
  const [params] = useSearchParams()
  const [mode, setMode] = useState(params.get('mode') === 'signup' ? 'signup' : 'login')
  return mode === 'login'
    ? <LoginForm onSwitch={() => setMode('signup')} />
    : <SignupFlow onSwitch={() => setMode('login')} />
}

/* ── LOGIN ─────────────────────────────────────── */
function LoginForm({ onSwitch }) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!email || !password) { setError('Please fill in all fields'); return }
    const ok = login(email, password)
    if (ok) navigate('/dashboard')
    else setError('Invalid credentials')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex' }}>
      {/* Left panel */}
      <div style={{
        flex: '0 0 480px', background: 'var(--green)', color: 'var(--cream)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '48px',
      }}>
        <Link to="/" style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700, color: 'var(--cream)', textDecoration: 'none' }}>
          Village
        </Link>
        <div>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 32, lineHeight: 1.3, fontWeight: 700, marginBottom: 24 }}>
            "Our village paid off two members' student debt in the first year."
          </p>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(244,238,226,0.5)', letterSpacing: '0.08em' }}>
            Amara T., New Haven Collective
          </div>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(244,238,226,0.3)', letterSpacing: '0.08em' }}>
          © 2026 Village Financial
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h1 style={{ fontSize: 36, marginBottom: 8 }}>Sign in</h1>
          <p style={{ fontFamily: 'var(--sans)', color: 'var(--ink-muted)', marginBottom: 40 }}>
            Don't have an account?{' '}
            <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: 'var(--green)', cursor: 'pointer', fontFamily: 'var(--sans)', fontWeight: 500, padding: 0 }}>
              Create one
            </button>
          </p>

          {error && (
            <div style={{ padding: '12px 16px', background: 'var(--terra-light)', border: '1px solid var(--terracotta)', marginBottom: 20, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--terracotta)' }}>
              {error}
            </div>
          )}

          <FormField label="Email address">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com" style={inputStyle} />
          </FormField>

          <FormField label="Password">
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" style={{ ...inputStyle, paddingRight: 48 }} />
              <button onClick={() => setShowPw(!showPw)} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)',
              }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </FormField>

          <button onClick={handleSubmit} className="btn btn-terra" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            Sign In <ArrowRight size={14} />
          </button>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
              Demo: any email + password works
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── SIGNUP FLOW ───────────────────────────────── */
function SignupFlow({ onSwitch }) {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    first_name: '', last_name: '', email: '', phone: '', password: '',
    location: '', bio: '', goals: [],
    income: [],
    debts: [],
    assets: [],
    bank: null,
  })

  const update = (key, val) => setData(prev => ({ ...prev, [key]: val }))

  const next = () => {
    if (step === 6) { signup(data); setStep(7) }
    else setStep(s => s + 1)
  }
  const back = () => setStep(s => s - 1)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex' }}>
      {/* Left panel */}
      <div style={{
        flex: '0 0 280px', background: 'var(--green)', color: 'var(--cream)',
        display: 'flex', flexDirection: 'column', padding: '48px',
        position: 'sticky', top: 0, height: '100vh',
      }}>
        <Link to="/" style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700, color: 'var(--cream)', textDecoration: 'none', marginBottom: 64 }}>
          Village
        </Link>

        <div style={{ flex: 1 }}>
          {SIGNUP_STEPS.map(s => {
            const done   = step > s.id
            const active = step === s.id
            return (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: done ? 'var(--cream)' : 'transparent',
                  border: done ? 'none' : active ? '2px solid var(--cream)' : '2px solid rgba(244,238,226,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {done
                    ? <Check size={14} color="var(--green)" strokeWidth={3} />
                    : <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: active ? 'var(--cream)' : 'rgba(244,238,226,0.4)' }}>{s.id}</span>
                  }
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: active ? 'var(--cream)' : done ? 'rgba(244,238,226,0.7)' : 'rgba(244,238,226,0.35)',
                  }}>{s.label}</div>
                  {active && <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'rgba(244,238,226,0.8)', marginTop: 2 }}>{s.title}</div>}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(244,238,226,0.4)', letterSpacing: '0.06em' }}>
          Already have an account?{' '}
          <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: 'rgba(244,238,226,0.7)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11 }}>
            Sign in
          </button>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '80px 64px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 560 }}>
          {/* Progress bar */}
          <div style={{ height: 3, background: 'var(--cream-dark)', marginBottom: 20, borderRadius: 2 }}>
            <div style={{
              height: '100%', background: 'var(--green)',
              width: `${((step - 1) / (SIGNUP_STEPS.length - 1)) * 100}%`,
              transition: 'width 0.4s ease', borderRadius: 2,
            }} />
          </div>

          {/* Demo disclaimer */}
          <div style={{ background: 'var(--sand)', border: '1px solid var(--terracotta)', borderRadius: 8, padding: '10px 14px', marginBottom: 36, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)' }}>
            <strong style={{ color: 'var(--terracotta)' }}>Demo mode</strong> — This is a prototype. No real accounts are created and no data is stored or shared.
          </div>

          {step === 1 && <StepAccount data={data} update={update} onNext={next} />}
          {step === 2 && <StepProfile data={data} update={update} onNext={next} onBack={back} />}
          {step === 3 && (
            <StepFinancial
              stepNum={3}
              title="Income sources"
              description="Add each income source and its annual amount. This is private and used for matching only. All information can be added or adjusted later."
              vars={INCOME_VARS}
              entries={data.income}
              onChange={val => update('income', val)}
              onNext={next}
              onBack={back}
              optional
            />
          )}
          {step === 4 && (
            <StepFinancial
              stepNum={4}
              title="Debt obligations"
              description="List your outstanding debts and current balances. This is private and used for matching only. All information can be added or adjusted later. Skip if none apply."
              vars={DEBT_VARS}
              entries={data.debts}
              onChange={val => update('debts', val)}
              onNext={next}
              onBack={back}
              optional
            />
          )}
          {step === 5 && (
            <StepFinancial
              stepNum={5}
              title="Assets & net worth"
              description="Add assets you own and their estimated value. This is private and used for matching only. All information can be added or adjusted later. Skip if none apply."
              vars={ASSET_VARS}
              entries={data.assets}
              onChange={val => update('assets', val)}
              onNext={next}
              onBack={back}
              optional
            />
          )}
          {step === 6 && <StepBank data={data} update={update} onNext={next} onBack={back} />}
          {step === 7 && <StepDone navigate={navigate} />}
        </div>
      </div>
    </div>
  )
}

/* ── STEP COMPONENTS ───────────────────────────── */
function StepAccount({ data, update, onNext }) {
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!data.first_name.trim()) e.first_name = 'Required'
    if (!data.last_name.trim()) e.last_name = 'Required'
    if (!data.email.trim()) {
      e.email = 'Required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = 'Enter a valid email address'
    }
    if (data.phone.trim() && !/^\+?[\d\s\-(). ]{10,}$/.test(data.phone)) {
      e.phone = 'Enter a valid phone number'
    }
    if (!data.password) {
      e.password = 'Required'
    } else if (data.password.length < 8) {
      e.password = 'At least 8 characters required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <>
      <h2 style={{ fontSize: 36, marginBottom: 8 }}>Create your account</h2>
      <p style={{ fontFamily: 'var(--sans)', color: 'var(--ink-muted)', marginBottom: 40 }}>
        You'll use this to access Village and your villages.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FormField label="First name" error={errors.first_name}>
          <input value={data.first_name} onChange={e => { update('first_name', e.target.value); setErrors(ev => ({ ...ev, first_name: null })) }}
            placeholder="Hector"
            style={{ ...inputStyle, borderColor: errors.first_name ? 'var(--terracotta)' : undefined }} />
        </FormField>
        <FormField label="Last name" error={errors.last_name}>
          <input value={data.last_name} onChange={e => { update('last_name', e.target.value); setErrors(ev => ({ ...ev, last_name: null })) }}
            placeholder="Miranda"
            style={{ ...inputStyle, borderColor: errors.last_name ? 'var(--terracotta)' : undefined }} />
        </FormField>
      </div>

      <FormField label="Email address" error={errors.email}>
        <input type="email" value={data.email} onChange={e => { update('email', e.target.value); setErrors(ev => ({ ...ev, email: null })) }}
          placeholder="you@email.com"
          style={{ ...inputStyle, borderColor: errors.email ? 'var(--terracotta)' : undefined }} />
      </FormField>

      <FormField label="Phone number (optional)" error={errors.phone}>
        <input type="tel" value={data.phone} onChange={e => { update('phone', e.target.value); setErrors(ev => ({ ...ev, phone: null })) }}
          placeholder="+1 (555) 000-0000"
          style={{ ...inputStyle, borderColor: errors.phone ? 'var(--terracotta)' : undefined }} />
      </FormField>

      <FormField label="Password" error={errors.password}>
        <div style={{ position: 'relative' }}>
          <input type={showPw ? 'text' : 'password'} value={data.password}
            onChange={e => { update('password', e.target.value); setErrors(ev => ({ ...ev, password: null })) }}
            placeholder="Min. 8 characters"
            style={{ ...inputStyle, paddingRight: 48, borderColor: errors.password ? 'var(--terracotta)' : undefined }} />
          <button onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)' }}>
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </FormField>

      <button onClick={() => { if (validate()) onNext() }} className="btn btn-terra" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
        Continue <ArrowRight size={14} />
      </button>
    </>
  )
}

function CityAutocomplete({ value, onChange }) {
  const [query, setQuery] = useState(value || '')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const matches = query.length >= 2
    ? US_CITIES.filter(c => c.toLowerCase().startsWith(query.toLowerCase())).slice(0, 8)
    : []

  const select = (city) => {
    setQuery(city)
    onChange(city)
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true) }}
        onFocus={() => { if (query.length >= 2) setOpen(true) }}
        placeholder="Brooklyn, NY"
        style={inputStyle}
        autoComplete="off"
      />
      {open && matches.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: 'var(--cream)', border: '1px solid var(--rule)',
          borderRadius: 2, zIndex: 50, overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        }}>
          {matches.map(city => (
            <div
              key={city}
              onMouseDown={() => select(city)}
              style={{
                padding: '10px 14px',
                fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)',
                cursor: 'pointer', borderBottom: '1px solid var(--rule)',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StepProfile({ data, update, onNext, onBack }) {
  const toggleGoal = (g) => {
    const goals = data.goals.includes(g)
      ? data.goals.filter(x => x !== g)
      : [...data.goals, g]
    update('goals', goals)
  }
  return (
    <>
      <h2 style={{ fontSize: 36, marginBottom: 8 }}>Your profile</h2>
      <p style={{ fontFamily: 'var(--sans)', color: 'var(--ink-muted)', marginBottom: 40 }}>
        Help your future village members get to know you. All fields are optional.
      </p>

      <FormField label="Location (City)">
        <CityAutocomplete value={data.location} onChange={v => update('location', v)} />
      </FormField>

      <FormField label="About you (Optional)">
        <textarea
          value={data.bio}
          onChange={e => update('bio', e.target.value)}
          placeholder="A sentence or two about your background, what you do, or what you're working toward…"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
        />
      </FormField>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12 }}>
          Financial goals (select all that apply)
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {GOAL_OPTIONS.map(g => {
            const active = data.goals.includes(g)
            return (
              <button
                key={g}
                type="button"
                onClick={() => toggleGoal(g)}
                style={{
                  padding: '8px 14px',
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.04em',
                  background: active ? 'var(--green)' : 'transparent',
                  color: active ? 'var(--cream)' : 'var(--ink)',
                  border: `1px solid ${active ? 'var(--green)' : 'var(--rule)'}`,
                  cursor: 'pointer', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                {active && <Check size={11} strokeWidth={3} />}
                {g}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} className="btn btn-outline" style={{ gap: 8 }}>
          <ArrowLeft size={14} /> Back
        </button>
        <button onClick={onNext} className="btn btn-terra" style={{ flex: 1, justifyContent: 'center' }}>
          Continue <ArrowRight size={14} />
        </button>
      </div>
    </>
  )
}

function StepBank({ data, update, onNext, onBack }) {
  const [step, setStep] = useState(data.bank ? 3 : 1)
  const [bankQuery, setBankQuery] = useState('')
  const [selectedBank, setSelectedBank] = useState(data.bank || '')

  const filtered = bankQuery.trim()
    ? MOCK_BANKS.filter(b => b.toLowerCase().includes(bankQuery.toLowerCase()))
    : MOCK_BANKS

  const handleSelect = (bank) => {
    setSelectedBank(bank)
    setStep(2)
    setTimeout(() => {
      update('bank', bank)
      setStep(3)
    }, 1800)
  }

  const handleRemove = () => {
    setSelectedBank('')
    update('bank', null)
    setBankQuery('')
    setStep(1)
  }

  return (
    <>
      <h2 style={{ fontSize: 36, marginBottom: 8 }}>Connect your bank</h2>
      <p style={{ fontFamily: 'var(--sans)', color: 'var(--ink-muted)', marginBottom: 24 }}>
        Linking a bank account lets Village handle contributions and payouts automatically.
        Your credentials are not stored by us.
        Although you may skip, you cannot participate in a village unless you have an account linked.
      </p>

      {/* Step 1 — search */}
      {step === 1 && (
        <>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
            <input
              autoFocus
              value={bankQuery}
              onChange={e => setBankQuery(e.target.value)}
              placeholder="Search banks…"
              style={{
                width: '100%', padding: '10px 12px 10px 34px',
                fontFamily: 'var(--mono)', fontSize: 12,
                background: 'var(--cream-mid)', border: '1px solid var(--rule)',
                borderRadius: 2, outline: 'none', color: 'var(--ink)',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ maxHeight: 240, overflowY: 'auto', border: '1px solid var(--rule)', borderRadius: 2, marginBottom: 24 }}>
            {filtered.map((bank, i) => (
              <button key={bank} onClick={() => handleSelect(bank)} style={{
                width: '100%', padding: '12px 16px', textAlign: 'left',
                background: 'none', border: 'none',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--rule)' : 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-mid)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--cream-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, color: 'var(--ink)',
                }}>{bank[0]}</div>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 14 }}>{bank}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: 16, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)' }}>
                No results for "{bankQuery}"
              </div>
            )}
          </div>
        </>
      )}

      {/* Step 2 — connecting */}
      {step === 2 && (
        <div style={{ textAlign: 'center', padding: '32px 0 40px' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--cream-dark)', color: 'var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700,
            margin: '0 auto 20px',
          }}>{selectedBank[0]}</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            Connecting to {selectedBank}…
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
            Verifying credentials securely
          </div>
        </div>
      )}

      {/* Step 3 — success */}
      {step === 3 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '16px 20px', border: '1px solid var(--green)',
          background: 'var(--cream)', marginBottom: 24,
        }}>
          <CheckCircle2 size={28} color="var(--green)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700 }}>{selectedBank} connected</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', marginTop: 2 }}>
              Account linked successfully ·{' '}
              <button onClick={handleRemove}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--terracotta)', padding: 0 }}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {step !== 2 && (
        <>
          <div style={{ padding: '14px 18px', background: 'var(--cream-mid)', border: '1px solid var(--rule)', marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.06em', marginBottom: 4 }}>SECURITY NOTE</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
              Village uses 256-bit encryption and read-only access. We can never initiate transfers without your explicit vote-authorized approval.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onBack} className="btn btn-outline" style={{ gap: 8 }}>
              <ArrowLeft size={14} /> Back
            </button>
            {step === 3 ? (
              <button onClick={onNext} className="btn btn-terra" style={{ flex: 1, justifyContent: 'center' }}>
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button onClick={onNext} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
                Skip <ArrowRight size={14} />
              </button>
            )}
          </div>
        </>
      )}
    </>
  )
}

function StepFinancial({ stepNum, title, description, vars, entries, onChange, onNext, onBack, optional = false }) {
  const addEntry   = () => onChange([...entries, { key: vars[0].key, amount: '' }])
  const removeEntry = i => onChange(entries.filter((_, idx) => idx !== i))
  const updateEntry = (i, field, val) => onChange(entries.map((e, idx) => idx === i ? { ...e, [field]: val } : e))

  return (
    <>
      <h2 style={{ fontSize: 36, marginBottom: 8 }}>{title}</h2>
      <p style={{ fontFamily: 'var(--sans)', color: 'var(--ink-muted)', marginBottom: 40 }}>
        {description}
      </p>

      {entries.length === 0 ? (
        <div style={{
          border: '1px dashed var(--rule)', padding: '32px', textAlign: 'center',
          fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)',
          letterSpacing: '0.06em', marginBottom: 16,
        }}>
          No entries yet. Add one below.
        </div>
      ) : (
        <div style={{ marginBottom: 16 }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 36px', gap: 10, marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Type</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Annual amount ($)</span>
            <span />
          </div>
          {entries.map((entry, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 36px', gap: 10, marginBottom: 10, alignItems: 'center' }}>
              <select
                value={entry.key}
                onChange={e => updateEntry(i, 'key', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer', padding: '11px 14px' }}
              >
                {vars.map(v => <option key={v.key} value={v.key}>{v.label}</option>)}
              </select>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--mono)', color: 'var(--ink-muted)', fontSize: 13 }}>$</span>
                <input
                  type="number"
                  min="0"
                  value={entry.amount}
                  onChange={e => updateEntry(i, 'amount', e.target.value)}
                  placeholder="0"
                  style={{ ...inputStyle, paddingLeft: 26, padding: '11px 14px 11px 26px' }}
                />
              </div>
              <button
                onClick={() => removeEntry(i)}
                style={{ width: 36, height: 44, background: 'none', border: '1px solid var(--rule)', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={addEntry}
        style={{
          background: 'none', border: '1px solid var(--rule)', padding: '10px 18px',
          cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
          color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40,
        }}
      >
        <Plus size={13} /> Add entry
      </button>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} className="btn btn-outline" style={{ gap: 8 }}>
          <ArrowLeft size={14} /> Back
        </button>
        {optional && entries.length === 0 ? (
          <button onClick={onNext} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
            Skip <ArrowRight size={14} />
          </button>
        ) : (
          <button onClick={onNext} className="btn btn-terra" style={{ flex: 1, justifyContent: 'center' }}>
            Continue <ArrowRight size={14} />
          </button>
        )}
      </div>
    </>
  )
}

function StepDone({ navigate }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: 40 }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 32px',
      }}>
        <Check size={32} color="var(--cream)" strokeWidth={2.5} />
      </div>
      <div className="tag tag-green" style={{ marginBottom: 24 }}>Account created</div>
      <h2 style={{ fontSize: 40, marginBottom: 16 }}>Welcome to Village.</h2>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 48, maxWidth: 380, margin: '0 auto 48px' }}>
        Your financial profile is ready. Explore open villages or wait to be matched.
      </p>
      <button onClick={() => navigate('/dashboard')} className="btn btn-terra" style={{ fontSize: 14, padding: '16px 40px' }}>
        Enter Dashboard <ArrowRight size={14} />
      </button>
    </div>
  )
}

/* ── Shared helpers ─────────────────────────────── */
function FormField({ label, children, error }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>
        {label}
      </label>
      {children}
      {error && (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--terracotta)', marginTop: 6, letterSpacing: '0.03em' }}>
          {error}
        </div>
      )}
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '13px 16px',
  fontFamily: 'var(--sans)', fontSize: 15,
  background: 'transparent',
  border: '1px solid var(--rule)',
  color: 'var(--ink)', outline: 'none',
  borderRadius: 2, transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}
