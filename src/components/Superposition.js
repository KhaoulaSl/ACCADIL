import React from 'react';
import ReactCompareImage from 'react-compare-image';

const Superposition = ({ path1, path2 }) => {
  return (
    <div className="col-6">
      <ReactCompareImage leftImage={path1} rightImage={path2} />
    </div>
  );
};

export default Superposition;
