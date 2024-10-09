import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

const withDismissKeyboard = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <WrappedComponent {...props} />
        </View>
      </TouchableWithoutFeedback>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withDismissKeyboard;
