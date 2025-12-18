import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
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
  updateNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { title: string; content: string },
  ) {
    return this.noteService.updateNote(id, body.title, body.content);
  }

  @Delete(':id')
  deleteNote(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.deleteNote(id);
  }
}
