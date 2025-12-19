import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import { GetNotesDto } from './dto/get-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  getNotes(@Query() query: GetNotesDto) {
    return this.noteService.getNotes(query);
  }

  @Get(':id')
  getNoteById(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.getNoteById(id);
  }

  @Post()
  createNote(@Body() body: CreateNoteDto) {
    return this.noteService.createNote(body.title, body.content);
  }

  @Put(':id')
  updateNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateNoteDto,
  ) {
    return this.noteService.updateNote(id, body.title, body.content);
  }

  @Delete(':id')
  deleteNote(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.deleteNote(id);
  }
}
