export interface Item {
  time: string;
  time_local: string;
  temperature: number;
  dewpoint: number;
  humidity: number;
  precipitation: number;
  precipitation_3: number;
  precipitation_6: number;
  snowdepth: number;
  windspeed: number;
  peakgust: number;
  winddirection: number;
  pressure: number;
  condition: number;
}

export interface Items {
  items: Item[];
}