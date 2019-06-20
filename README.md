# react-omni-counter
An elegant and fully customizable React counter.

# Example
```javascript
import Counter from 'react-omni-counter'
const nextNinetyMinutes = 
<Counter to={tomorrow} onComplete={handleComplete} />
```

```javascript
<Counter to={nextNinetyMinutes} />                               // 00d 01h 29m 59s
<Counter to={nextNinetyMinutes} mode="smart" unitMode="full" />  // 01 hour
<Counter to={nextNinetyMinutes} mode="m" />                      // 90m
<Counter to={nextNinetyMinutes} Component={MyCounter} />         // 1 HOUR 30 MINUTES
```

# Install
- `npm install react-omni-counter`
- `yarn add react-omni-counter`

# Features
- Include both countdown and countup
- Provide onComplete and onExpired functions
- Has three diffrent counting & displaying modes
- Support various display preferences with an option to make your own custom view component.

# Props
- `to`: A valid datetime string in the future. Apply to countdown only. E.g.: `Jun 20 2029 15:28:14`.
- `from`: A valid datetime string in the past. Apply to countup only. E.g.: `Jun 20 2019 15:28:14`.
- `mode`: Options for counting mode. See below for details.
- `unitMode`: Options for displaying time unit. E.g. `2 minutes` vs `2m`.
- `onComplete`: A function to fire when the counter reach 0. Apply to countdown only.
- `onExpiry`: A function to fire when end time is past. Apply to countdown only.
- `Component`: Your custom view for displaying the counter. Provided with all time units.

# Usage
### Countdown
```javascript
const tomorrow = new Date(Date.now() + 86400000) 

<Counter to={tomorrow} />  // 00d 23h 59m 59s
```
### Countup
```javascript
const now = new Date(Date.now())

<Counter from={now} />     // 00d 00h 00m 01s
```

#### On Complete & On Expiry
```javascript
const nextThreeSecs = new Date(Date.now() + 3000)
const handleComplete = _ => console.log('DONE')
const handleExpiry = _ => console.log('EXPIRIED')

<Counter to={nextThreeSecs} onComplete={handleComplete} onExpiry={handleExpiry} />
```

### Modes
- *Default*: Display all time units: day, hour, minute and second
```javascript
<Counter to={tomorrow} />
```
- *Smart*: Display the most approximate time unit. For example, `00d 23h 59m 2s` will be `23h`
```javascript
<Counter to={tomorrow} mode="smart" />
```

- *Time Unit*: Represent the duration by one time unit
```javascript
<Counter to={tomorrow} mode="d" />  // 1d
<Counter to={tomorrow} mode="h" />  // 24h
<Counter to={tomorrow} mode="m" />  // 1440m
<Counter to={tomorrow} mode="s" />  // 86399s
```

### Unit Modes
- *Short* (default): d, h, m, s
```javascript
<Counter to={tomorrow} />                   // 00d 23h 59m 59s
<Counter to={tomorrow} unitMode="short" />  // 00d 23h 59m 59s
```
- *Full*: days, hours, minutes and seconds
```javascript
<Counter to={tomorrow} unitMode="full" />   // 00 days 23 hours 59 minutes 59 seconds
```
- *Null*: no unit get displayed (more suitable with Time Unit mode):
```javascript
<Counter to={tomorrow} mode="d" unitMode={null} />  // 1
<Counter to={tomorrow} mode="h" unitMode={null} />  // 24
<Counter to={tomorrow} mode="m" unitMode={null} />  // 1440
<Counter to={tomorrow} mode="s" unitMode={null} />  // 86399
```

### Custom View Component
You can create your own view component with a wide range of time options as props: `days`, `hours`, `minutes`, `seconds`, `asDays`, `asHours`, `asMinutes`, `asSeconds`. You don't have to use all of them.

```javascript
const MyCounter = ({ hours, minutes, seconds }) => (
  <div
    style={{
      color: 'white',
      background: 'black',
      fontWeight: 'bold',
    }}
  >
    {hours}:{minutes}:{seconds}
  </div>
)

<Counter to={tomorrow} Component={MyCounter} />  // 23:59:59
```
