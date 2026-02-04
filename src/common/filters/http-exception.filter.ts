import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Response } from 'express';
import { NoteNotFoundError } from 'src/notes/errors/note-not-found.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    //   Domain error

    if (exception instanceof NoteNotFoundError) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: exception.message,
      });
    }

    // Prisma error

    if (
      exception instanceof Prisma.PrismaClientKnownRequestError &&
      exception.code === 'P2025'
    ) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'Entity not found',
      });
    }

    // Unknown
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });
  }
}
