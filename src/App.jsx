import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import Weatherdynamic from "./components/Weatherdynamic";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((prev) => !prev);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <Weatherdynamic />
      <h1>Weather Conditions in Major Cities:</h1>
      <div className="famousCities">
        <Weather key={refresh + "London"} city="London" />
        <Weather key={refresh + "NewYork"} city="New York" />
        <Weather key={refresh + "NewDelhi"} city="New Delhi" />
        <Weather key={refresh + "Tokyo"} city="Tokyo" />
      </div>
    </div>
  );
};

export default App;
