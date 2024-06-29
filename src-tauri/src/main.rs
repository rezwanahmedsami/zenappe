// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
pub mod filemanager;
use filemanager::FileManager;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        FileManager::list_files_and_folders, 
        FileManager::get_home_dir,
        FileManager::file_handler::open_file,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}