// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
pub mod filemanager;
use filemanager::file_manager;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        file_manager::list_files_and_folders, 
        file_manager::get_home_dir,
        file_manager::file_handler::open_file,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}