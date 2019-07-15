import { formatTime, formatUnit } from './utils'
import { testNameToKey } from 'jest-snapshot/build/utils'

test('format time should add 0 to number smaller than 10 and return a string', () => {
  expect(formatTime(9)).toBe('09')
  expect(formatTime('8')).toBe('08')
})
