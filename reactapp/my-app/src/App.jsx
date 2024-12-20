import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/login/login'
import Register from '../Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      {/* <header className='App-header'>
        <h1>Welcome</h1>
      </header>
      <Login></Login> */}
      <Register></Register>
    </div>
  )
  
      
}

export default App
