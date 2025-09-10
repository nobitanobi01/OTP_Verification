import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifyOtp from './components/VerifyOtp';
import Requestotp from './components/Requestotp';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Requestotp/>} />
        <Route path="/verify" element={<VerifyOtp/>} />
      </Routes>
    </Router>
  );
}

export default App;
