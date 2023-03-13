import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Image } from 'react-native';

const Seagull = ({ size, imageSource }) => {
  const yPos = useRef(new Animated.Value(Math.random() * 800)).current;
  const xPos = useRef(new Animated.Value(Math.random() * 500)).current;

  const startAnimation = () => {
    const duration = Math.random() * 10000 + 5000;
    const toY = Math.random() * 800;
    const toX = Math.random() * 500;

    Animated.parallel([
      Animated.timing(yPos, {
        toValue: toY,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(xPos, {
        toValue: toX,
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        startAnimation();
      }
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Animated.Image
      source={imageSource}
      style={[
        styles.seagull,
        { transform: [{ translateY: yPos }, { translateX: xPos }], width: size, height: size },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  seagull: {
    position: 'absolute',
    opacity: 0.6
  },
});

export default Seagull;
