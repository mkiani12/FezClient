// stores/snackbar.ts
import { defineStore } from "pinia";
import type { Project, ProjectFile } from "~/types/projects/projects";
const axios = useApi();
const notify = useSnackbarStore();

interface ProjectStates {
  isLoaded: boolean;
  loading: boolean;
  projects: Project[];
}

interface AddProjectData {
  name: string;
  description: string;
}

export const useProjectStore = defineStore("project", {
  state: (): ProjectStates => ({
    isLoaded: false,
    loading: false,
    projects: [],
  }),
  actions: {
    async loadProjects(reload: boolean = false) {
      if ((!this.isLoaded || reload) && !this.loading) {
        this.loading = true;
        await axios
          .get("/project/list/?skip=0&limit=10")
          .then(({ data }) => {
            console.log(data);

            this.projects = data;
            this.isLoaded = true;
          })
          .catch((e) => {
            notify.handleCatch(e);
          });
      }
      this.loading = false;
    },

    async addProject(addProjectData: AddProjectData): Promise<boolean> {
      let success: boolean = false;
      await axios
        .post("/project/", addProjectData)
        .then((result) => {
          console.log(result);
          const { data: project } = result;
          this.projects.push(project);
          success = true;
        })
        .catch((e) => {
          notify.handleCatch(e);
          success = false;
        });

      return success;
    },

    findProject(projectId: number | string): Project | null {
      return (
        this.projects.find((project: Project) => project.id == projectId) ??
        null
      );
    },

    deleteProject(project: Project) {
      axios.delete("", { data: project });
      this.loadProjects(true);
    },

    addFileToProject(projectId: number, file: ProjectFile) {
      const foundedProject = this.projects.find((p) => p.id === projectId);
      if (!foundedProject) {
        notify.showDefaultError();
      } else {
        foundedProject.files.push(file);
      }
    },
  },
});
