import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import Auth from "./components/Auth";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Auth />
    </GoogleOAuthProvider>
  );
}

export default App;
