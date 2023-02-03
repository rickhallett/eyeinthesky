import React, { isValidElement } from "react";
import { WeatherData, Display, Observer } from "./WeatherData";

export class HTMLDisplay implements Observer, Display {
  private weatherData: WeatherData;
  public reactComponent: any;

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;

    class ReactDisplay extends React.Component<{}, { temperature: number }> {
      constructor(props: any) {
        super(props);
        this.state = { temperature: 0 };
      }

      render(): React.ReactNode {
        console.log({ reactState: this.state });
        return <div>Temperature: {this.state.temperature}</div>;
      }
    }

    this.reactComponent = ReactDisplay;
  }

  update(): void {
    this.reactComponent.setState({
      temperature: this.weatherData.data.temperature,
    });

    this.display();
  }

  display(): void {
    this.reactComponent.render();
  }
}
