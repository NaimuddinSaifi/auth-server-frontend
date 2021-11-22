import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Cred(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const [redirectUri, setredirectUri] = useState('')
    const [appName, setappName] = useState('')

    const handleSubmit = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/create-cred`
        const data = { appName, redirectUri }
        console.log(url, data)
        axios.post(url, data)
            .then(res => {
                console.log(res)
                if (res && res.data) {
                    navigate('/get-cred')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="card">
            <div>
                <input value={appName}
                    placeholder="App Name"
                    onChange={(e) => setappName(e.target.value)}
                    type="text" className="login-input" />
                <br />
                <input value={redirectUri}
                    placeholder="Redirect Uri"
                    onChange={(e) => setredirectUri(e.target.value)}
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
    );
}

export default Cred;
