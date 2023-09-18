# asteroid-miner

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

## Some ideas
```
1. the asteroid should have a field indicating the initial amount of minerals,
in order to display in the Asteroid table, the mineral field. [currentValue]/[initialValue]
now the [minerals] field just means the current amount. so it is simulated when first time connecting
to server and receive the data.

2. the fields value for miner, [carryCapacity], [travelSpeed] and [miningSpeed], are limited from 1-200,
meaning at least the three values should be 1, 1, 1 respectively. but total points is just 200.
so any field taking the max value will be 198, and the combination is 1, 1, 198, which means the max value will never reach 200.

3. the list might be very long, so it's better we have a pagination for all the list data

4. the difference between main screen and bonus screen is that, the bonus screen may display an animation
showing the miners working. we can use rAF each second to set the position of the element to control the animation.
basic info will be {x, y, angle}. the planets and asteroids will also be fixed depending on their own position.
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
