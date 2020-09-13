/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import FlipCard from './src';

const App: React.FC = () => {
  const [side, setSide] = React.useState<0 | 1>(0);
  const [rotate, setRotate] = React.useState<'Y' | 'X'>('Y');
  const changeSide = React.useCallback(() => {
    setSide((side) => (side === 0 ? 1 : 0));
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.textStyle}>Hello, World</Text>
        <Text style={styles.textStyle}>React Native Reanimated Flip Card</Text>
        <Button
          title={`Change rotation. The card rotation is: ${rotate}`}
          onPress={() => {
            setRotate((rotation) => (rotation === 'X' ? 'Y' : 'X'));
          }}
        />
        <FlipCard
          side={side}
          rotate={rotate}
          style={styles.flipContainer}
          front={
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={changeSide}
              style={{
                backgroundColor: '#ed8936',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
              }}>
              <Text style={{fontSize: 18, color: 'black'}}>Front</Text>
            </TouchableOpacity>
          }
          back={
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={changeSide}
              style={{
                backgroundColor: '#007AFF',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
              }}>
              <Text style={{fontSize: 18, color: 'white'}}>Back</Text>
            </TouchableOpacity>
          }
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textStyle: {
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 10,
  },
  flipContainer: {
    height: 300,
    width: Dimensions.get('window').width * 0.8,
  },
});

export default App;
