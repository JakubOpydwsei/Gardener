import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<h1>Home page</h1>} />
            <Route path="*" element={<h1>404 - Nie znaleziono strony</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
