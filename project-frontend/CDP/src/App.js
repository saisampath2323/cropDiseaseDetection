// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  // Correct import
import IconsContainer from './pages/IconsContainer';
import TicketView from './pages/TicketView';
import Services from './pages/Services';
import Home from './pages/Home';
import ViewTicket from './pages/ViewTicket';
import About from './pages/About';
import ScientistLogin from './pages/ScientistLogin';
import ContactUs from './pages/ContactUs';
import FarmerLogin from './pages/FarmerLogin';  // Ensure correct import for FarmerLogin
import Header from './pages/Header';
import Footer from './pages/Footer';
import FarmerDashboard from './pages/FarmerDashboard'; // Ensure correct import
import ScientistDashboard from './pages/ScientistDashboard'; // Ensure correct import
import UploadImage from './pages/UploadImage';
import Tickets from './pages/Tickets';
import Vot from './pages/ViewOpenTickets';
import DD from './pages/DiagnoseNewDisease';
import ScientistSignUp from './pages/ScientistSignup'
import FarmerSignup from './pages/FarmerSignup';
import Signup from './pages/Signup';
// Create Layout component for Header/Footer handling
const Layout = ({ children }) => {
  const location = window.location.pathname;
  const hideHeaderFooter = location === '/scientistlogin' || location === '/farmerlogin';

  return (
    <>
      {/* Conditionally render Header and Footer */}
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Default Home route */}
          <Route path="/" element={
            <>
              <Home/>
              <IconsContainer />
              <Services />
              <About />
            </>
          } />
          <Route path="/viewTicket/:scientistId/:Ticket_id/" element={<ViewTicket></ViewTicket>}></Route>
          <Route path="/TicketView/:Ticket_id" element={<TicketView></TicketView>}></Route>
          <Route path="/Su" element={<Signup/>}/>
          <Route path="/FSG" element={<FarmerSignup/>}/>
          <Route path="/SSG" element={<ScientistSignUp/>}/>
          <Route path="/dd" element={<DD />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/vot" element={<Vot />} />
          {/* Scientist Login route */}
          <Route path="/scientistlogin" element={<ScientistLogin />} />  {/* Adjusted path */}
          <Route path="/ui" element={<UploadImage />} /> 
          {/* Contact Us route */}
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/SS" element={<Services />} />
          {/* Farmer Login route */}
          <Route path="/farmerlogin" element={<FarmerLogin />} />
          <Route path="/about" element={<About />} />
          {/* Farmer Dashboard route */}
          <Route path="/fd" element={<FarmerDashboard />} /> {/* Ensure the correct path */}

          {/* Scientist Dashboard route */}
          <Route path="/sd" element={<ScientistDashboard />} />
          <Route path="/tk" element={<Tickets />} />
           {/* Ensure the correct path */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
