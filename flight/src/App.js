import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FlightForm from "./components/Flightform";
function App() {
  return (
    <div className="App">
      <h3>Flights</h3>
      <FlightForm />
    </div>
  );
}

export default App;
