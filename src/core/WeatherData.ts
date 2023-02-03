export interface Observer {
  update: () => void;
}

export interface Display {
  display: () => void;
}

interface Subject {
  registerObserver: (observer: Observer) => void;
  updateObservers: () => void;
  setWeatherData: (
    temperature: number,
    windDirection: number,
    windSpeed: number
  ) => void;
}

export class WeatherData implements Subject {
  private observers: Observer[];
  private temp: number;
  private windDirection: number;
  private windSpeed: number;

  constructor() {
    this.observers = new Array<Observer>();
    this.temp = 0;
    this.windDirection = 0;
    this.windSpeed = 0;
  }

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  updateObservers(): void {
    for (const observer of this.observers) {
      observer.update();
    }
  }

  setWeatherData(
    temperature: number,
    windDirection: number,
    windSpeed: number
  ): void {
    this.temp = temperature;
    this.windDirection = windDirection;
    this.windSpeed = windSpeed;

    this.updateObservers();
  }

  get data() {
    return {
      temperature: this.temp,
      windDirection: this.windDirection,
      windSpeed: this.windSpeed,
    };
  }
}
