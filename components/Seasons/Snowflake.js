import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, View } from 'react-native';

const Snowflake = ({ duration, size, startX, delay }) => {
  const yPos = useRef(new Animated.Value(-size)).current;
  const xPos = useRef(new Animated.Value(startX)).current;

  const startAnimation = () => {
    yPos.setValue(-size);
    xPos.setValue(startX);

    Animated.parallel([
      Animated.timing(yPos, {
        toValue: 800,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(xPos, {
        toValue: startX + 50,
        duration: duration,
        delay: delay,
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
  }, [duration, size, startX, yPos, xPos, delay]);

  return (
    <Animated.View style={[styles.snowflake, { transform: [{ translateY: yPos }, { translateX: xPos }], width: size, height: size }]} />
  );
};

const styles = StyleSheet.create({
  snowflake: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    position: 'absolute',
  },
});

export default Snowflake;
