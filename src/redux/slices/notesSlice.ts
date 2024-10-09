import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {produce} from 'immer';
import {NoteCategory} from '../../utils/enum/noteCategory';

export interface Note {
  id: string;
  category: string;
  content: string;
}

export interface NotesState {
  latestNotes: Record<NoteCategory, Note[]>;
  totalRecords: Record<NoteCategory, number>;
}

// Extract categories from the NoteCategory enum
const noteCategories = Object.values(NoteCategory);

// Initialize the state for notes using the categories
const initialState: NotesState = {
  latestNotes: noteCategories.reduce((data, category) => {
    // Initialize an empty array for each category in latestNotes
    data[category] = [];
    return data;
  }, {} as Record<NoteCategory, Note[]>),

  totalRecords: noteCategories.reduce((data, category) => {
    // Initialize the count for each category in totalRecords
    data[category] = 0;
    return data;
  }, {} as Record<NoteCategory, number>),
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // Action to set the latest notes by category
    setLatestNotesByCategory: (
      state,
      action: PayloadAction<{category: NoteCategory; notes: Note[]}>,
    ) => {
      return produce(state, draft => {
        const {category, notes} = action.payload;
        if (draft.latestNotes[category] !== undefined) {
          draft.latestNotes[category] = notes;
        }
      });
    },

    // Action to set the count of notes by category
    setCountByCategory: (
      state,
      action: PayloadAction<{category: NoteCategory; count: number}>,
    ) => {
      return produce(state, draft => {
        const {category, count} = action.payload;
        if (draft.totalRecords[category] !== undefined) {
          draft.totalRecords[category] = count;
        }
      });
    },

    // Action to set the latest notes and count of notes by category
    setLatestNotesAndCountByCategoty: (
      state,
      action: PayloadAction<{
        category: NoteCategory;
        notes: Note[];
        count: number;
      }>,
    ) => {
      return produce(state, draft => {
        const {category, notes, count} = action.payload;
        if (draft.latestNotes[category] !== undefined) {
          draft.latestNotes[category] = notes;
        }
        if (draft.totalRecords[category] !== undefined) {
          draft.totalRecords[category] = count;
        }
      });
    },

    // New action to clear notes to inital state
    clearAllNotes: state => {
      return initialState;
    },
  },
});

export const {
  setLatestNotesByCategory,
  setCountByCategory,
  setLatestNotesAndCountByCategoty,
  clearAllNotes,
} = notesSlice.actions;
export default notesSlice.reducer;
