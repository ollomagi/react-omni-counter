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

export const formatUnit = (time, unit, unitMode) => {
  const uMode = umd[unitMode]
  return !uMode
    ? time
    : unitMode === 'full' && parseInt(time, 10) > 1
    ? `${time} ${uMode[unit]}s`
    : `${time} ${uMode[unit]}`
}

export const formatTime = time => (parseInt(time, 10) < 10 ? `0${parseInt(time, 10)}` : time)
