import { fileStrData } from "@utils/constants";
import { findFileName } from "@utils/functions";
import { useState } from "react";
import { fileStrSchema } from "src/schema";

let globalId = 100;

const addItem = (
  tree: fileStrSchema[], // Accepting a tree of file structure as params
  parentId: number, // id to track in which node we want to add
  newItem: fileStrSchema // item to add
): fileStrSchema[] => {
  // returns file structure with newly added object
  return tree.map((node) => {
    if (node.id === parentId && node.isFolder) {
      const updatedNode = {
        ...node,
        children: [...(node.children || []), newItem], // Add file object to children array by copying the current items, if not items use empty array
      };
      return updatedNode; // returns updated node
    } else if (node.children) {
      // If node has a children too, find the id and add item
      //
      return {
        ...node,
        children: addItem(node.children, parentId, newItem), //return updated Node
      };
    }
    return node;
  });
};

const deleteItem = (tree: fileStrSchema[], itemId: number): fileStrSchema[] => {
  return tree
    .filter((node) => node.id !== itemId) // Find id and filter it out
    .map((node) =>
      node.children
        ? { ...node, children: deleteItem(node.children, itemId) }
        : node
    );
};

export const useFileHandler = () => {
  const [fileStructure, setFileStructure] = useState(fileStrData);
  const [folderOpen, setFolderOpen] = useState<{ [key: number]: boolean }>({}); // State to track folder open state
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null); // State to track which file is selected and show its details
  const [inputName, setInputName] = useState<string>(); // State for adding file and folder names
  const handleFolder = (id: number) => {
    setFolderOpen((prev) => ({
      // Set selected folder open by tracking its id, if it is open, close it and vice-versa
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleFile = (id: number) => {
    // Function for setting file id
    setSelectedFileId(id);
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Function for setting file and folder name
    setInputName(e.target.value);
  };
  const handleAddFile = (parentId: number) => {
    const newFile = {
      // Adding values for new file
      id: globalId++,
      name: inputName ?? "newFile.ts", // Default new file name if input is empty
      isFolder: false, // boolean false if file is adding
    };
    setFileStructure((prev) => addItem(prev, parentId, newFile)); // Adding a file object to file structure
    setInputName(""); // Reset input value
  };
  const handleAddFolder = (parentId: number) => {
    const newFolder = {
      // Adding values for new folder
      id: globalId++,
      name: inputName ?? "New Folder", // Default new folder name if input is empty
      isFolder: true, // boolean true if folder is adding
      children: [], // initiate empty children
    };
    setFileStructure((prev) => addItem(prev, parentId, newFolder)); // Adding a folder object to file structure
    setInputName(""); // Reset input value
  };
  const handleDelete = (itemId: number) => {
    setFileStructure((prev) => deleteItem(prev, itemId)); // Delete the file from current file structure
    setSelectedFileId(null); // If the file selected is deleted, set file Id null to show empty state
  };
  const fileName = selectedFileId
    ? findFileName(fileStructure, selectedFileId) // Find file name from file structure to show in details
    : null;
  return {
    folderOpen,
    handleFile,
    handleFolder,
    fileName,
    fileStructure,
    selectedFileId,
    handleInput,
    handleAddFolder,
    handleAddFile,
    inputName,
    handleDelete,
  };
};
