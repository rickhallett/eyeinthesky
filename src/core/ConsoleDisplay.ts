import { WeatherData, Display, Observer } from "./WeatherData";

export class ConsoleDisplay implements Observer, Display {
  private weatherData: WeatherData;
  public temp: number;
  public pressure: number;

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;
    this.temp = 0;
    this.pressure = 0;
  }

  update() {
    this.temp = this.weatherData.temperature;
    this.pressure = this.weatherData.pressure;
    this.display();
  }

  display() {
    console.log(`The temperature is: ${this.temp}C`);
    console.log(`The air pressure is: ${this.pressure} bar`);
  }
}
