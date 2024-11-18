import "./Result.css";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Resultstudent = ({userData}) => {
  const [ Resultstudent , setResultstudent] = useState([]);
  console.log(userData);
  useEffect(() => {
    const fetchResultstudent= async () =>{
      const res = await axios.get(`http://localhost:8800/api/result/user/${userData._id}`);
      setResultstudent(res.data);
    }
    fetchResultstudent();
    }, [userData]);

    var i = 0;
    const listItems = Resultstudent.map(
    (Resultstudent) => {return (
              <tr>
                  <td>{++i}</td>
                  <td>{Resultstudent.examId}</td>
                  <td>{Resultstudent.examname} </td>
                  <td>{Resultstudent.score}</td> 
              </tr>
          )
      }
  )
  
  return (
    <div className="resultstudent">
    <div className="resultstudentwrapper">
    <Table responsive>
    <thead className="heading">
        <tr>
          <th>S.no</th>
          <th>Exam Id</th>
          <th>Exam name</th>
          <th>Marks</th>
        </tr>
    </thead>
      <tbody>
     {listItems}
      </tbody>
    </Table>
    </div>
    </div>
  )
}

export const Resultexam = ({examId}) => {
  const [ Resultexam , setResultexam] = useState([]);
  useEffect(() => {
    const fetchResultstudent= async () =>{
      const res = await axios.get(`http://localhost:8800/api/result/exam/${examId}`);
      setResultexam(res.data);
      console.log(Resultexam);
    }
    fetchResultstudent();
    }, [examId]);

    var i = 0;
    const listItems = Resultexam.map(
    (Re) => {return (
              <tr>
                  <td>{++i}</td>
                  <td>{Re.userId}</td>
                  <td>{Re.username} </td>
                  <td>{Re.score}</td> 
              </tr>
          )
      }
  )
  


    return (
      <div className="resultstudent">
      <div className="resultstudentwrapper">
      <Table responsive>
      <thead className="heading">
          <tr>
            <th>S.no</th>
            <th>user Id</th>
            <th>username</th>
            <th>Marks</th>
          </tr>
      </thead>
        <tbody>
         {listItems}
        </tbody>
      </Table>
      </div>
      </div>
    )
  }
