// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::ffi::OsString;
use std::fs;

use tauri::api::path::home_dir;

#[tauri::command]
fn list_files_and_folders(path: Option<String>) -> Result<Vec<String>, String> {
    let path = path.unwrap_or_else(|| home_dir().unwrap().to_str().unwrap().to_string());
    let entries = fs::read_dir(path).map_err(|e| e.to_string())?;

    let mut items = Vec::new();
    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let file_name = entry.file_name();
        let file_name_str = file_name.to_string_lossy().into_owned();
        items.push(file_name_str);
    }

    Ok(items)
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![list_files_and_folders])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}