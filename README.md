<div align="center">
  
[![npm](https://badgen.net/npm/v/react-native-flip)](https://www.npmjs.com/package/react-native-flip) [![npm](https://badgen.net/npm/dt/react-native-flip)](https://www.npmjs.com/package/react-native-flip)
  
<h1>React Native Reanimated Flip Card</h1>

<img width="auto" height="500" src="./gif/flip.gif">

</div>

# Install

```sh
yarn add react-native-flip
# or
npm i react-native-flip
```

> :warning: You need to install [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/next/installation/) and follow their installation instructions.

# Usage

```js
import FlipCard from "react-native-flip"

const make = () => {
  return (
    <FlipCard
      side={0}
      front={<Text>Front component</Text>}
      back={<Text>Back component</Text>}
    />
  )
}
```

## :wrench: Props

| Name        | Description                             | Required | Type          | Default |
| ----------- | --------------------------------------- | -------- | ------------- | ------- |
| perspective | Perspective of rotation                 | NO       | Number        | 1200    |
| side        | A value indicating Front(1) or Back(0)  | YES      | <1, 0>        | -       |
| rotate      | A value indicating the axis of rotation | NO       | <'Y', 'X'>    | "Y"     |
| style       | Container Style                         | NO       | ViewStyle     | -       |
| front       | React component in Front Side           | YES      | React.Element | -       |
| back        | React component in Back Side            | YES      | React.Element | -       |

# Try it out

You can also try out the [example app](https://snack.expo.io/@pzatorski/react-native-flip-example) with Expo.

You can also try the [React Native App](https://github.com/Karthik-B-06/react-native-reanimated-flip/tree/rn-example-with-better-readme/rn-example/RNFlip).

The source code for the example app is under [/examples](https://github.com/czystyl/react-native-reanimated-flip/tree/develop/examples) folder.
