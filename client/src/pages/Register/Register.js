import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./Register.css";
// import Alert from "../../components/Alert/Alert";

const options = [
  { value: "student", label: "student" },
  { value: "professor", label: "professor" },
];

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState(null);
  const [dob, setDob] = useState("");
  const [university, setUniversity] = useState("");
  const navigate = useNavigate();
  // const [alertMessage, setAlertMessage] = useState("");
  // const [alertType, setAlertType] = useState("");
  // const showAlert = (message, type) => {
  //   setAlertMessage(message);
  //   setAlertType(type);
  // };

  const handleOccupation = (selectedOption) => {
    setOccupation(selectedOption.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      occupation,
      DoB: dob,
      university,
    };
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // showAlert("Registration successful!", "success");
        navigate("/");
      } else {
        // const errorData = await response.json();
        // showAlert(errorData.message, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="align">
      <div className="grid align__item">
        <div className="register">
          <h2>Register</h2>
          {/* {alertMessage !== "" && <Alert message={alertMessage} type={alertType} />} */}
          <form onSubmit={handleSubmit} className="form">
            <div className="form__field">
              <div>Name:</div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form__field">
              <div> Email:</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form__field">
              <div> Password:</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form__field">
              <div> University:</div>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                required
              />
            </div>
            <div className="form__field">
              <div> Date of Birth:</div>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
            <div className="form__field">
              <div> Occupation:</div>
              <Select
                value={
                  occupation ? { value: occupation, label: occupation } : null
                }
                onChange={handleOccupation}
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
};

export default Register;
