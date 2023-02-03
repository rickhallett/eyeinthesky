interface Observer {
  update: () => void;
}

interface Display {
  display: () => void;
}

interface Subject {
  registerObserver: (observer: Observer) => void;
  updateObservers: () => void;
  setWeatherData: (temp: number, airPressure: number) => void;
}

export class WeatherData implements Subject {
  private observers: Observer[] = new Array<Observer>();
  private temp: number = 0;
  private airPressure: number = 0;

  constructor() {}

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  updateObservers = (): void => {
    for (const observer of this.observers) {
      observer.update();
    }
  };

  setWeatherData(temp: number, airPressure: number): void {
    this.temp = temp;
    this.airPressure = airPressure;
  }
}
