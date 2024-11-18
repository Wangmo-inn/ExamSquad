import React from 'react'

export const Questioncard = ({q}) => {
  return (
    <div>
          <div className="questioncard wrapper">
                    <h4 className="questionname">{q.question}</h4> 
                    <input type="radio"  name='option' className="option" required /> <label htmlFor="user">{q.options[0]}</label> <br/>
                    <input type="radio"  name='option' className="option"required /> <label htmlFor="user">option2</label> <br/>
                    <input type="radio"  name='option' className="option" required /> <label htmlFor="user">option2</label> <br/>
                    <input type="radio"  name='option'  className="option" required /> <label htmlFor="user">option4</label> <br/>
            </div>
    </div>
  )
}
