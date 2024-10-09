import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {AppButton, AppCard} from '../../components';
import {
  getNoteCategoryAvatarImageSourceBy,
  getNoteCategoryLabelBy,
} from '../../utils/enum/noteCategory';
import colors from '../../utils/colors';

interface SummaryListItemProps {
  category: string;
  count: number;
  onDetailPress?: () => void;
}

const SummaryListItem: FC<SummaryListItemProps> = ({
  category,
  count,
  onDetailPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Image
          source={getNoteCategoryAvatarImageSourceBy(category)}
          style={styles.avatar}
        />
        <Text style={styles.text}>{getNoteCategoryLabelBy(category)}</Text>
        <AppButton title="Detail" onPress={onDetailPress} />
      </View>
      <AppCard>
        <Text style={styles.text}>
          This topic has a total of {count} records.
        </Text>
      </AppCard>
    </View>
  );
};

export default SummaryListItem;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  summaryContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 55,
    height: 55,
  },
  text: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
  },
});
