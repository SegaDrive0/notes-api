export class NoteNotFoundError extends Error {
  constructor(id: number) {
    super(`Note with ${id} not found`);
  }
}
