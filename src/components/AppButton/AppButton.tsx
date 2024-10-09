import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../utils/colors';

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
});
