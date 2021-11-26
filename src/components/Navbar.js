import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <Link to="/create-cred"> Create </Link>
            <Link to="/get-cred"> List </Link>
        </div>
    );
}

export default Navbar;
