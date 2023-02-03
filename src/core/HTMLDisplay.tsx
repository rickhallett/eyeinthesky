import React from "react";
import events from "events";
import { WeatherData, Display, Observer } from "./WeatherData";

export const bridgeOfBullshit = new events.EventEmitter();

export class HTMLDisplay implements Observer, Display {
  private weatherData: WeatherData;
  private data: any;

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;
  }

  update(): void {
    this.data = {
      temperature: this.weatherData.data.temperature,
    };

    this.display();
  }

  display(): void {
    console.log("HTMLDiplay emit");
    bridgeOfBullshit.emit("this-cannot-be-correct", this.data);
  }
}

export class ReactDisplay extends React.Component<{ temperature: number }, {}> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    console.log("ReactDisplay:", this.props.temperature);
    return <div>Temperature: {this.props.temperature}</div>;
  }
}
