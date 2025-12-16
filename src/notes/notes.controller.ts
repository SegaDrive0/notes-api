import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  getNotes() {
    return this.noteService.getNotes();
  }

  @Post()
  createNote(@Body() body: { title: string; content: string }) {
    return this.noteService.createNote(body.title, body.content);
  }

  @Put(':id')
  editNote(
    @Param('id') id: string,
    @Body() body: { title: string; content: string },
  ) {
    let numberId = Number(id.slice(1, id.length));
    return this.noteService.editNote(numberId, body.title, body.content);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    let numberId = Number(id.slice(1, id.length));

    return this.noteService.deleteNote(numberId);
  }
}
