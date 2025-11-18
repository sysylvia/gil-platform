import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

// Placeholder components (to be implemented)
function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-500 to-primary-700">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">GIL Platform</h1>
        <p className="text-xl mb-8">Global Intelligence Layer</p>
        <p className="text-lg mb-8">Recruiting and assessing clinicians worldwide</p>
        <div className="space-x-4">
          <a href="/signup" className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Get Started
          </a>
          <a href="/login" className="btn btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600">
            Sign In
          </a>
        </div>
      </div>
    </div>
  )
}

function SignupPage() {
  return <div className="p-8">Signup Page - Coming Soon</div>
}

function LoginPage() {
  return <div className="p-8">Login Page - Coming Soon</div>
}

function ProfileSetupPage() {
  return <div className="p-8">Profile Setup - Coming Soon</div>
}

function AssessmentPage() {
  return <div className="p-8">Assessment Interface - Coming Soon</div>
}

function DashboardPage() {
  return <div className="p-8">Dashboard - Coming Soon</div>
}

export default App
