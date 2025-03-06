import React, { useState } from 'react'

export default function Crud() {
    const [num1, setNum1] = useState("")
    const [num2, setNum2] = useState("")
    const [result, setResult] = useState("")

    const [name, setName] = useState("")
    const [record, setRecord] = useState([])

    const handleSubmit = () => {
        setRecord([...record, name])
        setName("")
    }
    // const handleClick = () => {

    // }

  return (
    <div>
        <h2>Crud</h2>
        <input type="number" onChange={(e) => setNum1(e.target.value)} />
        <input type="number" onChange={(e) => setNum2(e.target.value)} />
        <button onClick={(e) => setResult(Number(num1) + Number(num2))} className='btn btn-primary mx-1'>+</button>
        <button onClick={(e) => setResult(Number(num1) - Number(num2))} className='btn btn-secondary'>-</button>
        <button onClick={(e) => setResult(Number(num1) * Number(num2))} className='btn btn-dark mx-1'>*</button>
        <button onClick={(e) => setResult(Number(num1) / Number(num2))} className='btn btn-warning mx-1'>/</button>
        <h3>{result}</h3>
        {/* <h2>crud</h2> */}
        <input type="text" placeholder='Enter your name...' value={name} onChange={(e) => setName(e.target.value)}/>
        <button onClick={handleSubmit}>Submit</button>

        {
            record.map((e, i) => {
                return <h2>{i + 1} - {e}</h2>
            })
        }
    </div>
  )
}
