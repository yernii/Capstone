import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import "./Navbar.css";

function Navbar() {
  const { toggleAuth } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/main" className="navbar-link">
            Main
          </Link>
        </li>
        {toggleAuth && (
          <>
            <li className="navbar-item">
              <Link to="/forum" className="navbar-link">
                Forum
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/profile" className="navbar-link">
                Profile
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/summarize" className="navbar-link">
                Summarize
              </Link>
            </li>
          </>
        )}
        {!toggleAuth && (
          <>
            {" "}
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
