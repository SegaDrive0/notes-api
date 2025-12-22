-- CreateTable
CREATE TABLE "NoteLog" (
    "id" SERIAL NOT NULL,
    "noteId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoteLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NoteLog" ADD CONSTRAINT "NoteLog_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
