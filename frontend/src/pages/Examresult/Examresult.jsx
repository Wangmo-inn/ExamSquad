import "./Examresult.css";
import { Resultexam } from "../../components/Result/Result";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../components/Topbar/Topbaradmin";
export const Examresult = () => {
  const examId = useParams().examId;
  return (
    <div>
        <AdminNavbar/>
        <Resultexam examId = {examId}/>
    </div>
  )
}
