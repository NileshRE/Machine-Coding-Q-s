import Heading from "@components/Common/Heading";
import { useFileHandler } from "@hooks/useFileHandler";
import { getFileExtension } from "@utils/functions";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  FilePlus,
  Folder,
  FolderOpen,
  FolderPlus,
  PackageOpen,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { defaultStyles, FileIcon } from "react-file-icon";
import { fileStrSchema } from "src/schema";

const FileExplorer = () => {
  const {
    handleFile,
    handleFolder,
    fileName,
    folderOpen,
    fileStructure,
    selectedFileId,
    inputName,
    handleInput,
    handleAddFolder,
    handleAddFile,
    handleDelete,
  } = useFileHandler();

  return (
    <div className="h-screen" data-testid="file-explorer">
      <Heading heading="File Explorer" />
      <div className="flex flex-col md:grid md:grid-cols-12 h-full">
        <div className="col-span-4 p-3 bg-gray-800 box-border">
          <h2 className="text-xl font-medium text-white mb-4 text-left">
            My Project
          </h2>
          <FileTree
            fileStructure={fileStructure}
            handleFile={handleFile}
            handleFolder={handleFolder}
            folderOpen={folderOpen}
            fileValue={inputName ?? ""}
            onChange={handleInput}
            handleDelete={handleDelete}
            handleAddFile={handleAddFile}
            handleAddFolder={handleAddFolder}
          />
        </div>
        <div className="col-span-8 text-white p-3 bg-gray-900">
          {/* If no file seleted or file id is falsy values show empty state */}
          {!selectedFileId && (
            <div className="h-full flex flex-col gap-4 items-center justify-center">
              <div className="h-72 rounded-t-full rounded-l-md rounded-r-md rounded-b-xl flex items-center justify-center">
                <PackageOpen className="size-64" />
              </div>
              <p className="text-gray-300 text-xl font-medium">
                No File Selected!
              </p>
            </div>
          )}
          {/* If fileId exists and file Name is found show its details */}
          {fileName && (
            <>
              <h2 className="text-xl font-medium mb-2 first-letter:capitalize">
                {getFileExtension(fileName).name}
              </h2>
              <p className="text-gray-400 text-sm font-medium">
                Here you can view the content of {fileName}.
              </p>
              <div className="flex items-center justify-center h-80 mt-16">
                <div className="size-64">
                  <FileIconCustom name={fileName} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;

export const FileIconCustom = ({ name }: { name: string }) => {
  const fileExt = getFileExtension(name).ext;
  return (
    <FileIcon
      extension={fileExt}
      {...defaultStyles[fileExt as keyof typeof defaultStyles]}
    />
  );
};

export const FileTree = ({
  fileStructure,
  folderOpen,
  onChange,
  fileValue,
  handleFolder,
  handleFile,
  handleDelete,
  handleAddFile,
  handleAddFolder,
}: {
  fileStructure: fileStrSchema[];
  folderOpen: { [key: number]: boolean };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileValue: string;
  handleFolder: (id: number) => void;
  handleFile: (id: number) => void;
  handleDelete: (id: number) => void;
  handleAddFolder: (id: number) => void;
  handleAddFile: (id: number) => void;
}) => {
  const [adding, setAdding] = useState<{ [key: string]: boolean }>({});
  const [isFolder, setIsFolder] = useState<boolean>(false);
  const handleAddFileToNode = (isFolderAdd: boolean, id: number) => {
    setAdding((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setIsFolder(isFolderAdd);
  };
  const handleAdd = (id: number) => {
    if (isFolder) {
      handleAddFolder(id);
    } else {
      handleAddFile(id);
    }
    setAdding((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <ul
      className="ml-2"
      style={{
        width: "-webkit-fill-available",
      }}
    >
      {fileStructure?.map((str) => (
        <li
          key={str.id}
          className="mx-2 text-white flex flex-col items-start w-full"
        >
          <div className="p-2 flex items-center justify-between w-full hover:font-medium hover:bg-gray-700 cursor-pointer rounded-md">
            <div className="flex items-center gap-2 w-full">
              {/* Button to handle opening and closing of folders, if node is not a folder don't render button */}
              {str.isFolder ? (
                <button
                  onClick={() => handleFolder(str.id)}
                  aria-label={
                    folderOpen[str.id] ? "collapse folder" : "expand folder"
                  }
                >
                  {folderOpen[str.id] ? (
                    <ChevronDown className="size-4" />
                  ) : (
                    <ChevronRight className="size-4 text-gray-500 hover:text-white" />
                  )}
                </button>
              ) : null}
              {/* Button to show open and closed folder icon */}
              {str.isFolder ? (
                folderOpen[str.id] ? (
                  <FolderOpen className="size-5" />
                ) : (
                  <Folder className="size-5" />
                )
              ) : (
                <div className="size-3">
                  <FileIconCustom name={str.name} />
                </div>
              )}
              <span className={`${str.isFolder ? "text-base" : "text-sm"}`}>
                {str.name}
              </span>
            </div>
            <div className="flex items-center gap-2 mr-2">
              {/* File adding button */}
              {str.isFolder && (
                <button
                  onClick={() => handleAddFileToNode(false, str.id)}
                  aria-label="add file"
                >
                  <FilePlus className="size-4 text-gray-500 hover:text-white" />
                </button>
              )}
              {/* Folder adding button */}
              {str.isFolder && (
                <button
                  onClick={() => handleAddFileToNode(true, str.id)}
                  aria-label="add folder"
                >
                  <FolderPlus className="size-4 text-gray-500 hover:text-white" />
                </button>
              )}
              {/* Delete button */}
              <button
                onClick={() => handleDelete(str.id)}
                aria-label={`${isFolder ? "delete folder" : "delete file"}`}
              >
                <Trash2 className="text-red-400 hover:text-red-500 size-4" />
              </button>
              {/* View File details Button */}
              {!str.isFolder && (
                <button
                  onClick={() => handleFile(str.id)}
                  aria-label="view file"
                >
                  <Eye className="text-gray-400 hover:text-gray-500 size-4" />
                </button>
              )}
            </div>
          </div>
          {/* If clicked on Add then show input */}
          {adding[str.id] && (
            <div className="relative">
              <input
                type="text"
                onChange={onChange}
                value={fileValue}
                placeholder={`${
                  isFolder ? "Enter Folder Name" : "Enter file name"
                }`}
                className="text-sm bg-transparent border border-gray-600 rounded-md px-2 py-1 block ml-5 my-2 placeholder:text-xs"
              />
              {/* If folder is adding show add Folder otherwise add File */}
              {isFolder ? (
                <button
                  className="text-green-400 text-xs absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => handleAdd(str.id)}
                  aria-label="save folder"
                >
                  Save Folder
                </button>
              ) : (
                <button
                  className="text-green-400 text-xs absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => handleAdd(str.id)}
                  aria-label="save file"
                >
                  Save File
                </button>
              )}
            </div>
          )}
          {/* If object has a folder and is open and has a children, call file true !!!<< Recursively >>!!! */}
          {str.isFolder && folderOpen[str.id] && str.children && (
            <FileTree
              fileStructure={str.children}
              handleFolder={handleFolder}
              handleFile={handleFile}
              folderOpen={folderOpen}
              onChange={onChange}
              fileValue={fileValue}
              handleAddFile={handleAddFile}
              handleAddFolder={handleAddFolder}
              handleDelete={handleDelete}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
