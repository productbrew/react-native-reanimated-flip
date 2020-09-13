import React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import Animated, { Easing } from "react-native-reanimated"

const {
  Value,
  Clock,
  useCode,
  cond,
  set,
  concat,
  interpolate,
  eq,
  block,
  not,
  clockRunning,
  startClock,
  stopClock,
  timing,
} = Animated

function runTiming(
  clock: Animated.Clock,
  value: Animated.Adaptable<number>,
  dest: Animated.Adaptable<number>
) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  }

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),
    // we made the block return the updated position
    state.position,
  ])
}

type Props = {
  perspective?: number
  side: 1 | 0
  rotate?: "Y" | "X"
  style?: ViewStyle
  front: React.ReactElement
  back: React.ReactElement
}

const ReanimatedFlip = ({
  perspective = 350,
  rotate = "Y",
  side,
  front,
  back,
  style,
}: Props) => {
  const { flipPosition, clock } = React.useMemo(
    () => ({
      flipPosition: new Value(side),
      clock: new Clock(),
    }),
    []
  )

  useCode(
    () =>
      block([
        cond(not(eq(side, flipPosition)), [
          set(
            flipPosition,
            runTiming(clock, flipPosition, side)
            // spring({ clock: clock, from: flipPosition, to: side })
          ),
        ]),
      ]),
    [side]
  )

  const rotatePosition = interpolate(flipPosition, {
    inputRange: [0, 1],
    outputRange: [0, 180],
  })
  const rotateValue = concat(rotatePosition, "deg")

  const opacityFront = interpolate(flipPosition, {
    inputRange: [0.5, 0.51],
    outputRange: [1, 0],
    extrapolate: Animated.Extrapolate.CLAMP,
  })

  const opacityBack = interpolate(flipPosition, {
    inputRange: [0.5, 0.51],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  })

  const scaleFront = interpolate(flipPosition, {
    inputRange: [0.5, 0.51],
    outputRange: [1, 0],
    extrapolate: Animated.Extrapolate.CLAMP,
  })

  const scaleBack = interpolate(flipPosition, {
    inputRange: [0.5, 0.51],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  })

  return (
    <Animated.View style={StyleSheet.flatten([style, styles.container])}>
      <Animated.View
        style={[
          styles.side,
          {
            opacity: opacityFront,
            transform: [
              { perspective },
              { [`rotate${rotate}`]: rotateValue },
              { scale: scaleFront },
            ],
          },
        ]}
      >
        {front}
      </Animated.View>
      <Animated.View
        style={[
          styles.side,
          {
            opacity: opacityBack,
            transform: [
              { perspective },
              { [`rotate${rotate}`]: "180deg" },
              { [`rotate${rotate}`]: rotateValue },
              { scale: scaleBack },
            ],
          },
        ]}
      >
        {back}
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  side: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
})

export default ReanimatedFlip
