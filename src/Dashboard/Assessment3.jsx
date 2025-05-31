// import  { useState } from 'react';
// import './Dashboard_Styles/Assessment3.css'
// import { useNavigate } from 'react-router-dom';
// import { MdOutlineSend } from "react-icons/md";
// import { useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from './context/AuthContext';

// function Assesment3() {
//     const [responses, setResponses] = useState({});
//     const navigate = useNavigate();
//     const questions = [
//         {
//             question: "Do you prefer working in a fast-paced or slow-paced environment? (Select one)",
//             options: ["Fast-paced, I enjoy challenges", "Balanced, with some challenges and stability", "Slow-paced, I like consistency"],
//             type: "radio"
//         },
//         {
//             question: "Are you more detail-oriented, or do you focus on the bigger picture? (Select one)",
//             options: ["Detail-oriented, I like precision", "Big-picture thinker, I focus on strategy", "A mix of both"],
//             type: "radio"
//         },
//         {
//             question: "Do you thrive in a structured workplace, or do you prefer flexibility? (Select one)",
//             options: ["Structured, with clear rules and expectations", "Flexible, with room for creativity", "A balance between structure and freedom"],
//             type: "radio"
//         },
//         {
//             question: "How do you usually make decisions? (Select one)",
//             options: ["Logically, based on facts and data", "Intuitively, based on gut feelings", "A mix of both"],
//             type: "radio"
//         },
//         {
//             question: "Are you comfortable taking risks, or do you prefer stability? (Select one)",
//             options: ["I take calculated risks and enjoy challenges", "I prefer stable and predictable work", "I take risks occasionally but prefer security"],
//             type: "radio"
//         },
//         {
//             question: "Do you enjoy leading others? (Select one)",
//             options: ["Yes, I like being in leadership roles", "Sometimes, but I prefer shared responsibility", "No, I prefer being a team member"],
//             type: "radio"
//         },
//         {
//             question: "How do you handle feedback and constructive criticism? (Select one)",
//             options: ["I appreciate feedback and use it to improve", "I accept feedback but struggle with criticism", "I find feedback difficult to handle"],
//             type: "radio"
//         },
//         {
//             question: "Do you prefer working in an office, remotely, or a combination? (Select one)",
//             options: ["Office", "Remote", "Hybrid (both)"],
//             type: "radio"
//         },
//         {
//             question: "How do you deal with workplace conflict? (Select one)",
//             options: ["I address conflicts directly and find solutions", "I try to avoid conflict whenever possible", "I seek mediation or guidance when conflicts arise"],
//             type: "radio"
//         },
//         {
//             question: "Do you feel more motivated by personal achievements or team success? (Select one)",
//             options: ["Personal achievements", "Team success", "Both equally"],
//             type: "radio"
//         }
//     ];

//     const handleChange = (questionIndex, option, type) => {
//         setResponses((prevResponses) => {
//             return { ...prevResponses, [questionIndex]: option };
//         });
//     };

//     // Add inside your Assessment3 component
// const [isSubmitting, setIsSubmitting] = useState(false);
// const { authToken } = useContext(AuthContext);

// //start
// const handleSubmit = async () => {
//   let tokenValue;

//   try {
//     // If authToken is already an object with a token property
//     if (typeof authToken === 'object' && authToken.token) {
//       tokenValue = authToken.token;
//     }
//     // If it's a string that might be JSON
//     else {
//       const tokenFromStorage = localStorage.getItem('userToken');
//       const parsedToken = JSON.parse(tokenFromStorage);
//       tokenValue = parsedToken.token || tokenFromStorage;
//     }
//   } catch (e) {
//     // If JSON parsing fails, use the raw token value
//     tokenValue = authToken || localStorage.getItem('userToken');
//   }

//   // const token=  localStorage.getItem('authToken');
//  // console.log("Token being sent:", `Bearer ${tokenValue}`);
//     //console.log("Auth Token before submission:", token);
//     if (!tokenValue) {
//         console.error("Auth token is missing!");
//         alert("You must be logged in to submit the assessment.");
//         return;
//     }
//   if (Object.keys(responses).length < questions.length) {
//     alert('Please answer all questions before proceeding.');
//     return;
//   }

//   try {
//     setIsSubmitting(true);

//     // Get all responses from localStorage
//     const careerTestResponses = JSON.parse(localStorage.getItem('careerTestResponses') || '{}');
//     const skillsResponses = JSON.parse(localStorage.getItem('skillsResponses') || '{}');

//     // Prepare data for API
//     const assessmentData = {
//       careerTest: careerTestResponses,
//       skillsAssessment: skillsResponses,
//       personalityAssessment: responses
//     };

//     // Submit to backend API
//     const response = await axios.post(
//       'http://localhost:5000/api/assessments',
//       assessmentData,
//       {
//         headers: {
//         //   'Content-Type': 'application/json',
//          // 'Authorization': token,
//       'Authorization': `Bearer ${tokenValue}`,
//         }
//       }
//     );

//     // Clear localStorage
//     localStorage.removeItem('careerTestResponses');
//     localStorage.removeItem('skillsResponses');

//     // Get career recommendations
//     const recommendResponse = await axios.post(
//       'http://localhost:5000/api/careers/recommend',
//       { assessmentId: response.data._id },
//       {
//         headers: {
//         //   'Content-Type': 'application/json',
//       // 'Authorization': token

//         'Authorization': `Bearer ${tokenValue}`,
//         }
//       }
//     );

//     // Store recommendations and navigate to results page
//     localStorage.setItem('careerRecommendations', JSON.stringify(recommendResponse.data));
//     navigate('Results');

//   } catch (error) {
//     console.error('Error submitting assessment:', error);
//     alert('There was an error submitting your assessment. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// }
// ;
// //end

//     return (
//         <div className="career-test-container1">
//             <h2 className="title">Personality & Work Style Assessment</h2>
//             <form className="career-test-form">
//                 {questions.map((q, index) => (
//                     <div key={index} className="question-block">
//                         <p className="question1"><strong>{q.question}</strong></p>
//                         <div className="options-container">
//                             {q.options.map((option, optIndex) => (
//                                 <label key={optIndex} className="option-label">
//                                     <input
//                                         type={q.type}
//                                         name={`question-${index}`}
//                                         value={option}
//                                         checked={responses[index] === option}
//                                         onChange={() => handleChange(index, option, q.type)}
//                                     />
//                                     {option}
//                                 </label>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//                 <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit <MdOutlineSend /></button>
//             </form>
//         </div>
//     );
// }

// export default Assesment3;

import { useState } from "react";
import "./Dashboard_Styles/Assessment3.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineSend } from "react-icons/md";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

function Assesment3() {
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);

  const questions = [
    {
      question: "How do you prefer to learn new material?",
      options: [
        "Through hands-on practice and application",
        "Through reading and self-study",
        "Through lectures and presentations",
        "Through discussion and group activities",
      ],
      type: "radio",
    },
    {
      question: "What type of work environment helps you thrive?",
      options: [
        "Highly technical and structured environment",
        "Dynamic business setting with clear objectives",
        "Collaborative educational environment",
        "Healthcare setting with direct patient interaction",
        "Calm, reflective, and contemplative setting",
      ],
      type: "radio",
    },
    {
      question:
        "How comfortable are you with public speaking and presentations?",
      options: [
        "Very comfortable - I enjoy presenting to groups",
        "Somewhat comfortable - I can do it but it's not my preference",
        "Not very comfortable - I prefer one-on-one interactions",
        "Uncomfortable - I avoid public speaking when possible",
      ],
      type: "radio",
    },
    {
      question: "How do you approach decision-making?",
      options: [
        "Analytically, based on data and facts",
        "Strategically, considering business implications",
        "Considerately, thinking about impact on people",
        "Holistically, balancing multiple perspectives",
      ],
      type: "radio",
    },
    {
      question:
        "How do you feel about working with vulnerable populations (children, elderly, sick)?",
      options: [
        "Very comfortable - I find it meaningful and rewarding",
        "Somewhat comfortable - I can manage it but it can be challenging",
        "Not very comfortable - I prefer working with technology or data",
        "It depends on the specific context and requirements",
      ],
      type: "radio",
    },
    {
      question:
        "How important is it for you to see direct impact of your work on others?",
      options: [
        "Very important - I need to see how I'm helping people",
        "Somewhat important - I appreciate impact but other factors matter too",
        "Not very important - I'm more focused on the work itself",
        "I'm more motivated by intellectual or technical accomplishments",
      ],
      type: "radio",
    },
    {
      question: "What type of challenges energize you?",
      options: [
        "Technical problems that require logical solutions",
        "Business challenges that affect organizational success",
        "Educational challenges that help others learn and grow",
        "Healthcare challenges that improve patient outcomes",
        "Philosophical or spiritual questions that explore deeper meaning",
      ],
      type: "radio",
    },
    {
      question: "How important is work-life balance to you?",
      options: [
        "Very important - I prioritize regular hours and personal time",
        "Important but I can be flexible for the right role",
        "I'm willing to work long or irregular hours for meaningful work",
        "I'm comfortable with demanding schedules in healthcare or other fields",
      ],
      type: "radio",
    },
    {
      question: "How do you handle high-pressure situations?",
      options: [
        "Very well - I remain calm and focused under pressure",
        "Well - I can manage pressure but prefer not to constantly",
        "It depends on the situation and context",
        "I prefer to avoid high-pressure environments when possible",
      ],
      type: "radio",
    },
    {
      question: "What motivates you most in your career?",
      options: [
        "Technical mastery and solving complex problems",
        "Financial success and career advancement",
        "Making a difference in students' lives and education",
        "Helping improve people's health and wellbeing",
        "Spiritual growth and guidance for others",
      ],
      type: "radio",
    },
  ];

  const handleChange = (questionIndex, option, type) => {
    setResponses((prevResponses) => {
      return { ...prevResponses, [questionIndex]: option };
    });
  };

  // Function to get AI recommendations
  const getAIRecommendations = async (
    careerTestResponses,
    skillsResponses,
    personalityResponses
  ) => {
    try {
      const responseAI = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Based on the following assessments, provide structured career advice in JSON format with categories (Career Interest, Skills and Competency, Personality and Work Style):

Career Interest Test:
${JSON.stringify(careerTestResponses)}

Skills and Competency Assessment:
${JSON.stringify(skillsResponses)}

Personality and Work Style:
${JSON.stringify(personalityResponses)}

Please format your response as a JSON object with a 'recommendations' array where each item has: careerTitle, matchPercentage, description, educationPath, averageSalary and skills fields.`,
            },
          ],
        },
        {
          headers: {
            Authorization:
           "Bearer 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",
            //"Bearer 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",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "My OpenRouter App",
          },
        }
      );

      console.log("AI response:", responseAI.data);

      // Try to parse AI response as JSON
      let aiRecommendations = [];
      try {
        const aiContent = responseAI.data.choices[0].message.content;
        const parsedAI = JSON.parse(aiContent);
        aiRecommendations = parsedAI.recommendations || [];
      } catch (parseError) {
        console.warn("Failed to parse AI response as JSON, using text format");
        // If JSON parsing fails, create a simple recommendation from the text
        aiRecommendations = [
          {
            careerTitle: "General Career Advice",
            matchPercentage: "N/A",
            description: responseAI.data.choices[0].message.content,
            educationPath: "See description for details",
            averageSalary: "Varies",
            skills: [],
          },
        ];
      }

      return aiRecommendations;
    } catch (error) {
      console.error(
        "OpenRouter API Error:",
        error.response?.data || error.message
      );
      // Return a fallback recommendation in case of API failure
      return [
        {
          careerTitle: "Error Getting AI Recommendations",
          matchPercentage: "N/A",
          description:
            "Unable to get AI recommendations at this time. Please try again later.",
          educationPath: "N/A",
          averageSalary: "N/A",
          skills: [],
        },
      ];
    }
  };

  const handleSubmit = async () => {
    // Validate all questions are answered
    if (Object.keys(responses).length < questions.length) {
      alert("Please answer all questions before proceeding.");
      return;
    }

    // Get and validate auth token
    let tokenValue;
    try {
      if (typeof authToken === "object" && authToken.token) {
        tokenValue = authToken.token;
      } else {
        const tokenFromStorage = localStorage.getItem("userToken");
        if (tokenFromStorage) {
          try {
            const parsedToken = JSON.parse(tokenFromStorage);
            tokenValue = parsedToken.token || tokenFromStorage;
          } catch {
            tokenValue = tokenFromStorage;
          }
        } else {
          tokenValue = authToken;
        }
      }
    } catch (e) {
      tokenValue = authToken || localStorage.getItem("userToken");
    }

    if (!tokenValue) {
      console.error("Auth token is missing!");
      alert("You must be logged in to submit the assessment.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Get all responses from localStorage
      const careerTestResponses = JSON.parse(
        localStorage.getItem("careerTestResponses") || "{}"
      );
      const skillsResponses = JSON.parse(
        localStorage.getItem("skillsResponses") || "{}"
      );

      // Prepare data for API
      const assessmentData = {
        careerTest: careerTestResponses,
        skillsAssessment: skillsResponses,
        personalityAssessment: responses,
      };

      // Submit to backend API
      const response = await axios.post(
        "http://localhost:5000/api/assessments",
        assessmentData,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );

      // Get career recommendations from your backend
      const recommendResponse = await axios.post(
        "http://localhost:5000/api/careers/recommend",
        { assessmentId: response.data._id },
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );

      // Get AI recommendations
      const aiRecommendations = await getAIRecommendations(
        careerTestResponses,
        skillsResponses,
        responses
      );

      // Store all recommendations in localStorage
      localStorage.setItem(
        "careerRecommendations",
        JSON.stringify(recommendResponse.data)
      );
      localStorage.setItem(
        "AIRecommendations",
        JSON.stringify(aiRecommendations)
      );

      // Clear assessment responses from localStorage
      localStorage.removeItem("careerTestResponses");
      localStorage.removeItem("skillsResponses");

      // Navigate to results page
      navigate("/dashboard/Assessment2/assessment3/results/"); // Make sure this matches your routing setup
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("There was an error submitting your assessment. Please try again.");
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
            <p className="question1">
              <strong>{q.question}</strong>
            </p>
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
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"} <MdOutlineSend />
        </button>
      </form>
    </div>
  );
}

export default Assesment3;
