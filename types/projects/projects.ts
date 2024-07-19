interface ProjectFile {
  filename: string;
  prefix: string;
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
}

export type { Project, ProjectFile };
