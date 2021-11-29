import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Cred(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const [appName, setappName] = useState('')
    const [domainUrl, setdomainUrl] = useState('')
    const [callbackUrl, setcallbackUrl] = useState('')

    const handleSubmit = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/client`
        const data = { appName, redirectUris: `${domainUrl},${callbackUrl}` }
        const config = { headers: { authorization: localStorage.getItem('user_token') } }
        console.log(url, data, config)
        axios.post(url, data, config)
            .then(res => {
                console.log(res)
                if (res && res.data && res.data.code === 200) {
                    navigate('/get-cred')
                }
                if (res && res.data && res.data.code === 404) {
                    toast(res.data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (<>
        <Navbar />
        <div className="card">
            <div className="shadow">
                <input value={appName}
                    placeholder="App Name"
                    onChange={(e) => setappName(e.target.value)}
                    type="text" className="login-input" />
                <br />
                <input value={domainUrl}
                    placeholder="Domain url"
                    onChange={(e) => setdomainUrl(e.target.value)}
                    type="text" className="login-input" />
                <br />
                <input value={callbackUrl}
                    placeholder="Callback url"
                    onChange={(e) => setcallbackUrl(e.target.value)}
                    type="text" className="login-input" />
                <br />
                <div className="flex-center">
                    <button className="submit-btn"
                        onClick={handleSubmit}>
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    </>);
}

export default Cred;
