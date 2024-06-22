// components/FileList.tsx
import React from 'react';
import { FaFolder, FaFileAlt } from 'react-icons/fa';

type FileItem = {
  name: string;
  type: 'folder' | 'file';
};

const filesAndFolders: FileItem[] = [
  { name: 'Documents', type: 'folder' },
  { name: 'Pictures', type: 'folder' },
  { name: 'notes.txt', type: 'file' },
  { name: 'resume.pdf', type: 'file' },
];

const FileList: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Files and Folders</h1>
      <ul className="list-none p-0">
        {filesAndFolders.map((item, index) => (
          <li
            key={index}
            className="flex items-center p-2 border-b border-gray-700"
          >
            {item.type === 'folder' ? (
              <FaFolder className="text-yellow-500 mr-2" />
            ) : (
              <FaFileAlt className="text-blue-500 mr-2" />
            )}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
