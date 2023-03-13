import React from 'react';
import Seagull from './Seagul';
import Sunshine from './Sunshine';

export default function Summer() {
    const seagullImage = require('../../assets/images/seagul.png');

    return(
        <>
            <Seagull size={50} imageSource={seagullImage} />
            <Seagull size={30} imageSource={seagullImage} />
            <Sunshine size={90} />
        </>
    );
}