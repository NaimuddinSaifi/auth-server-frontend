import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify"

function ConsentScreen(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const [appName, setappName] = useState('Client App')
    const clientId = new URLSearchParams(location && location.search).get("client_id")
    const state = new URLSearchParams(location && location.search).get("state")
    const redirectUri = new URLSearchParams(location && location.search).get("redirect_uri")

    const handleAllow = () => {
        if (localStorage.getItem('user_token')) {

            const url = `${process.env.REACT_APP_SERVER_URL}/api/oauth/code?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`
            const config = {
                headers: { Authorization: localStorage.getItem('user_token') }
            };
            axios.get(url, config)
                .then(res => {
                    console.log(res)
                    if (res && res.data && res.data.code === 200) {
                        window && window.location && window.location.replace(res.data.data.url)
                    }
                    if (res && res.data && res.data.code === 403) {
                        toast('Unauthorized.')
                    }
                    if (res && res.data && res.data.code === 500) {
                        toast('Internal Server Error.')
                    }
                })
                .catch(err => {
                    console.log(err)
                    toast('Something Went Wrong.')
                })
        }
    }

    return (
        <div className="flex-center-all">
            <div className="consent-card">
                <div>
                    <div className="message">
                        <div className="center">
                            {appName} wants to access your AUTH profile
                        </div>
                    </div>
                    <div className="user">
                        <div className="user-img">  {localStorage && localStorage.getItem('user_id') && localStorage.getItem('user_id').charAt(0).toUpperCase()} </div>
                        <div className="user-name">   {localStorage && localStorage.getItem('user_id')} </div>

                    </div>

                    <div className="flex-center">
                        <button className="submit-btn"
                            onClick={handleAllow}>
                            Authorize App
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConsentScreen;
