// import  { useState } from 'react';
// import './Dashboard_Styles/CareerTest.css'
// import { useNavigate } from 'react-router-dom';
// import { TbPlayerTrackNext } from "react-icons/tb";
// import { useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from './context/AuthContext'; 


// function CareerTest() {
//     const [responses, setResponses] = useState({});
//     const navigate = useNavigate(); 

//     const [isSubmitting, setIsSubmitting] = useState(false);
//      const { authToken } = useContext(AuthContext);
     
//     const questions = [
        
//         {
//             question: "What activities do you enjoy doing in your free time? (Select all that apply)",
//             options: ["Solving puzzles and analytical problems", "Creating art, music, or writing", "Helping people and giving advice", "Working with machines or technology", "Managing projects and organizing tasks"],
//             type: "checkbox"
//         },
//         {
//             question: "Do you prefer working with:",
//             options: ["People", "Data and numbers", "Physical objects and tools", "A mix of all the above"],
//             type: "radio"
//         },
//         {
//             question: "Would you rather:",
//             options: ["Solve complex problems", "Create something new", "Work on routine tasks that require precision", "Manage and coordinate tasks"],
//             type: "radio"
//         },
//         {
//             question: "Do you enjoy working:",
//             options: ["Independently", "In a team", "A mix of both"],
//             type: "radio"
//         },
//         {
//             question: "Are you more interested in:",
//             options: ["Technical tasks (e.g., coding, engineering)", "Creative work (e.g., writing, design, art)", "Business and management", "Healthcare and helping others"],
//             type: "radio"
//         },
//         {
//             question: "Do you prefer:",
//             options: ["Planning and organizing projects", "Hands-on execution and action", "A mix of both"],
//             type: "radio"
//         },
//         {
//             question: "Would you enjoy a career that involves frequent travel?",
//             options: ["Yes, I love traveling", "Occasionally, but not too much", "No, I prefer a stable location"],
//             type: "radio"
//         },
//         {
//             question: "Do you prefer structured tasks or flexible, open-ended work?",
//             options: ["Structured tasks with clear guidelines", "Flexible tasks with room for creativity", "A mix of both"],
//             type: "radio"
//         },
//         {
//             question: "Do you enjoy helping others and making an impact on people’s lives?",
//             options: ["Yes, that’s my main motivation", "Somewhat, but it’s not my top priority", "No, I prefer working on technical tasks"],
//             type: "radio"
//         },
//         {
//             question: "What industries or fields excite you the most? (Select all that apply)",
//             options: ["Technology and Engineering", "Healthcare and Social Work", "Business and Entrepreneurship", "Arts, Media, and Entertainment", "Education and Research"],
//             type: "checkbox"
//         },
        
//     ];
   
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

//     const handleSubmit = async () => {
//         if (Object.keys(responses).length < questions.length) {
//           alert('Please answer all questions before proceeding.');
//           return;
//         }
        
//         // Store responses in localStorage to pass between components
//         localStorage.setItem('careerTestResponses', JSON.stringify(responses));
        
//         // Navigate to next assessment
//         navigate('Assessment2');
//       };
      

//     return (
        
//         <section className='AllCareerTest'>
//         <div className="career-test-container">
//             <h2 className="title">Career Interest Assessment</h2>
//             <form className="career-test-form">
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
//                  <button type="button" className="btn btn-success" onClick={handleSubmit}>Next <TbPlayerTrackNext /></button>
//             </form>
//         </div>
//         </section>
//     );
   
        
// }

// export default CareerTest;


import  { useState } from 'react';
import './Dashboard_Styles/CareerTest.css'
import { useNavigate } from 'react-router-dom';
import { TbPlayerTrackNext } from "react-icons/tb";
import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext'; 


function CareerTest() {
    const [responses, setResponses] = useState({});
    const navigate = useNavigate(); 

    const [isSubmitting, setIsSubmitting] = useState(false);
     const { authToken } = useContext(AuthContext);
     
     const questions = [
        {
            question: "Which of these subject areas are you most interested in? (Select all that apply)",
            options: [
                "Technology and Computing", 
                "Business and Management", 
                "Mathematics and Statistics", 
                "Language and Communication", 
                "Healthcare and Medicine",
                "Education and Teaching",
                "Religious Studies and Theology"
            ],
            type: "checkbox"
        },
        {
            question: "What type of work environment do you prefer?",
            options: [
                "Technical, working with computers and systems", 
                "Business-oriented, working with data and processes", 
                "Classroom or educational setting", 
                "Hospital or healthcare setting",
                "Community-based, working with diverse groups of people"
            ],
            type: "radio"
        },
        {
            question: "What kind of problems do you enjoy solving?",
            options: [
                "Technical problems with computers and networks", 
                "Business challenges involving money and resources", 
                "Teaching concepts to help others learn", 
                "Caring for people's health and wellness",
                "Religious or philosophical questions"
            ],
            type: "radio"
        },
        {
            question: "Do you prefer working:",
            options: ["Independently on technical tasks", "In business team settings", "With students or learners", "With patients or in healthcare", "A mix of all the above"],
            type: "radio"
        },
        {
            question: "Which skills would you like to use regularly in your career? (Select all that apply)",
            options: [
                "Programming and software development", 
                "Financial analysis and accounting", 
                "Teaching and explaining concepts", 
                "Healthcare and patient care",
                "Network and system administration",
                "Business management and leadership",
                "Language and communication",
                "Religious counseling and guidance"
            ],
            type: "checkbox"
        },
        {
            question: "How comfortable are you with using mathematics in your daily work?",
            options: [
                "Very comfortable - I enjoy mathematical challenges", 
                "Somewhat comfortable with basic to intermediate math", 
                "I prefer minimal mathematical work",
                "I'm more interested in qualitative than quantitative work"
            ],
            type: "radio"
        },
        {
            question: "What kind of impact would you like to make in your career?",
            options: [
                "Creating innovative technology solutions", 
                "Helping businesses succeed financially", 
                "Educating and developing future generations", 
                "Improving people's health and wellbeing",
                "Providing spiritual guidance and support"
            ],
            type: "radio"
        },
        {
            question: "How do you feel about ongoing study and certification throughout your career?",
            options: [
                "I enjoy continuous learning in technology fields", 
                "I'm comfortable with professional business certifications", 
                "I'm interested in educational development", 
                "I'm prepared for extensive medical/healthcare training",
                "I value theological and philosophical study"
            ],
            type: "radio"
        },
        {
            question: "What level of technical computer knowledge are you comfortable with?",
            options: [
                "Advanced - programming, networking, system administration", 
                "Intermediate - business software and data analysis", 
                "Basic - everyday computing and teaching tools", 
                "Minimal - I prefer working directly with people rather than computers"
            ],
            type: "radio"
        },
        {
            question: "Which of these fields excite you most for your future? (Select all that apply)",
            options: [
                "Information Technology and Computing", 
                "Business Administration and Management", 
                "Education and Teaching", 
                "Healthcare and Medicine",
                "Religious Studies and Theology",
                "Languages and Communication",
                "Geography and Environmental Studies",
                "Mathematics and Economics"
            ],
            type: "checkbox"
        },
    ];
   
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

    const handleSubmit = async () => {
        if (Object.keys(responses).length < questions.length) {
          alert('Please answer all questions before proceeding.');
          return;
        }
        
        // Store responses in localStorage to pass between components
        localStorage.setItem('careerTestResponses', JSON.stringify(responses));
        
        // Navigate to next assessment
        navigate('Assessment2');
      };
      

    return (
        
        <section className='AllCareerTest'>
        <div className="career-test-container">
            <h2 className="title">Career Interest Assessment</h2>
            <form className="career-test-form">
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
        </section>
    );
   
        
}

export default CareerTest;
