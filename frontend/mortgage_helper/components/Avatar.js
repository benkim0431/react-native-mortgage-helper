import React from 'react';
import {Image} from 'react-native';

function Avatar({source, size, style}) {
  // console.log('Avatar:', size);
  return (
    <Image
      source={source ? {uri: source} : require('../assets/images/user.png')}
      resizeMode="cover"
      style={[
        style,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}

Avatar.defaultProps = {
  size: 60,
};

export default Avatar;
