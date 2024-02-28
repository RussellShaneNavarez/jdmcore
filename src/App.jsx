import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import { Home } from "./components/Home";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Profile from "./components/Profile";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

const App = () => {
  return (
    <Router>
      <FirebaseProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AuthProvider>
      </FirebaseProvider>
    </Router>
  );
};

export default App;
