import { useParams } from "react-router-dom";
import "./Examinstructions.css";
import { useState  , useEffect, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Examinstructions = () => {
    const examId = useParams().examId;
    const {user} = useContext(AuthContext);
    const [examins, setexamins ]= useState({});
  useEffect(() => {
    const fetchexamins = async () => {
      const res = await axios.get(`http://localhost:8800/api/exam/${examId}`);
      setexamins(res.data);
    };
    fetchexamins();
  }, [examId]);

    
  return (
    <div className="examinstructions">
       <div className="examinstructionswrapper">
          <h4>Important Instructions for the exam : {examins.name} </h4>
          <ol>
            <li>This is a multiple choice questions based examination</li>
            <li>Number of questions : {examins.noofquestions}</li>
            <li>Test duration : {examins.duration} </li>
            <li>Timer starts as soon as you click the start button</li>
            <li>Test gets automatically submitted as soon as the timer ends</li>
            <li><b>Students are not allowed to switch tabs during the examination</b></li>
          </ol>
          <Link to = {`/examenter/${user._id}`}>
          <button className="insbutton">Back</button>
          </Link>
          <Link to = {`/exam/${examId}`}>
             <button className="insbutton">Start</button>
          </Link>
       </div>
    </div>
  )
}
