import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { DefaultView, SmartView, AsView, HourClockView } from './Views'

const initialState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  asHours: 0,
  asMinutes: 0,
  asSeconds: 0,
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
    return null
  }
  const [state, setState] = useState(initialState)
  const initTime = moment()

  let interval
  let unmount

  const count = _ => {
    const elapsed = moment().diff(initTime)
    const start = from ? (to ? moment(from).add(elapsed) : moment(from)) : moment()
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
          hours: h,
          minutes: m,
          seconds: s,
          asDays: d,
          asHours: asHr,
          asMinutes: asMin,
          asSeconds: asSec,
        })

      if (diff < 1000) {
        onComplete instanceof Function && onComplete()
        setState(initialState)
      }
    } else {
      onExpiry instanceof Function && onExpiry()
      setState(initialState)
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
  state: { days, hours, minutes, seconds, asDays, asHours, asMinutes, asSeconds },
  mode,
  unitMode,
  className,
  Component,
}) => {
  if (!Component) {
    if (['s', 'm', 'h', 'd'].includes(mode)) {
      const times = {
        s: asSeconds,
        m: asMinutes + 1,
        h: asHours + 1,
        d: asDays + 1,
      }
      return <AsView time={times[mode]} unit={mode} className={className} unitMode={unitMode} />
    }

    if (mode === 'smart') {
      return (
        <SmartView
          s={asSeconds}
          m={asMinutes}
          h={asHours}
          d={asDays}
          unitMode={unitMode}
          className={className}
        />
      )
    }

    if (mode === 'hh:mm:ss') {
      return <HourClockView hours={asHours} minutes={minutes} seconds={seconds} />
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
      asDays={asDays}
      asHours={asHours}
      asMinutes={asMinutes}
      asSeconds={asSeconds}
    />
  )
}

export default Counter
