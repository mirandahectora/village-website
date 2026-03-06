import { useState, useEffect, useRef } from "react";
import { Home, Plus, Globe, Users, Settings, Handshake, ShieldCheck, Vote, Brain, BarChart3, RefreshCcw, Search, MapPin, DollarSign, Link2, ArrowRight, LogOut, Send, Trash2, ChevronDown, Eye, EyeOff, User, Mail, Hash, X, TrendingUp, Umbrella, PiggyBank, CreditCard } from "lucide-react";

// ─── Data Constants ───────────────────────────────────────────────────────────
const INCOME_CATEGORIES = [
  { key: "wage_income", label: "Wage Income" },
  { key: "selfemp_income", label: "Self-Employment Income" },
  { key: "nontax_invest_income", label: "Non-Taxable Investment Income" },
  { key: "interest_income", label: "Interest Income" },
  { key: "dividends_income", label: "Dividends Income" },
  { key: "stocks_bonds_income", label: "Stocks & Bonds Income" },
  { key: "rent_trust_loyalty_income", label: "Rent / Trust / Royalty Income" },
  { key: "unemployment_workercomp_income", label: "Unemployment / Worker's Comp" },
  { key: "childsupport_alimony_income", label: "Child Support / Alimony" },
  { key: "tanf_ssi_foodstamp_income", label: "TANF / SSI / Food Stamps" },
  { key: "pension_annulity_income", label: "Pension / Annuity Income" },
  { key: "other_income", label: "Other Income" },
];

const DEBT_CATEGORIES = [
  { key: "creditcard_debt", label: "Credit Card Debt" },
  { key: "storecard_debt", label: "Store Card Debt" },
  { key: "chargecard_debt", label: "Charge Card Debt" },
  { key: "mortgage_debt", label: "Mortgage", multi: 3 },
  { key: "property_debt", label: "Property Debt", multi: 2 },
  { key: "other_property_debt", label: "Other Property Debt" },
  { key: "creditline_debt", label: "Credit Line", multi: 3 },
  { key: "home_improvement_debt", label: "Home Improvement Loan" },
  { key: "car_debt", label: "Auto Loan", multi: 4 },
  { key: "othervehicle_debt", label: "Other Vehicle Loan", multi: 2 },
  { key: "education_debt", label: "Education / Student Loan", multi: 6 },
  { key: "misc_loan", label: "Miscellaneous Loan", multi: 6 },
  { key: "margin_line_debt", label: "Margin / Line Debt" },
  { key: "misc_debt", label: "Miscellaneous Debt" },
];

const ASSET_CATEGORIES_GROUPED = [
  {
    group: "Real Estate",
    items: [
      { key: "residence_worth", label: "Primary Residence" },
      { key: "mobilehome_worth", label: "Mobile Home" },
      { key: "farmranch_worth", label: "Farm / Ranch" },
      { key: "investmentproperty_worth", label: "Investment Property", multi: 2 },
      { key: "vacationproperty_worth", label: "Vacation Property" },
      { key: "other_property_worth", label: "Other Property" },
    ],
  },
  {
    group: "Vehicles",
    items: [
      { key: "othervehicle_worth", label: "Vehicle", multi: 2 },
    ],
  },
  {
    group: "Bank Accounts",
    items: [
      { key: "checkings_worth", label: "Checking Account", multi: 6 },
      { key: "other_checkings_worth", label: "Other Checking Accounts" },
      { key: "savingsmma_worth", label: "Savings / MMA", multi: 6 },
      { key: "other_savingsmma_worth", label: "Other Savings / MMA" },
      { key: "cd_worth", label: "Certificate of Deposit (CD)" },
    ],
  },
  {
    group: "Investments",
    items: [
      { key: "stockfund_worth", label: "Stock Fund" },
      { key: "taxfree_bondfund_worth", label: "Tax-Free Bond Fund" },
      { key: "govtback_bondfund_worth", label: "Govt-Backed Bond Fund" },
      { key: "other_bondfund_worth", label: "Other Bond Fund" },
      { key: "combo_mutualfund_worth", label: "Combo / Mutual Fund" },
      { key: "govt_savingsbonds_worth", label: "Govt Savings Bonds" },
      { key: "mortgagebacked_bonds_worth", label: "Mortgage-Backed Bonds" },
      { key: "govt_bondsbills_worth", label: "Govt Bonds / Bills" },
      { key: "municipalstate_bonds_worth", label: "Municipal / State Bonds" },
      { key: "public_stocks_worth", label: "Public Stocks" },
      { key: "call_account_worth", label: "Call Account" },
    ],
  },
  {
    group: "Retirement",
    items: [
      { key: "rothira_worth", label: "Roth IRA" },
      { key: "rollloverira_worth", label: "Rollover IRA" },
      { key: "regular_other_ira_worth", label: "Regular / Other IRA" },
      { key: "pension_account_balance", label: "Pension Account Balance" },
      { key: "keogh_worth", label: "Keogh Plan" },
    ],
  },
  {
    group: "Business Interests",
    items: [
      { key: "managing_business_share_worth", label: "Managing Business Share", multi: 2 },
      { key: "other_managingbusiness_share_worth", label: "Other Managing Business Share" },
      { key: "partner_business_share_worth", label: "Partner Business Share" },
      { key: "other_partnerbusiness_share_worth", label: "Other Partner Business Share" },
      { key: "llc_business_share_worth", label: "LLC Business Share" },
      { key: "scorp_business_share_worth", label: "S-Corp Business Share" },
      { key: "other_corpbusiness_share_worth", label: "Other Corp Business Share" },
    ],
  },
  {
    group: "Other Assets",
    items: [
      { key: "trust_worth", label: "Trust" },
      { key: "life_policy_worth", label: "Life Insurance Policy" },
      { key: "other_share_worth", label: "Other Shares" },
      { key: "loans_made_worth", label: "Loans Made to Others" },
      { key: "land_contract_owed_worth", label: "Land Contract Owed", multi: 2 },
      { key: "other_land_contract_owed_worth", label: "Other Land Contract Owed" },
      { key: "misc_asset_worth", label: "Miscellaneous Asset", multi: 3 },
    ],
  },
];


const TEAM_PHOTOS = {
  richie: "/richie.jpg",
  matt: "/matt.jpg",
  hector: "/hector.jpg",
};
const TEAM = [
  {
    name: "Richie George",
    role: "Co-Founder",
    desc: "History & Philosophy. Background in public/private finance history, liberal fiscal policy, social science research, legal research, and democratic theory.",
    photoKey: "richie",
  },
  {
    name: "Matt Diomidous",
    role: "Co-Founder",
    desc: "Statistics & Data Science. Academic research in quantitative modeling and data-driven systems design. Focus on network dynamics, platform infrastructure, and governance.",
    photoKey: "matt",
  },
  {
    name: "Héctor Miranda Plaza",
    role: "Co-Founder",
    desc: "Statistics & Data Science and Political Science. Background in statistical, deep learning, and geographical modelling across political, biomedical, and econometric fields.",
    photoKey: "hector",
  },
];

const MOCK_VILLAGES = [
  { id: 1, name: "Debt Crushers NYC", desc: "Focused on eliminating student loans together.", members: 12, pool: 14200, goal: "Pay Debt", match: 96, zip: "10001" },
  { id: 2, name: "Retirement Savers Union", desc: "Long-term retirement pooling for 30-somethings.", members: 8, pool: 32500, goal: "Retire", match: 88, zip: "10003" },
  { id: 3, name: "Brooklyn Investors Club", desc: "Small-cap stock picks and collective investment.", members: 15, pool: 21000, goal: "Invest", match: 83, zip: "11201" },
  { id: 4, name: "Rainy Day Fund", desc: "Emergency savings cooperative.", members: 6, pool: 8900, goal: "Save", match: 79, zip: "10012" },
  { id: 5, name: "Homeowners Collective", desc: "Pooling for down payments on first homes.", members: 10, pool: 45000, goal: "Save", match: 74, zip: "10016" },
];

const VILLAGE_DATA = {
  1: {
    name: "Debt Crushers NYC", desc: "Focused on eliminating student loans together. Pool contributions every 1st of the month.",
    members: ["Alana R.", "Marcus T.", "Sofia L.", "James W.", "Priya K.", "Devon C.", "You", "Nina M.", "Raj P.", "Leo K.", "Tara S.", "Chris W."],
    decisions: [
      { id: 1, title: "Allocate $500 to Alana's student loan", yes: 9, no: 2, status: "Passed" },
      { id: 2, title: "Increase monthly contribution to $150", yes: 7, no: 4, status: "Passed" },
      { id: 3, title: "Invest surplus in index fund", yes: 5, no: 6, status: "Failed" },
    ],
    chat: [
      { user: "Alana R.", msg: "Thanks everyone for the vote! One loan down ", time: "2:14 PM" },
      { user: "Marcus T.", msg: "Great progress this month. Should we discuss next allocation?", time: "2:20 PM" },
      { user: "Sofia L.", msg: "I think we should revisit the index fund idea with new numbers.", time: "2:35 PM" },
      { user: "You", msg: "Agreed — let's schedule a vote for Friday.", time: "3:01 PM" },
    ],
    pool: [
      { month: "Jan", amount: 2400 }, { month: "Feb", amount: 5100 }, { month: "Mar", amount: 7800 },
      { month: "Apr", amount: 9200 }, { month: "May", amount: 11500 }, { month: "Jun", amount: 14200 },
    ],
  },
  2: {
    name: "Retirement Savers Union", desc: "Long-term retirement pooling for 30-somethings. Quarterly rebalancing.",
    members: ["You", "Kenji H.", "Tania B.", "Omar S.", "Elise P.", "Noah D.", "Ava G.", "Liam F."],
    decisions: [
      { id: 10, title: "Rebalance to 60/40 stocks/bonds split", yes: 6, no: 2, status: "Passed" },
      { id: 11, title: "Add international fund exposure", yes: 4, no: 4, status: "Failed" },
    ],
    chat: [
      { user: "Kenji H.", msg: "Q2 rebalance went smoothly.", time: "10:00 AM" },
      { user: "Tania B.", msg: "Our returns are looking solid this quarter.", time: "10:15 AM" },
      { user: "You", msg: "Agreed, let's keep this allocation for now.", time: "11:02 AM" },
    ],
    pool: [
      { month: "Jan", amount: 4000 }, { month: "Feb", amount: 8200 }, { month: "Mar", amount: 12500 },
      { month: "Apr", amount: 17800 }, { month: "May", amount: 24100 }, { month: "Jun", amount: 32500 },
    ],
  },
};

const MEMBER_COLORS = [
  "#4a7c5f", "#7a5c3a", "#5a4a7c", "#7c4a5a", "#3a6a7a",
  "#6a7a3a", "#7a3a5a", "#3a5a7a", "#5a7a4a", "#7a6a3a",
  "#4a5a7c", "#6a4a7a",
];

const MOCK_PEOPLE = [
  { id: 1, name: "Alana R.", username: "alana_r", goal: "Pay Debt", match: 94, zip: "10001" },
  { id: 2, name: "Marcus T.", username: "marc_t", goal: "Invest", match: 91, zip: "10003" },
  { id: 3, name: "Sofia L.", username: "sofia_l", goal: "Save", match: 88, zip: "10012" },
  { id: 4, name: "James W.", username: "jamesw", goal: "Retire", match: 85, zip: "10010" },
  { id: 5, name: "Priya K.", username: "priya_k", goal: "Pay Debt", match: 82, zip: "10002" },
  { id: 6, name: "Devon C.", username: "devon_c", goal: "Invest", match: 79, zip: "10016" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Young+Serif&family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

:root {
  --pine: #264233;
  --pine-light: #356B4A;
  --moss: #4A7B5F;
  --sage: #8AAE93;
  --sage-light: #B8D4BF;
  --sand: #E4D5BE;
  --linen: #F4EDE2;
  --parchment: #FEFAF3;
  --terracotta: #C06B45;
  --terra-light: #D89070;
  --terra-deep: #A0533A;
  --bark: #2C2621;
  --bark-mid: #4A433B;
  --stone: #827A6E;
  --stone-light: #A89E92;
  --white: #FFFDF8;
  --green-soft: #5A8A5F;
  --red-soft: #B86A5A;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Karla', sans-serif;
  background: var(--linen);
  color: var(--bark);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Grain overlay — warm, tactile */
.grain {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 9999; opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Stagger animations */
@keyframes revealUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
.anim-reveal { animation: revealUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
.anim-d1 { animation-delay: 0.08s; }
.anim-d2 { animation-delay: 0.16s; }
.anim-d3 { animation-delay: 0.24s; }
.anim-d4 { animation-delay: 0.32s; }
.anim-d5 { animation-delay: 0.40s; }

/* ══════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════ */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 52px;
  background: linear-gradient(180deg, rgba(244,237,226,0.95) 0%, rgba(244,237,226,0.88) 100%);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(38,66,51,0.05);
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.navbar.scrolled {
  padding: 13px 52px;
  box-shadow: 0 6px 32px rgba(38,66,51,0.07);
  border-bottom-color: rgba(38,66,51,0.08);
}
.nav-logo {
  font-family: 'Young Serif', serif;
  font-size: 26px;
  font-weight: 400;
  color: var(--pine);
  cursor: pointer;
  letter-spacing: -0.3px;
  transition: color 0.3s;
}
.nav-logo span { color: var(--terracotta); }
.nav-logo:hover { color: var(--moss); }
.nav-links { display: flex; gap: 28px; align-items: center; }
.nav-link {
  font-size: 14px; font-weight: 500; color: var(--stone);
  text-decoration: none; cursor: pointer;
  transition: color 0.25s;
  background: none; border: none;
  font-family: 'Karla', sans-serif;
  letter-spacing: 0.3px;
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute; bottom: -4px; left: 0; width: 0; height: 1.5px;
  background: var(--terracotta);
  transition: width 0.3s ease;
}
.nav-link:hover { color: var(--pine); }
.nav-link:hover::after { width: 100%; }
.nav-link.active { color: var(--pine); font-weight: 600; }
.btn-login {
  padding: 10px 26px;
  background: var(--pine);
  color: var(--parchment);
  border: none; border-radius: 6px;
  font-family: 'Karla', sans-serif;
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.4px;
  transition: all 0.3s;
}
.btn-login:hover { background: var(--pine-light); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(38,66,51,0.18); }

/* ══════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════ */
.hero {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 130px 52px 90px;
  position: relative;
  overflow: hidden;
  background: 
    radial-gradient(ellipse 60% 50% at 20% 80%, rgba(74,123,95,0.08) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 80% 20%, rgba(192,107,69,0.06) 0%, transparent 70%),
    radial-gradient(ellipse 80% 60% at 50% 50%, rgba(228,213,190,0.3) 0%, transparent 80%),
    var(--linen);
}
.hero-content {
  max-width: 820px;
  text-align: center;
  position: relative; z-index: 1;
}
.hero-tag {
  display: inline-block;
  padding: 7px 18px;
  background: rgba(38,66,51,0.06);
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 100px;
  font-size: 12px; font-weight: 600;
  color: var(--moss);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 32px;
  animation: revealUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.hero h1 {
  font-family: 'Young Serif', serif;
  font-size: clamp(46px, 6.5vw, 76px);
  font-weight: 400;
  color: var(--pine);
  line-height: 1.08;
  letter-spacing: -1.5px;
  margin-bottom: 26px;
  animation: revealUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}
.hero h1 em {
  font-style: italic;
  color: var(--terracotta);
}
.hero p {
  font-size: 19px;
  color: var(--stone);
  line-height: 1.65;
  max-width: 560px;
  margin: 0 auto 40px;
  animation: revealUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}
.hero-buttons {
  display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
  animation: revealUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
}
.btn-primary {
  padding: 15px 34px;
  background: var(--pine);
  color: var(--parchment);
  border: none; border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 15px; font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 2px 12px rgba(38,66,51,0.15);
  letter-spacing: 0.3px;
}
.btn-primary:hover {
  background: var(--pine-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(38,66,51,0.22);
}
.btn-secondary {
  padding: 15px 34px;
  background: transparent;
  color: var(--pine);
  border: 1.5px solid rgba(38,66,51,0.2);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 15px; font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-secondary:hover { background: rgba(38,66,51,0.04); border-color: var(--pine); }

/* ══════════════════════════════════════════════
   SECTIONS (landing)
   ══════════════════════════════════════════════ */
.section {
  padding: 100px 52px;
  max-width: 1140px;
  margin: 0 auto;
}
.section-label {
  font-size: 11px; font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: var(--terracotta);
  margin-bottom: 16px;
}
.section h2 {
  font-family: 'Young Serif', serif;
  font-size: clamp(30px, 3.8vw, 46px);
  font-weight: 400;
  color: var(--pine);
  letter-spacing: -0.8px;
  margin-bottom: 18px;
  line-height: 1.12;
}
.section p.subtitle {
  font-size: 17px;
  color: var(--stone);
  line-height: 1.7;
  max-width: 600px;
  margin-bottom: 48px;
}

/* About cards */
.about-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: rgba(38,66,51,0.04);
  border-radius: 16px;
  overflow: hidden;
}
.about-card {
  padding: 40px 32px;
  background: var(--parchment);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
}
.about-card::before {
  content: '';
  position: absolute; top: 0; left: 0; width: 100%; height: 2px;
  background: var(--terracotta);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}
.about-card:hover { background: var(--white); }
.about-card:hover::before { transform: scaleX(1); }
.about-icon {
  width: 44px; height: 44px;
  background: linear-gradient(135deg, rgba(38,66,51,0.08), rgba(74,123,95,0.06));
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: var(--pine);
  margin-bottom: 20px;
}
.about-card h3 {
  font-family: 'Young Serif', serif;
  font-size: 19px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 10px;
}
.about-card p { font-size: 14px; color: var(--stone); line-height: 1.65; }

/* Team */
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.team-card {
  padding: 40px 32px;
  background: var(--parchment);
  border-radius: 14px;
  border: 1px solid rgba(38,66,51,0.04);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(38,66,51,0.08);
  border-color: rgba(38,66,51,0.08);
}
.team-avatar {
  width: 88px; height: 88px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 20px;
  display: block;
  box-shadow: 0 4px 20px rgba(38,66,51,0.12);
  border: 3px solid var(--parchment);
  outline: 2px solid rgba(38,66,51,0.08);
}
.team-card h3 {
  font-family: 'Young Serif', serif;
  font-size: 20px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 4px;
}
.team-card .role {
  font-size: 12px; font-weight: 600;
  color: var(--terracotta);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 14px;
}
.team-card p { font-size: 14px; color: var(--stone); line-height: 1.6; }

/* Contact */
.contact-box {
  max-width: 520px;
  padding: 48px;
  background: var(--parchment);
  border-radius: 16px;
  border: 1px solid rgba(38,66,51,0.05);
  box-shadow: 0 8px 40px rgba(38,66,51,0.04);
}
.contact-box input, .contact-box textarea {
  width: 100%;
  padding: 14px 18px;
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 15px;
  color: var(--bark);
  background: var(--white);
  margin-bottom: 14px;
  transition: border-color 0.3s, box-shadow 0.3s;
  outline: none;
}
.contact-box input:focus, .contact-box textarea:focus {
  border-color: var(--moss);
  box-shadow: 0 0 0 3px rgba(74,123,95,0.08);
}
.contact-box textarea { min-height: 110px; resize: vertical; }

/* Invest section */
.invest-content {
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
}
.invest-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.stat-card {
  padding: 28px;
  background: var(--parchment);
  border-radius: 12px;
  border: 1px solid rgba(38,66,51,0.04);
  transition: all 0.3s;
}
.stat-card:hover { border-color: rgba(38,66,51,0.1); box-shadow: 0 4px 20px rgba(38,66,51,0.06); }
.stat-card .stat-num {
  font-family: 'Young Serif', serif;
  font-size: 34px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 4px;
}
.stat-card .stat-label { font-size: 13px; color: var(--stone); font-weight: 500; }
.invest-text p { font-size: 16px; color: var(--stone); line-height: 1.7; margin-bottom: 16px; }

/* Footer */
.footer {
  padding: 48px 52px;
  text-align: center;
  border-top: 1px solid rgba(38,66,51,0.06);
  color: var(--stone);
  font-size: 14px;
  background: linear-gradient(180deg, var(--linen), rgba(228,213,190,0.3));
}
.footer .foot-logo {
  font-family: 'Young Serif', serif;
  font-size: 22px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 8px;
}
.footer .foot-logo span { color: var(--terracotta); }

/* ══════════════════════════════════════════════
   AUTH MODAL
   ══════════════════════════════════════════════ */
.modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44,38,33,0.35);
  backdrop-filter: blur(8px);
  z-index: 200;
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn 0.25s ease;
}
.modal {
  background: var(--parchment);
  border-radius: 18px;
  padding: 44px;
  max-width: 440px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 24px 80px rgba(38,66,51,0.18), 0 0 0 1px rgba(38,66,51,0.04);
  animation: revealUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.modal-close {
  position: absolute; top: 18px; right: 18px;
  background: rgba(38,66,51,0.04); border: none;
  width: 32px; height: 32px; border-radius: 50%;
  font-size: 16px; cursor: pointer;
  color: var(--stone);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.modal-close:hover { background: rgba(38,66,51,0.08); color: var(--bark); }
.modal h2 {
  font-family: 'Young Serif', serif;
  font-size: 28px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 6px;
}
.modal p { color: var(--stone); font-size: 14px; margin-bottom: 24px; }
.modal .input-row {
  margin-bottom: 16px;
}
.modal .input-row.two-col {
  display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
}
.modal .input-group { margin-bottom: 16px; }
.modal .input-group label,
.modal .input-row label {
  display: block;
  font-size: 12px; font-weight: 600;
  color: var(--pine);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
}
.modal .input-group input,
.modal .input-row input {
  width: 100%; padding: 13px 16px;
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 15px; color: var(--bark);
  background: var(--white);
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.modal .input-group input:focus,
.modal .input-row input:focus {
  border-color: var(--moss);
  box-shadow: 0 0 0 3px rgba(74,123,95,0.08);
}
.modal-actions {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 24px; gap: 12px;
}
.modal-sub {
  color: var(--stone); font-size: 14px; margin-bottom: 24px;
}
.step-indicator {
  display: flex; gap: 8px; margin-bottom: 24px;
}
.step-dot {
  width: 32px; height: 4px;
  border-radius: 2px;
  background: rgba(38,66,51,0.1);
  transition: all 0.3s;
}
.step-dot.active { background: var(--pine); width: 48px; }
.step-dot.done { background: var(--sage); }
.btn-next {
  width: 100%;
  padding: 14px;
  background: var(--pine);
  color: var(--parchment);
  border: none; border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 15px; font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 8px;
  letter-spacing: 0.3px;
}
.btn-next:hover { background: var(--pine-light); }
.btn-next:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-back {
  padding: 13px 28px;
  background: transparent;
  border: 1.5px solid rgba(38,66,51,0.1);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 14px; font-weight: 600;
  color: var(--stone);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-back:hover { border-color: rgba(38,66,51,0.2); color: var(--bark); }

/* Goals grid */
.goals-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  margin-bottom: 24px;
}
.goal-card {
  padding: 16px;
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 10px;
  background: var(--white);
  cursor: pointer;
  text-align: center;
  transition: all 0.25s;
}
.goal-card.selected {
  border-color: var(--pine);
  background: rgba(38,66,51,0.03);
  box-shadow: 0 0 0 1px var(--pine);
}
.goal-card:hover { border-color: rgba(38,66,51,0.18); }
.goal-icon { margin-bottom: 6px; color: var(--moss); }
.goal-label {
  font-family: 'Karla', sans-serif;
  font-size: 14px; font-weight: 600;
  color: var(--bark);
}

/* Financial section (signup + settings) */
.fin-section {
  margin-bottom: 12px;
  border: 1px solid rgba(38,66,51,0.06);
  border-radius: 10px;
  overflow: hidden;
  background: var(--white);
}
.fin-section-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 18px; cursor: pointer;
  transition: background 0.2s;
}
.fin-section-header:hover { background: rgba(38,66,51,0.02); }
.fin-section-header h4 {
  font-family: 'Young Serif', serif;
  font-size: 15px; font-weight: 400;
  color: var(--pine);
}
.chevron { font-size: 12px; color: var(--stone); transition: transform 0.3s; }
.chevron.open { transform: rotate(180deg); }
.fin-items { padding: 8px 18px 16px; }
.fin-item {
  display: flex; gap: 10px; align-items: center;
  padding: 8px 0;
}
.fin-item label {
  flex: 1; font-size: 13px; color: var(--bark-mid);
  font-weight: 500;
}
.fin-item input {
  width: 120px; padding: 8px 12px;
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 6px; text-align: right;
  font-family: 'Karla', sans-serif;
  font-size: 14px; color: var(--bark);
  background: var(--parchment);
  outline: none;
  transition: border-color 0.2s;
}
.fin-item input:focus { border-color: var(--moss); }
.fin-delete {
  background: none; border: none; color: var(--stone-light);
  cursor: pointer; font-size: 14px; padding: 4px;
  border-radius: 4px; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.fin-delete:hover { color: var(--red-soft); background: rgba(184,106,90,0.06); }

/* ══════════════════════════════════════════════
   DASHBOARD
   ══════════════════════════════════════════════ */
.dashboard {
  display: flex;
  min-height: 100vh;
  padding-top: 70px;
  background: 
    radial-gradient(ellipse 60% 40% at 100% 0%, rgba(74,123,95,0.04) 0%, transparent 60%),
    var(--linen);
}
.sidebar {
  width: 220px;
  background: var(--pine);
  padding: 32px 16px;
  position: fixed; top: 70px; left: 0; bottom: 0;
  display: flex; flex-direction: column; gap: 4px;
  z-index: 50;
  box-shadow: 2px 0 20px rgba(38,66,51,0.08);
}
.sidebar-link {
  padding: 11px 16px;
  border-radius: 8px;
  font-size: 14px; font-weight: 500;
  color: rgba(254,250,243,0.55);
  cursor: pointer;
  transition: all 0.25s;
  display: flex; align-items: center; gap: 12px;
  background: none; border: none;
  font-family: 'Karla', sans-serif;
  text-align: left; width: 100%;
  letter-spacing: 0.2px;
}
.sidebar-link:hover { background: rgba(254,250,243,0.06); color: rgba(254,250,243,0.8); }
.sidebar-link.active { background: rgba(254,250,243,0.1); color: var(--parchment); font-weight: 600; }
.sidebar-link .sb-icon { width: 20px; height: 20px; flex-shrink: 0; }
.sidebar-spacer { flex: 1; }

.dash-main {
  margin-left: 220px;
  flex: 1;
  padding: 36px 44px;
  min-height: calc(100vh - 70px);
}

/* My Village */
.village-header { margin-bottom: 28px; }
.village-header h2 {
  font-family: 'Young Serif', serif;
  font-size: 30px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 6px;
}
.village-header p { color: var(--stone); font-size: 15px; }
.village-header-row {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
}
.village-header-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.btn-invite-link {
  padding: 9px 18px;
  background: rgba(38,66,51,0.04);
  color: var(--pine);
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 7px;
  font-family: 'Karla', sans-serif;
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
  display: flex; align-items: center; gap: 6px;
}
.btn-invite-link:hover { background: rgba(38,66,51,0.07); }
.btn-invite-link.copied { background: rgba(90,138,95,0.1); border-color: var(--green-soft); color: var(--green-soft); }

.village-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 1fr auto;
  gap: 18px;
  min-height: 480px;
}
.members-panel {
  background: var(--parchment);
  border-radius: 14px;
  padding: 20px;
  border: 1px solid rgba(38,66,51,0.04);
}
.members-panel h4 {
  font-family: 'Young Serif', serif;
  font-size: 15px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 14px;
}
.member-item {
  display: flex; align-items: center; gap: 10px;
  padding: 7px 0;
}
.member-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--sage-light);
}
.member-dot.online { background: var(--green-soft); }
.member-item span { font-size: 14px; color: var(--bark); }
.member-avatar {
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700;
  color: var(--parchment);
  flex-shrink: 0;
  letter-spacing: -0.3px;
}

/* Chart panel */
.chart-panel {
  background: var(--parchment);
  border-radius: 14px;
  padding: 24px;
  border: 1px solid rgba(38,66,51,0.04);
}
.chart-panel h4 {
  font-family: 'Young Serif', serif;
  font-size: 15px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 20px;
}
.line-chart-wrap {
  position: relative;
  height: 220px;
  padding: 0 0 28px 44px;
  overflow: visible;
}
.line-chart-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.chart-y-label {
  position: absolute;
  left: 0;
  font-size: 10px;
  color: var(--stone-light);
  font-weight: 500;
  transform: translateY(-50%);
}
.chart-x-label {
  font-size: 11px;
  fill: var(--stone);
  text-anchor: middle;
  font-family: 'Karla', sans-serif;
}

/* Chat panel */
.chat-panel {
  grid-row: 1 / 3;
  background: var(--parchment);
  border-radius: 14px;
  padding: 20px;
  border: 1px solid rgba(38,66,51,0.04);
  display: flex; flex-direction: column;
  min-height: 0;
}
.chat-panel h4 {
  font-family: 'Young Serif', serif;
  font-size: 15px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 14px;
}
.chat-messages {
  flex: 1; overflow-y: auto;
  margin-bottom: 14px;
}
.chat-msg { padding: 8px 0; }
.chat-user {
  font-size: 12px; font-weight: 700;
  color: var(--pine); margin-bottom: 2px;
}
.chat-user.you { color: var(--terracotta); }
.chat-text { font-size: 14px; color: var(--bark); line-height: 1.5; }
.chat-time { font-size: 11px; color: var(--stone-light); margin-top: 3px; }
.chat-input-wrap {
  display: flex; gap: 8px;
}
.chat-input-wrap input {
  flex: 1; padding: 10px 14px;
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 14px; color: var(--bark);
  background: var(--white);
  outline: none;
  transition: border-color 0.2s;
}
.chat-input-wrap input:focus { border-color: var(--moss); }
.chat-send {
  padding: 10px 18px;
  background: var(--pine);
  color: var(--parchment);
  border: none; border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.chat-send:hover { background: var(--pine-light); }

/* Decisions panel */
.decisions-panel {
  background: var(--parchment);
  border-radius: 14px;
  padding: 24px;
  border: 1px solid rgba(38,66,51,0.04);
}
.decisions-panel h4 {
  font-family: 'Young Serif', serif;
  font-size: 15px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 14px;
}
.decisions-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 14px;
}
.decisions-header h4 { margin-bottom: 0; }
.btn-draft {
  padding: 7px 14px;
  background: var(--pine);
  color: var(--parchment);
  border: none; border-radius: 6px;
  font-family: 'Karla', sans-serif;
  font-size: 12px; font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-draft:hover { background: var(--pine-light); }
.draft-form {
  padding: 16px;
  background: rgba(38,66,51,0.02);
  border-radius: 10px;
  border: 1px solid rgba(38,66,51,0.06);
  margin-bottom: 14px;
}
.draft-form p {
  font-size: 13px; font-weight: 600;
  color: var(--pine); margin-bottom: 10px;
}
.draft-form input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 14px;
  outline: none;
  background: var(--white);
  margin-bottom: 10px;
}
.draft-form input:focus { border-color: var(--moss); }
.draft-actions { display: flex; gap: 8px; }
.draft-actions button {
  padding: 8px 16px;
  border-radius: 6px;
  font-family: 'Karla', sans-serif;
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}
.draft-submit { background: var(--pine); color: var(--parchment); }
.draft-submit:disabled { opacity: 0.4; cursor: not-allowed; }
.draft-cancel { background: transparent; color: var(--stone); border: 1.5px solid rgba(38,66,51,0.08) !important; }

.decision-item {
  padding: 14px 0;
  border-bottom: 1px solid rgba(38,66,51,0.04);
}
.decision-item:last-child { border-bottom: none; }
.decision-title { font-size: 14px; font-weight: 500; color: var(--bark); margin-bottom: 8px; }
.decision-votes {
  display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
}
.decision-votes .yes { font-size: 13px; font-weight: 600; color: var(--green-soft); }
.decision-votes .no { font-size: 13px; font-weight: 600; color: var(--red-soft); }
.decision-status {
  padding: 3px 10px; border-radius: 100px;
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.decision-status.Passed { background: rgba(90,138,95,0.1); color: var(--green-soft); }
.decision-status.Failed { background: rgba(184,106,90,0.1); color: var(--red-soft); }
.decision-status.Active { background: rgba(192,107,69,0.12); color: var(--terracotta); }

/* Placeholder page */
.placeholder-page {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 80px 20px;
  min-height: 400px;
}
.placeholder-icon {
  width: 96px; height: 96px;
  background: linear-gradient(145deg, rgba(38,66,51,0.06), rgba(74,123,95,0.04));
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 28px;
}
.placeholder-page h2 {
  font-family: 'Young Serif', serif;
  font-size: 26px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 10px;
}
.placeholder-page p {
  color: var(--stone);
  font-size: 15px; line-height: 1.6;
  max-width: 400px; margin-bottom: 28px;
}
.placeholder-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.btn-create {
  padding: 13px 28px;
  background: var(--pine);
  color: var(--parchment);
  border: none; border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-create:hover { background: var(--pine-light); }
.btn-create:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-browse {
  padding: 13px 28px;
  color: var(--pine);
  border: 1.5px solid rgba(38,66,51,0.1);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 14px; font-weight: 600;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s;
}
.btn-browse:hover { border-color: rgba(38,66,51,0.2); }

/* Create Village form */
.create-village-form { max-width: 600px; }
.create-village-form h2 {
  font-family: 'Young Serif', serif;
  font-size: 30px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 6px;
}
.create-village-form > p {
  color: var(--stone); font-size: 15px;
  margin-bottom: 36px;
}
.cv-field { margin-bottom: 22px; }
.cv-field label {
  display: block;
  font-size: 12px; font-weight: 600;
  color: var(--pine);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 8px;
}
.cv-field input, .cv-field textarea, .cv-field select {
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 15px;
  color: var(--bark);
  background: var(--white);
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.cv-field input:focus, .cv-field textarea:focus, .cv-field select:focus {
  border-color: var(--moss);
  box-shadow: 0 0 0 3px rgba(74,123,95,0.08);
}
.cv-field textarea { min-height: 100px; resize: vertical; }
.cv-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.cv-preview {
  margin-top: 32px;
  padding: 28px;
  background: var(--parchment);
  border-radius: 14px;
  border: 1px solid rgba(38,66,51,0.04);
}
.cv-preview h4 {
  font-family: 'Young Serif', serif;
  font-size: 17px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 6px;
}
.cv-preview p { font-size: 14px; color: var(--stone); line-height: 1.5; margin-bottom: 10px; }
.cv-preview .cv-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.cv-preview .cv-tag {
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px; font-weight: 600;
  background: rgba(192,107,69,0.1);
  color: var(--terracotta);
}

/* Villages list */
.villages-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
}
.village-card {
  padding: 28px;
  background: var(--parchment);
  border-radius: 14px;
  border: 1px solid rgba(38,66,51,0.04);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.village-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(38,66,51,0.07);
  border-color: rgba(38,66,51,0.08);
}
.village-badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 100px;
  font-size: 11px; font-weight: 700;
  background: rgba(38,66,51,0.06);
  color: var(--pine);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.village-card h3 {
  font-family: 'Young Serif', serif;
  font-size: 18px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 6px; margin-top: 12px;
}
.village-card p { font-size: 14px; color: var(--stone); line-height: 1.5; margin-bottom: 12px; }
.village-meta {
  display: flex; gap: 14px; flex-wrap: wrap;
  font-size: 13px; color: var(--stone);
  font-weight: 500;
}
.village-match {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 12px; font-weight: 700;
  background: rgba(38,66,51,0.06);
  color: var(--pine);
}

/* Explore People */
.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 18px;
}
.person-card {
  padding: 28px 24px;
  background: var(--parchment);
  border-radius: 14px;
  border: 1px solid rgba(38,66,51,0.04);
  text-align: center;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.person-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(38,66,51,0.07);
}
.person-avatar {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: linear-gradient(145deg, var(--pine), var(--moss));
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
  font-family: 'Young Serif', serif;
  font-size: 20px; font-weight: 400;
  color: var(--parchment);
}
.person-card h3 {
  font-family: 'Young Serif', serif;
  font-size: 17px; font-weight: 400;
  color: var(--pine); margin-bottom: 4px;
}
.person-card .match-pct {
  font-size: 24px; font-weight: 700;
  color: var(--terracotta);
  font-family: 'Karla', sans-serif;
  margin: 6px 0;
}
.person-card .match-label { font-size: 11px; color: var(--stone); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
.person-card .person-goal {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 100px;
  font-size: 12px; font-weight: 600;
  background: rgba(38,66,51,0.05);
  color: var(--pine);
}
.person-card .person-zip { font-size: 12px; color: var(--stone); margin-top: 6px; }
.btn-invite {
  margin-top: 14px;
  padding: 8px 20px;
  background: var(--pine);
  color: var(--parchment);
  border: none; border-radius: 7px;
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  font-family: 'Karla', sans-serif;
  transition: all 0.2s;
}
.btn-invite:hover { background: var(--pine-light); }

/* Login tab */
.auth-tabs {
  display: flex; gap: 0; margin-bottom: 24px;
  border-bottom: 1.5px solid rgba(38,66,51,0.06);
}
.auth-tab {
  padding: 10px 24px;
  background: none; border: none;
  font-family: 'Karla', sans-serif;
  font-size: 15px; font-weight: 600;
  color: var(--stone);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1.5px;
  transition: all 0.25s;
}
.auth-tab.active { color: var(--pine); border-bottom-color: var(--terracotta); }

/* Leave village */
.btn-leave {
  padding: 9px 18px;
  background: rgba(184,106,90,0.06);
  color: var(--red-soft);
  border: 1.5px solid rgba(184,106,90,0.15);
  border-radius: 7px;
  font-family: 'Karla', sans-serif;
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-leave:hover { background: rgba(184,106,90,0.12); }
.leave-confirm {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44,38,33,0.35);
  backdrop-filter: blur(6px);
  z-index: 300;
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn 0.2s ease;
}
.leave-confirm-box {
  background: var(--parchment);
  border-radius: 18px;
  padding: 40px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 24px 80px rgba(38,66,51,0.18);
}
.leave-confirm-box h3 {
  font-family: 'Young Serif', serif;
  font-size: 22px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 10px;
}
.leave-confirm-box p {
  font-size: 14px; color: var(--stone);
  line-height: 1.6; margin-bottom: 24px;
}
.leave-confirm-actions { display: flex; gap: 12px; justify-content: center; }
.btn-leave-confirm {
  padding: 11px 24px;
  background: var(--red-soft);
  color: var(--parchment);
  border: none; border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 14px; font-weight: 600;
  cursor: pointer;
}
.btn-leave-cancel {
  padding: 11px 24px;
  background: transparent;
  color: var(--stone);
  border: 1.5px solid rgba(38,66,51,0.1);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 14px; font-weight: 600;
  cursor: pointer;
}

/* Toggle switch */
.toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(38,66,51,0.04);
}
.toggle-row:last-child { border-bottom: none; }
.toggle-label-wrap { flex: 1; margin-right: 16px; }
.toggle-label { font-size: 14px; font-weight: 600; color: var(--pine); margin-bottom: 3px; }
.toggle-desc { font-size: 13px; color: var(--stone); line-height: 1.4; }
.toggle-switch {
  width: 44px; height: 24px;
  border-radius: 12px;
  background: rgba(38,66,51,0.12);
  position: relative;
  cursor: pointer;
  transition: background 0.25s;
  flex-shrink: 0;
  border: none;
}
.toggle-switch.on { background: var(--pine); }
.toggle-knob {
  width: 18px; height: 18px;
  border-radius: 50%;
  background: var(--parchment);
  position: absolute;
  top: 3px; left: 3px;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}
.toggle-switch.on .toggle-knob { transform: translateX(20px); }

/* Settings */
.settings-page { max-width: 600px; }
.settings-page h2 {
  font-family: 'Young Serif', serif;
  font-size: 30px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 6px;
}
.settings-page > p { color: var(--stone); font-size: 15px; margin-bottom: 36px; }
.settings-section {
  background: var(--parchment);
  border-radius: 14px;
  padding: 28px;
  border: 1px solid rgba(38,66,51,0.04);
  margin-bottom: 18px;
}
.settings-section h3 {
  font-family: 'Young Serif', serif;
  font-size: 18px; font-weight: 400;
  color: var(--pine);
  margin-bottom: 20px;
}
.settings-field { margin-bottom: 18px; }
.settings-field:last-child { margin-bottom: 0; }
.settings-field label {
  display: block;
  font-size: 11px; font-weight: 600;
  color: var(--pine);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
}
.settings-field input, .settings-field select {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 15px;
  color: var(--bark);
  background: var(--white);
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.settings-field input:focus, .settings-field select:focus {
  border-color: var(--moss);
  box-shadow: 0 0 0 3px rgba(74,123,95,0.08);
}
.settings-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.btn-save-settings {
  padding: 13px 28px;
  background: var(--pine);
  color: var(--parchment);
  border: none; border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-save-settings:hover { background: var(--pine-light); }
.btn-danger {
  padding: 13px 28px;
  background: transparent;
  color: var(--red-soft);
  border: 1.5px solid rgba(184,106,90,0.15);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-danger:hover { background: rgba(184,106,90,0.05); }

/* Search & filter */
.search-bar { display: flex; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
.search-input {
  flex: 1; min-width: 200px;
  padding: 11px 16px 11px 38px;
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 8px;
  font-family: 'Karla', sans-serif;
  font-size: 14px;
  color: var(--bark);
  background: var(--white);
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.search-input:focus { border-color: var(--moss); box-shadow: 0 0 0 3px rgba(74,123,95,0.08); }
.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon {
  position: absolute; left: 13px; top: 50%;
  transform: translateY(-50%);
  color: var(--stone-light);
  pointer-events: none;
}
.filter-row { display: flex; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; align-items: center; }
.filter-label {
  font-size: 11px; font-weight: 600; color: var(--stone);
  text-transform: uppercase; letter-spacing: 0.8px;
  white-space: nowrap;
}
.filter-input {
  padding: 9px 12px;
  border: 1.5px solid rgba(38,66,51,0.08);
  border-radius: 7px;
  font-family: 'Karla', sans-serif;
  font-size: 13px; color: var(--bark);
  background: var(--white);
  outline: none; width: 100px;
  transition: border-color 0.2s;
}
.filter-input:focus { border-color: var(--moss); }
.filter-input.zip { width: 90px; }
.filter-input.num { width: 70px; text-align: center; }
.filter-sep { color: var(--stone-light); font-size: 13px; }
.filter-group {
  display: flex; align-items: center; gap: 6px;
  background: rgba(38,66,51,0.02);
  padding: 6px 12px;
  border-radius: 7px;
}

/* Village switcher tabs */
.village-tabs { display: flex; gap: 8px; margin-bottom: 24px; }
.village-tab {
  padding: 10px 20px;
  border: 1.5px solid rgba(38,66,51,0.06);
  border-radius: 8px;
  background: var(--parchment);
  font-family: 'Karla', sans-serif;
  font-size: 14px; font-weight: 600;
  color: var(--stone);
  cursor: pointer;
  transition: all 0.25s;
}
.village-tab:hover { border-color: var(--sage); }
.village-tab.active { border-color: var(--pine); color: var(--pine); background: rgba(38,66,51,0.03); }
.join-limit-msg { font-size: 13px; color: var(--stone); font-style: italic; margin-top: 8px; }

/* Responsive */
@media (max-width: 900px) {
  .navbar { padding: 14px 20px; }
  .nav-links { gap: 16px; }
  .hero { padding: 100px 24px 60px; }
  .section { padding: 60px 24px; }
  .about-grid { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr; }
  .invest-content { grid-template-columns: 1fr; gap: 32px; }
  .village-layout { grid-template-columns: 1fr; }
  .chat-panel { grid-row: auto; }
  .sidebar { width: 60px; padding: 20px 8px; }
  .sidebar-link span:not(.sb-icon) { display: none; }
  .dash-main { margin-left: 60px; padding: 24px 16px; }
}
@media (max-width: 600px) {
  .hero h1 { font-size: 38px; }
  .about-grid { grid-template-columns: 1fr; }
  .people-showcase { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: 1fr; }
}
`;

// ─── Utility Components ───────────────────────────────────────────────────────
function FinancialSection({ title, categories, values, onChange, onDelete }) {
  const [open, setOpen] = useState(false);
  const [activeCats, setActiveCats] = useState([]);

  const addCategory = (cat) => {
    if (!activeCats.find(c => c.key === cat.key)) {
      setActiveCats([...activeCats, cat]);
    }
  };

  const removeCategory = (cat) => {
    setActiveCats(activeCats.filter(c => c.key !== cat.key));
    if (onDelete) onDelete(cat.key);
  };

  const handleValueChange = (key, val) => {
    if (val === "" || val === undefined) { onChange(key, ""); return; }
    const num = parseFloat(val);
    if (num < 0) return;
    onChange(key, val);
  };

  const available = categories.filter(c => !activeCats.find(a => a.key === c.key));

  return (
    <div className="fin-section">
      <div className="fin-section-header" onClick={() => setOpen(!open)}>
        <h4>{title}</h4>
        <span className={`chevron ${open ? "open" : ""}`}>▼</span>
      </div>
      {open && (
        <div className="fin-items">
          {activeCats.map(cat => (
            <div className="fin-item" key={cat.key}>
              <label>{cat.label}</label>
              <input
                type="number"
                min="0"
                placeholder="$0"
                value={values[cat.key] || ""}
                onChange={e => handleValueChange(cat.key, e.target.value)}
                onKeyDown={e => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
              />
              <button className="fin-delete" onClick={() => removeCategory(cat)} title="Remove"><X size={14} /></button>
            </div>
          ))}
          {available.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <select
                style={{
                  padding: "8px 12px", borderRadius: 8,
                  border: "1.5px solid rgba(38,66,51,0.12)",
                  fontFamily: "'Karla', sans-serif", fontSize: 13,
                  color: "#6b6355", background: "#fff", cursor: "pointer",
                  outline: "none", width: "100%"
                }}
                value=""
                onChange={e => {
                  const cat = categories.find(c => c.key === e.target.value);
                  if (cat) addCategory(cat);
                }}
              >
                <option value="">+ Add {title.toLowerCase()} source...</option>
                {available.map(c => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AssetSection({ groups, values, onChange, onDelete }) {
  const [openGroup, setOpenGroup] = useState(null);
  const [activeByGroup, setActiveByGroup] = useState({});

  const addToGroup = (groupName, cat) => {
    setActiveByGroup(prev => ({
      ...prev,
      [groupName]: [...(prev[groupName] || []), cat],
    }));
  };

  const removeFromGroup = (groupName, cat) => {
    setActiveByGroup(prev => ({
      ...prev,
      [groupName]: (prev[groupName] || []).filter(c => c.key !== cat.key),
    }));
    if (onDelete) onDelete(cat.key);
  };

  const handleValueChange = (key, val) => {
    if (val === "" || val === undefined) { onChange(key, ""); return; }
    const num = parseFloat(val);
    if (num < 0) return;
    onChange(key, val);
  };

  return (
    <div>
      {groups.map(g => {
        const active = activeByGroup[g.group] || [];
        const available = g.items.filter(i => !active.find(a => a.key === i.key));
        const isOpen = openGroup === g.group;
        return (
          <div className="fin-section" key={g.group}>
            <div className="fin-section-header" onClick={() => setOpenGroup(isOpen ? null : g.group)}>
              <h4>{g.group}</h4>
              <span className={`chevron ${isOpen ? "open" : ""}`}>▼</span>
            </div>
            {isOpen && (
              <div className="fin-items">
                {active.map(cat => (
                  <div className="fin-item" key={cat.key}>
                    <label>{cat.label}</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="$0"
                      value={values[cat.key] || ""}
                      onChange={e => handleValueChange(cat.key, e.target.value)}
                      onKeyDown={e => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
                    />
                    <button className="fin-delete" onClick={() => removeFromGroup(g.group, cat)} title="Remove"><X size={14} /></button>
                  </div>
                ))}
                {available.length > 0 && (
                  <select
                    style={{
                      padding: "8px 12px", borderRadius: 8,
                      border: "1.5px solid rgba(38,66,51,0.12)",
                      fontFamily: "'Karla', sans-serif", fontSize: 13,
                      color: "#6b6355", background: "#fff", cursor: "pointer",
                      outline: "none", width: "100%", marginTop: 8
                    }}
                    value=""
                    onChange={e => {
                      const cat = g.items.find(c => c.key === e.target.value);
                      if (cat) addToGroup(g.group, cat);
                    }}
                  >
                    <option value="">+ Add asset...</option>
                    {available.map(c => (
                      <option key={c.key} value={c.key}>{c.label}</option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function VillageApp() {
  const [page, setPage] = useState("home");
  const [section, setSection] = useState("hero");
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState("signup");
  const [signupStep, setSignupStep] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [dashTab, setDashTab] = useState("myvillage");
  const [joinedVillages, setJoinedVillages] = useState([]);
  const [activeVillageId, setActiveVillageId] = useState(null);

  // Per-village mutable state (chat + decisions)
  const [villageChatState, setVillageChatState] = useState({});
  const [villageDecisionState, setVillageDecisionState] = useState({});

  // Create Village form state
  const [cvName, setCvName] = useState("");
  const [cvDesc, setCvDesc] = useState("");
  const [cvGoal, setCvGoal] = useState("");
  const [cvContribution, setCvContribution] = useState("");
  const [cvFrequency, setCvFrequency] = useState("monthly");

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [goals, setGoals] = useState([]);
  const [incomeValues, setIncomeValues] = useState({});
  const [debtValues, setDebtValues] = useState({});
  const [assetValues, setAssetValues] = useState({});
  const [chatMsg, setChatMsg] = useState("");
  const [showDraftDecision, setShowDraftDecision] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [inviteCopied, setInviteCopied] = useState(false);
  const [algoVisible, setAlgoVisible] = useState(true);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  // Search & filter state
  const [villageSearch, setVillageSearch] = useState("");
  const [villageFilterZip, setVillageFilterZip] = useState("");
  const [villageFilterMinMembers, setVillageFilterMinMembers] = useState("");
  const [villageFilterMaxMembers, setVillageFilterMaxMembers] = useState("");
  const [villageFilterMinMatch, setVillageFilterMinMatch] = useState("");
  const [peopleSearch, setPeopleSearch] = useState("");
  const [peopleFilterZip, setPeopleFilterZip] = useState("");

  // Account settings
  const [settingsName, setSettingsName] = useState("");
  const [settingsUsername, setSettingsUsername] = useState("");
  const [settingsEmail, setSettingsEmail] = useState("");
  const [settingsZip, setSettingsZip] = useState("");
  const [showUsername, setShowUsername] = useState(false);

  const refs = {
    hero: useRef(null),
    about: useRef(null),
    team: useRef(null),
    contact: useRef(null),
    invest: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (key) => {
    if (page !== "home") setPage("home");
    setTimeout(() => {
      refs[key]?.current?.scrollIntoView({ behavior: "smooth" });
      setSection(key);
    }, 50);
  };

  const toggleGoal = (g) => {
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  const handleSignupComplete = () => {
    setShowAuth(false);
    setLoggedIn(true);
    setJoinedVillages([]);
    setPage("dashboard");
    setDashTab("myvillage");
    setSignupStep(0);
    setSettingsName(`${firstName} ${lastName}`);
    setSettingsUsername(`${firstName.toLowerCase()}_${lastName.toLowerCase().charAt(0)}`);
    setSettingsEmail(email);
    setSettingsZip(zipcode);
  };

  const handleLogin = () => {
    setShowAuth(false);
    setLoggedIn(true);
    // Simulate returning user with one village
    const vid = 1;
    setJoinedVillages([vid]);
    setActiveVillageId(vid);
    initVillageState(vid);
    setPage("dashboard");
    setDashTab("myvillage");
    setSettingsName(email ? email.split("@")[0] : "User");
    setSettingsUsername(email ? email.split("@")[0].toLowerCase() : "user1");
    setSettingsEmail(email);
  };

  const initVillageState = (vid) => {
    const data = VILLAGE_DATA[vid];
    if (data) {
      setVillageChatState(prev => ({ ...prev, [vid]: data.chat ? [...data.chat] : [] }));
      setVillageDecisionState(prev => ({ ...prev, [vid]: data.decisions ? [...data.decisions] : [] }));
    } else {
      setVillageChatState(prev => ({ ...prev, [vid]: [] }));
      setVillageDecisionState(prev => ({ ...prev, [vid]: [] }));
    }
  };

  const handleCreateVillage = () => {
    if (!cvName.trim()) return;
    const newId = Date.now();
    setJoinedVillages(prev => [...prev, newId]);
    setActiveVillageId(newId);
    // Store custom village data
    VILLAGE_DATA[newId] = {
      name: cvName, desc: cvDesc || "A new village.",
      members: ["You"],
      decisions: [], chat: [],
      pool: [{ month: "Now", amount: 0 }],
    };
    initVillageState(newId);
    setDashTab("myvillage");
  };

  const handleJoinVillage = (vid) => {
    if (joinedVillages.length >= 2) return;
    if (joinedVillages.includes(vid)) return;
    setJoinedVillages(prev => [...prev, vid]);
    setActiveVillageId(vid);
    initVillageState(vid);
    setDashTab("myvillage");
  };

  const handleLeaveVillage = () => {
    const remaining = joinedVillages.filter(v => v !== activeVillageId);
    setJoinedVillages(remaining);
    setActiveVillageId(remaining.length > 0 ? remaining[0] : null);
    setShowLeaveConfirm(false);
    setDashTab("myvillage");
  };

  const deleteIncomeKey = (key) => {
    const next = { ...incomeValues };
    delete next[key];
    setIncomeValues(next);
  };
  const deleteDebtKey = (key) => {
    const next = { ...debtValues };
    delete next[key];
    setDebtValues(next);
  };
  const deleteAssetKey = (key) => {
    const next = { ...assetValues };
    delete next[key];
    setAssetValues(next);
  };

  const sendChat = () => {
    if (!chatMsg.trim() || !activeVillageId) return;
    setVillageChatState(prev => ({
      ...prev,
      [activeVillageId]: [...(prev[activeVillageId] || []), { user: "You", msg: chatMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],
    }));
    setChatMsg("");
  };

  const submitDraft = () => {
    if (!draftTitle.trim() || !activeVillageId) return;
    setVillageDecisionState(prev => ({
      ...prev,
      [activeVillageId]: [{ id: Date.now(), title: draftTitle, yes: 0, no: 0, status: "Active" }, ...(prev[activeVillageId] || [])],
    }));
    setDraftTitle("");
    setShowDraftDecision(false);
  };

  const copyInviteLink = () => {
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2000);
  };

  // Derived data for active village
  const av = activeVillageId ? VILLAGE_DATA[activeVillageId] : null;
  const avChat = activeVillageId ? (villageChatState[activeVillageId] || []) : [];
  const avDecisions = activeVillageId ? (villageDecisionState[activeVillageId] || []) : [];
  const avPool = av ? av.pool : [];
  const avMembers = av ? av.members : [];

  // Filtered explore villages
  const filteredVillages = [...MOCK_VILLAGES]
    .filter(v => !joinedVillages.includes(v.id))
    .filter(v => !villageSearch || v.name.toLowerCase().includes(villageSearch.toLowerCase()))
    .filter(v => !villageFilterZip || v.zip.startsWith(villageFilterZip))
    .filter(v => !villageFilterMinMembers || v.members >= parseInt(villageFilterMinMembers))
    .filter(v => !villageFilterMaxMembers || v.members <= parseInt(villageFilterMaxMembers))
    .filter(v => !villageFilterMinMatch || v.match >= parseInt(villageFilterMinMatch))
    .sort((a, b) => b.match - a.match);

  // Filtered explore people
  const filteredPeople = MOCK_PEOPLE
    .filter(p => !peopleSearch || p.name.toLowerCase().includes(peopleSearch.toLowerCase()) || (p.username && p.username.toLowerCase().includes(peopleSearch.toLowerCase())))
    .filter(p => !peopleFilterZip || p.zip.startsWith(peopleFilterZip));

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      <div className="grain" />

      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => { setPage("home"); scrollTo("hero"); }}>
          VILLAGE<span>.</span>
        </div>
        <div className="nav-links">
          {page === "home" || !loggedIn ? (
            <>
              <button className="nav-link" onClick={() => scrollTo("about")}>About</button>
              <button className="nav-link" onClick={() => scrollTo("team")}>Team</button>
              <button className="nav-link" onClick={() => scrollTo("contact")}>Contact</button>
              <button className="nav-link" onClick={() => scrollTo("invest")}>Invest</button>
              {loggedIn ? (
                <button className="btn-login" onClick={() => { setPage("dashboard"); setDashTab("myvillage"); }}>Dashboard</button>
              ) : (
                <button className="btn-login" onClick={() => { setShowAuth(true); setAuthTab("login"); }}>Log In</button>
              )}
            </>
          ) : (
            <>
              <button className="nav-link" onClick={() => setPage("home")}>Home</button>
              <button className="btn-login" onClick={() => { setLoggedIn(false); setJoinedVillages([]); setActiveVillageId(null); setPage("home"); }}>Log Out</button>
            </>
          )}
        </div>
      </nav>

      {/* HOME PAGE */}
      {page === "home" && (
        <>
          {/* Hero */}
          <section className="hero" ref={refs.hero}>
            <div className="hero-content">
              <div className="hero-tag">Cooperative Finance</div>
              <h1>
                It takes a <em>village</em><br />to thrive together.
              </h1>
              <p>
                Match with people who share your financial goals. Pool resources, make decisions together, and achieve more than you could alone.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => { setShowAuth(true); setAuthTab("login"); }}>
                  Get Started
                </button>
                <button className="btn-secondary" onClick={() => scrollTo("about")}>
                  Learn More
                </button>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="section" ref={refs.about}>
            <div className="section-label">About Village</div>
            <h2>Finance, reimagined<br />as cooperation.</h2>
            <p className="subtitle">
              Village is a platform where people invest together and in each other. We provide the trust, the infrastructure, and the tools — you bring the community.
            </p>
            <div className="about-grid">
              <div className="about-card">
                <div className="about-icon"><Handshake size={22} /></div>
                <h3>Cooperative Pools</h3>
                <p>Form "villages" around shared goals — paying off debt, saving for retirement, investing together. Pool funds on your own schedule.</p>
              </div>
              <div className="about-card">
                <div className="about-icon"><ShieldCheck size={22} /></div>
                <h3>Escrow & Trust</h3>
                <p>Your money is held in a secure escrow system. Full transparency, full control. No hidden fees, no surprise terms.</p>
              </div>
              <div className="about-card">
                <div className="about-icon"><Vote size={22} /></div>
                <h3>Democratic Decisions</h3>
                <p>Every village votes on how funds are used. Payouts, investments, allocations — it's all decided collectively.</p>
              </div>
              <div className="about-card">
                <div className="about-icon"><Brain size={22} /></div>
                <h3>Smart Matching</h3>
                <p>Our proprietary algorithm matches you with people who share your financial profile and goals. Or bring your own friends.</p>
              </div>
              <div className="about-card">
                <div className="about-icon"><BarChart3 size={22} /></div>
                <h3>Full Transparency</h3>
                <p>Every transaction logged. Every decision recorded. Village constitutions keep everyone accountable.</p>
              </div>
              <div className="about-card">
                <div className="about-icon"><RefreshCcw size={22} /></div>
                <h3>Reverse Credit</h3>
                <p>Not a loan you pay back — credit that's already paid forward. The pooled fund is the collateral. A new way to think about liquidity.</p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="section" ref={refs.team} style={{ background: "rgba(38,66,51,0.03)", borderRadius: 24, margin: "0 24px", maxWidth: "none", padding: "80px 48px" }}>
            <div className="section-label">Our Team</div>
            <h2>Built by people who believe<br />in collective power.</h2>
            <p className="subtitle">
              We're a team from Yale with deep backgrounds in data science, democratic theory, and financial history.
            </p>
            <div className="team-grid">
              {TEAM.map(t => (
                <div className="team-card" key={t.name}>
                  <img className="team-avatar" src={TEAM_PHOTOS[t.photoKey]} alt={t.name} />
                  <h3>{t.name}</h3>
                  <div className="role">{t.role}</div>
                  <p>{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Invest */}
          <section className="section" ref={refs.invest}>
            <div className="invest-content">
              <div>
                <div className="section-label">The Opportunity</div>
                <h2>A $4B+ market waiting to be unlocked.</h2>
                <div className="invest-text">
                  <p>
                    Based on the stokvel model in South Africa — where 17% of the population participates in cooperative savings — Village brings this proven concept to the United States.
                  </p>
                  <p>
                    With a 2% fee on pooled funds that decreases at scale, Village generates sustainable revenue while keeping costs low for members. Our model shows a clear path to $72M in annual revenue by Year 3.
                  </p>
                </div>
                <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => scrollTo("contact")}>
                  Get In Touch
                </button>
              </div>
              <div className="invest-stats">
                <div className="stat-card">
                  <div className="stat-num">$4.2B</div>
                  <div className="stat-label">Total Addressable Market</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">$72M</div>
                  <div className="stat-label">Year 3 Revenue Target</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">1M</div>
                  <div className="stat-label">Year 3 User Target</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">2%</div>
                  <div className="stat-label">Fee on Pooled Funds</div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="section" ref={refs.contact}>
            <div className="section-label">Contact</div>
            <h2>Let's build something together.</h2>
            <p className="subtitle">
              Whether you're an investor, a potential partner, or just curious — we'd love to hear from you.
            </p>
            <div className="contact-box">
              <input type="text" placeholder="Your name" />
              <input type="email" placeholder="Email address" />
              <textarea placeholder="Your message..." />
              <button className="btn-primary" style={{ width: "100%" }}>Send Message</button>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="foot-logo">VILLAGE<span>.</span></div>
            <p style={{ marginTop: 4 }}>A platform for cooperative finance. © 2025</p>
          </footer>
        </>
      )}

      {/* DASHBOARD */}
      {page === "dashboard" && loggedIn && (
        <div className="dashboard">
          <div className="sidebar">
            <button className={`sidebar-link ${dashTab === "myvillage" ? "active" : ""}`} onClick={() => setDashTab("myvillage")}>
              <span className="sb-icon"><Home size={18} /></span> <span>My Village</span>
            </button>
            <button className={`sidebar-link ${dashTab === "create" ? "active" : ""}`} onClick={() => setDashTab("create")}>
              <span className="sb-icon"><Plus size={18} /></span> <span>Create Village</span>
            </button>
            <button className={`sidebar-link ${dashTab === "villages" ? "active" : ""}`} onClick={() => setDashTab("villages")}>
              <span className="sb-icon"><Globe size={18} /></span> <span>Explore Villages</span>
            </button>
            <button className={`sidebar-link ${dashTab === "people" ? "active" : ""}`} onClick={() => setDashTab("people")}>
              <span className="sb-icon"><Users size={18} /></span> <span>Explore People</span>
            </button>
            <div className="sidebar-spacer" />
            <button className={`sidebar-link ${dashTab === "settings" ? "active" : ""}`} onClick={() => setDashTab("settings")}>
              <span className="sb-icon"><Settings size={18} /></span> <span>Settings</span>
            </button>
          </div>

          <div className="dash-main">
            {/* My Village */}
            {dashTab === "myvillage" && joinedVillages.length === 0 && (
              <div className="placeholder-page">
                <div className="placeholder-icon"><Home size={44} color="var(--pine)" /></div>
                <h2>You're not in a village yet</h2>
                <p>
                  Create your own village and invite people to join, or browse existing villages and people to find your community.
                </p>
                <div className="placeholder-actions">
                  <button className="btn-create" onClick={() => setDashTab("create")}>Create a Village</button>
                  <button className="btn-browse" onClick={() => setDashTab("villages")}>Browse Villages</button>
                  <button className="btn-browse" onClick={() => setDashTab("people")}>Explore People</button>
                </div>
              </div>
            )}

            {dashTab === "myvillage" && joinedVillages.length > 0 && av && (
              <>
                {/* Village switcher tabs when in 2 villages */}
                {joinedVillages.length > 1 && (
                  <div className="village-tabs">
                    {joinedVillages.map(vid => {
                      const vd = VILLAGE_DATA[vid];
                      return (
                        <button key={vid} className={`village-tab ${activeVillageId === vid ? "active" : ""}`} onClick={() => setActiveVillageId(vid)}>
                          {vd ? vd.name : `Village #${vid}`}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="village-header">
                  <div className="village-header-row">
                    <div>
                      <h2>{av.name}</h2>
                      <p>{av.desc}</p>
                    </div>
                    <div className="village-header-actions">
                      <button className={`btn-invite-link ${inviteCopied ? "copied" : ""}`} onClick={copyInviteLink}>
                        {inviteCopied ? "Copied!" : <><Link2 size={14} /> Copy Invite Link</>}
                      </button>
                      <button className="btn-leave" onClick={() => setShowLeaveConfirm(true)}>
                        Leave Village
                      </button>
                    </div>
                  </div>
                </div>

                {/* Members bar */}
                <div className="members-panel" style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <h4 style={{ margin: 0, whiteSpace: "nowrap" }}>Members ({avMembers.length})</h4>
                  {avMembers.map((m, i) => (
                    <div className="member-item" key={m} style={{ padding: 0 }}>
                      <div className="member-avatar" style={{ background: MEMBER_COLORS[i % MEMBER_COLORS.length] }}>
                        {m === "You" ? "Y" : m.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span>{m}</span>
                      <div className={`member-dot ${i < Math.ceil(avMembers.length / 2) || m === "You" ? "online" : ""}`} style={{ width: 7, height: 7 }} />
                    </div>
                  ))}
                </div>

                <div className="village-layout">
                  {/* Chat on the left */}
                  <div className="chat-panel">
                    <h4>Village Chat</h4>
                    <div className="chat-messages" style={{ flex: 1, overflowY: "auto" }}>
                      {avChat.map((c, i) => (
                        <div className="chat-msg" key={i}>
                          <div className={`chat-user ${c.user === "You" ? "you" : ""}`}>{c.user}</div>
                          <div className="chat-text">{c.msg}</div>
                          <div className="chat-time">{c.time}</div>
                        </div>
                      ))}
                    </div>
                    <div className="chat-input-wrap">
                      <input
                        value={chatMsg}
                        onChange={e => setChatMsg(e.target.value)}
                        placeholder="Type a message..."
                        onKeyDown={e => e.key === "Enter" && sendChat()}
                      />
                      <button className="chat-send" onClick={sendChat}>Send</button>
                    </div>
                  </div>

                  {/* Chart in center top */}
                  <div className="chart-panel">
                    <h4>Fund Pool Over Time</h4>
                    {avPool.length > 1 ? (
                      <div className="line-chart-wrap">
                        {(() => {
                          const maxAmt = Math.max(...avPool.map(p => p.amount));
                          const yMax = Math.ceil(maxAmt / 5000) * 5000 || 5000;
                          const ySteps = [0, yMax / 3, (yMax * 2) / 3, yMax];
                          return (
                            <>
                              {ySteps.map((v, i) => (
                                <div key={v} className="chart-y-label" style={{ bottom: `${28 + (i / 3) * 172}px` }}>
                                  ${(v / 1000).toFixed(0)}k
                                </div>
                              ))}
                              <svg className="line-chart-svg" viewBox="0 0 500 230" preserveAspectRatio="xMidYMid meet" style={{ overflow: "visible" }}>
                                {[0, 1, 2, 3].map(i => (
                                  <line key={i} x1="0" y1={200 - (i / 3) * 200} x2="500" y2={200 - (i / 3) * 200}
                                    stroke="rgba(38,66,51,0.06)" strokeWidth="1" />
                                ))}
                                <defs>
                                  <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#264233" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#264233" stopOpacity="0.01" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d={(() => {
                                    const pts = avPool.map((p, i) => ({
                                      x: avPool.length === 1 ? 250 : (i / (avPool.length - 1)) * 500,
                                      y: 200 - (p.amount / yMax) * 200,
                                    }));
                                    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
                                    return `${line} L 500 200 L 0 200 Z`;
                                  })()}
                                  fill="url(#fillGrad)"
                                />
                                <polyline
                                  fill="none" stroke="#264233" strokeWidth="2.5"
                                  strokeLinecap="round" strokeLinejoin="round"
                                  points={avPool.map((p, i) =>
                                    `${avPool.length === 1 ? 250 : (i / (avPool.length - 1)) * 500},${200 - (p.amount / yMax) * 200}`
                                  ).join(" ")}
                                />
                                {avPool.map((p, i) => (
                                  <circle key={p.month}
                                    cx={avPool.length === 1 ? 250 : (i / (avPool.length - 1)) * 500}
                                    cy={200 - (p.amount / yMax) * 200}
                                    r="4" fill="#264233" stroke="#FEFAF3" strokeWidth="2" />
                                ))}
                                {avPool.map((p, i) => (
                                  <text key={p.month}
                                    x={avPool.length === 1 ? 250 : (i / (avPool.length - 1)) * 500}
                                    y="220" className="chart-x-label">{p.month}</text>
                                ))}
                                {avPool.map((p, i) => (
                                  <text key={`val-${p.month}`}
                                    x={avPool.length === 1 ? 250 : (i / (avPool.length - 1)) * 500}
                                    y={200 - (p.amount / yMax) * 200 - 12}
                                    textAnchor="middle" fill="#264233" fontSize="10" fontWeight="600"
                                    fontFamily="Karla, sans-serif">
                                    ${(p.amount / 1000).toFixed(1)}k
                                  </text>
                                ))}
                              </svg>
                            </>
                          );
                        })()}
                      </div>
                    ) : (
                      <p style={{ color: "#6b6355", fontSize: 14, fontStyle: "italic" }}>No pool history yet.</p>
                    )}
                  </div>

                  {/* Decisions in center bottom */}
                  <div className="decisions-panel">
                    <div className="decisions-header">
                      <h4>Decisions</h4>
                      <button className="btn-draft" onClick={() => setShowDraftDecision(true)}>+ Draft Decision</button>
                    </div>

                    {showDraftDecision && (
                      <div className="draft-form">
                        <p>New Decision</p>
                        <input
                          value={draftTitle}
                          onChange={e => setDraftTitle(e.target.value)}
                          placeholder="e.g. Allocate $300 to Marcus's auto loan"
                          onKeyDown={e => e.key === "Enter" && submitDraft()}
                        />
                        <div className="draft-actions">
                          <button className="draft-submit" disabled={!draftTitle.trim()} onClick={submitDraft}>Submit for Vote</button>
                          <button className="draft-cancel" onClick={() => { setShowDraftDecision(false); setDraftTitle(""); }}>Cancel</button>
                        </div>
                      </div>
                    )}

                    {avDecisions.length === 0 && !showDraftDecision && (
                      <p style={{ color: "#6b6355", fontSize: 14, fontStyle: "italic" }}>No decisions yet. Draft one to get started.</p>
                    )}

                    {avDecisions.map(d => (
                      <div className="decision-item" key={d.id}>
                        <div className="decision-title">{d.title}</div>
                        <div className="decision-votes">
                          {d.status === "Active" ? (
                            <>
                              <button style={{ background: "rgba(90,138,90,0.1)", border: "none", borderRadius: 6, padding: "3px 12px", color: "#5a8a5a", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "'Karla', sans-serif" }}>Vote Yes</button>
                              <button style={{ background: "rgba(184,106,90,0.1)", border: "none", borderRadius: 6, padding: "3px 12px", color: "#b86a5a", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "'Karla', sans-serif" }}>Vote No</button>
                            </>
                          ) : (
                            <>
                              <span className="yes">✓ {d.yes}</span>
                              <span className="no">✗ {d.no}</span>
                            </>
                          )}
                          <span className={`decision-status ${d.status}`}>{d.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Create Village */}
            {dashTab === "create" && (
              <div className="create-village-form">
                <h2>Create a Village</h2>
                {joinedVillages.length >= 2 ? (
                  <div className="placeholder-page" style={{ minHeight: "auto", padding: "60px 20px" }}>
                    <div className="placeholder-icon" style={{ width: 80, height: 80 }}><Home size={32} color="var(--pine)" /></div>
                    <h2 style={{ fontSize: 22 }}>You've reached the limit</h2>
                    <p>You can be in a maximum of 2 villages at a time. Leave a village to create or join a new one.</p>
                  </div>
                ) : (
                  <>
                <p>Set up a new cooperative. You can invite friends or let the algorithm match you with others.</p>

                <div className="cv-field">
                  <label>Village Name</label>
                  <input type="text" value={cvName} onChange={e => setCvName(e.target.value)} placeholder="e.g. Debt Crushers NYC" />
                </div>

                <div className="cv-field">
                  <label>Description</label>
                  <textarea value={cvDesc} onChange={e => setCvDesc(e.target.value)} placeholder="What is this village about? What are you trying to achieve together?" />
                </div>

                <div className="cv-row">
                  <div className="cv-field">
                    <label>Primary Goal</label>
                    <select value={cvGoal} onChange={e => setCvGoal(e.target.value)}>
                      <option value="">Select a goal...</option>
                      <option value="Invest">Invest</option>
                      <option value="Retire">Retire</option>
                      <option value="Save">Save</option>
                      <option value="Pay Debt">Pay Off Debt</option>
                    </select>
                  </div>
                  <div className="cv-field">
                    <label>Contribution Frequency</label>
                    <select value={cvFrequency} onChange={e => setCvFrequency(e.target.value)}>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                </div>

                <div className="cv-field">
                  <label>Suggested Contribution Amount ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={cvContribution}
                    onChange={e => { const v = e.target.value; if (v === "" || parseFloat(v) >= 0) setCvContribution(v); }}
                    onKeyDown={e => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
                    placeholder="e.g. 100"
                  />
                </div>

                <div style={{ background: "var(--white)", borderRadius: 14, padding: "20px 24px", border: "1px solid rgba(38,66,51,0.06)", marginBottom: 8 }}>
                  <div className="toggle-row" style={{ borderBottom: "none", padding: 0 }}>
                    <div className="toggle-label-wrap">
                      <div className="toggle-label">Discoverable by Algorithm</div>
                      <div className="toggle-desc">Allow the matching algorithm to recommend your village to other users based on their profile and goals.</div>
                    </div>
                    <button className={`toggle-switch ${algoVisible ? "on" : ""}`} onClick={() => setAlgoVisible(!algoVisible)}>
                      <div className="toggle-knob" />
                    </button>
                  </div>
                </div>

                {cvName.trim() && (
                  <div className="cv-preview">
                    <h4>Preview</h4>
                    <p style={{ fontFamily: "'Young Serif', serif", fontSize: 20, fontWeight: 400, color: "#264233", marginBottom: 4 }}>{cvName}</p>
                    <p>{cvDesc || "No description yet."}</p>
                    <div className="cv-tags">
                      {cvGoal && <span className="cv-tag">{cvGoal}</span>}
                      <span className="cv-tag">{cvFrequency}</span>
                      {cvContribution && <span className="cv-tag">${cvContribution}/period</span>}
                      <span className="cv-tag">{algoVisible ? "Discoverable" : "Private"}</span>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 28 }}>
                  <button
                    className="btn-create"
                    style={{ padding: "16px 36px", fontSize: 16 }}
                    disabled={!cvName.trim()}
                    onClick={handleCreateVillage}
                  >
                    Create Village
                  </button>
                </div>
                  </>
                )}
              </div>
            )}

            {/* Explore Villages */}
            {dashTab === "villages" && (
              <>
                <div className="village-header">
                  <h2>Explore Villages</h2>
                  <p>Villages matched to your financial profile and goals, ranked by compatibility.</p>
                </div>

                <div className="search-bar">
                  <div className="search-wrap">
                    <span className="search-icon"><Search size={14} /></span>
                    <input className="search-input" value={villageSearch} onChange={e => setVillageSearch(e.target.value)} placeholder="Search villages by name..." />
                  </div>
                </div>

                <div className="filter-row">
                  <div className="filter-group">
                    <span className="filter-label">Zip</span>
                    <input className="filter-input zip" value={villageFilterZip} onChange={e => setVillageFilterZip(e.target.value)} placeholder="Any" maxLength={5} />
                  </div>
                  <div className="filter-group">
                    <span className="filter-label">Members</span>
                    <input className="filter-input num" type="number" min="0" value={villageFilterMinMembers} onChange={e => setVillageFilterMinMembers(e.target.value)} placeholder="Min" />
                    <span className="filter-sep">–</span>
                    <input className="filter-input num" type="number" min="0" value={villageFilterMaxMembers} onChange={e => setVillageFilterMaxMembers(e.target.value)} placeholder="Max" />
                  </div>
                  <div className="filter-group">
                    <span className="filter-label">Min Match</span>
                    <input className="filter-input num" type="number" min="0" max="100" value={villageFilterMinMatch} onChange={e => setVillageFilterMinMatch(e.target.value)} placeholder="0%" />
                  </div>
                </div>

                {joinedVillages.length >= 2 && (
                  <p className="join-limit-msg">You're in 2 villages (the maximum). Leave one to join another.</p>
                )}

                <div className="villages-list">
                  {filteredVillages.length === 0 && (
                    <p style={{ color: "#6b6355", fontSize: 14, gridColumn: "1 / -1" }}>No villages match your filters.</p>
                  )}
                  {filteredVillages.map(v => (
                    <div className="village-card" key={v.id}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
                        <div className="village-badge">{v.goal}</div>
                        <div className="village-match">{v.match}% match</div>
                      </div>
                      <h3>{v.name}</h3>
                      <p>{v.desc}</p>
                      <div className="village-meta">
                        <span>{v.members} members</span>
                        <span>${v.pool.toLocaleString()} pooled</span>
                        <span>{v.zip}</span>
                      </div>
                      {joinedVillages.includes(v.id) ? (
                        <button className="btn-invite" style={{ marginTop: 14, opacity: 0.5, cursor: "default" }} disabled>Joined</button>
                      ) : (
                        <button className="btn-invite" style={{ marginTop: 14 }} disabled={joinedVillages.length >= 2} onClick={() => handleJoinVillage(v.id)}>
                          {joinedVillages.length >= 2 ? "Limit Reached" : "Join Village"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Explore People */}
            {dashTab === "people" && (
              <>
                <div className="village-header">
                  <h2>Explore People</h2>
                  <p>People matched to your profile by our algorithm.</p>
                </div>

                <div className="search-bar">
                  <div className="search-wrap">
                    <span className="search-icon"><Search size={14} /></span>
                    <input className="search-input" value={peopleSearch} onChange={e => setPeopleSearch(e.target.value)} placeholder="Search by name or username..." />
                  </div>
                  <div className="filter-group">
                    <span className="filter-label">Zip</span>
                    <input className="filter-input zip" value={peopleFilterZip} onChange={e => setPeopleFilterZip(e.target.value)} placeholder="Any" maxLength={5} />
                  </div>
                </div>

                <div className="people-grid">
                  {filteredPeople.length === 0 && (
                    <p style={{ color: "#6b6355", fontSize: 14, gridColumn: "1 / -1" }}>No people match your search.</p>
                  )}
                  {filteredPeople.map(p => (
                    <div className="person-card" key={p.id}>
                      <div className="person-avatar">{p.name[0]}</div>
                      <h3>{p.name}</h3>
                      {p.username && <div style={{ fontSize: 12, color: "#6b6355", marginBottom: 4 }}>@{p.username}</div>}
                      <div className="match-label">Match Score</div>
                      <div className="match-pct">{p.match}%</div>
                      <div className="person-goal">{p.goal}</div>
                      <div className="person-zip">{p.zip}</div>
                      <button className="btn-invite">Invite to Village</button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Account Settings */}
            {dashTab === "settings" && (
              <div className="settings-page">
                <h2>Account Settings</h2>
                <p>Manage your profile, preferences, and financial details.</p>

                <div className="settings-section">
                  <h3>Profile</h3>
                  <div className="settings-row">
                    <div className="settings-field">
                      <label>Full Name</label>
                      <input type="text" value={settingsName} onChange={e => setSettingsName(e.target.value)} placeholder="Your name" />
                    </div>
                    <div className="settings-field">
                      <label>Username</label>
                      <input type="text" value={settingsUsername} onChange={e => setSettingsUsername(e.target.value)} placeholder="your_username" />
                    </div>
                  </div>
                  <div className="settings-row">
                    <div className="settings-field">
                      <label>Email</label>
                      <input type="email" value={settingsEmail} onChange={e => setSettingsEmail(e.target.value)} placeholder="you@email.com" />
                    </div>
                    <div className="settings-field">
                      <label>Zipcode</label>
                      <input type="text" value={settingsZip} onChange={e => setSettingsZip(e.target.value)} placeholder="10001" maxLength={5} />
                    </div>
                  </div>
                  <div className="settings-field">
                    <label>Financial Goals</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                      {[
                        { key: "invest", label: "Invest" },
                        { key: "retire", label: "Retire" },
                        { key: "save", label: "Save" },
                        { key: "paydebt", label: "Pay Debt" },
                      ].map(g => (
                        <button
                          key={g.key}
                          onClick={() => setGoals(prev => prev.includes(g.key) ? prev.filter(x => x !== g.key) : [...prev, g.key])}
                          style={{
                            padding: "8px 16px",
                            borderRadius: 100,
                            border: goals.includes(g.key) ? "2px solid #264233" : "2px solid rgba(38,66,51,0.12)",
                            background: goals.includes(g.key) ? "rgba(38,66,51,0.06)" : "transparent",
                            color: goals.includes(g.key) ? "#264233" : "#827A6E",
                            fontFamily: "'Karla', sans-serif",
                            fontSize: 13, fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Privacy & Visibility</h3>
                  <div className="toggle-row">
                    <div className="toggle-label-wrap">
                      <div className="toggle-label">Display Username Instead of Real Name</div>
                      <div className="toggle-desc">Other users will see your username ({settingsUsername || "not set"}) instead of your real name in villages and searches.</div>
                    </div>
                    <button className={`toggle-switch ${showUsername ? "on" : ""}`} onClick={() => setShowUsername(!showUsername)}>
                      <div className="toggle-knob" />
                    </button>
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-label-wrap">
                      <div className="toggle-label">Discoverable by Algorithm</div>
                      <div className="toggle-desc">Allow the matching algorithm to show your profile to other users looking for village members.</div>
                    </div>
                    <button className={`toggle-switch ${algoVisible ? "on" : ""}`} onClick={() => setAlgoVisible(!algoVisible)}>
                      <div className="toggle-knob" />
                    </button>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Financial Details</h3>
                  <p style={{ fontSize: 14, color: "#6b6355", marginBottom: 16, marginTop: -8 }}>Update your income, debts, and assets to improve algorithm matching.</p>
                  <FinancialSection
                    title="Income"
                    categories={INCOME_CATEGORIES}
                    values={incomeValues}
                    onChange={(k, v) => setIncomeValues({ ...incomeValues, [k]: v })}
                    onDelete={deleteIncomeKey}
                  />
                  <FinancialSection
                    title="Debts"
                    categories={DEBT_CATEGORIES}
                    values={debtValues}
                    onChange={(k, v) => setDebtValues({ ...debtValues, [k]: v })}
                    onDelete={deleteDebtKey}
                  />
                  <AssetSection
                    groups={ASSET_CATEGORIES_GROUPED}
                    values={assetValues}
                    onChange={(k, v) => setAssetValues({ ...assetValues, [k]: v })}
                    onDelete={deleteAssetKey}
                  />
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button className="btn-save-settings">Save Changes</button>
                  <button className="btn-danger" onClick={() => { setLoggedIn(false); setJoinedVillages([]); setActiveVillageId(null); setPage("home"); }}>Delete Account</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEAVE VILLAGE CONFIRM */}
      {showLeaveConfirm && (
        <div className="leave-confirm" onClick={e => { if (e.target === e.currentTarget) setShowLeaveConfirm(false); }}>
          <div className="leave-confirm-box">
            <h3>Leave this village?</h3>
            <p>You'll lose access to the village chat, fund pool, and voting. Your contributions already made will remain in the pool per the village constitution.</p>
            <div className="leave-confirm-actions">
              <button className="btn-leave-cancel" onClick={() => setShowLeaveConfirm(false)}>Cancel</button>
              <button className="btn-leave-confirm" onClick={handleLeaveVillage}>Leave Village</button>
            </div>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {showAuth && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowAuth(false); }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setShowAuth(false)}><X size={20} /></button>

            {/* Tabs */}
            <div className="auth-tabs">
              <button className={`auth-tab ${authTab === "login" ? "active" : ""}`} onClick={() => setAuthTab("login")}>Log In</button>
              <button className={`auth-tab ${authTab === "signup" ? "active" : ""}`} onClick={() => { setAuthTab("signup"); setSignupStep(0); }}>Sign Up</button>
            </div>

            {/* LOGIN */}
            {authTab === "login" && (
              <>
                <h2>Welcome back</h2>
                <p className="modal-sub">Log in to your Village account.</p>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <button className="btn-next" onClick={handleLogin}>Log In</button>
              </>
            )}

            {/* SIGNUP */}
            {authTab === "signup" && (
              <>
                <div className="step-indicator">
                  {[0, 1, 2].map(i => (
                    <div key={i} className={`step-dot ${signupStep === i ? "active" : signupStep > i ? "done" : ""}`} />
                  ))}
                </div>

                {/* Step 1: Basic Info */}
                {signupStep === 0 && (
                  <>
                    <h2>Create your account</h2>
                    <p className="modal-sub">Let's start with the basics.</p>
                    <div className="input-row two-col">
                      <div>
                        <label>First Name</label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Jane" />
                      </div>
                      <div>
                        <label>Last Name</label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe" />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Email</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
                    </div>
                    <div className="input-group">
                      <label>Password</label>
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" />
                    </div>
                    <div className="input-group">
                      <label>Zipcode</label>
                      <input type="text" value={zipcode} onChange={e => setZipcode(e.target.value)} placeholder="10001" maxLength={5} />
                    </div>
                    <div className="modal-actions">
                      <div />
                      <button className="btn-next" disabled={!firstName || !lastName || !zipcode} onClick={() => setSignupStep(1)}>Continue</button>
                    </div>
                  </>
                )}

                {/* Step 2: Goals */}
                {signupStep === 1 && (
                  <>
                    <h2>Your financial goals</h2>
                    <p className="modal-sub">What are you looking to achieve? Select all that apply.</p>
                    <div className="goals-grid">
                      {[
                        { key: "invest", icon: <TrendingUp size={24} />, label: "Invest" },
                        { key: "retire", icon: <Umbrella size={24} />, label: "Retire" },
                        { key: "save", icon: <PiggyBank size={24} />, label: "Save" },
                        { key: "paydebt", icon: <CreditCard size={24} />, label: "Pay Off Debt" },
                      ].map(g => (
                        <div key={g.key} className={`goal-card ${goals.includes(g.key) ? "selected" : ""}`} onClick={() => toggleGoal(g.key)}>
                          <div className="goal-icon">{g.icon}</div>
                          <div className="goal-label">{g.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="modal-actions">
                      <button className="btn-back" onClick={() => setSignupStep(0)}>Back</button>
                      <button className="btn-next" disabled={goals.length === 0} onClick={() => setSignupStep(2)}>Continue</button>
                    </div>
                  </>
                )}

                {/* Step 3: Financial Details */}
                {signupStep === 2 && (
                  <>
                    <h2>Financial details</h2>
                    <p className="modal-sub">Add as many or as few details as you'd like. This helps us match you better.</p>

                    <FinancialSection
                      title="Income"
                      categories={INCOME_CATEGORIES}
                      values={incomeValues}
                      onChange={(k, v) => setIncomeValues({ ...incomeValues, [k]: v })}
                      onDelete={deleteIncomeKey}
                    />

                    <FinancialSection
                      title="Debts"
                      categories={DEBT_CATEGORIES}
                      values={debtValues}
                      onChange={(k, v) => setDebtValues({ ...debtValues, [k]: v })}
                      onDelete={deleteDebtKey}
                    />

                    <AssetSection
                      groups={ASSET_CATEGORIES_GROUPED}
                      values={assetValues}
                      onChange={(k, v) => setAssetValues({ ...assetValues, [k]: v })}
                      onDelete={deleteAssetKey}
                    />

                    <div className="modal-actions">
                      <button className="btn-back" onClick={() => setSignupStep(1)}>Back</button>
                      <button className="btn-next" onClick={handleSignupComplete}>Create Account</button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
