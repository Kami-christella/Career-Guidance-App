import { useState } from 'react';
//import '../styles/Assessment2.css'; // Create a similar CSS file for styling
import { useNavigate } from 'react-router-dom';
import { TbPlayerTrackNext } from "react-icons/tb";
import './Dashboard_Styles/Assessment2.css'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function Assessment2() {
    const [responses, setResponses] = useState({});
    const navigate = useNavigate();
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { authToken } = useContext(AuthContext);

    const questions = [
        {
            question: "Rate your skill level with programming and software development:",
            options: [
                "Advanced - I can develop complex software applications",
                "Intermediate - I can write basic code and understand programming concepts",
                "Basic - I understand the principles but have limited coding experience",
                "None - I have no programming experience"
            ],
            type: "radio"
        },
        {
            question: "How comfortable are you with financial concepts and mathematics?",
            options: [
                "Very comfortable - I understand complex financial models",
                "Comfortable - I can work with budgets and financial statements",
                "Somewhat comfortable - I understand basic financial concepts",
                "Not comfortable - I have little experience with financial matters"
            ],
            type: "radio"
        },
        {
            question: "How would you rate your communication and teaching skills?",
            options: [
                "Excellent - I can explain complex concepts clearly to diverse audiences",
                "Good - I communicate well and enjoy helping others learn",
                "Average - I can communicate effectively but may not be my strength",
                "Below average - I prefer working with data or systems than teaching"
            ],
            type: "radio"
        },
        {
            question: "What is your experience level with healthcare or patient care?",
            options: [
                "Significant - I have healthcare training or experience",
                "Some - I've had exposure to healthcare settings",
                "Limited - I understand basics but have no direct experience",
                "None - I have no healthcare experience"
            ],
            type: "radio"
        },
        {
            question: "How comfortable are you with network and system administration?",
            options: [
                "Very comfortable - I understand networks, servers, and system management",
                "Somewhat comfortable - I can troubleshoot basic network issues",
                "Basic understanding - I know the concepts but limited practical experience",
                "Not comfortable - I have minimal experience with networks and systems"
            ],
            type: "radio"
        },
        {
            question: "Which technical skills do you possess? (Select all that apply)",
            options: [
                "Programming (Java, Python, JavaScript, etc.)",
                "Network configuration and management",
                "Database design and management",
                "Financial analysis and accounting",
                "Teaching and curriculum development",
                "Medical or healthcare procedures",
                "Geographic Information Systems (GIS)",
                "Foreign language proficiency"
            ],
            type: "checkbox"
        },
        {
            question: "How would you rate your leadership and management skills?",
            options: [
                "Excellent - I regularly lead teams and manage projects",
                "Good - I can effectively organize and direct group efforts",
                "Average - I can manage when needed but it's not my strength",
                "Limited - I prefer individual contributor roles"
            ],
            type: "radio"
        },
        {
            question: "How comfortable are you working with diverse groups of people?",
            options: [
                "Very comfortable - I thrive in diverse environments",
                "Comfortable - I work well with various groups of people",
                "Somewhat comfortable - I can manage but may not be my preference",
                "Not comfortable - I prefer more homogeneous environments"
            ],
            type: "radio"
        },
        {
            question: "How would you rate your analytical and problem-solving abilities?",
            options: [
                "Excellent - I excel at analyzing complex problems",
                "Good - I can effectively solve most analytical challenges",
                "Average - I can solve problems but may need guidance with complex issues",
                "Below average - I struggle with highly analytical tasks"
            ],
            type: "radio"
        },
        {
            question: "Which soft skills do you consider your strengths? (Select all that apply)",
            options: [
                "Critical thinking and problem solving",
                "Communication and presentation",
                "Teamwork and collaboration",
                "Organization and time management",
                "Empathy and emotional intelligence",
                "Creativity and innovation",
                "Adaptability and flexibility",
                "Attention to detail"
            ],
            type: "checkbox"
        }
    ];
    
    const handleSubmit = () => {
        if (Object.keys(responses).length < questions.length) {
          alert('Please answer all questions before proceeding.');
          return;
        }
        
        // Store responses in localStorage
        localStorage.setItem('skillsResponses', JSON.stringify(responses));
        
        // Navigate to next assessment
        navigate('assessment3');
      };

    const handleChange = (questionIndex, option, type) => {
        setResponses((prevResponses) => {
            if (type === "checkbox") {
                const selectedOptions = prevResponses[questionIndex] || [];
                return {
                    ...prevResponses,
                    [questionIndex]: selectedOptions.includes(option)
                        ? selectedOptions.filter((item) => item !== option)
                        : [...selectedOptions, option]
                };
            } else {
                return { ...prevResponses, [questionIndex]: option };
            }
        });
    };

    return (
        <div className="assessment-container">
            <h2 className="title">Skills & Competency Assessment</h2>
            <form className="assessment-form">
                {questions.map((q, index) => (
                    <div key={index} className="question-block">
                        <p className="question"><strong>{q.question}</strong></p>
                        <div className="options-container">
                            {q.options.map((option, optIndex) => (
                                <label key={optIndex} className="option-label">
                                    <input
                                        type={q.type}
                                        name={`question-${index}`}
                                        value={option}
                                        checked={q.type === "radio" ? responses[index] === option : (responses[index] || []).includes(option)}
                                        onChange={() => handleChange(index, option, q.type)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <button type="button" className="btn btn-success" onClick={handleSubmit}>Next <TbPlayerTrackNext /></button>
            </form>
        </div>
    );
}

export default Assessment2;



// import { useState } from 'react';
// //import '../styles/Assessment2.css'; // Create a similar CSS file for styling
// import { useNavigate } from 'react-router-dom';
// import { TbPlayerTrackNext } from "react-icons/tb";
// import './Dashboard_Styles/Assessment2.css'
// import { useContext } from 'react';
// import { AuthContext } from './context/AuthContext';


// function Assessment2() {
//     const [responses, setResponses] = useState({});
//     const navigate = useNavigate();
    
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const { authToken } = useContext(AuthContext);

//     const questions = [
//         {
//             question: "How comfortable are you with using technology and digital tools? (Select one)",
//             options: [
//                 "Very comfortable, I use them daily",
//                 "Somewhat comfortable, I learn quickly",
//                 "Not very comfortable, but I want to improve",
//                 "Not comfortable at all"
//             ],
//             type: "radio"
//         },
//         {
//             question: "Can you effectively communicate your ideas to others? (Select one)",
//             options: [
//                 "Yes, I am a strong communicator",
//                 "I can communicate well but prefer written communication",
//                 "I struggle with verbal communication but work well independently",
//                 "I need to improve my communication skills"
//             ],
//             type: "radio"
//         },
//         {
//             question: "How strong are your problem-solving skills? (Select one)",
//             options: [
//                 "Very strong, I love solving problems",
//                 "Somewhat strong, but I need guidance",
//                 "I prefer working on tasks with clear instructions",
//                 "I find problem-solving difficult"
//             ],
//             type: "radio"
//         },
//         {
//             question: "Do you have experience managing projects and meeting deadlines? (Select one)",
//             options: [
//                 "Yes, I have successfully managed multiple projects",
//                 "Somewhat, I have experience but need improvement",
//                 "No, I have not managed projects before"
//             ],
//             type: "radio"
//         },
//         {
//             question: "How well do you handle stressful or high-pressure situations? (Select one)",
//             options: [
//                 "Very well, I thrive under pressure",
//                 "I manage stress well but need some support",
//                 "I struggle under pressure but try my best",
//                 "I find stress difficult to handle"
//             ],
//             type: "radio"
//         },
//         {
//             question: "Are you proficient in any specific software, coding languages, or technical skills? (Select all that apply)",
//             options: [
//                 "Programming (Java, Python, JavaScript, etc.)",
//                 "Data Analysis (Excel, SQL, Power BI, etc.)",
//                 "Graphic Design (Photoshop, Illustrator, etc.)",
//                 "Business Tools (Microsoft Office, CRM, etc.)",
//                 "Other (Please specify)"
//             ],
//             type: "checkbox"
//         },
//         {
//             question: "How good are your negotiation and persuasion skills? (Select one)",
//             options: [
//                 "Excellent, I can convince others easily",
//                 "Good, but I need more practice",
//                 "Average, I sometimes struggle",
//                 "Poor, I avoid negotiations"
//             ],
//             type: "radio"
//         },
//         {
//             question: "Can you work efficiently without constant supervision? (Select one)",
//             options: [
//                 "Yes, I work best independently",
//                 "I can work alone, but I need occasional guidance",
//                 "I prefer working under close supervision"
//             ],
//             type: "radio"
//         },
//         {
//             question: "How do you approach learning new skills and adapting to changes? (Select one)",
//             options: [
//                 "I enjoy learning and adapt quickly",
//                 "I can learn, but I need structured training",
//                 "I struggle with change but try my best"
//             ],
//             type: "radio"
//         },
//         {
//             question: "How well do you collaborate with others in a team setting? (Select one)",
//             options: [
//                 "Very well, I am a team player",
//                 "I collaborate well but prefer independent tasks",
//                 "I struggle with teamwork but try to improve"
//             ],
//             type: "radio"
//         }
//     ];
//     const handleSubmit = () => {
//         if (Object.keys(responses).length < questions.length) {
//           alert('Please answer all questions before proceeding.');
//           return;
//         }
        
//         // Store responses in localStorage
//         localStorage.setItem('skillsResponses', JSON.stringify(responses));
        
//         // Navigate to next assessment
//         navigate('assessment3');
//       };

//     const handleChange = (questionIndex, option, type) => {
//         setResponses((prevResponses) => {
//             if (type === "checkbox") {
//                 const selectedOptions = prevResponses[questionIndex] || [];
//                 return {
//                     ...prevResponses,
//                     [questionIndex]: selectedOptions.includes(option)
//                         ? selectedOptions.filter((item) => item !== option)
//                         : [...selectedOptions, option]
//                 };
//             } else {
//                 return { ...prevResponses, [questionIndex]: option };
//             }
//         });
//     };

//     return (
//         <div className="assessment-container">
//             <h2 className="title">Skills & Competency Assessment</h2>
//             <form className="assessment-form">
//                 {questions.map((q, index) => (
//                     <div key={index} className="question-block">
//                         <p className="question"><strong>{q.question}</strong></p>
//                         <div className="options-container">
//                             {q.options.map((option, optIndex) => (
//                                 <label key={optIndex} className="option-label">
//                                     <input
//                                         type={q.type}
//                                         name={`question-${index}`}
//                                         value={option}
//                                         checked={q.type === "radio" ? responses[index] === option : (responses[index] || []).includes(option)}
//                                         onChange={() => handleChange(index, option, q.type)}
//                                     />
//                                     {option}
//                                 </label>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//                 <button type="button" className="btn btn-success" onClick={handleSubmit}>Next <TbPlayerTrackNext /></button>
//             </form>
//         </div>
//     );
// }

// export default Assessment2;
