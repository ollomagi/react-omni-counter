# react-omni-counter
An elegant and fully customizable React counter.

# Example
```javascript
import Counter from 'react-omni-counter'

const next90Mins = new Date(Date.now() + 5400000)

<Counter to={next90Mins} />                           // -> 00d 01h 29m 59s
<Counter to={next90Mins} mode="hh:mm:ss"/>            // -> 01:29:59
<Counter to={next90Mins} mode="smart"/>               // -> 01h
<Counter to={next90Mins} mode="m" unitMode="full" />  // -> 90 minutes
<Counter to={next90Mins} Component={MyCounter} />     // -> 89:59
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
```javascript
const now = new Date(Date.now())

let tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
```

### Countdown
```javascript
<Counter to={tomorrow} />  // -> 00d 23h 59m 59s
```
### Countup
```javascript
<Counter from={now} />     // -> 00d 00h 00m 01s
```
### Count From/To
```javascript
<Counter from={yesterday} to={tomorrow}/>  // -> 1d 23h 59m 59s
```

### Modes
- *Default*: Display all time units: day, hour, minute and second
```javascript
<Counter to={tomorrow} />  // -> 00d 23h 59m 59s
```

- *hh:mm:ss*: Display three time units hour, minute and second in standard countdown form
```javascript
<Counter to={tomorrow} mode="hh:mm:ss"/>  // -> 23:59:59
```

- *Smart*: Display the most approximate time unit. For example, `00d 23h 59m 2s` will be `23h`. As it's going down, it will use the next smaller time unit.
```javascript
<Counter to={tomorrow} mode="smart" />     // -> 23h
<Counter to={next100Mins} mode="smart" />  // -> 1h
<Counter to={next50Mins} mode="smart" />   // -> 50m
<Counter to={next100Secs} mode="smart" />  // -> 1m
<Counter to={next50Secs} mode="smart" />   // -> 50s
```

- *Time Unit*: Represent the duration by one time unit
```javascript
<Counter to={tomorrow} mode="d" />  // -> 1d
<Counter to={tomorrow} mode="h" />  // -> 24h
<Counter to={tomorrow} mode="m" />  // -> 1440m
<Counter to={tomorrow} mode="s" />  // -> 86399s
```

#### On Complete & On Expiry
```javascript
const next3Secs = new Date(Date.now() + 3000)
const handleComplete = _ => console.log('DONE')
const handleExpiry = _ => console.log('EXPIRIED')

<Counter to={next3Secs} onComplete={handleComplete} onExpiry={handleExpiry} />
```

### Unit Modes
- *Short* (default): d, h, m, s
```javascript
<Counter to={tomorrow} />                   // -> 00d 23h 59m 59s
<Counter to={tomorrow} unitMode="short" />  // -> 00d 23h 59m 59s
```
- *Full*: days, hours, minutes and seconds
```javascript
<Counter to={tomorrow} unitMode="full" />   // -> 00 days 23 hours 59 minutes 59 seconds
```
- *Null*: no unit get displayed (more suitable with Time Unit mode):
```javascript
<Counter to={tomorrow} mode="d" unitMode={null} />  // -> 1
<Counter to={tomorrow} mode="h" unitMode={null} />  // -> 24
<Counter to={tomorrow} mode="m" unitMode={null} />  // -> 1440
<Counter to={tomorrow} mode="s" unitMode={null} />  // -> 86399
```

### Custom View Component
You can create your own view component with a wide range of time options as props: `days`, `hours`, `minutes`, `seconds`, `asDays`, `asHours`, `asMinutes`, `asSeconds`. You don't have to use all of them.

```javascript
const MyCounter = ({ minutes, seconds }) => (
  <div
    style={{
      color: 'white',
      background: 'black',
      fontWeight: 'bold',
    }}
  >
    {minutes}:{seconds}
  </div>
)

<Counter to={next30Minutes} Component={MyCounter} />  // -> 29:59
```
