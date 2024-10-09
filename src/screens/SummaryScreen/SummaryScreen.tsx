import {StyleSheet, View, Image, Alert} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {AppGradientBackground} from '../../components/AppGradientBackground';
import {AppHeader} from '../../components/AppHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import useNoteDatabase from '../../hooks/useNoteDatabase';
import {NoteCategory} from '../../utils/enum/noteCategory';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {setCountByCategory} from '../../redux/slices/notesSlice';
import SummaryListItem from './SummaryListItem';

const SummaryScreen = () => {
  // Database hook
  const {createNoteTable, getCountByCategory} = useNoteDatabase();

  // State
  const dispatch = useDispatch();
  const totalRecordsFromStore = useSelector(
    (state: RootState) => state.notes.totalRecords,
  );
  const formattedTotalRecordsOfNotes = useMemo(() => {
    return Object.entries(totalRecordsFromStore).map(([category, count]) => ({
      category,
      count,
    }));
  }, [totalRecordsFromStore]);

  // Fetch data from the database on component mount
  useEffect(() => {
    const fetchAndDispatchNoteCounts = async () => {
      try {
        await createNoteTable();

        // Fetch counts for each category
        const counts = await Promise.all(
          Object.values(NoteCategory).map(category =>
            getCountByCategory(category),
          ),
        );

        // Dispatch counts to Redux
        counts.forEach((count, index) => {
          dispatch(
            setCountByCategory({
              category: Object.values(NoteCategory)[index],
              count,
            }),
          );
        });
      } catch (error) {
        Alert.alert('Oops! Something went wrong.');
        console.error('Database error:', error); // Log error for debugging
      }
    };

    fetchAndDispatchNoteCounts();
  }, [dispatch]);

  return (
    <AppGradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/img_summary.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <View style={styles.headerContent}>
            <AppHeader title="Summary" disableGradient />
          </View>
        </View>
        <SafeAreaView style={{flex: 1}} edges={['left', 'right']}>
          <FlatList
            style={styles.body}
            data={formattedTotalRecordsOfNotes}
            keyExtractor={item => item.category}
            renderItem={({item}) => (
              <SummaryListItem
                category={item.category}
                count={item.count}
                onDetailPress={() => Alert.alert('In progress')}
              />
            )}
            contentContainerStyle={styles.flatListContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </SafeAreaView>
      </View>
    </AppGradientBackground>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    marginBottom: 120, // Bottom tab bar height adjustment
  },
  header: {
    height: 150,
    flexDirection: 'row',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    aspectRatio: 1.44,
    height: '100%',
    width: undefined,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderTopStartRadius: 20,
    borderTopRightRadius: 20,
  },
  flatListContent: {
    padding: 20,
  },
  separator: {
    height: 20,
  },
});
