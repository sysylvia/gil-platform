import React, { useState, useEffect } from 'react';
import { ChevronRight, User, Brain, CheckCircle, Activity, Award, Clock, AlertCircle, Menu, X, BarChart3, FileText, Settings, LogOut, Plus, Trash2, AlertTriangle, GripVertical, Star } from 'lucide-react';

// Enhanced Clinical Case with reference differentials
class ClinicalCase {
  constructor(id, content, referenceDifferential, parameters) {
    this.id = id;
    this.content = content;
    this.referenceDifferential = referenceDifferential; // Expert consensus differential
    this.parameters = parameters;
  }
}

// Initialize case bank with reference differentials
const initializeCaseBank = () => {
  return [
    new ClinicalCase(1, 
      {
        presentation: "A 45-year-old male presents with chest pain, shortness of breath, and diaphoresis for 2 hours. The pain is substernal, crushing in quality, and radiates to the left arm. BP: 150/90, HR: 110, O2 sat: 94% on room air.",
        vitalSigns: { bp: "150/90", hr: 110, o2sat: 94, temp: 37.2 },
        demographics: { age: 45, sex: "male" },
        history: "10 pack-year smoking history, family history of CAD"
      },
      {
        diagnoses: [
          { name: "Acute Myocardial Infarction", likelihood: 0.35, notToMiss: true },
          { name: "Unstable Angina", likelihood: 0.25, notToMiss: true },
          { name: "Pulmonary Embolism", likelihood: 0.15, notToMiss: true },
          { name: "Aortic Dissection", likelihood: 0.10, notToMiss: true },
          { name: "Panic Attack", likelihood: 0.10, notToMiss: false },
          { name: "Gastroesophageal Reflux Disease", likelihood: 0.05, notToMiss: false }
        ]
      },
      {
        difficulty: -0.5,
        discrimination: 1.2,
        skillVector: [1.0, 0.8, 0.2, 0.1], // [emergency, cardiology, psych, other]
        specialty: "emergency",
        clinicalArea: "cardiovascular",
        complexity: "moderate"
      }
    ),
    
    new ClinicalCase(2,
      {
        presentation: "A 32-year-old female with sudden onset severe headache ('worst headache of my life'), photophobia, and neck stiffness. Started 4 hours ago. Temperature: 38.5°C, BP: 140/85, no focal neurological deficits on exam.",
        vitalSigns: { temp: 38.5, bp: "140/85", hr: 95 },
        demographics: { age: 32, sex: "female" },
        history: "No significant PMH, on oral contraceptives"
      },
      {
        diagnoses: [
          { name: "Subarachnoid Hemorrhage", likelihood: 0.30, notToMiss: true },
          { name: "Bacterial Meningitis", likelihood: 0.25, notToMiss: true },
          { name: "Viral Meningitis", likelihood: 0.20, notToMiss: false },
          { name: "Migraine", likelihood: 0.15, notToMiss: false },
          { name: "Intracranial Mass/Tumor", likelihood: 0.05, notToMiss: true },
          { name: "Tension Headache", likelihood: 0.05, notToMiss: false }
        ]
      },
      {
        difficulty: 0.3,
        discrimination: 1.5,
        skillVector: [0.9, 0.2, 0.1, 0.8], // [emergency, cardiology, psych, neuro]
        specialty: "emergency",
        clinicalArea: "neurological",
        complexity: "high"
      }
    ),
    
    new ClinicalCase(3,
      {
        presentation: "A 58-year-old male with 3-month history of fatigue, unintentional weight loss (15 lbs), and drenching night sweats. Exam reveals hepatosplenomegaly and cervical lymphadenopathy. Labs: WBC 45,000 with left shift, Hgb 9.2, Plt 580,000.",
        labs: { wbc: 45000, differential: "70% neutrophils with left shift", hgb: 9.2, platelets: 580000 },
        demographics: { age: 58, sex: "male" },
        physicalExam: "Spleen palpable 6cm below costal margin, multiple 2cm cervical nodes"
      },
      {
        diagnoses: [
          { name: "Chronic Myeloid Leukemia", likelihood: 0.30, notToMiss: true },
          { name: "Lymphoma (Hodgkin or Non-Hodgkin)", likelihood: 0.25, notToMiss: true },
          { name: "Myelofibrosis", likelihood: 0.15, notToMiss: true },
          { name: "Essential Thrombocythemia", likelihood: 0.10, notToMiss: false },
          { name: "Tuberculosis", likelihood: 0.10, notToMiss: true },
          { name: "Metastatic Malignancy", likelihood: 0.10, notToMiss: true }
        ]
      },
      {
        difficulty: 1.2,
        discrimination: 1.8,
        skillVector: [0.3, 0.1, 0.1, 0.9], // [emergency, cardiology, psych, heme-onc]
        specialty: "internal_medicine",
        clinicalArea: "hematology",
        complexity: "high"
      }
    )
  ];
};

// Differential Diagnosis Component
const DifferentialDiagnosisEntry = ({ diagnosis, index, onUpdate, onRemove, onDragStart, onDragOver, onDrop, isDragging }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      className={`flex items-center gap-3 p-3 bg-white border rounded-lg transition-all ${
        isDragging ? 'opacity-50' : ''
      } ${diagnosis.notToMiss ? 'border-orange-300 bg-orange-50' : 'border-gray-200'}`}
    >
      <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
      
      <span className="font-semibold text-gray-600 w-8">#{index + 1}</span>
      
      <input
        type="text"
        value={diagnosis.name}
        onChange={(e) => onUpdate(index, 'name', e.target.value)}
        placeholder="Enter diagnosis"
        className="flex-1 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Confidence:</label>
        <select
          value={diagnosis.confidence}
          onChange={(e) => onUpdate(index, 'confidence', e.target.value)}
          className="px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      
      <button
        onClick={() => onUpdate(index, 'notToMiss', !diagnosis.notToMiss)}
        className={`p-2 rounded transition-colors ${
          diagnosis.notToMiss 
            ? 'bg-orange-500 text-white hover:bg-orange-600' 
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
        title="Mark as 'Not to Miss' diagnosis"
      >
        <AlertTriangle className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => onRemove(index)}
        className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

// Enhanced IRT Assessment Engine for Differential Diagnosis
class DifferentialAssessment {
  constructor() {
    this.caseBank = initializeCaseBank();
    this.availableCases = [...this.caseBank];
    this.responses = [];
    this.theta = 0;
    this.se = 1.0;
    this.thetaHistory = [0];
    this.competenceVector = [0, 0, 0, 0];
    this.startTime = new Date();
  }
  
  // Calculate similarity between submitted and reference differentials
  calculateDifferentialScore(submitted, reference) {
    let score = 0;
    let maxScore = 0;
    
    // Score based on diagnosis matching and ranking
    reference.diagnoses.forEach((refDx, refIndex) => {
      const weight = 1 / (refIndex + 1); // Higher weight for top diagnoses
      maxScore += weight;
      
      const submittedIndex = submitted.findIndex(
        subDx => this.normalizeDiagnosis(subDx.name) === this.normalizeDiagnosis(refDx.name)
      );
      
      if (submittedIndex !== -1) {
        // Points for including the diagnosis
        score += weight * 0.5;
        
        // Additional points for correct ranking
        const rankDifference = Math.abs(submittedIndex - refIndex);
        const rankScore = Math.max(0, 1 - rankDifference / reference.diagnoses.length);
        score += weight * 0.3 * rankScore;
        
        // Points for correctly identifying not-to-miss
        if (refDx.notToMiss && submitted[submittedIndex].notToMiss) {
          score += weight * 0.2;
        }
      } else if (refDx.notToMiss) {
        // Penalty for missing critical diagnoses
        score -= weight * 0.3;
      }
    });
    
    // Normalize score to 0-1
    return Math.max(0, score / maxScore);
  }
  
  normalizeDiagnosis(diagnosis) {
    return diagnosis.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  }
  
  // Modified probability function for continuous scores
  probabilityOfScore(theta, caseItem, score) {
    const { difficulty, discrimination } = caseItem;
    const expectedScore = 1 / (1 + Math.exp(-discrimination * (theta - difficulty)));
    
    // Model score as beta distribution centered on expected score
    const variance = 0.1;
    const distance = Math.abs(score - expectedScore);
    return Math.exp(-distance * distance / (2 * variance));
  }
  
  // Information function for continuous outcomes
  itemInformation(theta, caseItem) {
    const { discrimination } = caseItem;
    const p = 1 / (1 + Math.exp(-discrimination * (theta - caseItem.difficulty)));
    return discrimination * discrimination * p * (1 - p);
  }
  
  selectNextCase() {
    let maxInfo = -Infinity;
    let selectedCase = null;
    let selectedIndex = -1;
    
    for (let i = 0; i < this.availableCases.length; i++) {
      const caseItem = this.availableCases[i];
      const info = this.itemInformation(this.theta, caseItem);
      
      if (info > maxInfo) {
        maxInfo = info;
        selectedCase = caseItem;
        selectedIndex = i;
      }
    }
    
    if (selectedIndex !== -1) {
      this.availableCases.splice(selectedIndex, 1);
    }
    
    return selectedCase;
  }
  
  processResponse(caseItem, submittedDifferential, responseTime) {
    const score = this.calculateDifferentialScore(
      submittedDifferential, 
      caseItem.referenceDifferential
    );
    
    const response = {
      case: caseItem,
      submittedDifferential,
      score,
      timestamp: new Date(),
      responseTime
    };
    
    this.responses.push(response);
    
    // Update ability estimate
    this.updateAbilityEstimate();
    
    // Update competence vector
    const learningRate = 0.15;
    for (let i = 0; i < this.competenceVector.length; i++) {
      if (caseItem.parameters.skillVector[i] > 0) {
        const update = learningRate * caseItem.parameters.skillVector[i] * (score - 0.5) * 2;
        this.competenceVector[i] += update;
      }
    }
    
    return response;
  }
  
  updateAbilityEstimate() {
    if (this.responses.length === 0) return;
    
    // Simplified MLE for continuous scores
    let theta = this.theta;
    const learningRate = 0.3;
    
    for (const response of this.responses) {
      const expectedScore = 1 / (1 + Math.exp(-response.case.parameters.discrimination * (theta - response.case.parameters.difficulty)));
      const gradient = response.case.parameters.discrimination * (response.score - expectedScore);
      theta += learningRate * gradient;
    }
    
    this.theta = Math.max(-3, Math.min(3, theta));
    this.thetaHistory.push(this.theta);
    
    // Update standard error
    let totalInformation = 0;
    for (const response of this.responses) {
      totalInformation += this.itemInformation(this.theta, response.case);
    }
    this.se = 1 / Math.sqrt(totalInformation);
  }
  
  shouldStop() {
    const minItems = 3;
    const maxItems = 10;
    const targetSE = 0.35;
    
    if (this.responses.length < minItems) return false;
    if (this.responses.length >= maxItems) return true;
    if (this.se <= targetSE) return true;
    
    return false;
  }
  
  getCompetenceProfile() {
    const avgScore = this.responses.reduce((sum, r) => sum + r.score, 0) / this.responses.length;
    
    let level;
    if (this.theta >= 1.0) level = 'Expert';
    else if (this.theta >= 0) level = 'Proficient';
    else if (this.theta >= -1) level = 'Developing';
    else level = 'Novice';
    
    const competencies = ['Emergency Medicine', 'Cardiology', 'Mental Health', 'Complex Diagnostics'];
    const strengths = [];
    const growthAreas = [];
    
    this.competenceVector.forEach((score, index) => {
      if (score > 0.5) strengths.push(competencies[index]);
      else if (score < -0.2) growthAreas.push(competencies[index]);
    });
    
    return {
      overallAbility: this.theta,
      skillLevel: level,
      standardError: this.se,
      competenceVector: this.competenceVector,
      casesCompleted: this.responses.length,
      accuracy: avgScore * 100,
      assessmentDuration: Math.floor((new Date() - this.startTime) / 1000),
      adaptivePath: this.thetaHistory,
      strengths: strengths.length > 0 ? strengths : ['Clinical Reasoning'],
      areasForGrowth: growthAreas.length > 0 ? growthAreas : ['Differential Prioritization'],
      diagnosticAccuracy: this.calculateDiagnosticMetrics()
    };
  }
  
  calculateDiagnosticMetrics() {
    let correctDiagnoses = 0;
    let notToMissIdentified = 0;
    let totalNotToMiss = 0;
    
    this.responses.forEach(response => {
      const ref = response.case.referenceDifferential.diagnoses;
      const submitted = response.submittedDifferential;
      
      // Check if top diagnosis was included
      if (submitted.some(dx => 
        this.normalizeDiagnosis(dx.name) === this.normalizeDiagnosis(ref[0].name)
      )) {
        correctDiagnoses++;
      }
      
      // Check not-to-miss diagnoses
      ref.filter(dx => dx.notToMiss).forEach(criticalDx => {
        totalNotToMiss++;
        if (submitted.some(subDx => 
          this.normalizeDiagnosis(subDx.name) === this.normalizeDiagnosis(criticalDx.name) && 
          subDx.notToMiss
        )) {
          notToMissIdentified++;
        }
      });
    });
    
    return {
      topDiagnosisAccuracy: (correctDiagnoses / this.responses.length) * 100,
      criticalDiagnosisCapture: totalNotToMiss > 0 ? (notToMissIdentified / totalNotToMiss) * 100 : 100
    };
  }
}

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [assessmentData, setAssessmentData] = useState({
    responses: [],
    startTime: null,
    endTime: null,
    skillProfile: null
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">CollectiveGood</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Network of Clinical Experts
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Help shape the future of responsible clinical AI by contributing your expertise to our innovative platform designed to work with clinicians and complement their knowledge.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI Validation</h3>
              <p className="text-gray-600">Contribute to testing and validating clinical AI models with your expertise</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Expert Consensus</h3>
              <p className="text-gray-600">Join a network providing consensus assessments on medical cases</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Recognition</h3>
              <p className="text-gray-600">Build your professional profile and contribute to advancing healthcare</p>
            </div>
          </div>

          <div className="flex justify-between items-center mx-auto max-w-lg">
            <button
              onClick={() => setCurrentPage('signup')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center"
            >
              Get Started <ChevronRight className="ml-2 w-5 h-5" />
            </button>
            
            <button
              onClick={() => setCurrentPage('login')}
              className="text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </main>
    </div>
  );

  // Sign Up Component
  const SignUpPage = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      agreeToTerms: false
    });

    const handleSubmit = () => {
      // Basic validation
      if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
        alert('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (!formData.agreeToTerms) {
        alert('Please agree to the Terms of Service');
        return;
      }
      
      setUser({ ...formData, id: Date.now() });
      setCurrentPage('profile');
    };

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mr-2"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
              
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Create Account
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentPage('login')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Login Page Component
  const LoginPage = () => {
    const [loginData, setLoginData] = useState({
      email: '',
      password: '',
      rememberMe: false
    });
    const [error, setError] = useState('');

    const handleLogin = () => {
      setError('');
      
      // Basic validation
      if (!loginData.email || !loginData.password) {
        setError('Please enter both email and password');
        return;
      }
      
      // Simulate login - in production, this would call an API
      // For demo, we'll check if it's a known email pattern
      if (loginData.email.includes('@') && loginData.password.length >= 6) {
        // Create user session with mock data
        const mockUser = {
          id: Date.now(),
          email: loginData.email,
          firstName: 'Returning',
          lastName: 'User',
          profile: {
            specialty: 'Internal Medicine',
            yearsExperience: '6-10',
            boardCertified: 'yes',
            currentRole: 'Attending Physician',
            institution: 'City Medical Center'
          }
        };
        
        // Check if they have completed assessment
        const hasCompletedAssessment = loginData.email.includes('returning');
        
        if (hasCompletedAssessment) {
          // Mock completed assessment data
          setAssessmentData({
            responses: [],
            startTime: new Date(Date.now() - 3600000),
            endTime: new Date(Date.now() - 3000000),
            skillProfile: {
              overallAbility: 0.75,
              skillLevel: 'Proficient',
              standardError: 0.25,
              competenceVector: [0.8, 0.6, 0.4, 0.7],
              casesCompleted: 8,
              accuracy: 82.5,
              diagnosticAccuracy: {
                topDiagnosisAccuracy: 87.5,
                criticalDiagnosisCapture: 91.0
              },
              strengths: ['Emergency Medicine', 'Clinical Reasoning'],
              areasForGrowth: ['Rare Conditions', 'Complex Diagnostics']
            }
          });
        }
        
        setUser(mockUser);
        setCurrentPage(hasCompletedAssessment ? 'dashboard' : 'assessment-intro');
      } else {
        setError('Invalid email or password. Try any email with 6+ character password.');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">CollectiveGood</h1>
            <h2 className="mt-2 text-xl text-gray-600">Sign in to your account</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="mr-2"
                    checked={loginData.rememberMe}
                    onChange={(e) => setLoginData({...loginData, rememberMe: e.target.checked})}
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </button>
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Sign In
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-500 text-center">
                Demo hint: Use any email address with a 6+ character password. 
                Include "returning" in the email to see a completed assessment dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Profile Setup Component
  const ProfileSetup = () => {
    const [profileData, setProfileData] = useState({
      specialty: '',
      yearsExperience: '',
      boardCertified: '',
      currentRole: '',
      institution: '',
      clinicalInterests: []
    });

    const specialties = [
      'Internal Medicine',
      'Family Medicine',
      'Emergency Medicine',
      'Pediatrics',
      'Surgery',
      'Psychiatry',
      'Obstetrics/Gynecology',
      'Radiology',
      'Anesthesiology',
      'Other'
    ];

    const handleSubmit = () => {
      // Basic validation
      if (!profileData.specialty || !profileData.yearsExperience || !profileData.boardCertified || 
          !profileData.currentRole || !profileData.institution) {
        alert('Please fill in all fields');
        return;
      }
      
      setUser({ ...user, profile: profileData });
      setCurrentPage('assessment-intro');
    };

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Complete Your Clinical Profile</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Specialty
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profileData.specialty}
                  onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                >
                  <option value="">Select a specialty</option>
                  {specialties.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Clinical Experience
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profileData.yearsExperience}
                  onChange={(e) => setProfileData({...profileData, yearsExperience: e.target.value})}
                >
                  <option value="">Select years</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-20">11-20 years</option>
                  <option value="20+">20+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Board Certified?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="boardCertified"
                      value="yes"
                      required
                      className="mr-2"
                      onChange={(e) => setProfileData({...profileData, boardCertified: e.target.value})}
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="boardCertified"
                      value="no"
                      required
                      className="mr-2"
                      onChange={(e) => setProfileData({...profileData, boardCertified: e.target.value})}
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Role
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Attending Physician, Resident, Fellow"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profileData.currentRole}
                  onChange={(e) => setProfileData({...profileData, currentRole: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution/Practice
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your current institution or practice"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profileData.institution}
                  onChange={(e) => setProfileData({...profileData, institution: e.target.value})}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Continue to Skill Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Assessment Introduction
  const AssessmentIntro = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 text-center">
        <Brain className="w-16 h-16 text-blue-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Clinical Skill Profile Assessment</h2>
        <p className="text-gray-600 mb-6">
          This adaptive assessment evaluates your clinical reasoning through differential diagnosis exercises. 
          You'll analyze patient cases and provide ranked differential diagnoses with confidence levels.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-blue-900 mb-2">Assessment Format:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Enter multiple diagnoses for each case</li>
            <li>• Rank them by likelihood (drag to reorder)</li>
            <li>• Indicate your confidence level for each</li>
            <li>• Flag critical "not-to-miss" diagnoses</li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="text-center">
            <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">~10 minutes</p>
          </div>
          <div className="text-center">
            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">3-10 cases</p>
          </div>
          <div className="text-center">
            <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Adaptive difficulty</p>
          </div>
        </div>

        <button
          onClick={() => {
            setAssessmentData({ ...assessmentData, startTime: new Date() });
            setCurrentPage('assessment');
          }}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Begin Assessment
        </button>
      </div>
    </div>
  );

  // Differential Diagnosis Assessment
  const DifferentialAssessment = () => {
    const [assessmentEngine] = useState(() => new DifferentialAssessment());
    const [currentCase, setCurrentCase] = useState(null);
    const [differentialList, setDifferentialList] = useState([
      { name: '', confidence: 'medium', notToMiss: false }
    ]);
    const [caseStartTime, setCaseStartTime] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(600);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
      const firstCase = assessmentEngine.selectNextCase();
      setCurrentCase(firstCase);
      setCaseStartTime(new Date());
    }, []);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0) {
            completeAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const addDiagnosis = () => {
      setDifferentialList([...differentialList, { name: '', confidence: 'medium', notToMiss: false }]);
    };

    const updateDiagnosis = (index, field, value) => {
      const updated = [...differentialList];
      updated[index][field] = value;
      setDifferentialList(updated);
    };

    const removeDiagnosis = (index) => {
      if (differentialList.length > 1) {
        setDifferentialList(differentialList.filter((_, i) => i !== index));
      }
    };

    const handleDragStart = (e, index) => {
      setDraggedIndex(index);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e, dropIndex) => {
      e.preventDefault();
      if (draggedIndex === null) return;

      const draggedItem = differentialList[draggedIndex];
      const newList = [...differentialList];
      
      // Remove dragged item
      newList.splice(draggedIndex, 1);
      
      // Insert at new position
      newList.splice(dropIndex, 0, draggedItem);
      
      setDifferentialList(newList);
      setDraggedIndex(null);
    };

    const [showFeedback, setShowFeedback] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState(null);

    const submitDifferential = () => {
      const validDiagnoses = differentialList.filter(dx => dx.name.trim() !== '');
      
      if (validDiagnoses.length === 0) {
        alert('Please enter at least one diagnosis');
        return;
      }

      const responseTime = (new Date() - caseStartTime) / 1000;
      const response = assessmentEngine.processResponse(currentCase, validDiagnoses, responseTime);
      
      // Generate feedback with peer comparison
      const feedback = generateFeedback(currentCase, validDiagnoses, response);
      setCurrentFeedback(feedback);
      setShowFeedback(true);
    };

    const generateFeedback = (caseData, submitted, response) => {
      // Simulate peer data - in production, this would come from the backend
      const peerResponses = generatePeerData(caseData);
      
      return {
        score: response.score * 100,
        components: {
          inclusion: 88.5,
          ranking: 82.0,
          critical: response.score > 0.7 ? 90.0 : 65.0,
          calibration: 78.5,
          efficiency: 85.0
        },
        peerComparison: {
          percentile: Math.floor(response.score * 100 * 0.8 + 10),
          peerMedianScore: 76.2,
          peerCount: 156,
          commonDiagnoses: peerResponses.topDiagnoses,
          missedByPeers: peerResponses.missedDiagnoses
        },
        reference: caseData.referenceDifferential
      };
    };

    const generatePeerData = (caseData) => {
      // Simulate what peers commonly included
      return {
        topDiagnoses: [
          { diagnosis: caseData.referenceDifferential.diagnoses[0].name, percentage: 92 },
          { diagnosis: caseData.referenceDifferential.diagnoses[1].name, percentage: 78 },
          { diagnosis: caseData.referenceDifferential.diagnoses[2].name, percentage: 65 }
        ],
        missedDiagnoses: [
          { diagnosis: caseData.referenceDifferential.diagnoses[3].name, percentage: 35 }
        ]
      };
    };

    const proceedToNext = () => {
      setShowFeedback(false);
      
      if (assessmentEngine.shouldStop() || assessmentEngine.availableCases.length === 0) {
        completeAssessment();
      } else {
        const nextCase = assessmentEngine.selectNextCase();
        setCurrentCase(nextCase);
        setDifferentialList([{ name: '', confidence: 'medium', notToMiss: false }]);
        setCaseStartTime(new Date());
        setShowHint(false);
      }
    };

    const completeAssessment = () => {
      const profile = assessmentEngine.getCompetenceProfile();
      setAssessmentData({
        responses: assessmentEngine.responses,
        endTime: new Date(),
        skillProfile: profile
      });
      setCurrentPage('dashboard');
    };

    if (!currentCase) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // Show feedback page if submitted
    if (showFeedback && currentFeedback) {
      return (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Case Feedback & Analysis</h2>
              
              {/* Overall Score */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Your Score</h3>
                  <span className="text-3xl font-bold text-blue-600">{currentFeedback.score.toFixed(0)}%</span>
                </div>
                
                {/* Score Components */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  {Object.entries(currentFeedback.components).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-sm text-gray-600 capitalize">{key}</p>
                      <p className="text-lg font-semibold">{value.toFixed(0)}%</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peer Comparison */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Peer Comparison</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Your Performance vs Peers</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                        <div 
                          className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                          style={{ width: `${currentFeedback.peerComparison.percentile}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                          {currentFeedback.peerComparison.percentile}th percentile
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Among {currentFeedback.peerComparison.peerCount} peers (median: {currentFeedback.peerComparison.peerMedianScore}%)
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Common Peer Diagnoses</p>
                    <div className="space-y-2">
                      {currentFeedback.peerComparison.commonDiagnoses.map((dx, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{dx.diagnosis}</span>
                          <span className="text-gray-500">{dx.percentage}% included</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reference Differential */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Expert Reference Differential</h3>
                <div className="space-y-2">
                  {currentCase.referenceDifferential.diagnoses.map((dx, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${
                      dx.notToMiss ? 'bg-orange-50 border border-orange-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-600">#{idx + 1}</span>
                        <span>{dx.name}</span>
                        {dx.notToMiss && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                      </div>
                      <span className="text-sm text-gray-500">{(dx.likelihood * 100).toFixed(0)}% likelihood</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Submission Review */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Your Differential Analysis</h3>
                <div className="space-y-2">
                  {differentialList.filter(dx => dx.name).map((dx, idx) => {
                    const matched = currentCase.referenceDifferential.diagnoses.find(
                      ref => assessmentEngine.normalizeDiagnosis(ref.name) === 
                             assessmentEngine.normalizeDiagnosis(dx.name)
                    );
                    
                    return (
                      <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${
                        matched ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-600">#{idx + 1}</span>
                          <span>{dx.name}</span>
                          {dx.notToMiss && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">Confidence: {dx.confidence}</span>
                          {matched ? 
                            <CheckCircle className="w-5 h-5 text-green-600" /> : 
                            <X className="w-5 h-5 text-red-600" />
                          }
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={proceedToNext}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                {assessmentEngine.shouldStop() ? 'Complete Assessment' : 'Next Case'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Case {assessmentEngine.responses.length + 1}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(100, (assessmentEngine.responses.length + 1) / 5 * 100)}%` 
                }}
              />
            </div>
          </div>

          {/* Case Presentation */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h3 className="text-xl font-semibold mb-6">Clinical Case</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-gray-800 leading-relaxed mb-4">
                {currentCase.content.presentation}
              </p>
              
              {currentCase.content.vitalSigns && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {Object.entries(currentCase.content.vitalSigns).map(([key, value]) => (
                    <div key={key} className="bg-white rounded p-2 text-sm">
                      <span className="text-gray-500 capitalize">
                        {key === 'bp' ? 'BP' : key === 'hr' ? 'HR' : key === 'o2sat' ? 'O₂ Sat' : 'Temp'}: 
                      </span>
                      <span className="font-medium ml-1">{value}{key === 'temp' ? '°C' : ''}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {currentCase.content.history && (
                <p className="text-sm text-gray-700 italic">
                  History: {currentCase.content.history}
                </p>
              )}
              
              {currentCase.content.physicalExam && (
                <p className="text-sm text-gray-700 mt-2">
                  Physical Exam: {currentCase.content.physicalExam}
                </p>
              )}
              
              {currentCase.content.labs && (
                <div className="mt-3 bg-white rounded p-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Lab Results:</p>
                  {Object.entries(currentCase.content.labs).map(([key, value]) => (
                    <p key={key} className="text-sm">
                      <span className="capitalize">{key}: </span>
                      <span className="font-medium">{value}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Differential Diagnosis Entry */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Enter Differential Diagnosis</h3>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showHint ? 'Hide' : 'Show'} Hint
              </button>
            </div>

            {showHint && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  Consider the patient's demographics, vital signs, and presenting symptoms. 
                  Think about common causes, critical conditions not to miss, and conditions that fit the clinical picture.
                </p>
              </div>
            )}

            <div className="space-y-3 mb-6">
              {differentialList.map((diagnosis, index) => (
                <DifferentialDiagnosisEntry
                  key={index}
                  diagnosis={diagnosis}
                  index={index}
                  onUpdate={updateDiagnosis}
                  onRemove={removeDiagnosis}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  isDragging={draggedIndex === index}
                />
              ))}
            </div>

            <button
              onClick={addDiagnosis}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
            >
              <Plus className="w-5 h-5" />
              Add Another Diagnosis
            </button>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                <AlertCircle className="inline w-4 h-4 mr-1" />
                Remember to flag critical diagnoses that should not be missed using the 
                <AlertTriangle className="inline w-4 h-4 mx-1 text-orange-500" /> button.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => completeAssessment()}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition duration-200"
              >
                End Assessment Early
              </button>
              <button
                onClick={submitDifferential}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Submit Differential
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard Component
  const Dashboard = () => {
    const { skillProfile } = assessmentData;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">CollectiveGood</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <button className="text-gray-600 hover:text-gray-900">Dashboard</button>
                <button className="text-gray-600 hover:text-gray-900">Cases</button>
                <button className="text-gray-600 hover:text-gray-900">Profile</button>
                <button className="text-gray-600 hover:text-gray-900">Settings</button>
                <button 
                  onClick={() => {
                    setUser(null);
                    setAssessmentData({
                      responses: [],
                      startTime: null,
                      endTime: null,
                      skillProfile: null
                    });
                    setCurrentPage('landing');
                  }}
                  className="text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button className="block px-3 py-2 text-gray-600 hover:text-gray-900 w-full text-left">Dashboard</button>
              <button className="block px-3 py-2 text-gray-600 hover:text-gray-900 w-full text-left">Cases</button>
              <button className="block px-3 py-2 text-gray-600 hover:text-gray-900 w-full text-left">Profile</button>
              <button className="block px-3 py-2 text-gray-600 hover:text-gray-900 w-full text-left">Settings</button>
              <button 
                onClick={() => {
                  setUser(null);
                  setAssessmentData({
                    responses: [],
                    startTime: null,
                    endTime: null,
                    skillProfile: null
                  });
                  setCurrentPage('landing');
                }}
                className="block px-3 py-2 text-red-600 hover:text-red-700 w-full text-left"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.firstName}!</h1>
            <p className="text-gray-600 mt-2">Your clinical skill profile and performance metrics</p>
          </div>

          {/* Skill Profile Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Skill Level</h3>
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600">{skillProfile?.skillLevel}</p>
              <p className="text-sm text-gray-600 mt-2">θ = {skillProfile?.overallAbility?.toFixed(2)}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Overall Score</h3>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">{skillProfile?.accuracy.toFixed(0)}%</p>
              <p className="text-sm text-gray-600 mt-2">Differential accuracy</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Critical Dx</h3>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-orange-600">
                {skillProfile?.diagnosticAccuracy?.criticalDiagnosisCapture.toFixed(0)}%
              </p>
              <p className="text-sm text-gray-600 mt-2">Not-to-miss identified</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Cases</h3>
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600">{skillProfile?.casesCompleted}</p>
              <p className="text-sm text-gray-600 mt-2">Completed</p>
            </div>
          </div>

          {/* Detailed Profile */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Clinical Competence Profile</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4 text-green-600">Clinical Strengths</h3>
                <ul className="space-y-2">
                  {skillProfile?.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 text-blue-600">Areas for Growth</h3>
                <ul className="space-y-2">
                  {skillProfile?.areasForGrowth.map((area, index) => (
                    <li key={index} className="flex items-center">
                      <Activity className="w-5 h-5 text-blue-500 mr-2" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Competence Vector Visualization */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Competence Dimensions</h3>
              <div className="space-y-3">
                {['Emergency Medicine', 'Cardiology', 'Mental Health', 'Complex Diagnostics'].map((dim, idx) => (
                  <div key={dim} className="flex items-center">
                    <span className="w-40 text-sm">{dim}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.max(0, Math.min(100, (skillProfile?.competenceVector[idx] + 1) * 50))}%` 
                        }}
                      />
                      <span className="absolute right-2 top-1 text-xs text-gray-600">
                        {skillProfile?.competenceVector[idx]?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <AlertCircle className="inline w-4 h-4 mr-1" />
                Your competence profile helps us match you with appropriate clinical cases. 
                The system will adapt to your expertise level and provide cases that optimize your learning and contribution.
              </p>
            </div>
          </div>

          {/* Peer Comparison Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Peer Comparison</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Performance vs Peers</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Overall Percentile</span>
                      <span className="font-semibold">78th</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Diagnostic Accuracy</span>
                      <span className="font-semibold">85th</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Critical Diagnosis Recognition</span>
                      <span className="font-semibold">92nd</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div className="bg-orange-600 h-3 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  Compared to 156 clinicians with similar experience in {user?.profile?.specialty || 'your specialty'}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Peer Group Statistics</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Peer Group Size</p>
                      <p className="font-semibold text-lg">156</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Group Median Score</p>
                      <p className="font-semibold text-lg">76.2%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Your Rank</p>
                      <p className="font-semibold text-lg">#35</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Top Performer</p>
                      <p className="font-semibold text-lg">94.5%</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-600">
                      Peer group: {user?.profile?.specialty || 'Emergency Medicine'} • 
                      {user?.profile?.yearsExperience || '5-10'} years experience • 
                      {user?.profile?.boardCertified === 'yes' ? 'Board Certified' : 'Not Board Certified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <Star className="inline w-4 h-4 mr-1" />
                You're performing in the top quartile of your peer group! Your strength in identifying critical diagnoses 
                places you in the 92nd percentile.
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
            <p className="text-gray-600 mb-6">
              Thank you for completing your profile! We'll notify you via email when clinical cases matching your expertise are ready for review.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
              View Available Cases
            </button>
          </div>
        </main>
      </div>
    );
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      case 'profile':
        return <ProfileSetup />;
      case 'assessment-intro':
        return <AssessmentIntro />;
      case 'assessment':
        return <DifferentialAssessment />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <LandingPage />;
    }
  };

  return renderPage();
};

export default App;