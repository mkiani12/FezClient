interface ProjectFile {
  id: number;
  filename: string;
  extension: string;
  image_path: string;
  file_path: string;
  thumbnail_path: string;
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
