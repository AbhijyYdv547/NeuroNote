"use client";
import { useUserData } from "@/hooks/useUserData";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";



export const Editor = ({ docId }: { docId: string }) => {
  const {currentUser,loading} = useUserData();

  if(loading){
    return <div>Loading editor...</div>;
  }

  if (!currentUser) {
    return <div>Loading editor...</div>;
  }

  return <SimpleEditor docId={docId} userId={currentUser as string} />;
};

