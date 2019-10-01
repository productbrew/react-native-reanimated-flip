import * as React from "react"
import { View, StyleSheet, Button } from "react-native"

import FlipCard from "../src/index"
import Side from "./Side"

const App = () => {
  const [side, setSide] = React.useState<0 | 1>(0)

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 100,
          right: 0,
          left: 0,
        }}
      >
        <Button
          title={`FLIP PRESS FROM CONTROLLED BY USER. \n The side of the card is: ${side}`}
          onPress={() => {
            setSide(side => (side === 0 ? 1 : 0))
          }}
        />
      </View>

      <FlipCard
        side={side}
        front={<Side title="JEDEN" color="blue" />}
        back={<Side title="DWA" color="green" />}
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
})

export default App
