import React, { useState } from 'react'

function UseStates() {
    // Multiple Line of Code 
    // const number = useState(0);
    // const counter = number[0];
    // const setCounter = number[1]
    // or Destruction array method 
    // const [FirstVriable, FirstFunction]
    const [counter, setCounter] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [name, setName] = useState('You')

    function increaseCounterNUmber() {
        setCounter(counter + 1);
    }
    function increaseInputCounterNUmber() {
        setCounter2(counter2 + 1);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className='Hooks'>
                        <h6>UseStates : {counter} </h6>
                        <button onClick={increaseCounterNUmber} >Increase</button>
                        <p className="SmallNotes">
                            UseState is a Function to add States in  Functional Components
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className='Hooks'>
                        <h6>{name} has clicked  {counter2}  times!</h6>
                        <input type="text" onChange={e => setName(e.target.value)} placeholder='Enter your name here' />
                        <button onClick={increaseInputCounterNUmber} >Increase</button>
                        <p className="SmallNotes">
                            UseState with input Text (onChange)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UseStates;