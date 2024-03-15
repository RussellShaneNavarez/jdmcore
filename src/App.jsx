import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import { Home } from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Cars from "./pages/Cars";
import CarForm from "./pages/CarForm";
import Details from "./pages/Details";
import Account from "./pages/Account";

const App = () => {
  return (
    <Router>
      <FirebaseProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/account" element={<Account />} />
            <Route path="/carformonlyadmin" element={<CarForm />} />
            <Route path="/details/:objectId" element={<Details />} />
          </Routes>
        </AuthProvider>
      </FirebaseProvider>
    </Router>
  );
};

export default App;
