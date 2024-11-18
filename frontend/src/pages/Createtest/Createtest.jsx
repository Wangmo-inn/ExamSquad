import "./Createtest.css";
import {useRef, useState} from 'react';
import Questioninput from "../../components/Questioninput/Questioninput";
import AdminNavbar from "../../components/Topbar/Topbaradmin";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export  default function Createtest () {

    const adminId = useParams().adminId; 
    const examname = useRef();
    const noofquestions = useRef();
    const duration = useRef();
    const [questions , setquestions] = useState(0);
    const Navigate = useNavigate();

    const questionPaperdetails = async (e) => {
        e.preventDefault();
        const questions = [];
        var j =0;
        for(let i = 3 ; i<e.target.length-1 ; i = i+6){
          const question = e.target[i].value;
          const options = [];
          options[0] = e.target[i+1].value;
          options[1] = e.target[i+2].value;
          options[2] = e.target[i+3].value;
          options[3] = e.target[i+4].value;
          const answer = e.target[i+5].value;
          questions[j] = {answer , options , question};
          j++;
        }
        
        const questionpaper = {
          adminId : adminId,
          name : examname.current.value,
          duration : duration.current.value,
          noofquestions : noofquestions.current.value,
          questions : questions
        }
        await axios.post("http://localhost:8800/api/exam/newexam", questionpaper);
        alert("paper successfully created");
        
    }
  return (
    <>
    <AdminNavbar/>
    <div className="createtest">
      <div className="createtestwrapper">
      <span className="title">New question paper</span>
        <form onSubmit={questionPaperdetails}>
        <div className="questionpaperdetails">
            <input type="text" placeholder="enter your exam name" ref = {examname} /> 
            <input type="number" placeholder="number of questions" ref = {noofquestions}
             onChange={(e) => setquestions(e.target.value)}/> 
            <input type="number" placeholder="duration (in minutes)" ref = {duration} /> 
        </div>
            <div className="questionpaper">
            {Array.from({length: questions}, (_, index) => {return <Questioninput key={index} />;})}
            </div>
            <button type="submit" className="submitbutton">Submit</button>
        </form>
    </div>
   </div>
    </>
  )
}
