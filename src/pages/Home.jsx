import { useState, useEffect } from "react";
import { getAllTrips } from "../api/tripApi"; 
import TripCard from "../components/TripCard";

export default function HomePage() {
  const [trips, setTrips] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getAllTrips();
        setTrips(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching trips:", err);
        setError("Failed to load trips. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []); 

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>⏳ Loading trips...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        <h2>Something went wrong!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Trips </h1>
      
      {trips.length === 0 ? (
        <p>No trips found. Create your first one!</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}