import { ConsoleDisplay } from "./ConsoleDisplay";
import { WeatherData, Observer } from "./WeatherData";

export class WeatherStation {
  private weatherData: WeatherData;
  private displays: Observer[];

  constructor() {
    this.weatherData = new WeatherData();
    this.displays = [new ConsoleDisplay(this.weatherData)];
    this.registerDisplays();
    this.broadcast();
  }

  registerDisplays() {
    for (const display of this.displays) {
      this.weatherData.registerObserver(display);
    }
  }

  broadcast() {
    this.weatherData.setWeatherData(29, 1029);
    this.weatherData.setWeatherData(30, 1030);
    this.weatherData.setWeatherData(31, 1031);
  }
}
