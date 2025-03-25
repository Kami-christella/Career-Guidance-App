import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import './Results.css';

function Results() {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  
  useEffect(() => {
    // Get recommendations from localStorage
    const storedRecommendations = JSON.parse(localStorage.getItem('careerRecommendations') || '[]');
    setRecommendations(storedRecommendations);
    
    // Select first career by default if available
    if (storedRecommendations && storedRecommendations.length > 0) {
      setSelectedCareer(storedRecommendations[0]);
    }
  }, []);
  
  return (
    <div className="results-container">
      <h2 className="title">Your Career Recommendations</h2>
      
      {recommendations.length === 0 ? (
        <div className="no-results">
          <p>No recommendations found. Please complete the assessment first.</p>
          <Link to="/career-test" className="btn btn-primary">Take Assessment</Link>
        </div>
      ) : (
        <div className="results-content">
          <div className="recommendations-list">
            <h3>Top Career Matches</h3>
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
              <h3>{selectedCareer.careerTitle}</h3>
              <div className="match-badge">{selectedCareer.matchPercentage}% Match</div>
              
              <h4>Description</h4>
              <p>{selectedCareer.description}</p>
              
              <h4>Required Skills</h4>
              <ul className="skills-list">
                {selectedCareer.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              
              <h4>Education Path</h4>
              <ul className="education-list">
                {selectedCareer.educationPath.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
              
              <h4>Average Salary</h4>
              <p>{selectedCareer.averageSalary}</p>
              
              <div className="action-buttons">
                <button className="btn btn-primary">Learn More</button>
                <button className="btn btn-outline">Save to Profile</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Results;