import React, { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState("rahul")
    const [bool, setBool] = useState(true)
    const [arr, setArr] = useState([1, 23, 56, 64, 90])
    const [obj, setObj] = useState({"sub" : "Maths"})
    const increment = () => {
        setCount(count + 1)
    }
    const decrement = () => {
        setCount(count - 1)
    }
    const reset = () => {
        setCount(0)
    }
  return (
    <div>
      <h4>Counter</h4>
      <h6>{count}</h6>
      <button className='btn btn-primary' onClick={increment}>+</button>
      <button className='btn btn-danger mx-1' onClick={decrement}>-</button>
      <button className='btn btn-warning mx-1' onClick={reset}>reset</button>
      <h5>{}</h5>
    </div>
  )
}
