import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="navbar-card">
            <div>
                <Link className="links" to="/create-cred"> Create </Link>
                <Link className="links" to="/get-cred"> List </Link>
            </div>
            <div>
                <Link className="links" to="/oauth/authorize">
                    <button className="pd-10" onClick={() => {
                        localStorage && localStorage.clear()
                    }}>
                        LOGOUT
                    </button>
                </Link>

            </div>
        </div>
    );
}

export default Navbar;
