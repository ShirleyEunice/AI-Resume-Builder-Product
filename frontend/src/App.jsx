import { useState } from 'react'
import MyResumes from './pages/MyResumes'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateResume from './pages/CreateResume';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MyResumes />} />
      <Route path='/create' element={<CreateResume />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
