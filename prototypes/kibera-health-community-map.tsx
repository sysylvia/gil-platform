import React, { useState, useEffect } from 'react';

const KiberaHealthCommunityAssessment = () => {
  const [currentScreen, setCurrentScreen] = useState('community-map');
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [sliderMoved, setSliderMoved] = useState(false);
  const [responses, setResponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMapSection, setSelectedMapSection] = useState(null);

  const [gameStats, setGameStats] = useState({
    totalCases: 15,
    correctAssessments: 12,
    currentStreak: 3,
    bestStreak: 5,
    badgesEarned: ['first_assessment', 'kibera_champion'],
    completedSessions: 3,
    userContribution: {
      sectionsRevealed: 12,
      totalSections: 50,
      personalAssessments: 15,
      rank: 23
    }
  });

  // Community progress data (simulated)
  const [communityStats, setCommunityStats] = useState({
    totalAssessments: 2347,
    targetAssessments: 5000,
    activeMember: 156,
    sectionsRevealed: 28,
    totalSections: 50,
    recentActivity: [
      { name: "Grace M.", action: "completed case assessment", area: "Olympic", time: "2 min ago" },
      { name: "David K.", action: "unlocked new area", area: "Gatwekera", time: "5 min ago" },
      { name: "Mary S.", action: "earned streak badge", area: "Laini Saba", time: "8 min ago" },
      { name: "John O.", action: "completed case assessment", area: "Kisumu Ndogo", time: "12 min ago" }
    ]
  });

  // Kibera neighborhoods with progress data
  const kiberaAreas = [
    { id: 'olympic', name: 'Olympic', progress: 85, revealed: true, x: 20, y: 30, color: '#10B981' },
    { id: 'laini_saba', name: 'Laini Saba', progress: 92, revealed: true, x: 60, y: 25, color: '#10B981' },
    { id: 'gatwekera', name: 'Gatwekera', progress: 78, revealed: true, x: 35, y: 50, color: '#10B981' },
    { id: 'kisumu_ndogo', name: 'Kisumu Ndogo', progress: 65, revealed: true, x: 75, y: 45, color: '#3B82F6' },
    { id: 'makina', name: 'Makina', progress: 58, revealed: true, x: 15, y: 65, color: '#3B82F6' },
    { id: 'mashimoni', name: 'Mashimoni', progress: 45, revealed: true, x: 50, y: 70, color: '#6B7280' },
    { id: 'silanga', name: 'Silanga', progress: 32, revealed: false, x: 80, y: 65, color: '#6B7280' },
    { id: 'kianda', name: 'Kianda', progress: 28, revealed: false, x: 25, y: 80, color: '#6B7280' },
    { id: 'soweto', name: 'Soweto East', progress: 15, revealed: false, x: 65, y: 80, color: '#6B7280' },
    { id: 'kambi_muru', name: 'Kambi Muru', progress: 8, revealed: false, x: 45, y: 90, color: '#6B7280' }
  ];

  // Case data
  const cases = [
    {
      id: 1,
      name: "Rose Akoth",
      difficulty: 'Easy',
      groundTruth: "kibera",
      demographics: {
        age: "8 months",
        sex: "Female",
        caregiver: "Mother (19 yrs, student)",
        household: "Single mother, lives with grandmother"
      },
      chiefComplaint: {
        original: '"Mtoto ana homa na hajarudi"',
        translation: "(Translation: Child has fever and won't eat)"
      },
      symptoms: [
        "Fever - Present for 3 days",
        "Feeding difficulty - Refusing to breastfeed", 
        "Vomiting - Occurs after feeding attempts",
        "Behavioral changes - Appears drowsy and irritable",
        "Activity level - Less active than usual"
      ]
    },
    {
      id: 2,
      name: "Patricia Wanjiku",
      difficulty: 'Easy',
      groundTruth: "higher_end",
      demographics: {
        age: "45 years",
        sex: "Female", 
        caregiver: "Self-presenting",
        household: "Married with two children, works in government office"
      },
      chiefComplaint: {
        original: '"I have been having chest pain and difficulty breathing, especially when I walk uphill"',
        translation: ""
      },
      symptoms: [
        "Chest pain - Sharp, occurs with exertion for 2 weeks",
        "Shortness of breath - Worsening over past month",
        "Palpitations - Heart racing, especially at night", 
        "Fatigue - Unusual tiredness during daily activities",
        "Ankle swelling - Noticed in evenings"
      ]
    },
    {
      id: 3,
      name: "Grace Adhiambo",
      difficulty: 'Medium',
      groundTruth: "kibera",
      demographics: {
        age: "23 years",
        sex: "Female", 
        caregiver: "Self-presenting",
        household: "Lives with partner, first pregnancy"
      },
      chiefComplaint: {
        original: '"Niko na mimba na nataka kupima afya yangu na ya mtoto"',
        translation: "(Translation: I am pregnant and want to check my health and the baby's)"
      },
      symptoms: [
        "Pregnancy - Approximately 12 weeks by last menstrual period",
        "Morning sickness - Nausea and vomiting, especially mornings",
        "Fatigue - Increased tiredness, needs more rest",
        "Breast tenderness - Noticeable breast changes",
        "First prenatal visit - Seeking basic antenatal care"
      ]
    }
  ];

  // Achievement definitions
  const achievements = [
    {
      id: 'first_assessment',
      name: 'Clinical Debut',
      nameSwahili: 'Mwanzo wa Kliniki',
      description: 'Complete your first case assessment',
      icon: '🏥'
    },
    {
      id: 'kibera_champion',
      name: 'Kibera Health Champion',
      nameSwahili: 'Bingwa wa Afya ya Kibera',
      description: 'Achieve 80% accuracy or better',
      icon: '🏆'
    },
    {
      id: 'community_builder',
      name: 'Community Builder',
      nameSwahili: 'Mjenzi wa Jamii',
      description: 'Help reveal 5 new areas on the map',
      icon: '🌟'
    },
    {
      id: 'area_expert',
      name: 'Area Expert',
      nameSwahili: 'Mtaalamu wa Eneo',
      description: 'Complete 20 assessments in your home area',
      icon: '🎯'
    }
  ];

  const currentCase = cases[currentCaseIndex];

  // Get slider details
  const getSliderDetails = (value) => {
    if (value < 20) {
      return { label: 'Not typical at all', color: 'bg-red-600', textColor: 'text-white' };
    } else if (value < 40) {
      return { label: 'Not typical', color: 'bg-red-500', textColor: 'text-white' };
    } else if (value < 60) {
      return { label: 'Neutral', color: 'bg-yellow-400', textColor: 'text-gray-800' };
    } else if (value < 80) {
      return { label: 'Typical', color: 'bg-green-500', textColor: 'text-white' };
    } else {
      return { label: 'Very typical', color: 'bg-green-700', textColor: 'text-white' };
    }
  };

  const sliderDetails = getSliderDetails(sliderValue);

  // Calculate progress
  const getProgress = () => {
    if (currentScreen === 'instructions') return 33;
    if (currentScreen === 'case-details') return 33 + ((currentCaseIndex + 1) / cases.length) * 67;
    if (currentScreen === 'case-reveal') return 33 + ((currentCaseIndex + 1) / cases.length) * 50;
    return 100;
  };

  // Calculate accuracy
  const getAccuracy = () => {
    return gameStats.totalCases > 0 ? Math.round((gameStats.correctAssessments / gameStats.totalCases) * 100) : 0;
  };

  // Get area color based on progress
  const getAreaColor = (area) => {
    if (area.progress >= 80) return '#10B981'; // Green - revealed
    if (area.progress >= 60) return '#3B82F6'; // Blue - partially revealed
    if (area.progress >= 40) return '#F59E0B'; // Yellow - emerging
    return '#6B7280'; // Gray - hidden
  };

  // Get people icons based on progress
  const getPeopleIcon = (area) => {
    if (area.progress >= 80) return '👥'; // Full families
    if (area.progress >= 60) return '👤'; // Individual people
    if (area.progress >= 40) return '👻'; // Silhouettes
    return '❓'; // Unknown
  };

  // Handle map section click
  const handleMapSectionClick = (area) => {
    setSelectedMapSection(area);
  };

  // Handle slider change
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    if (!sliderMoved) setSliderMoved(true);
    
    const details = getSliderDetails(value);
    setCurrentResponse({
      caseId: currentCase?.id,
      caseName: currentCase?.name,
      value: value,
      label: details.label,
      category: value < 40 ? 'not_typical' : value < 60 ? 'neutral' : 'typical'
    });
  };

  // Process assessment
  const processAssessment = () => {
    const userCategory = currentResponse.category;
    let isCorrect = false;
    
    if (currentCase.groundTruth === 'kibera' && userCategory === 'typical') {
      isCorrect = true;
    } else if (currentCase.groundTruth === 'higher_end' && userCategory === 'not_typical') {
      isCorrect = true;
    } else if (userCategory === 'neutral') {
      isCorrect = Math.random() > 0.5;
    }
    
    // Update stats
    const newStats = {
      ...gameStats,
      totalCases: gameStats.totalCases + 1,
      correctAssessments: gameStats.correctAssessments + (isCorrect ? 1 : 0),
      currentStreak: isCorrect ? gameStats.currentStreak + 1 : 0,
      bestStreak: Math.max(gameStats.bestStreak, isCorrect ? gameStats.currentStreak + 1 : 0),
      userContribution: {
        ...gameStats.userContribution,
        personalAssessments: gameStats.userContribution.personalAssessments + 1
      }
    };
    
    setGameStats(newStats);
    
    // Update community stats
    setCommunityStats(prev => ({
      ...prev,
      totalAssessments: prev.totalAssessments + 1
    }));
    
    // Store response
    const responseWithResult = { ...currentResponse, isCorrect, groundTruth: currentCase.groundTruth };
    setResponses([...responses, responseWithResult]);
    
    return isCorrect;
  };

  // Handle submit
  const handleSubmit = () => {
    if (!sliderMoved || !currentResponse) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      processAssessment();
      setIsSubmitting(false);
      setCurrentScreen('case-reveal');
    }, 1000);
  };

  // Continue to next case
  const continueToNext = () => {
    if (currentCaseIndex < cases.length - 1) {
      setCurrentCaseIndex(currentCaseIndex + 1);
      resetSlider();
      setCurrentScreen('case-details');
    } else {
      setGameStats(prev => ({ ...prev, completedSessions: prev.completedSessions + 1 }));
      setCurrentScreen('thank-you');
    }
  };

  // Reset slider
  const resetSlider = () => {
    setSliderValue(50);
    setSliderMoved(false);
    setCurrentResponse(null);
  };

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen shadow-lg">
      {/* Status Bar */}
      <div className="bg-black text-white px-5 py-2 flex justify-between items-center text-sm font-semibold h-11">
        <div className="flex items-center gap-1">
          <span>2:55</span>
          <div className="w-4 h-3 border border-white rounded-sm"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-4 h-3 bg-white rounded-sm"></div>
          <span>4G</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white p-5 flex justify-between items-center border-b-2 border-red-600">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-700 flex items-center justify-center text-white font-bold text-xs text-center border-2 border-red-600">
            CFK<br/>Africa
          </div>
          <div className="text-xl font-light leading-tight">
            Collective<br/>GOOD
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-center">
            <div className="text-xs text-gray-600">My Progress</div>
            <div className="text-sm font-bold">{gameStats.userContribution.personalAssessments} cases</div>
            <div className="text-xs text-gray-600">#{gameStats.userContribution.rank} in community</div>
          </div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-600">
            <div className="w-full h-full bg-red-600 flex items-center justify-center text-white">
              👤
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </header>

      {/* Community Map Screen */}
      {currentScreen === 'community-map' && (
        <main className="p-5 bg-gray-50">
          {/* Community Progress Header */}
          <div className="bg-gradient-to-r from-green-700 to-blue-600 text-white p-4 -mx-5 mb-5 rounded-b-2xl">
            <div className="text-center mb-3">
              <h2 className="text-lg font-bold">Kibera Healthcare Community</h2>
              <p className="text-sm opacity-90">Building understanding together</p>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <div className="text-center flex-1">
                <span className="text-2xl font-bold block">{communityStats.totalAssessments.toLocaleString()}</span>
                <span className="text-xs opacity-90 uppercase tracking-wide">Total Assessments</span>
              </div>
              <div className="text-center flex-1">
                <span className="text-2xl font-bold block">{communityStats.activeMember}</span>
                <span className="text-xs opacity-90 uppercase tracking-wide">Active Members</span>
              </div>
              <div className="text-center flex-1">
                <span className="text-2xl font-bold block">{Math.round((communityStats.totalAssessments / communityStats.targetAssessments) * 100)}%</span>
                <span className="text-xs opacity-90 uppercase tracking-wide">Complete</span>
              </div>
            </div>
            
            {/* Community Progress Bar */}
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                style={{width: `${(communityStats.totalAssessments / communityStats.targetAssessments) * 100}%`}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
            </div>
            <div className="text-center text-xs opacity-90">
              Next milestone: {(Math.ceil(communityStats.totalAssessments / 500) * 500).toLocaleString()} assessments
            </div>
          </div>

          {/* Interactive Kibera Map */}
          <div className="bg-white rounded-2xl p-5 mb-5 border-2 border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-center">Community Coverage Map</h3>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Each area lights up as our community completes assessments together
            </p>
            
            {/* Map SVG */}
            <div className="relative bg-gray-100 rounded-lg p-4 min-h-64">
              <svg viewBox="0 0 100 100" className="w-full h-64">
                {/* Background */}
                <rect width="100" height="100" fill="#E5E7EB" opacity="0.3"/>
                
                {/* Kibera areas */}
                {kiberaAreas.map((area, index) => (
                  <g key={area.id}>
                    {/* Area circle */}
                    <circle
                      cx={area.x}
                      cy={area.y}
                      r={area.progress >= 60 ? "8" : area.progress >= 40 ? "6" : "4"}
                      fill={getAreaColor(area)}
                      stroke="white"
                      strokeWidth="1"
                      className="cursor-pointer transition-all duration-300 hover:stroke-2"
                      onClick={() => handleMapSectionClick(area)}
                      style={{
                        filter: area.progress >= 60 ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' : 'none',
                        animation: area.revealed ? 'none' : area.progress > 30 ? 'pulse 2s infinite' : 'none'
                      }}
                    />
                    
                    {/* People icons */}
                    <text
                      x={area.x}
                      y={area.y + 1}
                      textAnchor="middle"
                      className="text-xs pointer-events-none"
                      fill="white"
                      fontSize="6"
                    >
                      {getPeopleIcon(area)}
                    </text>
                    
                    {/* Area labels for revealed areas */}
                    {area.progress >= 60 && (
                      <text
                        x={area.x}
                        y={area.y + 15}
                        textAnchor="middle"
                        className="text-xs font-medium pointer-events-none"
                        fill="#374151"
                        fontSize="3"
                      >
                        {area.name}
                      </text>
                    )}
                  </g>
                ))}
                
                {/* User avatar */}
                <circle
                  cx="30"
                  cy="40"
                  r="6"
                  fill="#DC2626"
                  stroke="white"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <text
                  x="30"
                  y="43"
                  textAnchor="middle"
                  className="text-xs font-bold pointer-events-none"
                  fill="white"
                  fontSize="4"
                >
                  YOU
                </text>
              </svg>
              
              {/* Legend */}
              <div className="flex justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span>Unexplored</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Emerging</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Revealed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Contribution Stats */}
          <div className="bg-white rounded-2xl p-5 mb-5 border-2 border-red-600">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🎯 Your Impact
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{gameStats.userContribution.personalAssessments}</div>
                <div className="text-sm text-gray-600">Cases Assessed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{gameStats.userContribution.sectionsRevealed}</div>
                <div className="text-sm text-gray-600">Areas Helped Reveal</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-800 mb-1">Community Contribution</div>
              <div className="text-xs text-green-700">
                You've contributed {Math.round((gameStats.userContribution.personalAssessments / communityStats.totalAssessments) * 100)}% of all community assessments!
              </div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white rounded-2xl p-5 mb-5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              📈 Recent Community Activity
            </h3>
            <div className="space-y-3">
              {communityStats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {activity.name.split(' ')[0][0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.name}</div>
                    <div className="text-xs text-gray-600">{activity.action} in {activity.area}</div>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              className="w-full bg-red-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-red-700 transform hover:-translate-y-0.5 transition-all shadow-lg"
              onClick={() => setCurrentScreen('instructions')}
            >
              Start New Assessment
            </button>
            
            <button 
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all"
              onClick={() => {/* Show leaderboard */}}
            >
              View Community Leaderboard
            </button>
          </div>
        </main>
      )}

      {/* Instructions Screen */}
      {currentScreen === 'instructions' && (
        <main className="p-5 min-h-96 bg-gray-50">
          {/* Stats Display */}
          {gameStats.totalCases > 0 && (
            <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 -mx-5 mb-5 rounded-b-2xl">
              <div className="flex justify-between items-center mb-2">
                <div className="text-center flex-1">
                  <span className="text-xl font-bold block">{getAccuracy()}%</span>
                  <span className="text-xs opacity-90 uppercase tracking-wide">Accuracy</span>
                </div>
                <div className="text-center flex-1">
                  <span className="text-xl font-bold block">{gameStats.currentStreak}</span>
                  <span className="text-xs opacity-90 uppercase tracking-wide">Streak</span>
                </div>
                <div className="text-center flex-1">
                  <span className="text-xl font-bold block">{gameStats.totalCases}</span>
                  <span className="text-xs opacity-90 uppercase tracking-wide">Cases</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mt-2">
                {achievements.slice(0, 4).map(achievement => (
                  <div 
                    key={achievement.id}
                    className={`px-2 py-1 rounded-xl text-xs flex items-center gap-1 ${
                      gameStats.badgesEarned.includes(achievement.id) 
                        ? 'bg-yellow-400 text-gray-800 shadow-lg' 
                        : 'bg-white bg-opacity-20'
                    }`}
                  >
                    {achievement.icon} {achievement.nameSwahili || achievement.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="h-1 bg-gray-200 mb-5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 to-green-700 transition-all duration-500" style={{width: `${getProgress()}%`}}></div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-red-600 text-xl font-semibold mb-6 text-center">Assessment Instructions</h2>
            
            <div className="bg-white p-5 rounded-lg border-l-4 border-red-600 mb-5">
              <strong>Your Task:</strong> You will review patient cases from Kibera community health records and help build our collective understanding.
            </div>

            <div className="bg-white p-5 rounded-lg border-l-4 border-red-600 mb-5">
              <strong>Community Impact:</strong> Each assessment you complete helps reveal more of our community map and strengthens our healthcare knowledge base.
            </div>

            <div className="bg-green-700 text-white p-4 rounded-lg font-medium text-center my-5">
              Together we're building the most comprehensive picture of healthcare in Kibera
            </div>

            <div className="bg-white p-5 rounded-lg border-l-4 border-red-600">
              <strong>How to Respond:</strong> For each case, use the slider to indicate how typical this case is for your clinic practice. Your assessments contribute to our community's collective knowledge.
            </div>
          </div>
          
          <button 
            className="bg-red-600 text-white px-6 py-4 rounded-lg text-lg font-semibold block mx-auto min-w-48 hover:bg-red-700 transform hover:-translate-y-0.5 transition-all shadow-lg"
            onClick={() => setCurrentScreen('case-details')}
          >
            Begin Case Assessment
          </button>
        </main>
      )}

      {/* Case Details Screen */}
      {currentScreen === 'case-details' && currentCase && (
        <main className="p-5 bg-gray-50">
          <div className="h-1 bg-gray-200 mb-5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 to-green-700 transition-all duration-500" style={{width: `${getProgress()}%`}}></div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-5 border-2 border-red-600 shadow-lg">
            <div className="text-center mb-6 p-5 bg-gradient-to-r from-red-600 to-red-500 rounded-xl text-white">
              <div className="text-2xl font-bold mb-1">Case #{currentCase.id}</div>
              <div className="text-3xl font-light">{currentCase.name}</div>
            </div>
            
            <div className="flex justify-between items-center flex-wrap gap-2 mb-5 pb-2 border-b-2 border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white font-bold">
                  👤
                </div>
                <h2 className="text-xl font-semibold">Complete Patient Information</h2>
              </div>
              <div className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                Case {currentCaseIndex + 1} of {cases.length}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-green-700">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                📋 Patient Demographics
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="text-xs text-gray-600 uppercase font-medium mb-1">Age</div>
                  <div className="text-sm font-semibold">{currentCase.demographics.age}</div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="text-xs text-gray-600 uppercase font-medium mb-1">Sex</div>
                  <div className="text-sm font-semibold">{currentCase.demographics.sex}</div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="text-xs text-gray-600 uppercase font-medium mb-1">Caregiver</div>
                  <div className="text-sm font-semibold">{currentCase.demographics.caregiver}</div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="text-xs text-gray-600 uppercase font-medium mb-1">Household</div>
                  <div className="text-sm font-semibold">{currentCase.demographics.household}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-green-700">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                💬 Chief Complaint
              </h3>
              <p><strong>Patient's words:</strong> {currentCase.chiefComplaint.original}</p>
              {currentCase.chiefComplaint.translation && (
                <p className="text-sm text-gray-600 italic mt-1">{currentCase.chiefComplaint.translation}</p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-green-700">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                🔍 Presenting Symptoms
              </h3>
              <ul className="space-y-1">
                {currentCase.symptoms.map((symptom, index) => (
                  <li key={index} className="relative pl-4">
                    <span className="absolute left-0 text-red-600 font-bold">•</span>
                    <span className="text-sm">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-green-700 text-white p-4 rounded-lg font-medium text-center mb-8">
            How typical is this case for patients you see in your Kibera clinic practice?
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-gray-200">
            <div className="flex justify-between mb-5 text-sm font-medium">
              <span className="text-red-600">Not typical at all</span>
              <span className="text-green-700">Very typical</span>
            </div>
            
            <div className="relative mb-5">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-green-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #dc2626 0%, #facc15 50%, #15803d 100%)`
                }}
              />
            </div>
            
            <div className="text-center mb-5">
              <div className="text-base font-semibold text-gray-700 mb-2">
                Case Typicality: <span className={`px-3 py-1 rounded-full text-sm ${sliderDetails.color} ${sliderDetails.textColor}`}>
                  {sliderDetails.label}
                </span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${sliderDetails.color}`}
                  style={{width: `${sliderValue}%`}}
                ></div>
              </div>
            </div>
            
            <button 
              className={`w-full py-4 text-lg font-semibold rounded-lg transition-all ${
                sliderMoved && !isSubmitting
                  ? 'bg-green-700 text-white hover:bg-green-800 transform hover:-translate-y-0.5' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleSubmit}
              disabled={!sliderMoved || isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 
               currentCaseIndex < cases.length - 1 ? `Submit & Continue (${cases.length - currentCaseIndex - 1} remaining)` : 
               'Submit Final Assessment'}
            </button>
          </div>
        </main>
      )}

      {/* Case Reveal Screen */}
      {currentScreen === 'case-reveal' && (
        <main className="p-5 bg-gray-50">
          <div className="h-1 bg-gray-200 mb-5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 to-green-700 transition-all duration-500" style={{width: `${getProgress()}%`}}></div>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="mb-5">
              <span className="text-5xl block mb-2">🎯</span>
              <div className="text-xl font-semibold text-green-700 mb-2">Assessment Complete!</div>
              <div className="text-sm text-gray-600">Contributing to community knowledge</div>
            </div>

            <div className="relative w-20 h-20 mx-auto mb-4">
              <div 
                className="w-full h-full rounded-full bg-green-700 flex items-center justify-center"
                style={{
                  background: `conic-gradient(#15803d 0deg, #15803d ${(getAccuracy() / 100) * 360}deg, #e5e7eb ${(getAccuracy() / 100) * 360}deg)`
                }}
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-sm font-bold text-green-700">
                  {getAccuracy()}%
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="text-sm font-medium text-blue-800 mb-2">Community Impact</div>
              <div className="text-xs text-blue-700">
                Your assessment has been added to our collective knowledge base. 
                Community progress: {Math.round((communityStats.totalAssessments / communityStats.targetAssessments) * 100)}% complete!
              </div>
            </div>

            <div className="flex gap-2 mt-8">
              <button 
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-all"
                onClick={() => setCurrentScreen('community-map')}
              >
                View Map
              </button>
              <button 
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-all"
                onClick={continueToNext}
              >
                {currentCaseIndex < cases.length - 1 ? 'Next Case' : 'Complete Session'}
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Thank You Screen */}
      {currentScreen === 'thank-you' && (
        <main className="p-5 bg-gray-50">
          <div className="h-1 bg-gray-200 mb-5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 to-green-700 transition-all duration-500" style={{width: '100%'}}></div>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center border-2 border-green-700">
            <h2 className="text-3xl font-semibold text-green-700 mb-5">Hongera! 🎉</h2>
            
            <div className="relative w-20 h-20 mx-auto mb-5">
              <div 
                className="w-full h-full rounded-full bg-green-700 flex items-center justify-center"
                style={{
                  background: `conic-gradient(#15803d 0deg, #15803d ${(getAccuracy() / 100) * 360}deg, #e5e7eb ${(getAccuracy() / 100) * 360}deg)`
                }}
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-sm font-bold text-green-700">
                  {getAccuracy()}%
                </div>
              </div>
            </div>
            
            <p className="mb-4">You completed all case assessments with <span className="font-bold">{getAccuracy()}%</span> accuracy!</p>
            <p className="mb-8 text-gray-600">Your expertise contributes to our community's collective understanding of healthcare needs in Kibera.</p>
            
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <div className="text-sm font-medium text-green-800 mb-2">Community Contribution This Session</div>
              <div className="text-xs text-green-700">
                You assessed {cases.length} cases • Community total now: {(communityStats.totalAssessments + cases.length).toLocaleString()}
              </div>
            </div>
            
            <div className="flex gap-2 justify-center mb-8 flex-wrap">
              {achievements.filter(a => gameStats.badgesEarned.includes(a.id)).map(achievement => (
                <div 
                  key={achievement.id}
                  className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-xl text-sm flex items-center gap-1 shadow-lg"
                >
                  {achievement.icon} {achievement.name}
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <button 
                className="w-full bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transform hover:-translate-y-0.5 transition-all shadow-lg"
                onClick={() => setCurrentScreen('community-map')}
              >
                View Community Map
              </button>
              
              <button 
                className="w-full bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
                onClick={() => {
                  setCurrentScreen('instructions');
                  setCurrentCaseIndex(0);
                  setResponses([]);
                  resetSlider();
                }}
              >
                Start New Assessment
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Area Detail Modal */}
      {selectedMapSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{selectedMapSection.name}</h3>
              <button 
                onClick={() => setSelectedMapSection(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Progress:</span>
                <span className="font-semibold">{selectedMapSection.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${selectedMapSection.progress}%`,
                    backgroundColor: getAreaColor(selectedMapSection)
                  }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">
                {selectedMapSection.progress >= 80 ? 'This area is fully revealed! Our community has built strong understanding here.' :
                 selectedMapSection.progress >= 60 ? 'This area is emerging. More assessments will reveal additional details.' :
                 'This area needs more assessments to be revealed. Your contributions can help!'}
              </div>
            </div>
            
            <button 
              className="w-full mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all"
              onClick={() => {
                setSelectedMapSection(null);
                setCurrentScreen('instructions');
              }}
            >
              Contribute to This Area
            </button>
          </div>
        </div>
      )}

      {/* Achievement Popup */}
      {showAchievement && newAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-6 rounded-2xl shadow-2xl text-center border-3 border-green-700 max-w-sm w-full animate-pulse">
            <div className="text-4xl mb-2">{newAchievement.icon}</div>
            <div className="text-lg font-bold text-gray-800 mb-1">{newAchievement.name}</div>
            <div className="text-sm text-gray-700 mb-4">{newAchievement.description}</div>
            <button 
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all"
              onClick={() => setShowAchievement(false)}
            >
              Hongera! 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KiberaHealthCommunityAssessment;