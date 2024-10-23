// stores/snackbar.ts
import { defineStore } from "pinia";
import type {
  ExportedFile,
  Project,
  ProjectFile,
} from "~/types/projects/projects";

interface AddProjectData {
  name: string;
  description: string;
}

type DeleteType = "" | "Project" | "File" | "Export";

export const useProjectStore = defineStore("project", () => {
  const axios = useApi();
  const notify = useSnackbarStore();
  const { $event } = useNuxtApp();

  // State
  const isLoaded = ref(false);
  const loading = ref(false);
  const projects = ref<Project[]>([]);

  const deleteDialog = ref(false);
  const deleteType = ref<DeleteType>("");
  const selectedDeleteObject = ref<Project | ExportedFile | ProjectFile | null>(
    null
  );
  const selectedDeleteProjectId = ref<number>(0);

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

  const getProject = async (id: number | string): Promise<Project | null> => {
    let foundedProject: null | Project = null;
    await axios
      .get(`/project/${id}`)
      .then(({ data }) => {
        foundedProject = data;
      })
      .catch((e) => {
        notify.handleCatch(e);
      });
    return foundedProject;
  };

  const findProject = (projectId: number | string): Project | null => {
    return (
      projects.value.find((project: Project) => project.id === projectId) ??
      null
    );
  };

  const addFileToProject = (projectId: number, file: ProjectFile) => {
    const foundedProject = projects.value.find((p) => p.id === projectId);
    if (!foundedProject) {
      notify.showDefaultError();
    } else {
      foundedProject.files.push(file);
    }
  };

  const addExportToProject = (projectId: number, exported: ExportedFile) => {
    const foundedProject = projects.value.find((p) => p.id === projectId);
    if (!foundedProject) {
      notify.showDefaultError();
    } else {
      foundedProject.operation_output.push(exported);
    }
  };

  const showDeleteDialog = (
    type: DeleteType,
    object: Project | ExportedFile | ProjectFile,
    projectId?: number
  ) => {
    selectedDeleteObject.value = object;
    selectedDeleteProjectId.value = projectId ?? 0;
    deleteType.value = type;
    deleteDialog.value = true;
  };

  const clearDeleteDialog = () => {
    deleteType.value = "";
    deleteDialog.value = false;
  };

  const doDelete = () => {
    switch (deleteType.value) {
      case "Project":
        deleteProject();
        break;
      case "File":
        deleteFile();
        break;
      case "Export":
        deleteExport();
        break;
    }
  };

  const deleteProject = () => {
    loadProjects(true);
    clearDeleteDialog();
    $event("project:delete-project");
  };

  const deleteFile = () => {
    loadProjects(true);
    clearDeleteDialog();
    $event("project:delete-file");
  };

  const deleteExport = () => {
    loadProjects(true);
    clearDeleteDialog();
    $event("project:delete-export");
  };

  // Expose state and actions
  return {
    isLoaded,
    loading,
    projects,
    deleteDialog,
    deleteType,
    loadProjects,
    addProject,
    getProject,
    findProject,
    addFileToProject,
    addExportToProject,
    clearDeleteDialog,
    showDeleteDialog,
    doDelete,
  };
});
