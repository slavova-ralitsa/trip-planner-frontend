import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../auth/authService";
import axios from "axios"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const res = await login({ email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
  
      const payload = JSON.parse(
        window.atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
      );
  
      const profileRes = await axios.get(`http://localhost:8087/api/users/${payload.userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.setItem("userName", profileRes.data.name || profileRes.data.username || "Traveller");
  
      navigate("/home"); 
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={styles.mainAppTitle}>✈ Trip Planner</h2>
      <div style={styles.loginCard}>
        <h1 style={styles.title}>Log in</h1>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="email"
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.input}
            required
          />
          
          <input 
            type="password"
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          
          <button type="submit" style={styles.button}>Log in</button>
        </form>

        <div style={styles.footer}>
          <span style={styles.footerText}>Don't have an account? </span>
          <Link to="/register" style={styles.link}>Register here</Link>
        </div>

      </div>
    </div>
  </div>

  );
}

const styles = {
  pageBackground: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a7993b66", 
    margin: "-8px", 
    fontFamily: "sans-serif"
  },
  mainAppTitle: {
    fontSize: "42px",
    fontWeight: "bold",
    color: "#7b0325",
    marginBottom: "20px",
    marginTop: "0px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif"
  },
  loginCard: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "360px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "32px",
    color: "#222",
    margin: "0 0 25px 0",
    fontWeight: "bold"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "14px 15px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
    color: "#333"
  },
  button: {
    padding: "14px",
    fontSize: "18px",
    fontWeight: "600",
    backgroundColor: "#7b0325", 
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.2s"
  },
  footer: {
    textAlign: "center",
    marginTop: "20px",
  },
  footerText: {
    color: "#666",
    fontSize: "15px"
  },
  link: {
    color: "#7b0325", 
    fontSize: "15px",
    textDecoration: "none",
    fontWeight: "600"
  }
};