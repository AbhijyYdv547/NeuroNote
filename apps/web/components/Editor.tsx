"use client";
import * as Y from "yjs";
import { HocuspocusProvider } from '@hocuspocus/provider';
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getToken } from "../hooks/useAuthToken";


export const Editor = ({ docId }: { docId: string }) => {

  const token = getToken();

  const ydoc = new Y.Doc();

  const provider = new HocuspocusProvider({
    url: 'ws://localhost:1234',
    name: docId,
    document: ydoc,
    token
  });


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

