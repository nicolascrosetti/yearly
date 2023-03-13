import React from 'react';
import { View } from 'react-native';
import Leaf from './Leaf';

const LeafFall = ({ count }) => {
  const leafs = [];
  const leafImage = require('../../assets/images/leaf.png');

  for (let i = 0; i < count; i++) {
    leafs.push(
      <Leaf
        key={i}
        size={30}
        startX={Math.random() * 400}
        duration={7000}
        delay={Math.random() * 5000}
        imageSource={leafImage}
      />
    );
  }

  return <>{leafs}</>;
};

export default LeafFall;
