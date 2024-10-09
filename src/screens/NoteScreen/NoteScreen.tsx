import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppGradientBackground} from '../../components/AppGradientBackground';
import {AppHeader} from '../../components/AppHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  AppNavigatorProps,
  AppStackParamList,
} from '../../navigation/navigationTypes';
import AppFooter from '../../components/AppFooter/AppFooter';
import {AppButton} from '../../components/AppButton';
import AppCard from '../../components/AppCard/AppCard';
import Icon from 'react-native-vector-icons/Ionicons';
import withDismissKeyboard from '../../hoc/withDismissKeyboard';
import {useDispatch} from 'react-redux';
import useNoteDatabase from '../../hooks/useNoteDatabase';
import {
  getNoteCategoryLabelBy,
  NoteCategory,
  getNoteCategoryAppModalPickerItemItems,
} from '../../utils/enum/noteCategory';
import {setLatestNotesAndCountByCategoty} from '../../redux/slices/notesSlice';
import CategoryPicker from '../../components/AppModalPicker/AppModalPicker';
import colors from '../../utils/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppModalPicker from '../../components/AppModalPicker/AppModalPicker';

const NoteScreen = () => {
  // Common
  const route = useRoute<RouteProp<AppStackParamList, 'Note'>>();
  const navigation = useNavigation<AppNavigatorProps>();
  const {note} = route.params || {};

  // Database hook
  const {
    createNoteTable,
    createNote,
    getTopThreeNotesByCategory,
    getCountByCategory,
  } = useNoteDatabase();

  // States
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    note
      ? {category: note.category, content: note.content}
      : {category: '', content: ''},
  );
  const [isLoading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // Function
  const actOnSave = async () => {
    const {category, content} = formData;

    // Input validation
    if (!category || !content) {
      Alert.alert('Please fill in both fields.');
      return;
    }

    // Show loading
    setLoading(true);
    try {
      await createNote(category, content);
      const totalRecords = await getCountByCategory(category);
      const latestNotes = await getTopThreeNotesByCategory(category);
      dispatch(
        setLatestNotesAndCountByCategoty({
          category: category as NoteCategory,
          notes: latestNotes,
          count: totalRecords,
        }),
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert('Ops! Something wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Input change handler
  const actOnTextChanged = (name: string, value: string) => {
    setFormData(prev => ({...prev, [name]: value}));
  };

  // Category picker select handler
  const actOnCategorySelected = (category: string) => {
    setFormData(prev => ({...prev, category}));
    setModalVisible(false);
  };

  // Constructor
  useEffect(() => {
    const initializeNoteDatabase = async () => {
      try {
        await createNoteTable();
      } catch (error) {
        Alert.alert('Ops! Something wrong.');
        console.error('Database error:', error); // Log error for debugging
      }
    };

    initializeNoteDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <AppGradientBackground />
      <AppHeader
        title={note ? 'Note' : 'New note'}
        onPressBack={() => navigation.goBack()}
      />
      <SafeAreaView style={styles.body} edges={['left', 'right']}>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={note != null}
          onPress={() => setModalVisible(true)}>
          <AppCard>
            <TextInput
              style={styles.text}
              editable={false}
              placeholder="Choose a category"
              placeholderTextColor={colors.text.placeholder}
              value={getNoteCategoryLabelBy(formData.category)}
            />
            <Icon name="chevron-down" size={24} color={colors.icon.inactive} />
          </AppCard>
        </TouchableOpacity>

        <AppCard>
          <TextInput
            style={styles.textInput}
            placeholder="Please input note content"
            placeholderTextColor={colors.text.placeholder}
            value={formData.content}
            maxLength={200}
            editable={note == null}
            multiline
            scrollEnabled
            onChangeText={text => actOnTextChanged('content', text)}
          />
        </AppCard>
      </SafeAreaView>
      {note ? null : (
        <AppFooter containerStyle={styles.footer}>
          <AppButton
            title={isLoading ? 'Saving...' : 'Save'}
            onPress={actOnSave}
            isLoading={isLoading}
          />
        </AppFooter>
      )}

      <AppModalPicker
        title="Choose a category"
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        data={getNoteCategoryAppModalPickerItemItems()}
        onSelect={item => actOnCategorySelected(item.key)}
      />
    </View>
  );
};

export default withDismissKeyboard(NoteScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  text: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    height: 200,
    color: colors.text.primary,
    fontSize: 16,
  },
  footer: {
    padding: 20,
  },
});
