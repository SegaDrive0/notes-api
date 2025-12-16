import { Injectable } from '@nestjs/common';

export interface Note {
  id: number;
  title: string;
  content: string;
}

@Injectable()
export class NotesService {
  private notes: Note[] = [
    { id: 1, title: 'First title', content: 'My first content' },
  ];

  getNotes(): Note[] {
    return this.notes;
  }
}
