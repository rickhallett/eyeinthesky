import { WeatherData, Display, Observer } from "./WeatherData";

export class ConsoleDisplay implements Observer, Display {
  private weatherData: WeatherData;
  public data: {};

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;
    this.data = {};
  }

  update() {
    this.data = this.weatherData.data;
    this.display();
  }

  display() {
    console.log({ weatherData: this.data });
  }
}
