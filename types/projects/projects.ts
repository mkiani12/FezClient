interface ProjectFile {
  id: number;
  filename: string;
  extension: string;
  image_path: null | string;
  file_path: null | string;
  thumbnail_path: null | string;
  unique_name: string;
}

interface Project {
  created_at: string;
  description: string;
  files: ProjectFile[];
  name: string;
  id: number;
  last_action: null | string;
  subtitle: null | string;
  tag: string;
  updated_at: string;
  first_file?: ProjectFile;
}

export type { Project, ProjectFile };
