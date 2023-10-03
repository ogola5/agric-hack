import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import Claims from './pages/Claims'
import Orders from './pages/Orders'
import Home from './pages/Home'

function App() {
  return (
    <>
    
      <Router>
       <Header />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/claims' element={<Claims />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
