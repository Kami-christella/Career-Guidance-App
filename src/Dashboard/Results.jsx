import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard_Styles/Results.css'

function Results() {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get recommendations from localStorage
    const storedRecommendations = JSON.parse(localStorage.getItem('careerRecommendations') || '[]');
    setRecommendations(storedRecommendations);
    
    // Select first career by default if available
    if (storedRecommendations && storedRecommendations.length > 0) {
      setSelectedCareer(storedRecommendations[0]);
    }
  }, []);
  
  // Function to save career to profile
  const handleSaveToProfile = async () => {
    if (!selectedCareer) return;

    try {
      const userToken = localStorage.getItem('userToken');
      
      // API call to save career
      await axios.post('/api/user/save-career', 
        { career: selectedCareer }, 
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
      
      {recommendations.length === 0 ? (
        <div className="no-results4">
          <p>No recommendations found. Please complete the assessment first.</p>
          <Link to="/dashboard" className="btn btn-dark">Take Assessment</Link>
        </div>
      ) : (
        <div className="results3-content3"> <br/> <br/>
          <div className="recommendations-list">
            <h3 className='resultsTitles'>Top Career Matches🎯</h3>
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
              <h3 className='resultsTitles'>{selectedCareer.careerTitle}✅</h3>
              <div className="match-badge">{selectedCareer.matchPercentage}% Match</div>
              
              <h4 className='resultsTitles'>Description📝</h4>
              <p>{selectedCareer.description}</p>
              
              <h4 className='resultsTitles'>Required Skills💡</h4>
              <ul className="skills-list">
                {selectedCareer.skills.map((skill, index) => (
                  <li key={index} className="skill-item">{skill}</li>
                ))}
              </ul>
              
              <h4 className='resultsTitles'>Education Path🎓</h4>
              <ul className="education-list">
                {selectedCareer.educationPath.map((edu, index) => (
                  <li key={index} className="education-item">{edu}</li>
                ))}
              </ul>
              
              <h4 className='resultsTitles'>Average Salary💰</h4>
              <p>{selectedCareer.averageSalary}</p>
              
              <div className="action-buttons">
                {/* <button 
                  className="btn btn-success"
                  onClick={handleSaveToProfile}
                >
                  Save to Profile
                </button>  */}
                <br /> <br />
              </div> 
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Results;