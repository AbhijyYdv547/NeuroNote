"use client";
import * as Y from "yjs";
import { HocuspocusProvider } from '@hocuspocus/provider';
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const ydoc = new Y.Doc();

const provider = new HocuspocusProvider({
  url: 'ws://localhost:1234',
  name: 'my-room', 
  document: ydoc,
});

export const Editor = () => {
  const editor = useEditor({
    immediatelyRender:false,
    extensions: [
      StarterKit.configure({ history: false }), 
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: "User " + Math.floor(Math.random() * 1000),
          color: `hsl(${Math.random() * 360}, 100%, 75%)`,
        },
      }),
    ],
  });

  return <EditorContent editor={editor} />;
};

