import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { NoteRepository } from './notes.repository';

@Injectable()
export class UpdateNoteWithLogUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repo: NoteRepository,
  ) {}

  async execute(id: number, title: string, content: string) {
    return this.prisma.$transaction(async (tx) => {
      const note = await this.repo.findById(tx, id);

      if (!note) {
        throw new NotFoundException(`Note with id: ${id} not found`);
      }

      const updateNote = await this.repo.update(tx, id, title, content);

      await this.repo.createLog(tx, id, 'UPDATE');

      return updateNote;
    });
  }
}
