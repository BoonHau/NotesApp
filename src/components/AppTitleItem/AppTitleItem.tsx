import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AppCard from '../AppCard/AppCard';
import colors from '../../utils/colors';

interface AppTitleItemProps {
  title: string;
  onPress?: () => void;
  imageSource?: ImageSourcePropType;
}

const AppTitleItem: React.FC<AppTitleItemProps> = ({
  title,
  onPress,
  imageSource,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <AppCard>
        {imageSource && (
          <Image
            source={imageSource}
            style={styles.icon}
            resizeMode="contain"
          />
        )}
        <Text style={styles.title}>{title}</Text>
        <Icon name="chevron-forward" size={24} color={colors.icon.default} />
      </AppCard>
    </TouchableOpacity>
  );
};

export default AppTitleItem;

const styles = StyleSheet.create({
  title: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
  },
  icon: {height: 25, width: 25},
});
