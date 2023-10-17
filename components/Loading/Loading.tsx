import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = ({
  size = 150,
  color = '#5379FF',
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <ClipLoader color={color} className="text-primary" loading size={size} />
  );
};

export default Loading;
