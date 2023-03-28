import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomButton from '../components/CustomButton';

function Button({name, onSubmit}) {

    return (
    <View style={styles.buttons}>
      {
        <CustomButton
            title={name}
            hasMarginBottom={true}
            onPress={onSubmit}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 60,
  },
});

export default Button;
