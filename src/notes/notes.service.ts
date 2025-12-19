import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from './notes.types';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GetNotesDto } from './dto/get-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotes(query: GetNotesDto): Promise<Note[]> {
    const { page = 1, limit = 10, search } = query;

    const skip = (page - 1) * limit;

    return await this.prisma.note.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getNoteById(id: number) {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      throw new NotFoundException(`Note with id: ${id} not found`);
    }

    return note;
  }

  async createNote(title: string, content: string) {
    return await this.prisma.note.create({
      data: { title, content },
    });
  }

  async updateNote(id: number, title: string, content: string) {
    try {
      return await this.prisma.note.update({
        where: { id },
        data: { title, content },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException(`Note with id: ${id} not found`);
      }
      throw e;
    }
  }

  async deleteNote(id: number) {
    try {
      return await this.prisma.note.delete({
        where: { id },
      });
    } catch (e) {
      console.log(e);
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException(`Note with id: ${id} not found`);
      }
      throw e;
    }
  }
}
