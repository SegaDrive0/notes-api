import { NoteNotFoundError } from './errors/note-not-found.error';
import { UpdateNoteWithLogUseCase } from './update-note-with-log.use-case';

describe('UpdateNoteWithLogUseCase', () => {
  let useCase: UpdateNoteWithLogUseCase;

  const mockPrisma = {
    $transaction: jest.fn(),
  };

  const mockRepository = {
    findById: jest.fn(),
    update: jest.fn(),
    createLog: jest.fn(),
  };

  beforeEach(() => {
    useCase = new UpdateNoteWithLogUseCase(
      mockPrisma as any,
      mockRepository as any,
    );
  });

  it('should update note and create log', async () => {
    mockPrisma.$transaction.mockImplementation(async (callback) => {
      return callback();
    });

    mockRepository.findById.mockResolvedValue({ id: 1 });
    mockRepository.update.mockResolvedValue({
      id: 1,
      title: 'new',
      content: 'new',
    });

    mockRepository.createLog.mockResolvedValue({});

    const result = await useCase.execute(1, 'new', 'new');

    expect(result).toEqual({
      id: 1,
      title: 'new',
      content: 'new',
    });

    expect(mockRepository.update).toHaveBeenCalled();
    expect(mockRepository.createLog).toHaveBeenCalled();
  });

  it('should throw NoteNotFoundError if note exists', async () => {
    mockPrisma.$transaction.mockImplementation(async (callback) => {
      return callback();
    });

    mockRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(1, 'title', 'content')).rejects.toThrow(
      NoteNotFoundError,
    );
  });
});
