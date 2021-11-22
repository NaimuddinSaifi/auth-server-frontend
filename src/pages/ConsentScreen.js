import { useNavigate } from "react-router-dom";


function ConsentScreen(props) {
    const navigate = useNavigate()

    const handleAllow = () => {
        console.log('allow')

        if (localStorage.getItem('token')) {
            const client_id = 'client_id123'
            const redirect_uri = 'http://localhost:3000'
            const url = `${process.env.REACT_APP_SERVER_URL}/api/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`
            window && window.location &&
                window.location.replace(url)
        } else {
            navigate('/login')
        }

    }

    return (
        <div className="flex-center-all">
            <div className="consent-card">
                <div>
                    <div className="center">
                        The Client Id wants to access your profile
                    </div>
                    <div className="flex-center">
                        <button className="submit-btn"
                            onClick={handleAllow}>
                            ALLOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConsentScreen;
