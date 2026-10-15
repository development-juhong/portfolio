import { Route, Routes } from 'react-router-dom'

import PortfolioHome from './pages/PortfolioHome'
import SroyioHub from './pages/SroyioHub'
import SroyioDomain from './pages/SroyioDomain'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/sroyio" element={<SroyioHub />} />
      <Route path="/sroyio/:domainId" element={<SroyioDomain />} />
    </Routes>
  )
}

export default App
