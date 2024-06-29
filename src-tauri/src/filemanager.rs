pub mod FileManager{
    use std::ffi::OsString;
    use std::fs;
    use std::os::unix::fs::PermissionsExt;
    use std::time::SystemTime;
    use serde::Serialize;

    use tauri::api::path::home_dir;

    #[derive(Serialize)]
    pub struct FilesFoldersObject {
        type_: String,
        name: String,
        size: u64,
        changed: String,
        rights: u32,
        owner: bool,
    }

    #[tauri::command]
    pub fn list_files_and_folders(path: Option<String>) -> Result<Vec<FilesFoldersObject>, String> {
        let path = path.unwrap_or_else(|| home_dir().unwrap().to_str().unwrap().to_string());
        let entries = fs::read_dir(path).map_err(|e| e.to_string())?;

        let mut items: Vec<FilesFoldersObject> = Vec::new();
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
            let file = FilesFoldersObject {
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
    pub fn get_home_dir() -> Result<String, String> {
        // sort and return a single /home/username path if its checking os
        let home = home_dir().unwrap().to_str().unwrap().to_string();
        Ok(home)
    }

    /*
        File Handler module
     */
    pub mod file_handler{
        use std::f32::consts::E;
        use std::fs;
        use std::io::Write;
        use std::path::Path;
        use std::process::Command;
        use notify::{Event, EventKind, RecommendedWatcher, RecursiveMode, Result as NotifyResult, Watcher};
        use std::sync::mpsc::channel;
        use std::thread;
        use std::time::Duration;

        #[tauri::command]
        pub fn read_file(file_path: String) -> Result<String, String> {
            let content = fs::read_to_string(file_path).map_err(|e| e.to_string())?;
            Ok(content)
        }

        #[tauri::command]
        pub fn write_file(file_path: String, content: String) -> Result<(), String> {
            let path = Path::new(&file_path);
            let mut file = fs::File::create(path).map_err(|e| e.to_string())?;
            file.write_all(content.as_bytes()).map_err(|e| e.to_string())?;
            Ok(())
        }

        // open file in default editor
        // #[tauri::command]
        // pub fn open_file(file_path: String, software: Option<String>) -> Result<(), String> {
        //     let path = Path::new(&file_path);
        //     println!("Opening file: {:?}", path);
            
        //     if let Some(software) = software {
        //         let _ = match Command::new(software).arg(path).status() {
        //             Ok(status) if status.success() => Ok(()),
        //             Ok(status) => Err(format!("Software exited with status: {}", status)),
        //             Err(e) => Err(format!("Failed to open software: {}", e)),
        //         };
        //     } else {
        //         let _ = match open::that(path) {
        //             Ok(_) => Ok(()),
        //             Err(e) => Err(format!("Failed to open the file: {}", e)),
        //         };
        //     }
        //     Ok(())
        // }

        #[tauri::command]
        pub fn open_file(file_path: String, software: Option<String>) -> Result<(), String> {
            let path = Path::new(&file_path);
            println!("Opening file: {:?}", path);
            
            if let Some(software) = software {
                let _ = match Command::new(software).arg(path).status() {
                    Ok(status) if status.success() => Ok(()),
                    Ok(status) => Err(format!("Software exited with status: {}", status)),
                    Err(e) => Err(format!("Failed to open software: {}", e)),
                };
            } else {
                let _ = match open::that(path) {
                    Ok(_) => Ok(()),
                    Err(e) => Err(format!("Failed to open the file: {}", e)),
                };
            }

            // Start monitoring the file for changes
            if let Err(e) = monitor_file(path.to_path_buf()) {
                eprintln!("Failed to monitor the file: {}", e);
            }else {
                println!("Monitoring file for changes...");
            }

            Ok(())
        }

        fn monitor_file(file_path: std::path::PathBuf) -> NotifyResult<()> {
            let (tx, rx) = channel();
        
            let mut watcher: RecommendedWatcher = notify::recommended_watcher(move |res| {
                if let Err(err) = tx.send(res) {
                    eprintln!("Failed to send event: {:?}", err);
                }
            })?;
        
            // Add a path to be watched.
            watcher.watch(&file_path, RecursiveMode::NonRecursive)?;
            println!("Started watching file: {:?}", file_path);
        
            thread::spawn(move || {
                while let Ok(res) = rx.recv() {
                    match res {
                        Ok(event) => {
                            println!("Received event: {:?}", event);
                            handle_event(event);
                        },
                        Err(e) => eprintln!("watch error: {:?}", e),
                    }
                }
                eprintln!("watch error: {:?}", "Failed to receive event")
            });
        
            Ok(())
        }
        
        fn handle_event(event: Event) {
            println!("File event: {:?}", event);
            // for path in event.paths {
            //     if event.kind == EventKind::Modify(_) {
            //         println!("File {:?} was modified!", path);
            //     } else if event.kind == EventKind::Create(_) {
            //         println!("File {:?} was created!", path);
            //     } else if event.kind == EventKind::Remove(_) {
            //         println!("File {:?} was deleted!", path);
            //     }
            // }
        }
    }
}