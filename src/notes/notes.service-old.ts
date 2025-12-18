import { Injectable } from '@nestjs/common';
import { Note } from './notes.types';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

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

  createNote(body: CreateNoteDto): Note {
    const { title, content } = body;
    const newNote = {
      id: Date.now(),
      title,
      content,
    };

    this.notes.push(newNote);

    return newNote;
  }

  updateNote(id: number, body: UpdateNoteDto): ServiceResult<Note> {
    const { title, content } = body;
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
