import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

type PrismaTx = Prisma.TransactionClient;

@Injectable()
export class NoteRepository {
  findById(prisma: PrismaTx | PrismaClient, id: number) {
    return prisma.note.findUnique({
      where: { id },
    });
  }

  update(
    prisma: PrismaTx | PrismaClient,
    id: number,
    title: string,
    content: string,
  ) {
    return prisma.note.update({
      where: { id },
      data: { title, content },
    });
  }

  createLog(prisma: PrismaTx | PrismaClient, noteId: number, message: string) {
    return prisma.noteLog.create({
      data: { noteId, action: message },
    });
  }
}
