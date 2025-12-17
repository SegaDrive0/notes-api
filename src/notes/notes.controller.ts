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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  getNotes() {
    return this.noteService.getNotes();
  }

  @Post()
  createNote(@Body() body: CreateNoteDto) {
    return this.noteService.createNote(body.title, body.content);
  }

  @Put(':id')
  editNote(@Param('id', ParseIntPipe) id: number, @Body() body: EditNoteDto) {
    return this.noteService.editNote(id, body.title, body.content);
  }

  @Delete(':id')
  deleteNote(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.deleteNote(id);
  }
}
