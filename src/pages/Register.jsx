import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
//import { register } from "../auth/authService";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); 
    
    if (password !== confirmPassword) {
      alert("Паролите не съвпадат!");
      return;
    }

    try {
      //const res = await register({ email, password });
      
      console.log("Registration successful!");
      
      navigate("/login"); 
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.loginCard}>
        <h1 style={styles.title}>Register</h1>
        
        <form onSubmit={handleRegister} style={styles.form}>
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

          <input 
            type="password"
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />
          
          <button type="submit" style={styles.button}>Register</button>
        </form>

        <div style={styles.footer}>
          <span style={styles.footerText}>Already have an account? </span>
          <Link to="/login" style={styles.link}>Log in here</Link>
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