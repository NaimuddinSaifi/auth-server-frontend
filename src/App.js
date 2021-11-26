import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAuthServer from './pages/LoginAuthServer';
import ConsentScreen from './pages/ConsentScreen';
import CreateCred from './pages/CreateCred';
import GetCred from './pages/GetCred';
import EditCred from './pages/EditCred';
import SignupAuthServer from './pages/SignupAuthServer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (<>
    <ToastContainer />
    <Router>
      <Routes>
        <Route exact path="/oauth/authorize" element={<LoginAuthServer />} />
        <Route exact path="/oauth/register" element={<SignupAuthServer />} />
        <Route exact path="/oauth/consent" element={<ConsentScreen />} />

        <Route exact path="/create-cred" element={<CreateCred />} />
        <Route exact path="/get-cred" element={<GetCred />} />
        <Route exact path="/edit-cred/:client_id" element={<EditCred />} />
      </Routes>
    </Router>
  </>);
}

export default App;
