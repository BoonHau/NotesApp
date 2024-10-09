import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import {NoteCategory} from '../../utils/enum/noteCategory';
import useNoteDatabase from '../../hooks/useNoteDatabase';

// Mock the useNoteDatabase hook
jest.mock('../../hooks/useNoteDatabase');

const mockStore = configureStore([]);

describe('HomeScreen', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      notes: {
        latestNotes: {
          [NoteCategory.WorkAndStudy]: [
            {id: '1', content: 'Test WorkAndStudy Note'},
          ],
          [NoteCategory.Life]: [{id: '2', content: 'Test Life Note'}],
        },
      },
    });

    (useNoteDatabase as jest.Mock).mockReturnValue({
      createNoteTable: jest.fn(),
      getTopThreeNotesByCategory: jest.fn().mockResolvedValue([]),
    });
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Recently created notes')).toBeTruthy();
    expect(getByText('Personal')).toBeTruthy();
    expect(getByText('Test Personal Note')).toBeTruthy();
    expect(getByText('Work')).toBeTruthy();
    expect(getByText('Test Work Note')).toBeTruthy();
  });

  it('fetches and displays notes from the database', async () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('Test Personal Note')).toBeTruthy();
      expect(getByText('Test Work Note')).toBeTruthy();
    });
  });

  it('displays an error alert if fetching notes fails', async () => {
    const mockCreateTable = jest
      .fn()
      .mockRejectedValue(new Error('Failed to create table'));
    (useNoteDatabase as jest.Mock).mockReturnValue({
      createNoteTable: mockCreateTable,
      getTopThreeNotesByCategory: jest.fn(),
    });

    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('Oops! Something went wrong.')).toBeTruthy();
    });
  });
});
