import React from 'react';
import { View, StyleSheet } from 'react-native';

const Sunshine = ({ size }) => {
  const circleStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#FDB813',
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={circleStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 35,
    backgroundColor: 'transparent',
    opacity: 0.3
  },
});

export default Sunshine;


