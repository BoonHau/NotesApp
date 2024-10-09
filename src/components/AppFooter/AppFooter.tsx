import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../utils/colors';

interface AppFooterProps {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle> | undefined;
}

const AppFooter: React.FC<AppFooterProps> = ({children, containerStyle}) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[colors.card.start, colors.card.end]}
      start={{x: 0.0368, y: 0}}
      end={{x: 1, y: 1}}
      style={[styles.footer, containerStyle]}>
      {children && <SafeAreaView edges={['bottom']}>{children}</SafeAreaView>}
    </LinearGradient>
  );
};

export default AppFooter;

const styles = StyleSheet.create({
  footer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
