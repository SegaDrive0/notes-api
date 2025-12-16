import { Injectable } from '@nestjs/common';

export interface Note {
  id: number;
  title: string;
  content: string;
}

export type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; reason: 'NOT_FOUND' };

@Injectable()
export class NotesService {
  private notes: Note[] = [
    { id: 1, title: 'First title', content: 'My first content' },
  ];

  getNotes(): Note[] {
    return this.notes;
  }

  createNote(title: string, content: string): Note {
    const newNote = {
      id: Date.now(),
      title,
      content,
    };

    this.notes.push(newNote);

    return newNote;
  }

  editNote(id: number, title: string, content: string): ServiceResult<Note> {
    let note = this.notes.find((note) => note.id === id);

    if (!note) {
      return { success: false, reason: 'NOT_FOUND' };
    }

    note.title = title;
    note.content = content;

    return { success: true, data: note };
  }

  deleteNote(id: number): ServiceResult<Note> {
    let index = this.notes.findIndex((note) => note.id === id);

    if (index === -1) {
      return { success: false, reason: 'NOT_FOUND' };
    }

    let deletedNote = this.notes[index];

    if (!deletedNote) {
      return { success: false, reason: 'NOT_FOUND' };
    }

    this.notes.splice(index, 1);

    return { success: true, data: deletedNote };
  }
}
