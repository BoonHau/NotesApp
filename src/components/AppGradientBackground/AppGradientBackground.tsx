import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';

interface AppGradientBackgroundProps {
  children?: React.ReactNode | undefined;
}

const AppGradientBackground: FC<AppGradientBackgroundProps> = ({children}) => {
  return (
    <View style={styles.absoluteView}>
      <LinearGradient
        colors={['#240D38', 'rgba(51, 15, 82, 0)']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 0.13}}
        style={styles.absoluteView}
      />
      <LinearGradient
        colors={['#1B284F', '#351159', '#421C45', '#3B184E']}
        start={{x: 0.5, y: 0.14}}
        end={{x: 0.5, y: 1}}
        style={styles.absoluteView}
      />
      <BlurView style={styles.absoluteView} blurType="dark" blurAmount={2} />
      {children}
    </View>
  );
};

export default AppGradientBackground;

const styles = StyleSheet.create({
  absoluteView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
