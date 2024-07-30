import React from 'react';
import ReactCompareImage from 'react-compare-image';

const Slider = ({ image1, image2 }) => {
    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <ReactCompareImage leftImage={image1} rightImage={image2} />
        </div>
    );
};

export default Slider;
