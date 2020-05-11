import { apiSettings } from '../store';

export function formatLength(timestamp: number):string{
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.floor(timestamp / 60) - (hours * 60);
  const seconds = timestamp % 60;

  const format = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + 's';

  return format;
}

export function getFormatDate(timestamp: number): string {
  const locale = apiSettings.getState().state.locale;
  const date = new Date(timestamp*1000);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(locale, options);
}

export function shuffleArray<T>(array: Array<T>): Array<T> {
  let currentIndex: number = array.length;
  let temporaryValue: T;
  let randomIndex: number;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}