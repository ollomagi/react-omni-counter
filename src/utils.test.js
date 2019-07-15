import { formatTime, formatUnit } from './utils'
import { testNameToKey } from 'jest-snapshot/build/utils'

test('format time should add 0 to number smaller than 10 and return a string', () => {
  expect(formatTime(9)).toBe('09')
  expect(formatTime('8')).toBe('08')
})

test('format unit should not format time', () => {
  expect(formatUnit(1, false, 'h', 'full')).toBe('1 hour')
  expect(formatUnit('2', false, 'h', 'full')).toBe('2 hours')
  expect(formatUnit('3', false, 'h', 'short')).toBe('3h')
})
