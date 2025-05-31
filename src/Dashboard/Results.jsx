// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Dashboard_Styles/Results.css'

// function Results() {
//   const [recommendations, setRecommendations] = useState([]);
//   const [selectedCareer, setSelectedCareer] = useState(null);
//   const [aiRecommendations, setAiRecommendations] = useState([]);
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     // Get recommendations from localStorage
//     const storedRecommendations = JSON.parse(localStorage.getItem('careerRecommendations') || '[]');
//     setRecommendations(storedRecommendations);
//     // Get AI recommendations from localStorage
//     const storedAIRecommendations = JSON.parse(localStorage.getItem('AIRecommendations') || '[]');
//     setAiRecommendations(storedAIRecommendations);

//     // If AI recommendations are available, merge them with career recommendations
//     // if (storedAIRecommendations && storedAIRecommendations.length > 0) {
//     //   setRecommendations((prev) => [...prev, ...storedAIRecommendations]);
//     // }

//     // Select first career by default if available
//     if (storedRecommendations && storedRecommendations.length > 0) {
//       setSelectedCareer(storedRecommendations[0]);
//     }
//   }, []);

//   // Select first career by default if available
//     if (storedAIRecommendations && storedAIRecommendations.length > 0) {
//       setAiRecommendations(storedAIRecommendations[0]);
//     }
//   }

//   // Function to save career to profile
//   const handleSaveToProfile = async () => {
//     if (!selectedCareer) return;

//     try {
//       const userToken = localStorage.getItem('userToken');
      
//       // API call to save career
//       await axios.post('/api/user/save-career', 
//         { career: selectedCareer }, 
//         {
//           headers: { 
//             'Authorization': `Bearer ${userToken}` 
//           }
//         }
//       );

//       // Navigate to profile after saving
//       navigate('/profile');
//     } catch (error) {
//       console.error('Error saving career:', error);
//       alert('Failed to save career. Please try again.');
//     }
//   };
  
//   return (
//     <div className="results2-container2">
//       <h2 className="title4">Your Career Recommendations</h2>
      
//       {recommendations.length === 0 ? (
//         <div className="no-results4">
//           <p>No recommendations found. Please complete the assessment first.</p>
//           <Link to="/dashboard" className="btn btn-dark">Take Assessment</Link>
//         </div>
//       ) : (
//         <div className="results3-content3"> <br/> <br/>
//           <div className="recommendations-list">
//             <h3 className='resultsTitles'>Top Career Matches🎯</h3>
//             <ul className="career-list">
//               {recommendations.map((career, index) => (
//                 <li 
//                   key={index} 
//                   className={`career-item ${selectedCareer && career.careerTitle === selectedCareer.careerTitle ? 'active' : ''}`}
//                   onClick={() => setSelectedCareer(career)}
//                 >
//                   <div className="career-title">{career.careerTitle}</div>
//                   <div className="match-percentage">{career.matchPercentage}% Match</div>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           {selectedCareer && (
//             <div className="career-details">
//               <h3 className='resultsTitles'>{selectedCareer.careerTitle}✅</h3>
//               <div className="match-badge">{selectedCareer.matchPercentage}% Match</div>
              
//               <h4 className='resultsTitles'>Description📝</h4>
//               <p>{selectedCareer.description}</p>
              
//               <h4 className='resultsTitles'>Required Skills💡</h4>
//               <ul className="skills-list">
//                 {selectedCareer.skills.map((skill, index) => (
//                   <li key={index} className="skill-item">{skill}</li>
//                 ))}
//               </ul>
              
//               <h4 className='resultsTitles'>Education Path🎓</h4>
//               <ul className="education-list">
//                 {selectedCareer.educationPath.map((edu, index) => (
//                   <li key={index} className="education-item">{edu}</li>
//                 ))}
//               </ul>
              
//               <h4 className='resultsTitles'>Average Salary💰</h4>
//               <p>{selectedCareer.averageSalary}</p>
              
//               <div className="action-buttons">
//                 {/* <button 
//                   className="btn btn-success"
//                   onClick={handleSaveToProfile}
//                 >
//                   Save to Profile
//                 </button>  */}
//                 <br /> <br />
//               </div> 
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );


// export default Results;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard_Styles/Results.css'

function Results() {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [selectedAICareer, setSelectedAICareer] = useState(null);
  const [activeTab, setActiveTab] = useState('regular'); // 'regular' or 'ai'
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get recommendations from localStorage
    const storedRecommendations = JSON.parse(localStorage.getItem('careerRecommendations') || '[]');
    setRecommendations(storedRecommendations);
    
    // Get AI recommendations from localStorage
    const storedAIRecommendations = JSON.parse(localStorage.getItem('AIRecommendations') || '[]');
    setAiRecommendations(storedAIRecommendations);

    // Select first career by default if available
    if (storedRecommendations && storedRecommendations.length > 0) {
      setSelectedCareer(storedRecommendations[0]);
    }

    // Select first AI career by default if available
    if (storedAIRecommendations && storedAIRecommendations.length > 0) {
      setSelectedAICareer(storedAIRecommendations[0]);
    }
  }, []);

  // Function to save career to profile
  const handleSaveToProfile = async (career, isAI = false) => {
    if (!career) return;

    try {
      const userToken = localStorage.getItem('userToken');
      
      // API call to save career
      await axios.post('/api/user/save-career', 
        { 
          career: career,
          source: isAI ? 'AI' : 'Assessment' 
        }, 
        {
          headers: { 
            'Authorization': `Bearer ${userToken}` 
          }
        }
      );

      // Navigate to profile after saving
      navigate('/profile');
    } catch (error) {
      console.error('Error saving career:', error);
      alert('Failed to save career. Please try again.');
    }
  };
  
  return (
    <div className="results2-container2">
      <h2 className="title4">Your Career Recommendations</h2>
      
      {recommendations.length === 0 && aiRecommendations.length === 0 ? (
        <div className="no-results4">
          <p>No recommendations found. Please complete the assessment first.</p>
          <Link to="/dashboard" className="btn btn-dark">Take Assessment</Link>
        </div>
      ) : (
        <div className="results3-content3">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'regular' ? 'active' : ''}`}
              onClick={() => setActiveTab('regular')}
              disabled={recommendations.length === 0}
            >
              Assessment Results ({recommendations.length})
            </button>
            <button 
              className={`tab-btn ai-tab ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
              disabled={aiRecommendations.length === 0}
            >
              🤖 AI Recommendations ({aiRecommendations.length})
            </button>
          </div>

          <br/><br/>

          {/* Regular Assessment Results */}
          {activeTab === 'regular' && recommendations.length > 0 && (
            <div className="recommendations-section">
              <div className="recommendations-list">
                <h3 className='resultsTitles'>Top Career Matches 🎯</h3>
                <ul className="career-list">
                  {recommendations.map((career, index) => (
                    <li 
                      key={index} 
                      className={`career-item ${selectedCareer && career.careerTitle === selectedCareer.careerTitle ? 'active' : ''}`}
                      onClick={() => setSelectedCareer(career)}
                    >
                      <div className="career-title">{career.careerTitle}</div>
                      <div className="match-percentage">{career.matchPercentage}% Match</div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {selectedCareer && (
                <div className="career-details">
                  <h3 className='resultsTitles'>{selectedCareer.careerTitle} ✅</h3>
                  <div className="match-badge">{selectedCareer.matchPercentage}% Match</div>
                  
                  <h4 className='resultsTitles'>Description 📝</h4>
                  <p>{selectedCareer.description}</p>
                  
                  <h4 className='resultsTitles'>Required Skills 💡</h4>
                  <ul className="skills-list">
                    {selectedCareer.skills && selectedCareer.skills.map((skill, index) => (
                      <li key={index} className="skill-item">{skill}</li>
                    ))}
                  </ul>
                  
                  <h4 className='resultsTitles'>Education Path 🎓</h4>
                  <ul className="education-list">
                    {selectedCareer.educationPath && selectedCareer.educationPath.map((edu, index) => (
                      <li key={index} className="education-item">{edu}</li>
                    ))}
                  </ul>
                  
                  <h4 className='resultsTitles'>Average Salary 💰</h4>
                  <p>{selectedCareer.averageSalary}</p>
                  
                  <div className="action-buttons">
                    <button 
                      className="btn btn-success"
                      onClick={() => handleSaveToProfile(selectedCareer, false)}
                    >
                      Save to Profile
                    </button>
                    <br/><br/>
                  </div> 
                </div>
              )}
            </div>
          )}

          {/* AI Recommendations */}
          {activeTab === 'ai' && aiRecommendations.length > 0 && (
            <div className="ai-recommendations-section">
              <div className="ai-recommendations-list">
                <h3 className='resultsTitles ai-title'>🤖 AI-Powered Career Insights</h3>
                <div className="ai-intro">
                  <p>Based on advanced AI analysis of your assessment responses, here are personalized career recommendations:</p>
                </div>
                <ul className="ai-career-list">
                  {aiRecommendations.map((career, index) => (
                    <li 
                      key={index} 
                      className={`ai-career-item ${selectedAICareer && career.careerTitle === selectedAICareer.careerTitle ? 'active' : ''}`}
                      onClick={() => setSelectedAICareer(career)}
                    >
                      <div className="ai-career-header">
                        <div className="ai-career-title">🎯 {career.careerTitle}</div>
                        {career.matchPercentage !== 'N/A' && (
                          <div className="ai-match-percentage">{career.matchPercentage}% AI Match</div>
                        )}
                      </div>
                      <div className="ai-career-preview">
                        {career.description && career.description.substring(0, 100)}...
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {selectedAICareer && (
                <div className="ai-career-details">
                  <div className="ai-career-header-detail">
                    <h3 className='resultsTitles ai-career-main-title'>🤖 {selectedAICareer.careerTitle}</h3>
                    {selectedAICareer.matchPercentage !== 'N/A' && (
                      <div className="ai-match-badge">🎯 {selectedAICareer.matchPercentage}% AI Match</div>
                    )}
                  </div>
                  
                  <div className="ai-recommendation-tag">
                    <span className="ai-badge">✨ AI Generated Recommendation</span>
                  </div>
                  
                  <h4 className='resultsTitles ai-section-title'>🔍 AI Analysis & Description</h4>
                  <div className="ai-description">
                    <p>{selectedAICareer.description}</p>
                  </div>
                  
                  {selectedAICareer.skills && selectedAICareer.skills.length > 0 && (
                    <>
                      <h4 className='resultsTitles ai-section-title'>💡 Key Skills Identified</h4>
                      <ul className="ai-skills-list">
                        {selectedAICareer.skills.map((skill, index) => (
                          <li key={index} className="ai-skill-item">⚡ {skill}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {selectedAICareer.educationPath && selectedAICareer.educationPath !== 'N/A' && (
                    <>
                      <h4 className='resultsTitles ai-section-title'>🎓 Recommended Education Path</h4>
                      <div className="ai-education">
                        {Array.isArray(selectedAICareer.educationPath) ? (
                          <ul className="ai-education-list">
                            {selectedAICareer.educationPath.map((edu, index) => (
                              <li key={index} className="ai-education-item">📚 {edu}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>📚 {selectedAICareer.educationPath}</p>
                        )}
                      </div>
                    </>
                  )}
                  
                  {selectedAICareer.averageSalary && selectedAICareer.averageSalary !== 'N/A' && (
                    <>
                      <h4 className='resultsTitles ai-section-title'>💰 Salary Insights</h4>
                      <div className="ai-salary">
                        <p>💵 {selectedAICareer.averageSalary}</p>
                      </div>
                    </>
                  )}
                  
                  <div className="ai-action-buttons">
                    <button 
                      className="btn btn-ai-primary"
                      onClick={() => handleSaveToProfile(selectedAICareer, true)}
                    >
                      🤖 Save AI Recommendation
                    </button>
                    <br/><br/>
                  </div>
                  
                  <div className="ai-disclaimer">
                    <small>
                      <em>* This recommendation was generated using advanced AI analysis. 
                      Consider combining it with traditional career counseling for best results.</em>
                    </small>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No Results for Active Tab */}
          {activeTab === 'regular' && recommendations.length === 0 && (
            <div className="no-tab-results">
              <p>No assessment results available. Please complete the career assessment.</p>
              <Link to="/dashboard" className="btn btn-dark">Take Assessment</Link>
            </div>
          )}

          {activeTab === 'ai' && aiRecommendations.length === 0 && (
            <div className="no-tab-results">
              <p>No AI recommendations available. AI recommendations are generated after completing the full assessment.</p>
              <Link to="/dashboard" className="btn btn-dark">Take Assessment</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Results;