declare namespace Note {
  type Note = {
    id: string;
  } & NoteData;

  type RawNote = {
    id: string;
  } & RawNoteData;

  type RawNoteData = {
    title: string;
    markdown: string;
    tagIds: string[];
  };

  type NoteData = {
    title: string;
    markdown: string;
    tags: Tag[];
  };

  type Tag = {
    id: string;
    label: string;
  };
}
