export function formatTime(
  time: number | string | undefined,
  type?: 'millisecond' | 'second'
) {
  let second = 0;
  if (!time) {
    return '0秒';
  }

  if (typeof time === 'string') {
    time = parseInt(time);
  }

  if (type === 'millisecond') {
    second = Math.ceil(time / 1000);
  } else {
    second = time;
  }

  const s = second % 60;
  const m = Math.floor((second % 3600) / 60);
  const h = Math.floor(second / 3600) % 24;
  const d = Math.floor(second / 3600 / 24);
  if (second < 60) {
    return second + '秒';
  } else if (second >= 60 && second < 3600) {
    return s !== 0 ? m + '分钟' + s + '秒' : m + '分钟';
  } else if (second >= 3600 && second < 3600 * 24) {
    return m !== 0 ? h + '小时' + m + '分钟' : h + '小时';
  } else {
    return h !== 0 ? d + '天' + h + '小时' : d + '天';
  }
}

/**
 * https://thewebdev.info/2021/03/20/how-to-the-number-of-seconds-to-a-time-string-in-the-hhmmss-format-with-javascript/
 * @param numSecs
 * @returns
 */
export const toHHMMSS = (numSecs: string | number) => {
  numSecs = Number(numSecs);
  if (Number.isNaN(Number(numSecs)) || numSecs <= 0) return '00:00:00';
  numSecs = String(numSecs);
  let secNum = parseInt(numSecs, 10);
  let hours = String(Math.floor(secNum / 3600))
    .toString()
    .padStart(2, '0');
  let minutes = String(Math.floor((secNum - Number(hours) * 3600) / 60))
    .toString()
    .padStart(2, '0');
  let seconds = String(secNum - Number(hours) * 3600 - Number(minutes) * 60)
    .toString()
    .padStart(2, '0');
  if (hours == '00' || Number.isNaN(hours))
    return `${hours}:${minutes}:${seconds}`;
  return `${hours}:${minutes}:${seconds}`;
};

export const digitalClockFormat = toHHMMSS;
