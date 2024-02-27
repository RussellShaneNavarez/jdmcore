import { AuthProvider } from "./providers/AuthProvider";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import { Home } from "./components/Home";

const App = () => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </FirebaseProvider>
  );
};

export default App;
