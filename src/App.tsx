import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TripPlanner from './components/TripPlanner';
import FeaturedDestinations from './components/FeaturedDestinations';
import AIPlanner from './components/AIPlanner';
import HotelBooking from './components/HotelBooking';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {activeSection === 'home' && (
        <>
          <Hero setActiveSection={setActiveSection} />
          <TripPlanner />
          <FeaturedDestinations />
        </>
      )}
      
      {activeSection === 'ai-planner' && <AIPlanner />}
      {activeSection === 'hotels' && <HotelBooking />}
      {activeSection === 'destinations' && <FeaturedDestinations />}
      {activeSection === 'login' && <Login setActiveSection={setActiveSection} />}
      {activeSection === 'signup' && <SignUp setActiveSection={setActiveSection} />}
    </div>
  );
}

export default App;