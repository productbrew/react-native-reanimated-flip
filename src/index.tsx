import Animated, {Easing, Extrapolate, interpolate, useAnimatedStyle, useDerivedValue, withTiming} from 'react-native-reanimated';
import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';

export enum FlipSide {
    FRONT,
    BACK
}

export enum RotateAxis {
    Y = 'Y',
    X = 'X'
}

type Props = {
    perspective?: number
    side: FlipSide
    rotate?: RotateAxis
    style?: ViewStyle
    front: React.ReactElement
    back: React.ReactElement
}

const ReanimatedFlip = ({
                            perspective = 1200,
                            rotate = RotateAxis.Y,
                            side,
                            front,
                            back,
                            style,
                        }: Props) => {

    const rotatePosition = useDerivedValue(() => (
      interpolate(side, [0, 1], [180, 360], Extrapolate.CLAMP)
    ))

    const rotateValue = useDerivedValue(() => {
        return withTiming(rotatePosition.value, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
        });
    });

    const rotationFlip = useDerivedValue(() => {
        if (rotate === RotateAxis.Y) {
            return {
                rotateY: `${rotateValue.value}deg`
            };
        }

        return {
            rotateX: `${rotateValue.value}deg`
        };
    }, [rotate, rotateValue]);

    const rotationFlipBack = useDerivedValue(() => {
        if (rotate === RotateAxis.Y) {
            return {
                rotateY: '180deg'
            };
        }

        return {
            rotateX: '180deg'
        };
    }, [rotate]);

    const opacityFront = useDerivedValue(() => {
        return withTiming(side, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
        });
    }, [side]);

    const opacityBack = useDerivedValue(() => {
        return withTiming(side === 0 ? 1 : 0, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
        });
    }, [side]);

    const animatedStyleFront = useAnimatedStyle(() => {
        return {
            opacity: opacityFront.value,
            transform: [
                {perspective},
                {...rotationFlip.value},
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