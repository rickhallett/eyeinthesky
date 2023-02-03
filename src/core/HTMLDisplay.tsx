import React, { isValidElement } from "react";
import { WeatherData, Display, Observer } from "./WeatherData";

export class HTMLDisplay extends React.Component implements Observer, Display {
  private weatherData: WeatherData;

  constructor(weatherData: WeatherData) {
    super(weatherData);
    this.weatherData = weatherData;
    this.state = { mounted: false, temperature: 0 };
  }

  componentDidMount(): void {
    //TODO: bug -> doesn't set mounted to true, so we never update temp
    this.setState({ mounted: true });
  }

  update(): void {
    console.log({ updateReactState: this.state });
    if (this.state.mounted) {
      this.setState({ temperature: this.weatherData.data.temperature });
      this.display();
    }
  }

  display(): void {
    this.render();
  }

  render(): React.ReactNode {
    console.log({ reactState: this.state });
    return <div>Temperature: {this.state.temperature}</div>;
  }
}
