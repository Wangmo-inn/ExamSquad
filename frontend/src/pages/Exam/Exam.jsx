import "./Exam.css";
import { useState , useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { usePageVisibility } from "../../Pagevisibility";

export default function Exam() {
    
    const examId = useParams().examId;
    const {user} = useContext(AuthContext);
    const Navigate = useNavigate();
    const [exam, setexam ]= useState([]);
    const [counter, setCounter] = useState(1);
    const [completed , setcompleted] = useState(false);

    useEffect(() => {
       const fetchexam = async () => {
      const res = await axios.get(`http://localhost:8800/api/exam/${examId}`);
      setexam(res.data);
      setCounter(res.data.duration*60);
    };
    fetchexam();
  }, [examId]);

  //calculate result
  const handleResult = async (e) =>{
      e.preventDefault();   
    var result = 0;
     var k = 0;
     for(let i = 0 ; i<e.target.length -1 ; i= i+4){
         for( let j = 0 ; j<4 ; j++){
             if(e.target[i+j].checked) {
                  if(exam.questions[k].answer === j+1) {
                    result++;
                  }
                }
            }
            k++;
        }
        
        const resultsave = {
             examId : exam._id,
             examname : exam.name,
             userId : user._id,
             username : user.username,
             score : result
          }
          await axios.post("http://localhost:8800/api/result/newresult", resultsave);
          alert('Result saved successfully');
          Navigate(`/userprofile/${user._id}`);
}

    useEffect(() =>{
        if(counter > 0){
            setTimeout(()=>setCounter(counter - 1), 1000);
        }
        if(counter==0){
             //setcompleted(true); 

        }
    },[counter]);

    const formatTime = (counter) => {
        const minutes = Math.floor(counter / 60).toString();
        const seconds = (counter % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      };
      
      useEffect(() => {
        const unloadCallback = (event) => {
          event.preventDefault();
          event.returnValue = "";
          return "";
        };
      
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
      }, []);

      
      const isVisible = usePageVisibility();
      useEffect(()=>{
          if(!isVisible) {
              setcompleted(true); 

          }
	}, [isVisible])

 
    return ( 
        <div className = "exam" >
        <div className="left">
            <div className="timer">
            <div className="timer-head"> Time-left : </div>
           <div className='timerwrapper'>{formatTime(counter)}
            </div>
        </div>
        </div>
        <div className="right">
            <h3 className="examtitle">{exam.name}</h3>
            <form onSubmit={handleResult} >
            <div className="examcompleted" style={{display: completed ? 'block' : 'none' }}>
             Either time completed or you switched your tab please submit your exam
            </div>
            <div className="questions" style={{display: completed ? 'none' : 'block' }}>
            <div className="questioncard">
            {exam.questions?.map((q) => (    
                <div className="questioncardwrapper">
                        <h4 className="questionname">{q.question}</h4> 
                        <input type="checkbox" name="option1" className="option" /> <label htmlFor="user">{q.options[0]}</label> <br/>
                        <input type="checkbox" name="option2"  className="option"/> <label htmlFor="user">{q.options[1]}</label> <br/>
                        <input type="checkbox" name="option3" className="option" /> <label htmlFor="user">{q.options[2]}</label> <br/>
                        <input type="checkbox" name="option4" className="option" /> <label htmlFor="user">{q.options[3]}</label> <br/>
                </div>
            ))}
            </div>
            </div>
            <button className="next" type="submit" >Submit test</button>
            </form>
        </div>
        </div>
    );  
}
