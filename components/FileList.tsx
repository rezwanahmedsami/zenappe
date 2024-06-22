'use client'
// components/FileList.tsx
import React, { useEffect, useState } from 'react';
import { FaFolder, FaFileAlt } from 'react-icons/fa';
import { invoke } from '@tauri-apps/api';

type FileItem = {
  name: string;
  type: 'folder' | 'file' | string;
};

const FileList: React.FC = () => {
  const [filesAndFolders, setFilesAndFolders] = useState<FileItem[]>([]);

  useEffect(() => {
    const fetchFilesAndFolders = async () => {
      try {
        const items: string[] = await invoke('list_files_and_folders', { path: '/' });
        const formattedItems = items.map((name) => ({
          name,
          type: name.includes('.') ? 'file' : 'folder',
        }));
        setFilesAndFolders(formattedItems);
      } catch (error) {
        console.error('Error fetching files and folders:', error);
      }
    };

    fetchFilesAndFolders();
  }, []);

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
