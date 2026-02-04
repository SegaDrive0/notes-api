import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NoteRepository } from './notes.repository';
import { UpdateNoteWithLogUseCase } from './update-note-with-log.use-case';

@Module({
  controllers: [NotesController],
  providers: [NotesService, NoteRepository, UpdateNoteWithLogUseCase],
})
export class NotesModule {}
