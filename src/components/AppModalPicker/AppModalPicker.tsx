// ModalPicker.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AppButton} from '../AppButton';

export interface AppModalPickerItem {
  key: string;
  value: string;
}

interface AppModalPickerProps {
  title?: string;
  data: AppModalPickerItem[];
  selectedValue?: string | null;
  isVisible: boolean;
  onClose: () => void;
  onSelect: (item: AppModalPickerItem) => void;
}

const AppModalPicker: React.FC<AppModalPickerProps> = ({
  title,
  isVisible,
  onClose,
  data,
  onSelect,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {title && <Text style={styles.modalTitle}>{title}</Text>}
          <FlatList
            data={data}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => onSelect(item)}
                style={styles.categoryItem}>
                <Text style={styles.categoryText}>{item.value}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.closeButton}>
            <AppButton title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AppModalPicker;
