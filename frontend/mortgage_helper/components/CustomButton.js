import React from 'react';
import {StyleSheet, View, Pressable, Text, Platform} from 'react-native';

function CustomButton({onPress, title, hasMarginBottom, theme}) {
  const isPrimary = theme === 'primary';
  return (
    <View
      style={[styles.block, styles.overflow, hasMarginBottom && styles.margin]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{
          color: '#FFFFFF',
        }}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

CustomButton.defaultProps = {
  theme: 'primary',
};

const styles = StyleSheet.create({
  overflow: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 20,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
  },
  primaryWrapper: {
    backgroundColor: '#FCA311',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000000',
  },
  margin: {
    marginBottom: 16,
  },
});
export default CustomButton;
