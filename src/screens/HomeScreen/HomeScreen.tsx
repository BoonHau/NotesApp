import {Alert, SectionList, StyleSheet, Text, View, Image} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  AppNavigatorProps,
  AppStackParamList,
} from '../../navigation/navigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import useNoteDatabase from '../../hooks/useNoteDatabase';
import {
  getNoteCategoryIconImageSourceBy,
  getNoteCategoryLabelBy,
  NoteCategory,
} from '../../utils/enum/noteCategory';
import {setLatestNotesByCategory} from '../../redux/slices/notesSlice';
import {
  AppGradientBackground,
  AppHeader,
  AppSectionHeader,
  AppTitleItem,
} from '../../components';
import {truncateText} from '../../utils/textHelpers';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../utils/colors';

const HomeScreen = () => {
  // Common
  const navigation = useNavigation<AppNavigatorProps>();

  // Database hook
  const {createNoteTable, getTopThreeNotesByCategory} = useNoteDatabase();

  // State
  const dispatch = useDispatch();
  const latestNotesFromStore = useSelector(
    (state: RootState) => state.notes.latestNotes,
  );
  const formattedlatestNotes = useMemo(() => {
    return Object.entries(latestNotesFromStore).map(([category, notes]) => ({
      title: category,
      data: notes,
    }));
  }, [latestNotesFromStore]);

  // Function
  const actNavigateTo = useCallback(
    (screen: keyof AppStackParamList, params?: any) => {
      navigation.navigate(screen, params);
    },
    [navigation],
  );

  // Fetch notes from the database on component mount
  useEffect(() => {
    const fetchAndDispatchNotes = async () => {
      try {
        // Create notes table if it doesn't exist
        await createNoteTable();

        // Fetch the top three notes for each category concurrently
        const notes = await Promise.all(
          Object.values(NoteCategory).map(category =>
            getTopThreeNotesByCategory(category),
          ),
        );

        // Dispatch each category notes to Redux store
        notes.forEach((notes, index) => {
          dispatch(
            setLatestNotesByCategory({
              category: Object.values(NoteCategory)[index],
              notes: notes,
            }),
          );
        });
      } catch (error) {
        Alert.alert('Oops! Something went wrong.');
        console.error('Database error:', error); // Log error for debugging
      }
    };

    fetchAndDispatchNotes();
  }, [dispatch]);

  return (
    <AppGradientBackground>
      <View style={styles.container}>
        <AppHeader
          title="Home"
          onPressRight={() => actNavigateTo('Settings')}
          onRightIcon={
            <Image
              source={require('../../assets/icons/ic_settings.png')}
              style={styles.icon}
            />
          }
        />
        <SafeAreaView style={styles.body} edges={['left', 'right']}>
          <View style={styles.labelContainer}>
            <Icon name="time-outline" size={24} color={colors.text.secondary} />
            <Text style={styles.labelText}>Recently created notes</Text>
          </View>
          <SectionList
            sections={formattedlatestNotes}
            keyExtractor={(item, _) => item.id}
            renderItem={({item}) => (
              <AppTitleItem
                title={truncateText(item.content, 20)}
                onPress={() => actNavigateTo('Note', {note: item})}
              />
            )}
            renderSectionHeader={({section: {title}}) => (
              <AppSectionHeader
                title={getNoteCategoryLabelBy(title)}
                imageSource={getNoteCategoryIconImageSourceBy(title)}
              />
            )}
            stickySectionHeadersEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </SafeAreaView>
      </View>
    </AppGradientBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 120, // Bottom tab bar height adjustment
  },
  body: {
    flex: 1,
    padding: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  labelText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  separator: {
    height: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
});
