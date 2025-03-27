import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard_Styles/Results.css'
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
    <div className="results2-container2">
      <h2 className="title4">Your Career Recommendations</h2>
      
      {recommendations.length === 0 ? (
        <div className="no-results4">
          <p>No recommendations found. Please complete the assessment first.</p>
          <Link to="/dashboard" className="btn btn-primary">Take Assessment</Link>
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
                {/* <button className="btn btn-primary">Learn More</button> */}
                <button className="btn btn-success">Save to Profile</button> <br /> <br />
              </div> 
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Results;