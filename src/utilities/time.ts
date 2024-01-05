function padZero(num: number) {
  return num < 10 ? `0${num}` : num;
}

export function getTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

  return formattedTime;
}