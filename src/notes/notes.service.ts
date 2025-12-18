import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from './notes.types';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotes(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  async getNoteById(id: number): Promise<Note | null> {
    return this.prisma.note.findUnique({
      where: { id },
    });
  }

  async createNote(title: string, content: string): Promise<Note> {
    return this.prisma.note.create({
      data: { title, content },
    });
  }

  async updateNote(
    id: number,
    title: string,
    content: string,
  ): Promise<Note | null> {
    return this.prisma.note.update({
      where: { id },
      data: { title, content },
    });
  }

  async deleteNote(id: number): Promise<Note> {
    return this.prisma.note.delete({
      where: { id },
    });
  }
}
