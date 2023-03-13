import React from 'react';
import Petal from './Petal';

const PetalFall = ({ count }) => {
  const petals = [];
  const petalImage = require('../../assets/images/petal.png');

  for (let i = 0; i < count; i++) {
    petals.push(
        <Petal
            key={i}
            size={30}
            startX={Math.random() * 400}
            duration={7000}
            delay={Math.random() * 5000}
            imageSource={petalImage}
        />
    );
  }

  return <>{petals}</>;
};

export default PetalFall;
