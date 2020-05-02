export function formatLength(timestamp: number):string{
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.floor(timestamp / 60) - (hours * 60);
  const seconds = timestamp % 60;

  const format = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + 's';

  return format;
}

export function getFormatDate(timestamp: number): string {
  const date = new Date(timestamp*1000);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}