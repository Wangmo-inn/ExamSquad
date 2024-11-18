import {  useState , useEffect} from "react";
import "./Examtable.css";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

export const Examtable = () => {
  const adminId = useParams().adminId
  const [Examtable , setExamtableData] = useState([]);
  useEffect(() => {
    const fetchExamtable = async () =>{
      const res = await axios.get(`http://localhost:8800/api/exam/admin/${adminId}`);
      setExamtableData(res.data);
      console.log(Examtable);
    }
    fetchExamtable();
    }, []);
    var i = 0;
    const listItems = Examtable.map(
      (Et) => {
          return (
              <tr>
                  <td>{++i}</td>
                  <td>{Et._id}</td>
                  <td>{Et.name}</td>
                  <td>{Et.duration}</td>
                  <td>
                  <Link to = {`/examresult/${Et._id}`}>
                      Click here
                    </Link>
                  </td>   
              </tr>
          )
      }
  )
    
  return (
    <div className="examtable">
    <div className="examtablewrapper">
    <Table responsive>
    <thead className="heading">
        <tr>
          <th>S.no</th>
          <th>Exam Id</th>
          <th>Exam name</th>
          <th>Duration(in minutes)</th>
          <th>Results</th>
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
