// server.ts
import { Server } from "@hocuspocus/server";
import * as fs from "fs";
import * as path from "path";
import * as Y from "yjs";

const DOC_DIR = path.join(__dirname, "documents");

// Make sure the folder exists
if (!fs.existsSync(DOC_DIR)) {
  fs.mkdirSync(DOC_DIR);
}

const server = Server.configure({
  port: 1234,

  // 🧠 Save document content when it's updated
  onStoreDocument: async ({ document, documentName }) => {
    const filePath = path.join(DOC_DIR, `${documentName}.yjs`);
    const state = Y.encodeStateAsUpdate(document);
    fs.writeFileSync(filePath, state);
    console.log(`💾 Stored: ${filePath}`);
  },

  // 📦 Load document content when someone joins
  onLoadDocument: async ({ documentName }) => {
    const filePath = path.join(DOC_DIR, `${documentName}.yjs`);
    if (fs.existsSync(filePath)) {
      const update = fs.readFileSync(filePath);
      const doc = new Y.Doc();
      Y.applyUpdate(doc, update);
      return doc;
    }
    return new Y.Doc(); // return empty doc if not found
  },
});

server.listen();
console.log("🚀 Hocuspocus server running on ws://localhost:1234");
