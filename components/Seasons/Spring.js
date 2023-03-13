import React from 'react';
import Bee from './Bee';
import PetalFall from './PetalFall';

export default function Spring() {

    const beeImage = require('../../assets/images/bee.png')

    return(
        <>
            <PetalFall count={7} />
            <Bee size={15} imageSource={beeImage} />
        </>
    );
}