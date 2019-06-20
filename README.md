# react-omni-counter
An elegant and fully customizable React counter.

# Features
- Include both countdown and countup
- Provide onComplete and onExpired functions
- Has 3 diffrent counting modes (explained below)
- Support various display preferences with an option to make your own custom view component.

# Usage
#### Countdown
```javascript
const nextDay = new Date(Date.now() + 86400000)

<Counter to={nextDay} />
```
#### Countup
```javascript
const now = new Date(Date.now())

<Counter from={now} />
```

#### On Complete
```javascript
const next3Secs = new Date(Date.now() + 3000)
const handleComplete = _ => console.log('DONE')

<Counter to={next3Secs} onComplete={handleComplete} />
```
