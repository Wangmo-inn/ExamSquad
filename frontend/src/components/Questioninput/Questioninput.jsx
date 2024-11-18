import "./Questioninput.css";

export default function Questioninput() {
  return (
    <div className="questioninput">
      <div className="questioninputwrapper">
        <input type="text" placeholder="type your question"  className="question"/>
        <input type="text" placeholder="enter option (a)" className="options"/>
        <input type="text" placeholder="enter option (b)" className="options"/>
        <input type="text" placeholder="enter option (c)"  className="options"/>
        <input type="text" placeholder="enter option (d)"  className="options" />
        <input type="number" placeholder="enter answer option"  className="answer"/>
      </div>
    </div>
  )
}
