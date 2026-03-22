import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import About from './pages/About'
import Investors from './pages/Investors'
import Faq from './pages/Faq'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import './index.css'

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } },
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/auth" replace />
}

function AnimatedRoutes() {
  const location = useLocation()
  const { user } = useAuth()
  const isDash = location.pathname === '/dashboard'
  const isAuth = location.pathname === '/auth'

  return (
    <>
      <ScrollToTop />
      {!isDash && !isAuth && <Nav />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes location={location}>
            <Route path="/"           element={<Landing />} />
            <Route path="/about"      element={<About />} />
            <Route path="/investors"  element={<Investors />} />
            <Route path="/faq"        element={<Faq />} />
            <Route path="/auth"       element={user ? <Navigate to="/dashboard" /> : <Auth />} />
            <Route path="/dashboard"  element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
          {!isDash && !isAuth && <Footer />}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
