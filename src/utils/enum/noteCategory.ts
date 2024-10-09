import {ImageSourcePropType} from 'react-native';
import {AppModalPickerItem} from '../../components';

export enum NoteCategory {
  WorkAndStudy = 'WorkAndStudy',
  Life = 'Life',
  HealthAndWellness = 'HealthAndWellness',
}

export function getNoteCategoryLabelBy(category: string): string {
  switch (category) {
    case NoteCategory.WorkAndStudy:
      return 'Work And Study';
    case NoteCategory.Life:
      return 'Life';
    case NoteCategory.HealthAndWellness:
      return 'Health And Wellness';
    default:
      return '';
  }
}

export const getNoteCategoryAvatarImageSourceBy = (
  category: string,
): ImageSourcePropType => {
  switch (category) {
    case NoteCategory.WorkAndStudy:
      return require('../../assets/images/img_avatar_1.png');
    case NoteCategory.Life:
      return require('../../assets/images/img_avatar_2.png');
    case NoteCategory.HealthAndWellness:
      return require('../../assets/images/img_avatar_3.png');
    default:
      return require('../../assets/images/img_avatar_1.png');
  }
};

export const getNoteCategoryIconImageSourceBy = (
  category: string,
): ImageSourcePropType => {
  switch (category) {
    case NoteCategory.WorkAndStudy:
      return require('../../assets/icons/ic_pen.png');
    case NoteCategory.Life:
      return require('../../assets/icons/ic_bell.png');
    case NoteCategory.HealthAndWellness:
      return require('../../assets/icons/ic_wellness.png');
    default:
      return require('../../assets/icons/ic_bell.png');
  }
};

export const getNoteCategoryAppModalPickerItemItems =
  (): AppModalPickerItem[] => {
    return Object.values(NoteCategory).map(category => ({
      key: category,
      value: getNoteCategoryLabelBy(category),
    }));
  };
