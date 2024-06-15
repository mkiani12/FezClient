// stores/snackbar.ts
import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    content: "",
    color: "",
    visible: false,
    timeout: 5000,
  }),
  actions: {
    showMessage(content: string, color: string, timeout?: number) {
      this.content = content;
      this.color = color;
      this.visible = true;
      if (timeout) {
        setTimeout(() => {
          this.hideMessage();
        }, timeout);
      }
    },
    hideMessage() {
      this.content = "";
      this.color = "";
      this.visible = false;
      this.timeout = 5000;
    },
  },
});
