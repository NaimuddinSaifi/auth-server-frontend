import { useNavigate } from "react-router-dom";


function ConsentScreen(props) {
    const navigate = useNavigate()

    const handleAllow = () => {
        if (localStorage.getItem('token')) {
            const clientId = new URLSearchParams(location && location.search).get("client_id")
            const state = new URLSearchParams(location && location.search).get("state")
            const redirectUri = new URLSearchParams(location && location.search).get("redirect_uri")

            const url = `${process.env.REACT_APP_SERVER_URL}/api/oauth/code?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`
            window &&
                window.location &&
                window.location.replace(url)
        }
    }

    return (
        <div className="flex-center-all">
            <div className="consent-card">
                <div>
                    <div className="center">
                        The Client App wants to access your Auth Profile
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
