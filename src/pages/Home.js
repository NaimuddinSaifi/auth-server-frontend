import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
    const navigate = useNavigate()
    useEffect(() => {
        const userToken = localStorage && localStorage.getItem('user_token')
        if (!userToken) {
            navigate('/oauth/authorize')
        }
    }, [])
    return (
        <div>
            <Navbar />
            <h2 className="text-center">  WELCOME AUTH SERVER </h2>
        </div>
    );
}

export default Home;
