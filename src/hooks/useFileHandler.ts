import { fileStrData } from "@utils/constants";
import { findFileName } from "@utils/functions";
import { useState } from "react";
import { fileStrSchema } from "src/schema";

let globalId = 100;

const addItem = (
  tree: fileStrSchema[],
  parentId: number,
  newItem: fileStrSchema
): fileStrSchema[] => {
  return tree.map((node) => {
    if (node.id === parentId && node.isFolder) {
      const updatedNode = {
        ...node,
        children: [...(node.children || []), newItem],
      };
      return updatedNode;
    } else if (node.children) {
      return {
        ...node,
        children: addItem(node.children, parentId, newItem),
      };
    }
    return node;
  });
};

const deleteItem = (tree: fileStrSchema[], itemId: number): fileStrSchema[] => {
  return tree
    .filter((node) => node.id !== itemId)
    .map((node) =>
      node.children
        ? { ...node, children: deleteItem(node.children, itemId) }
        : node
    );
};

export const useFileHandler = () => {
  const [fileStructure, setFileStructure] = useState(fileStrData);
  const [folderOpen, setFolderOpen] = useState<{ [key: number]: boolean }>({});
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const [inputName, setInputName] = useState<string>();
  const handleFolder = (id: number) => {
    setFolderOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleFile = (id: number) => {
    setSelectedFileId(id);
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };
  const handleAddFile = (parentId: number) => {
    const newFile = {
      id: globalId++,
      name: inputName ?? "newFile.ts",
      isFolder: false,
    };
    setFileStructure((prev) => addItem(prev, parentId, newFile));
    setInputName("");
  };
  const handleAddFolder = (parentId: number) => {
    const newFolder = {
      id: globalId++,
      name: inputName ?? "New Folder",
      isFolder: true,
      children: [],
    };
    setFileStructure((prev) => addItem(prev, parentId, newFolder));
    setInputName("");
  };
  const handleDelete = (itemId: number) => {
    setFileStructure((prev) => deleteItem(prev, itemId));
  };
  const fileName = selectedFileId
    ? findFileName(fileStructure, selectedFileId)
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
