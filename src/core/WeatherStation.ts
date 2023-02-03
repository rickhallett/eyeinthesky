import { ConsoleDisplay } from "./ConsoleDisplay";
import { HTMLDisplay } from "./HTMLDisplay";
import { WeatherData, Observer } from "./WeatherData";

const apiUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=50.83&longitude=-0.14&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum&current_weather=true&windspeed_unit=mph&timezone=auto&past_days=2";

export class WeatherStation {
  public weatherData: WeatherData;
  private displays: Observer[];

  constructor() {
    this.weatherData = new WeatherData();
    this.displays = [
      new ConsoleDisplay(this.weatherData),
      new HTMLDisplay(this.weatherData),
    ];

    this.registerDisplays();
    this.broadcast();
  }

  registerDisplays(): void {
    for (const display of this.displays) {
      this.weatherData.registerObserver(display);
    }
  }

  async broadcast(): Promise<void> {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const {
      current_weather: {
        temperature,
        time,
        weathercode,
        winddirection,
        windspeed,
      },
    } = data;

    this.weatherData.setWeatherData(temperature, winddirection, windspeed);
  }
}
