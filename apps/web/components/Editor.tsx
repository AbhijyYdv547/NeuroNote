"use client";

import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";

export const Editor = ({ docId }: { docId: string }) => {
  return <SimpleEditor docId={docId} />;
};

