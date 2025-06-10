import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Schemes from './pages/Schemes';
import SchemeDetailsPage from './pages/SchemeDetailsPage';
import Profile from './pages/Profile';
import NGO from './pages/NGO';
import Admin from './pages/Admin';
import Support from './pages/Support';
import BotLogo from './components/BotLogo';
import Banner from './components/Banner';
import ProfileForm from './components/ProfileForm';

function AppContent() {
  const location = useLocation();

  // Get current path for analytics/UI logic
  const currentPage = location.pathname;

  // Mock user data (replace with real logic later)
  const [userData, setUserData] = useState({
    name: 'Aman',
    age: 21,
    state: 'Uttar Pradesh',
    gender: 'Male',
    income: '200000'
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/scheme/:id" element={<SchemeDetailsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ngo" element={<NGO />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/support" element={<Support />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/profileform" element={<ProfileForm />} />
          

        </Routes>
      </main>
      <BotLogo currentPage={currentPage} userData={userData} />
      <Footer />
    </div>
  );
}

// Final App wrapped with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
