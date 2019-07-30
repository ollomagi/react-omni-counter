import React from 'react'
import { formatTime, formatUnit } from './utils'

export const AsView = ({ time, unit, unitMode, className }) => (
  <span className={className}>{formatUnit(time, true, unit, unitMode)}</span>
)

export const SmartView = ({ s, m, h, d, unitMode, className }) => (
  <span className={className}>
    {d > 0
      ? formatUnit(d, false, 'd', unitMode)
      : h > 0
      ? formatUnit(h, false, 'h', unitMode)
      : m > 0
      ? formatUnit(m, false, 'm', unitMode)
      : formatUnit(s, false, 's', unitMode)}
  </span>
)

export const HourClockView = ({ hours, minutes, seconds, className }) => (
  <span className={className}>
    {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
  </span>
)

export const DefaultView = ({ days, hours, minutes, seconds, unitMode, className }) => (
  <span className={className}>
    {formatUnit(days, true, 'd', unitMode)} {formatUnit(hours, true, 'h', unitMode)}{' '}
    {formatUnit(minutes, true, 'm', unitMode)} {formatUnit(seconds, true, 's', unitMode)}
  </span>
)
