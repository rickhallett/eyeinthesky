import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { WeatherStation } from "./core/WeatherStation";
import { bridgeOfBullshit, ReactDisplay } from "./core/HTMLDisplay";

const weatherStation = new WeatherStation();

setInterval(() => weatherStation.broadcast(), 5000);

function App() {
  const [count, setCount] = useState(0);
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    if (!bridgeOfBullshit.eventNames().includes("this-cannot-be-correct")) {
      // prevent re-renders adding duplicate listeners
      bridgeOfBullshit.on("this-cannot-be-correct", (data) =>
        setTemperature(data.temperature)
      );
    }
  }, []);

  return (
    <div className="App">
      <ReactDisplay temperature={temperature} />
    </div>
  );
}

export default App;

/**
 * WTF is going on?
 * 1) This might be a difficulty of mixing traditional OOP broadcast Observer pattern into
 *    React's one way data flow architecture; React is meant to handle events internally
 * 2) Not using the EventEmitter means that
 *      a) the Observer must extend React.Component, but then it has already been initialised
 *         by WeatherStation by the time we come around to App.render(). React has to control
 *         component initialisation in order to have awareness of the component state
 *      b) as we have effectively encapsulated the Observer.update() method, there is no way to
 *         let React know this method has been called.
 * 3) I don't know what I am doing
 */
