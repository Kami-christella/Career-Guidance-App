import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import './Dashboard_Styles/Profile.css';


function Profile() {
  const [careerRecommendations, setCareerRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);

  let tokenValue;

  try {
    if (typeof authToken === 'object' && authToken.token) {
      tokenValue = authToken.token;
    } else {
      const tokenFromStorage = localStorage.getItem('userToken');
      const parsedToken = JSON.parse(tokenFromStorage);
      tokenValue = parsedToken.token || tokenFromStorage;
    }
  } catch (e) {
    tokenValue = authToken || localStorage.getItem('userToken');
  }

  useEffect(() => {
    const fetchCareerRecommendations = async () => {
      try {
        const payload = tokenValue.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        const id = decodedPayload?.user?.id;

        const response = await axios.get(`http://localhost:5000/api/assessments/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${tokenValue}`
          }
        });

        //console.log("API Response:", response.data.lastTwoRecommendedCareers);

        // Store only the last 2 recommended careers
        setCareerRecommendations(response.data.lastTwoRecommendedCareers || []);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching assessments:', err);
        setError('Failed to load career recommendations');
        setIsLoading(false);
      }
    };

    fetchCareerRecommendations();
  }, [tokenValue]);

  if (isLoading) {
    return <div className='norecomm'>Loading your career recommendations...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="">
      {/* <h2 className="carrerHeaderReco">Your Career Recommendations</h2> */}

      {careerRecommendations.length > 0 ? (
        <div className="profileClass">
          <h2 className="carrerHeaderReco">Your Career Recommendations</h2> 
          {careerRecommendations.map((career, index) => (
            <div key={index} className="border rounded p-4 shadow bg-white">
              <h3 className="text-lg font-semibold">{career.careerTitle}</h3>
              <p><strong>Match:</strong> {career.matchPercentage}%</p>
              <p><strong>Description:</strong> {career.description}</p>
              <p><strong>Skills Required:</strong> {career.skills.join(', ')}</p>
              <p><strong>Education Path:</strong> {career.educationPath.join(' → ')}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='norecomm'>No career recommendations found.</p>
      )}
    </div>
  );
}

export default Profile;
