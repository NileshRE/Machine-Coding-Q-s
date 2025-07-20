import { fileStrSchema } from "src/schema";

function findFileName(fileStructure: fileStrSchema[], id: number): string {
  for (const item of fileStructure) {
    // If current item is a file and matches the id
    if (!item.isFolder && item.id === id) {
      return item.name;
    }
    // If current item is a folder, recurse into its children
    if (item.isFolder && item.children) {
      const result = findFileName(item.children, id);
      if (result !== " ") {
        return result;
      }
    }
  }
  return " ";
}

function getFileExtension(name: string): { ext: string; name: string } {
  const parts = name.split(".");
  return parts.length > 1
    ? { ext: parts[parts.length - 1], name: parts[0] }
    : { ext: "", name: "" };
}

export { findFileName, getFileExtension };
