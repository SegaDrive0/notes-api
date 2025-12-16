import { Controller, Get } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  getNotes() {
    return this.noteService.getNotes();
  }
}
