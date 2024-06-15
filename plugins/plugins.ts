import mitt from "mitt";

type Events = {
  // "op:job-changed": undefined | any;
  // "op:job-change": undefined | any;
};

export default defineNuxtPlugin(() => {
  const emitter = mitt<Events>();
  return {
    provide: {
      event: emitter.emit, // Will emit an event
      listen: emitter.on, // Will register a listener for an event
      off: emitter.off,
    },
  };
});
