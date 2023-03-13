import React from 'react';
import { View } from 'react-native';
import Snowflake from './Snowflake';

const Snowfall = ({ flakes, duration, size, delay }) => {
  const snowflakes = [];

  for (let i = 0; i < flakes; i++) {
    snowflakes.push(
      <Snowflake key={i} duration={duration} size={size} startX={Math.random() * 350} delay={i * delay} />
    );
  }

  return (
    <>
      {snowflakes}
    </>
  );
};

export default Snowfall;

