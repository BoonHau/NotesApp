import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface AppCardProps {
  children?: React.ReactNode | undefined;
}

const AppCard: React.FC<AppCardProps> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default AppCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    gap: 12,
  },
});
