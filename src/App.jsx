import './App.css'
import Home from './components/Home'
import ViewPassword from './components/ViewPassword'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:uid" element={<ViewPassword />} />
      </Routes>
    </Router>
    <ToastContainer/>
    </>

  )
}

export default App