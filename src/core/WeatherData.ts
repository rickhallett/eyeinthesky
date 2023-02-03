export interface Observer {
  update: () => void;
}

export interface Display {
  display: () => void;
}

interface Subject {
  registerObserver: (observer: Observer) => void;
  updateObservers: () => void;
  setWeatherData: (temp: number, airPressure: number) => void;
}

export class WeatherData implements Subject {
  private observers: Observer[];
  private temp: number;
  private airPressure: number;

  constructor() {
    this.observers = new Array<Observer>();
    this.temp = 0;
    this.airPressure = 0;
  }

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  updateObservers(): void {
    for (const observer of this.observers) {
      observer.update();
    }
  }

  setWeatherData(temp: number, airPressure: number): void {
    this.temp = temp;
    this.airPressure = airPressure;

    this.updateObservers();
  }

  get temperature() {
    return this.temp;
  }

  get pressure() {
    return this.airPressure;
  }
}
