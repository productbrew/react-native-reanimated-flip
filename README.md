<div align="center">
  
[![npm](https://badgen.net/npm/v/react-native-flip)](https://www.npmjs.com/package/react-native-flip) [![npm](https://badgen.net/npm/dt/react-native-flip)](https://www.npmjs.com/package/react-native-flip) [![npm](https://badgen.net/npm/license/react-native-flip)](https://www.npmjs.com/package/react-native-flip)
  
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
| rotate      | A value indicating the axis of rotation | NO       | <'Y', 'X'>    | #007AFF |
| style       | Container Style                         | NO       | ViewStyle     | #F2F5F7 |
| front       | React component in Front Side           | YES      | React.Element | -       |
| back        | React component in Back Side            | YES      | React.Element | -       |

# Try it out

You can also try out the [example app](https://snack.expo.io/@pzatorski/react-native-flip-example) with Expo.

You can try the React Native App.

The source code for the example app is under [/examples](https://github.com/czystyl/react-native-reanimated-flip/tree/develop/examples) folder.
