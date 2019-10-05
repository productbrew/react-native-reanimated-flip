import * as React from "react"
import { View, StyleSheet, Button } from "react-native"

import FlipCard from "../src/index"
import Side from "./Side"

const App = () => {
  const [side, setSide] = React.useState<0 | 1>(0)
  const [rotate, setRotate] = React.useState<"Y" | "X">("Y")

  return (
    <View style={styles.container}>
      <Button
        title={`Flip the card. The side of the card is: ${side}`}
        onPress={() => {
          setSide(side => (side === 0 ? 1 : 0))
        }}
      />

      <Button
        title={`Change rotation. The card rotation is: ${rotate}`}
        onPress={() => {
          setRotate(rotation => (rotation === "X" ? "Y" : "X"))
        }}
      />

      <FlipCard
        side={side}
        rotate={rotate}
        style={styles.flipContainer}
        front={<Side title="FRONT" color="blue" />}
        back={<Side title="BACK" color="green" />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  flipContainer: {
    height: 300,
    width: 300,
    borderWidth: 1,
    borderColor: "red",
  },
})

export default App
