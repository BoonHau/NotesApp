import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {Note} from '../storage/models/Note';

const databaseName = 'notes.db';
const noteTableName = 'notes';

SQLite.enablePromise(true);

// Open a database
const openDatabase = async (): Promise<SQLiteDatabase> => {
  return SQLite.openDatabase(
    {
      name: databaseName,
      location: 'default',
    },
    () => {},
    error => {
      console.error('Error opening database: ', error);
    },
  );
};

const useNoteDatabase = () => {
  const createNoteTable = async (): Promise<void> => {
    const db = await openDatabase();
    const query = `CREATE TABLE IF NOT EXISTS ${noteTableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        category TEXT NOT NULL, 
        content TEXT NOT NULL,
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL
    );`;

    await db.executeSql(query);
  };

  const getCountByCategory = async (category: string): Promise<number> => {
    const db = await openDatabase();
    const query = `SELECT COUNT(*) AS total FROM ${noteTableName} WHERE category = ?;`;
    const statement = await db.executeSql(query, [category]);

    // Check if any rows are returned
    if (statement[0].rows.length === 0) {
      return 0; // Return 0 if no notes are found
    }
    // Assuming that there is only one row in the result for the COUNT query
    const total = statement[0].rows.item(0).total;

    return total;
  };

  const getTopThreeNotesByCategory = async (
    category: string,
  ): Promise<Array<Note>> => {
    const db = await openDatabase();
    const query = `SELECT * FROM ${noteTableName} WHERE category = ? ORDER BY createdAt DESC LIMIT 3;`;
    const statement = await db.executeSql(query, [category]);

    // Check if any rows are returned
    if (statement[0].rows.length === 0) {
      return []; // Return an empty array if no notes are found
    }

    // Extracting the results
    const notes: Note[] = [];
    for (let i = 0; i < statement[0].rows.length; i++) {
      notes.push(statement[0].rows.item(i));
    }

    return notes;
  };

  const deleteAllNotes = async (): Promise<void> => {
    const db = await openDatabase();
    const query = `DELETE FROM ${noteTableName};`;
    await db.executeSql(query);
  };

  const createNote = async (
    category: string,
    content: string,
  ): Promise<void> => {
    console.log('Temp 1: ' + new Date().toISOString());
    const db = await openDatabase();
    console.log('Temp 2: ' + new Date().toISOString());
    const query = `INSERT INTO ${noteTableName} (category, content, createdAt, updatedAt) VALUES (?, ?, ?, ?);`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    console.log('Temp 3: ' + new Date().toISOString());
    await db.executeSql(query, [category, content, createdAt, updatedAt]);
    console.log('Temp 4: ' + new Date().toISOString());
  };

  return {
    createNoteTable,
    createNote,
    getCountByCategory,
    deleteAllNotes,
    getTopThreeNotesByCategory,
  };
};

export default useNoteDatabase;
