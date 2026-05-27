import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h3>Travel App</h3>

      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/create-trip">Create Trip</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 20px",
    borderBottom: "1px solid #ddd",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
};

export default Navbar;