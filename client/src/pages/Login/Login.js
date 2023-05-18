import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./Login";

const options = [
  { value: "student", label: "student" },
  { value: "professor", label: "professor" },
];
function Login() {
  const [password, setPassword] = useState("");
  const { email, setEmail, userType, setUserType, setToggleAuth, setUserId } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUserTypeChange = (selectedOption) => {
    setUserType(selectedOption);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { id } = await response.json();
        setUserId(id);
        setToggleAuth(true);
        navigate("/");
      } else {
        // Handle error notification
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="align">
      <div className="grid align__item">
        <div className="register">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form__field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form__field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form__field">
              <label>
                User Type:
                {/* <select value={userType} onChange={handleUserTypeChange}>
                  <option value="student">Student</option>
                  <option value="professor">Professor</option>
                </select> */}
              </label>
              <Select
                value={userType}
                onChange={handleUserTypeChange}
                options={options}
              />
            </div>
            <button className="RegisterBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
