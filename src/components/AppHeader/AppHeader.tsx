import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface AppHeaderProps {
  title?: string;
  onPressBack?: () => void;
  onPressRight?: () => void;
  onRightIcon?: React.ReactNode | undefined;
  disableGradient?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  onPressBack,
  onPressRight,
  onRightIcon,
  disableGradient = false,
}) => {
  const {top} = useSafeAreaInsets();
  return disableGradient ? (
    <SafeAreaView
      style={[styles.toolbar, {marginTop: top}]}
      edges={['left', 'right']}>
      {onPressBack && (
        <TouchableOpacity onPress={onPressBack} style={styles.iconButton}>
          <Icon name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {onPressRight && onRightIcon && (
        <TouchableOpacity onPress={onPressRight} style={styles.iconButton}>
          {onRightIcon}
        </TouchableOpacity>
      )}
    </SafeAreaView>
  ) : (
    <LinearGradient
      colors={['#280947', '#280841']}
      start={{x: 0.0368, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.header}>
      <SafeAreaView
        style={[styles.toolbar, {marginTop: top}]}
        edges={['left', 'right']}>
        {onPressBack && (
          <TouchableOpacity onPress={onPressBack} style={styles.iconButton}>
            <Icon name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {onPressRight && onRightIcon && (
          <TouchableOpacity onPress={onPressRight} style={styles.iconButton}>
            {onRightIcon}
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '500',
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});
