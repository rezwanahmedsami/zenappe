// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::ffi::OsString;
use std::fs;
use std::os::unix::fs::PermissionsExt;
use std::time::SystemTime;
use serde::Serialize;

use tauri::api::path::home_dir;

#[derive(Serialize)]
struct File {
    type_: String,
    name: String,
    size: u64,
    changed: String,
    rights: u32,
    owner: bool,
}

#[tauri::command]
fn list_files_and_folders(path: Option<String>) -> Result<Vec<File>, String> {
    let path = path.unwrap_or_else(|| home_dir().unwrap().to_str().unwrap().to_string());
    let entries = fs::read_dir(path).map_err(|e| e.to_string())?;

    let mut items: Vec<File> = Vec::new();
    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let type_ = entry.file_type().map_err(|e| e.to_string())?;
        let type_ = if type_.is_dir() {
            "folder".to_string()
        } else if type_.is_file() {
            "file".to_string()
        } else if type_.is_symlink() {
            "symlink".to_string()
        } else {
            "unknown".to_string()
        };
        let file_name = entry.file_name();
        let file_name_str = file_name.to_string_lossy().to_string();
        let metadata = entry.metadata().map_err(|e| e.to_string())?;
        let size = metadata.len();
        let changed_time = metadata.modified().map_err(|e| e.to_string());
        let changed = match changed_time {
            Ok(time) => time.duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs().to_string(),
            Err(_) => "N/A".to_string(),
        };
        let rights = metadata.permissions().mode();
        let owner = metadata.permissions().readonly();
        let file = File {
            type_,
            name: file_name_str,
            size,
            changed,
            rights,
            owner,
        };
        items.push(file);
    }

    Ok(items)
}

#[tauri::command]
fn get_home_dir() -> Result<String, String> {
    // sort and return a single /home/username path if its checking os
    let home = home_dir().unwrap().to_str().unwrap().to_string();
    Ok(home)
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![list_files_and_folders, get_home_dir])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}