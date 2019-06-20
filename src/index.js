import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { DefaultView, SmartView, AsView } from './Views'
import { formatTime } from './utils'

const initialState = {
  days: 0,
  hours: formatTime(0),
  minutes: formatTime(0),
  seconds: formatTime(0),
  asHours: formatTime(0),
  asMinutes: formatTime(0),
  asSeconds: formatTime(0),
}

const Counter = ({
  from,
  to,
  mode,
  onComplete,
  onExpiry,
  className = 'counter-view',
  unitMode = 'short',
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

  return generateView({ state, mode, unitMode, className, Component })
}

const generateView = ({
  state: { days, hours, minutes, seconds, asHours, asMinutes, asSeconds },
  mode,
  unitMode,
  className,
  Component,
}) => {
  if (!Component) {
    if (['s', 'm', 'h', 'd'].includes(mode)) {
      const times = {
        s: asSeconds,
        m: asMinutes,
        h: asHours,
        d: days,
      }
      return <AsView time={times[mode]} unit={mode} className={className} unitMode={unitMode} />
    }

    if (mode === 'smart') {
      return (
        <SmartView
          s={asSeconds}
          m={asMinutes}
          h={asHours}
          d={days}
          unitMode={unitMode}
          className={className}
        />
      )
    }

    return (
      <DefaultView
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        unitMode={unitMode}
        className={className}
      />
    )
  }

  return (
    <Component
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      asDays={days}
      asHours={asHours}
      asMinutes={asMinutes}
      asSeconds={asSeconds}
    />
  )
}

export default Counter
