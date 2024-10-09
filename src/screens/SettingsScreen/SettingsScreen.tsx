import {Alert, Button, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AppGradientBackground} from '../../components/AppGradientBackground';
import {AppHeader} from '../../components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {AppNavigatorProps} from '../../navigation/navigationTypes';
import AppFooter from '../../components/AppFooter/AppFooter';
import {AppButton} from '../../components/AppButton';
import {FlatList} from 'react-native-gesture-handler';
import {AppTitleItem} from '../../components/AppTitleItem';
import {useDispatch} from 'react-redux';
import useNoteDatabase from '../../hooks/useNoteDatabase';
import {clearAllNotes} from '../../redux/slices/notesSlice';
import {getSettingsMenu} from './helper';
import {SafeAreaView} from 'react-native-safe-area-context';

const SettingsScreen = () => {
  // Common
  const navigation = useNavigation<AppNavigatorProps>();

  // Database hook
  const {deleteAllNotes} = useNoteDatabase();

  // State
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  // Function
  const actOnDeleteAllNotes = async () => {
    setLoading(true);
    try {
      await deleteAllNotes();
      dispatch(clearAllNotes());
      navigation.goBack();
    } catch (error) {
      Alert.alert('Ops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const actDeleteAllNotesConformation = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete all notes? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: actOnDeleteAllNotes,
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <AppGradientBackground>
      <View style={styles.container}>
        <AppHeader title="Settings" onPressBack={() => navigation.goBack()} />
        <SafeAreaView style={styles.body} edges={['left', 'right']}>
          <FlatList
            data={getSettingsMenu()}
            keyExtractor={item => item.title}
            renderItem={({item}) => (
              <AppTitleItem
                title={item.title}
                imageSource={item.imageSource}
                onPress={() =>
                  Linking.openURL(item.url).catch(error =>
                    Alert.alert('Ops! Something went wrong.', error),
                  )
                }
              />
            )}
            contentContainerStyle={{padding: 20}}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
          />
        </SafeAreaView>
        <AppFooter>
          <View style={{padding: 20}}>
            <AppButton
              title={isLoading ? 'Deleting...' : 'Delete All Notes'}
              onPress={actDeleteAllNotesConformation}
              isLoading={isLoading}
            />
          </View>
        </AppFooter>
      </View>
    </AppGradientBackground>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});
