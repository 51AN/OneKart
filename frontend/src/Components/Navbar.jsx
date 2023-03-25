import React from 'react';
import {Link} from 'react-router-dom';

function Navbar({user, logout}) {
  return (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            {user ? (
                <>
                    <li><Link>{user}</Link></li>
                    <li onClick={logout}><Link>Logout</Link></li>
                </>
            ):(
                <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </>
            )}

        </ul>
    </nav>
  )
}

export default Navbar