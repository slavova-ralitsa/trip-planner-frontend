export default function TripCard({ trip }) {

    const destinationsCount = trip.tripDestinations ? trip.tripDestinations.length : 0;

  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", margin: "10px", borderRadius: "8px", minWidth: "250px" }}>
      
      <h3 style={{ marginTop: 0, color: "#2c3e50" }}>{trip.name}</h3> 
      
      <p><strong> Dates:</strong> {trip.startDate} - {trip.endDate}</p>
      
    
      <p><strong> Destinations:</strong> {destinationsCount}</p>
 
      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button style={{ cursor: "pointer" }}>Show</button>
        <button style={{ cursor: "pointer" }}>Edit</button>
        <button style={{ cursor: "pointer", color: "red" }}>Delete</button>
      </div>

    </div>
  );
}