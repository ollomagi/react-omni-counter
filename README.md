# react-omni-counter
An elegant and fully customizable React counter.
```javascript
import Counter from 'react-omni-counter'

<Counter to={tomorrow} onComplete={handleComplete} />
```
# Features
- Include both countdown and countup
- Provide onComplete and onExpired functions
- Has 3 diffrent counting modes (explained below)
- Support various display preferences with an option to make your own custom view component.

# Usage
#### Countdown
```javascript
const tomorrow = new Date(Date.now() + 86400000) 

<Counter to={tomorrow} /> // 0d 23h 59m 59s
```
#### Countup
```javascript
const now = new Date(Date.now())

<Counter from={now} /> // 0d 00h 00m 01s
```

#### On Complete & On Expiry
```javascript
const nextThreeSecs = new Date(Date.now() + 3000)
const handleComplete = _ => console.log('DONE')
const handleExpiry = _ => console.log('EXPIRIED')

<Counter to={nextThreeSecs} onComplete={handleComplete} onExpiry={handleExpiry} />
```

#### Modes
- Default: Display all time units: day, hour, minute and second
```javascript
<Counter to={tomorrow} />
```
- Smart: Display the most approximate time unit. For example, `0d 23h 59m 2s` will be `23h`
```javascript
<Counter to={tomorrow} mode="smart" />
```

- Time Unit: Represent the duration by one time unit
```javascript
<Counter to={tomorrow} mode="d" /> // 1d
<Counter to={tomorrow} mode="h" /> // 24h
<Counter to={tomorrow} mode="m" /> // 1440m
<Counter to={tomorrow} mode="s" /> // 86399s
```

#### Unit Modes
- Short (default): d, h, m, s
```javascript
<Counter to={tomorrow} /> // 0d 23h 59m 59s
<Counter to={tomorrow} unitMode="short" /> // 0d 23h 59m 59s
```
- Full: days, hours, minutes and seconds
```javascript
<Counter to={tomorrow} unitMode="full" /> // 0 days 23 hours 59 minutes 59 seconds
```
- Null: no unit get displayed (more suitable with Time Unit mode):
```javascript
<Counter to={tomorrow} mode="d" unitMode={null} /> // 1
<Counter to={tomorrow} mode="h" unitMode={null} /> // 24
<Counter to={tomorrow} mode="m" unitMode={null} /> // 1440
<Counter to={tomorrow} mode="s" unitMode={null} /> // 86399
```

#### Custom View Component
You can create your own view component with a wide range of time options as props: `days`, `hours`, `minutes`, `seconds`, `asDays`, `asHours`, `asMinutes`, `asSeconds`. 

```javascript
const MyCounter = ({  hours, minutes, seconds }) => (
  <div
    style={{
      color: 'white',
      background: 'black',
      fontWeight: 'bold',
    }}
  >
    {days} DAYS {hours}:{minutes}:{seconds}
  </div>
)

<Counter to={tomorrow} Component={MyCounter} /> // 0 DAYS 23:59:59
```

Happy coding!
