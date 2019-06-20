# react-omni-counter
An elegant and fully customizable React counter.
```javascript
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

<Counter to={tomorrow} />
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
