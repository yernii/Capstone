import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Forum from "./pages/Forum/Forum";
import Post from "./pages/Post/Post";
import Home from "./pages/Home/Home";
import Main from "./pages/Main/Main";
import { AuthContext } from "./context/Context";
import "./index.css";
import Summarize from "./pages/Summarize/Summarize";
import ForumPost from "./components/ForumPost/ForumPost";

function App() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("student");
  const [toggleAuth, setToggleAuth] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        email,
        userType,
        setEmail,
        setUserType,
        setToggleAuth,
        toggleAuth,
        userId,
        setUserId,
      }}
    >
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/main" element={<Main />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/summarize" element={<Summarize />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/articles/:id" element={<Post />} />
        <Route path="/forum/:postId" element={<ForumPost />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
