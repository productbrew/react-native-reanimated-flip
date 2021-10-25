import Animated, {
  withTiming,
  useAnimatedStyle,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';
import {ViewStyle, StyleSheet} from 'react-native';
import React from 'react';

type Props = {
  perspective?: number
  side: number
  rotate?: "Y" | "X"
  style?: ViewStyle
  front: React.ReactElement
  back: React.ReactElement
}

const ReanimatedFlip = ({
                          perspective = 1200,
                          rotate = "Y",
                          side,
                          front,
                          back,
                          style,
                        }: Props) => {

  const rotatePosition = Animated.interpolate(side, [0, 1],
      [0, 180])

  const rotateX = useDerivedValue(() => {
    return withTiming(rotatePosition, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  });

  const rotationFlip = useDerivedValue(() => {
    if (rotate === 'Y') {
      return {
        rotateY: `${rotateX.value}deg`
      };
    }

    return {
      rotateX: `${rotateX.value}deg`
    };
  }, [rotate, rotateX]);

  const rotationFlipBack = useDerivedValue(() => {
    if (rotate === 'Y') {
      return {
        rotateY: '180deg'
      };
    }

    return {
      rotateX: '180deg'
    };
  }, [rotate]);

  const opacityFront = useDerivedValue(() => {
    return Animated.interpolate(side,
        [0.5, 0.51],
        [1, 0],
        Animated.Extrapolate.CLAMP);
  }, [side]);

  const opacityBack = useDerivedValue(() => {
    return Animated.interpolate(side,
        [0.5, 0.51],
        [0, 1],
        Animated.Extrapolate.CLAMP);
  }, [side]);

  const scaleFront = useDerivedValue(() => {
    return Animated.interpolate(side,
        [0.5, 0.51],
        [1, 0],
        Animated.Extrapolate.CLAMP);
  }, [side]);

  const scaleBack = useDerivedValue(() => {
    return Animated.interpolate(side,
        [0.5, 0.51],
        [0, 1],
        Animated.Extrapolate.CLAMP);
  }, [side]);

  const animatedStyleFront = useAnimatedStyle(() => {
    return {
      opacity: opacityFront.value,
      transform: [
        {perspective},
        {...rotationFlip.value},
        {
          scale: scaleFront.value,
        },
      ],
    };
  }, [rotate, side, rotationFlip]);

  const animatedStyleBack = useAnimatedStyle(() => {
    return {
      opacity: opacityBack.value,
      transform: [
        {perspective},
        {...rotationFlipBack.value},
        {...rotationFlip.value},
        {
          scale: scaleBack.value,
        },
      ],
    };
  }, [rotate, side]);

  return (
      <Animated.View style={StyleSheet.flatten([style, styles.container])}>
        <Animated.View
            style={[styles.side, animatedStyleFront]}
        >
          {front}
        </Animated.View>
        <Animated.View
            style={[styles.side, animatedStyleBack]}
        >
          {back}
        </Animated.View>
      </Animated.View>
  );
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReanimatedFlip;