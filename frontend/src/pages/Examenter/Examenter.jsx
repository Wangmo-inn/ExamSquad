import { useContext, useRef } from "react";
import "./Examenter.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Examenter() {
  const examId = useRef();
  const Navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const handleExamenter = async (e) => {
    e.preventDefault();
    if(examId.current.value.length !== 24){
      alert("ExamId is of 24 characters")
    }
    else{
      const res = await axios.get(`http://localhost:8800/api/exam/${examId.current.value}`);
      if(res.data){
        const resp = await axios.get(`http://localhost:8800/api/result/exam/${examId.current.value}`);
        console.log(resp.data);

        if(!resp.data){
          console.log(1)
          Navigate(`/examinstructions/${examId.current.value}`);
        }

        else if( resp.data[0].userId !== user._id){
          console.log(resp.data.userId);
          console.log(user._id);
          Navigate(`/examinstructions/${examId.current.value}`);
        } 
        
        else{
          alert("you already gave this test");
        }
      }
      else {
        alert("incorrect examId")
      }
    }
  }

  return (
    <div className='login'>
        <div className='loginwrapper'>
          <div className='loginlogo'>
            <span>Exam center</span>
           </div>
           <div className='loginform'>
            <span className="logintitle"> Enter exam Id </span> 
           <form onSubmit={handleExamenter}>
             <input type="text" placeholder='exam Id' ref={examId} className="logininput" required/>
               <button type='submit' className="loginButton">Enter</button>
           </form>
           </div>
        </div>
    </div>
  )
}
