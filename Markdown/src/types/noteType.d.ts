declare namespace Note {
  type Note = {
    id: string;
  } & NoteData;
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
