import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './component/header/Header'
import Home from './pages/Home';
import Contacts from './component/contacts/Contacts';
import AllProject from './component/allproject/AllProject';
import Footer from './component/footer/Footer';
import AboutUs from './pages/aboutUs/AboutUs';
import Vacancies from './component/Vacancies/Vacancies';
import ScrollToTop from './ScrollTop';
import Events from './component/events/Events';
import Detail from './component/services_details/ServicesDetails';
import RevievsList from './component/revievsList/RevievsList';

function App() {

  return (
    <>
      <Router>
        <Header/>
        <ScrollToTop/>
        <Routes>
          <Route>
            <Route path="/" element={<Home/>} /> 
            <Route path="/contacts" element={<Contacts/>}/>
            <Route path="/projects" element={<AllProject/>}/>
            <Route path="/about" element={<AboutUs/>} /> 
            <Route path="/reviews" element={<RevievsList/>} />
            <Route path="/Vacancies" element={<Vacancies/>} /> 
            <Route path="/meropreyatiya" element={<Events/>} /> 
            <Route path="/Service/:slug" element={<Detail/>} /> 
          </Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
