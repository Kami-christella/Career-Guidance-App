import  { useState } from 'react';
import './Dashboard_Styles/Assessment3.css'
import { useNavigate } from 'react-router-dom';
import { MdOutlineSend } from "react-icons/md";
import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';


function Assesment3() {
    const [responses, setResponses] = useState({});
    const navigate = useNavigate(); 
    const questions = [
        {
            question: "Do you prefer working in a fast-paced or slow-paced environment? (Select one)",
            options: ["Fast-paced, I enjoy challenges", "Balanced, with some challenges and stability", "Slow-paced, I like consistency"],
            type: "radio"
        },
        {
            question: "Are you more detail-oriented, or do you focus on the bigger picture? (Select one)",
            options: ["Detail-oriented, I like precision", "Big-picture thinker, I focus on strategy", "A mix of both"],
            type: "radio"
        },
        {
            question: "Do you thrive in a structured workplace, or do you prefer flexibility? (Select one)",
            options: ["Structured, with clear rules and expectations", "Flexible, with room for creativity", "A balance between structure and freedom"],
            type: "radio"
        },
        {
            question: "How do you usually make decisions? (Select one)",
            options: ["Logically, based on facts and data", "Intuitively, based on gut feelings", "A mix of both"],
            type: "radio"
        },
        {
            question: "Are you comfortable taking risks, or do you prefer stability? (Select one)",
            options: ["I take calculated risks and enjoy challenges", "I prefer stable and predictable work", "I take risks occasionally but prefer security"],
            type: "radio"
        },
        {
            question: "Do you enjoy leading others? (Select one)",
            options: ["Yes, I like being in leadership roles", "Sometimes, but I prefer shared responsibility", "No, I prefer being a team member"],
            type: "radio"
        },
        {
            question: "How do you handle feedback and constructive criticism? (Select one)",
            options: ["I appreciate feedback and use it to improve", "I accept feedback but struggle with criticism", "I find feedback difficult to handle"],
            type: "radio"
        },
        {
            question: "Do you prefer working in an office, remotely, or a combination? (Select one)",
            options: ["Office", "Remote", "Hybrid (both)"],
            type: "radio"
        },
        {
            question: "How do you deal with workplace conflict? (Select one)",
            options: ["I address conflicts directly and find solutions", "I try to avoid conflict whenever possible", "I seek mediation or guidance when conflicts arise"],
            type: "radio"
        },
        {
            question: "Do you feel more motivated by personal achievements or team success? (Select one)",
            options: ["Personal achievements", "Team success", "Both equally"],
            type: "radio"
        }
    ];

    const handleChange = (questionIndex, option, type) => {
        setResponses((prevResponses) => {
            return { ...prevResponses, [questionIndex]: option };
        });
    };

    // Add inside your Assessment3 component
const [isSubmitting, setIsSubmitting] = useState(false);
const { authToken } = useContext(AuthContext);


const handleSubmit = async () => {
  let tokenValue;
  
  try {
    // If authToken is already an object with a token property
    if (typeof authToken === 'object' && authToken.token) {
      tokenValue = authToken.token;
    } 
    // If it's a string that might be JSON
    else {
      const tokenFromStorage = localStorage.getItem('userToken');
      const parsedToken = JSON.parse(tokenFromStorage);
      tokenValue = parsedToken.token || tokenFromStorage;
    }
  } catch (e) {
    // If JSON parsing fails, use the raw token value
    tokenValue = authToken || localStorage.getItem('userToken');
  }
  
  // const token=  localStorage.getItem('authToken'); 
 // console.log("Token being sent:", `Bearer ${tokenValue}`);
    //console.log("Auth Token before submission:", token);
    if (!tokenValue) {
        console.error("Auth token is missing!");
        alert("You must be logged in to submit the assessment.");
        return;
    }
  if (Object.keys(responses).length < questions.length) {
    alert('Please answer all questions before proceeding.');
    return;
  }
  
  try {
    setIsSubmitting(true);
    
    // Get all responses from localStorage
    const careerTestResponses = JSON.parse(localStorage.getItem('careerTestResponses') || '{}');
    const skillsResponses = JSON.parse(localStorage.getItem('skillsResponses') || '{}');
    
    // Prepare data for API
    const assessmentData = {
      careerTest: careerTestResponses,
      skillsAssessment: skillsResponses,
      personalityAssessment: responses
    };
    
    // Submit to backend API
    const response = await axios.post(
      'http://localhost:5000/api/assessments', 
      assessmentData,
      {
        headers: {
        //   'Content-Type': 'application/json',
         // 'Authorization': token,
      'Authorization': `Bearer ${tokenValue}`,
        }
      }
    );
    
    // Clear localStorage
    localStorage.removeItem('careerTestResponses');
    localStorage.removeItem('skillsResponses');
    
    // Get career recommendations
    const recommendResponse = await axios.post(
      'http://localhost:5000/api/careers/recommend',
      { assessmentId: response.data._id },
      {
        headers: {
        //   'Content-Type': 'application/json',
      // 'Authorization': token
      
        'Authorization': `Bearer ${tokenValue}`,
        }
      }
    );

    // Store recommendations and navigate to results page
    localStorage.setItem('careerRecommendations', JSON.stringify(recommendResponse.data));
    navigate('Results');
    
  } catch (error) {
    console.error('Error submitting assessment:', error);
    alert('There was an error submitting your assessment. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

    return (
        <div className="career-test-container1">
            <h2 className="title">Personality & Work Style Assessment</h2>
            <form className="career-test-form">
                {questions.map((q, index) => (
                    <div key={index} className="question-block">
                        <p className="question1"><strong>{q.question}</strong></p>
                        <div className="options-container">
                            {q.options.map((option, optIndex) => (
                                <label key={optIndex} className="option-label">
                                    <input
                                        type={q.type}
                                        name={`question-${index}`}
                                        value={option}
                                        checked={responses[index] === option}
                                        onChange={() => handleChange(index, option, q.type)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit <MdOutlineSend /></button>
            </form>
        </div>
    );
}

export default Assesment3;
