import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Auth() {
  const api = import.meta.env.VITE_API_URL;
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(`${api}/api/auth/google-login`, {
        token: credentialResponse.credential,
      });

      const userData = response.data.user;
      console.log("Login successful:", userData);

      // Uncomment and modify the dispatch call if using a context or Redux
      // dispatch({ type: "LOGIN_SUCCESS", payload: userData });
    } catch (error) {
      console.error("Google login error:", error);

      // Uncomment and modify error handling logic as needed
      // dispatch({ type: "LOGIN_FAILURE" });
      // setError("Google Login Failed.");
    }
  };

  return (
    <div>
      OAuth App
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.error("Google Login failed.")}
        useOneTap
      />
    </div>
  );
}
