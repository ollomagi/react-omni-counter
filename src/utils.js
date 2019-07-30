const umd = {
  full: {
    d: 'day',
    h: 'hour',
    m: 'minute',
    s: 'second',
  },
  short: {
    d: 'd',
    h: 'h',
    m: 'm',
    s: 's',
  },
}

export const formatUnit = (time, formatTime, unit, unitMode) => {
  const uMode = umd[unitMode]
  const format = time => (formatTime instanceof Function ? formatTime(time) : time)
  return !uMode
    ? time
    : unitMode === 'short'
    ? `${format(time)}${uMode[unit]}`
    : parseInt(time, 10) > 1
    ? `${format(time)} ${uMode[unit]}s`
    : `${format(time)} ${uMode[unit]}`
}

export const formatTime = time => (parseInt(time, 10) < 10 ? `0${parseInt(time, 10)}` : time)
