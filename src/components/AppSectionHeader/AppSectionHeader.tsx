import {Image, StyleSheet, Text, View, ImageSourcePropType} from 'react-native';
import React from 'react';
import colors from '../../utils/colors';

interface AppSectionHeaderProps {
  title?: string;
  imageSource: ImageSourcePropType;
}

const AppSectionHeader: React.FC<AppSectionHeaderProps> = ({
  title,
  imageSource,
}) => {
  return (
    <View style={styles.header}>
      <Image source={imageSource} style={styles.icon} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default AppSectionHeader;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    gap: 12,
    marginTop: 25,
    marginBottom: 20,
  },
  icon: {height: 20, width: 20},
  title: {
    color: colors.text.primary,
    fontSize: 18,
    textAlign: 'center',
  },
});
