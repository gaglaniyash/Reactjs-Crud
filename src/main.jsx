import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import Crud from './Component/Crud.jsx'
// import LocalCrud from './Component/LocalCrud.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Counter/> */}
    {/* <Crud /> */}
    {/* <LocalCrud /> */}
  </StrictMode>,
)
