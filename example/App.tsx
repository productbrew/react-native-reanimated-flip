import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

import FlipCard, { FlipSide, RotateAxis } from 'react-native-flip';
import Side from "./Side";

export default function App() {
    const [side, setSide] = React.useState<FlipSide>(FlipSide.FRONT)
    const [rotate, setRotate] = React.useState<RotateAxis>(RotateAxis.Y)

    return (
        <View style={styles.container}>
            <Button
                title={`Flip the card. The side of the card is: ${side}`}
                onPress={() => {
                    setSide((side: FlipSide) => (side === FlipSide.FRONT ? FlipSide.BACK : FlipSide.FRONT))
                }}
            />

            <Button
                title={`Change rotation. The card rotation is: ${rotate}`}
                onPress={() => {
                    setRotate((rotation: RotateAxis) => (rotation === RotateAxis.X ? RotateAxis.Y : RotateAxis.Y))
                }}
            />

            <FlipCard
                side={side}
                rotate={rotate}
                style={styles.flipContainer}
                front={<Side title="FRONT" color="blue"/>}
                back={<Side title="BACK" color="green"/>}
            />
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipContainer: {
        height: 300,
        width: 300,
        borderWidth: 1,
        borderColor: "red",
    },
});
