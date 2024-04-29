import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import { vMaska } from "maska";
import mitt from "mitt";

type Events = {
  "op:job-changed": undefined | any;
  "op:job-change": undefined | any;
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("maska", vMaska);
  nuxtApp.vueApp.use(Vue3PersianDatetimePicker, {
    name: "VPersianDatePicker",
    props: {
      format: "YYYY-MM-DD",
      displayFormat: "jYYYY-jMM-jDD",
      editable: false,
      inputClass: "form-control my-custom-class-name",
      placeholder: "Please select a date",
      altFormat: "YYYY-MM-DD",
      color: "#00acc1",
      autoSubmit: false,
    },
  });

  const emitter = mitt<Events>();
  return {
    provide: {
      event: emitter.emit, // Will emit an event
      listen: emitter.on, // Will register a listener for an event
      off: emitter.off,
    },
  };
});
