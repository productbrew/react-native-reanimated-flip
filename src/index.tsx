import * as React from "react"
import { StyleSheet } from "react-native"
import Animated from "react-native-reanimated"
import { spring } from "react-native-redash"

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
} = Animated

type Props = {
  perspective?: number
  side: 1 | 0
  front: React.ReactElement
  back: React.ReactElement
}

const ReanimatedFlip = ({ perspective = 350, side, front, back }: Props) => {
  const { flipPosition, clock } = React.useMemo(
    () => ({
      flipPosition: new Value(side),
      clock: new Clock(),
    }),
    []
  )

  useCode(
    block([
      cond(not(eq(side, flipPosition)), [
        set(
          flipPosition,
          spring({ clock: clock, from: flipPosition, to: side })
        ),
      ]),
    ]),
    [side]
  )

  const rotatePosition = interpolate(flipPosition, {
    inputRange: [0, 1],
    outputRange: [0, 180],
  })
  const rotateY = concat(rotatePosition, "deg")

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

  return (
    <Animated.View style={styles.container}>
      <Animated.View
        style={[
          styles.side,
          styles.front,
          {
            opacity: opacityFront,
            transform: [{ perspective }, { rotateY }],
          },
        ]}
      >
        {front}
      </Animated.View>
      <Animated.View
        style={[
          styles.side,
          styles.back,
          {
            opacity: opacityBack,
            transform: [{ perspective }, { rotateY: "180deg" }, { rotateY }],
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
    position: "absolute",
  },
  front: {
    zIndex: 2,
  },
  back: {
    zIndex: 1,
  },
})

export default ReanimatedFlip
