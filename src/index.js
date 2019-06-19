import React, { useState, useEffect } from 'react'
import moment from 'moment'

const formatTime = time => (parseInt(time, 10) < 10 ? `0${parseInt(time, 10)}` : time)

const initialState = {
  days: 0,
  hours: formatTime(0),
  minutes: formatTime(0),
  seconds: formatTime(0),
  asHours: formatTime(0),
  asMinutes: formatTime(0),
  asSeconds: formatTime(0),
}

export const Counter = ({
  from,
  to,
  mode,
  onComplete,
  onExpiry,
  className = 'counter-view',
  Component,
}) => {
  if (from === undefined && to === undefined) {
    return ''
  }
  const [state, setState] = useState(initialState)

  let interval
  let unmount

  const count = _ => {
    const start = from ? moment(from) : moment()
    const end = to ? moment(to) : moment()

    const diff = end.diff(start)
    if (diff >= 0) {
      const duration = moment.duration(diff)
      const asHr = Math.floor(duration.asHours())
      const asMin = Math.floor(duration.asMinutes())
      const asSec = Math.floor(duration.asSeconds())

      const d = Math.floor(duration.asDays())
      const h = Math.floor(duration.asHours() - d * 24)
      const m = Math.floor(asMin - asHr * 60)
      const s = Math.floor(duration.asSeconds() - asMin * 60)

      !unmount &&
        setState({
          days: d,
          hours: formatTime(h),
          minutes: formatTime(m),
          seconds: formatTime(s),
          asHours: formatTime(asHr),
          asMinutes: formatTime(asMin),
          asSeconds: formatTime(asSec),
        })

      if (diff < 1000) {
        onComplete instanceof Function && onComplete()
      }
    } else {
      onExpiry instanceof Function && onExpiry()
      stop()
    }
  }

  const stop = _ => {
    clearInterval(interval)
  }

  useEffect(_ => {
    count()
    interval = setInterval(_ => count(), 1000)
    return _ => {
      stop()
      unmount = true
    }
  }, [])

  return generateView({ state, mode, className, Component })
}

const generateView = ({
  state: { days, hours, minutes, seconds, asHours, asMinutes, asSeconds },
  mode,
  className,
  Component,
}) => {
  if (mode === 'second') {
    const View = Component || AsView
    return <View time={asSeconds} className={className} />
  } else if (mode === 'minute') {
    const View = Component || AsView
    return <View time={asMinutes} className={className} />
  } else if (mode === 'hour') {
    const View = Component || AsView
    return <View time={asHours} className={className} />
  } else if (mode === 'day') {
    const View = Component || AsView
    return <View time={days} className={className} />
  } else if (mode === 'concise') {
    return <ConciseView s={asSeconds} m={asMinutes} h={asHours} d={days} className={className} />
  } else {
    const View = Component || DefaultView
    return (
      <View days={days} hours={hours} minutes={minutes} seconds={seconds} className={className} />
    )
  }
}

const DefaultView = ({ days, hours, minutes, seconds, className }) => (
  <span className={className}>
    {days} days {hours}:{minutes}:{seconds}
  </span>
)

const ConciseView = ({ s, m, h, d, className }) => (
  <span className={className}>
    {d > 1
      ? `${d} days`
      : d > 0
      ? `${d} day`
      : h > 1
      ? `${h} hours`
      : h > 0
      ? `${h} hour`
      : m > 1
      ? `${m} minutes`
      : m > 0
      ? `${m} minute`
      : h > 1
      ? `${h} seconds`
      : `${h} second`}
  </span>
)

const AsView = ({ time, className }) => <span className={className}>{time}</span>
