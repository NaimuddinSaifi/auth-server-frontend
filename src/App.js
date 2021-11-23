import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAuthServer from './pages/LoginAuthServer';
import ConsentScreen from './pages/ConsentScreen';
import Cred from './pages/Cred';
import GetCred from './pages/GetCred';
import SignupAuthServer from './pages/SignupAuthServer';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/oauth/authorize" element={<LoginAuthServer />} />
        <Route exact path="/oauth/register" element={<SignupAuthServer />} />
        <Route exact path="/consent" element={<ConsentScreen />} />
        
        <Route exact path="/cred" element={<Cred />} />
        <Route exact path="/get-cred" element={<GetCred />} />
      </Routes>
    </Router>
  );
}

export default App;
