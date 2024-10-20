// stores/snackbar.ts
import { defineStore } from "pinia";
import type { Project, ProjectFile } from "~/types/projects/projects";
const axios = useApi();

interface AddProjectData {
  name: string;
  description: string;
}

export const useProjectStore = defineStore("project", () => {
  const notify = useSnackbarStore();

  // State
  const isLoaded = ref(false);
  const loading = ref(false);
  const projects = ref<Project[]>([]);

  // Actions
  const loadProjects = async (reload = false) => {
    if ((!isLoaded.value || reload) && !loading.value) {
      loading.value = true;
      try {
        const { data } = await axios.get("/project/list/?skip=0&limit=10");
        projects.value = data;
        isLoaded.value = true;
      } catch (e) {
        notify.handleCatch(e);
      } finally {
        loading.value = false;
      }
    }
  };

  const addProject = async (
    addProjectData: AddProjectData
  ): Promise<boolean> => {
    let success = false;
    try {
      const result = await axios.post("/project/", addProjectData);
      const { data: project } = result;
      projects.value.push(project);
      success = true;
    } catch (e) {
      notify.handleCatch(e);
      success = false;
    }
    return success;
  };

  const findProject = (projectId: number | string): Project | null => {
    return (
      projects.value.find((project: Project) => project.id === projectId) ??
      null
    );
  };

  const deleteProject = (project: Project) => {
    axios.delete("", { data: project });
    loadProjects(true);
  };

  const addFileToProject = (projectId: number, file: ProjectFile) => {
    const foundedProject = projects.value.find((p) => p.id === projectId);
    if (!foundedProject) {
      notify.showDefaultError();
    } else {
      foundedProject.files.push(file);
    }
  };

  // Expose state and actions
  return {
    isLoaded,
    loading,
    projects,
    loadProjects,
    addProject,
    findProject,
    deleteProject,
    addFileToProject,
  };
});
