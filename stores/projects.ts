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
    if (deleteType.value != "") {
      eval(`delete${deleteType.value}`)();
    }
  };

  const deleteProject = () => {
    loadProjects(true);
  };

  const deleteFile = () => {
    loadProjects(true);
  };

  const deleteExport = () => {
    loadProjects(true);
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
    findProject,
    addFileToProject,
    addExportToProject,
    showDeleteDialog,
    clearDeleteDialog,
    doDelete,
  };
});
