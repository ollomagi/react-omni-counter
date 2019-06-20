import React from 'react'
import { formatUnit } from './utils'

export const AsView = ({ time, unit, unitMode, className }) => (
  <span className={className}>{formatUnit(time, unit, unitMode)}</span>
)

export const SmartView = ({ s, m, h, d, unitMode, className }) => (
  <span className={className}>
    {d > 0
      ? formatUnit(d, 'd', unitMode)
      : h > 0
      ? formatUnit(h, 'h', unitMode)
      : m > 0
      ? formatUnit(m, 'm', unitMode)
      : formatUnit(s, 's', unitMode)}
  </span>
)

export const DefaultView = ({ days, hours, minutes, seconds, unitMode, className }) => (
  <span className={className}>
    {formatUnit(days, 'd', unitMode)} {formatUnit(hours, 'h', unitMode)}{' '}
    {formatUnit(minutes, 'm', unitMode)} {formatUnit(seconds, 's', unitMode)}
  </span>
)
