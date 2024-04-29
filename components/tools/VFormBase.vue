<script lang="ts">
import {
  get,
  isPlainObject,
  isFunction,
  isString,
  isNumber,
  isEmpty,
  orderBy,
  delay,
} from "lodash";

// Declaration
const typeToComponent = {
  text: "v-text-field",
  password: "v-text-field",
  email: "v-text-field",
  tel: "v-text-field",
  url: "v-text-field",
  search: "v-text-field",
  number: "v-text-field",

  date: "v-date-picker",
  time: "v-time-picker",
  color: "v-color-picker",

  img: "v-img",
  textarea: "v-textarea",
  range: "v-slider",
  file: "v-file-input",
  switch: "v-switch",
  checkbox: "v-checkbox",
  card: "v-card",
};
const orderDirection = "ASC";
const pathDelimiter = ".";
const classKeyDelimiter = "-";
const defaultID = "form-base";
const isPicker = "date|time|color";
const onEventDelay = 1;

const topAppendix = "top";
const bottomAppendix = "bottom";
const slotAppendix = "slot";
const tooltipAppendix = "tooltip";
const injectAppendix = "inject";
const itemClassAppendix = "item";
const typeClassAppendix = "type";
const keyClassAppendix = "key";
const arrayClassAppendix = "array";
const propertyClassAppendix = "prop";

const injectSlotAppendix = `${slotAppendix}-${injectAppendix}`;
const arraySlotAppendix = `${slotAppendix}-${arrayClassAppendix}`;
const topSlotAppendix = `${slotAppendix}-${topAppendix}`;
const itemSlotAppendix = `${slotAppendix}-${itemClassAppendix}`;
const bottomSlotAppendix = `${slotAppendix}-${bottomAppendix}`;
const tooltipSlotAppendix = `${slotAppendix}-${tooltipAppendix}`;

const clear = "clear";
const button = "button";
const treeview = "treeview";
const list = "list";
const focus = "focus";
const blur = "blur";
const append = "append";
const appendOuter = "append-outer";
const prepend = "prepend";
const prependInner = "prepend-inner";

const hour = "hour";
const minute = "minute";
const second = "second";

const dropEffect = "move";
const rowDefault = { noGutters: false };

const colDefault = { cols: "6" };

// Mapper for Autogeneration of Schema from Value
const defaultSchemaIfValueIsNullOrUndefined = (key: string) => ({
  type: "text",
  label: key,
});
const defaultSchemaIfValueIsString = (key: string) => ({
  type: "text",
  label: key,
});
const defaultSchemaIfValueIsNumber = (key: string) => ({
  type: "number",
  label: key,
});
const defaultSchemaIfValueIsBoolean = (key: string) => ({
  type: "checkbox",
  label: key,
});
const defaultPickerSchemaText = { type: "text", readonly: true };
const defaultPickerSchemaMenu = {
  closeOnContentClick: false,
  transition: "scale-transition",
  nudgeRight: 32,
  maxWidth: "290px",
  minWidth: "290px",
};
const defaultInternGroupType = "v-card";
export default defineComponent({
  name: "VFormBase3",
  inheritAttrs: true,
  components: {
    VFormBase: import("./VFormBase.vue"),
  },
  props: {
    id: {
      type: String,
      default: defaultID,
    },
    rootId: {
      type: String,
      default: defaultID,
    },
    row: {
      type: [Object],
    },
    col: {
      type: [Object, Number, String],
    },
    flex: {
      type: [Object, Number, String],
    },
    modelValue: {
      type: [Object, Array],
      default: () => null,
    },
    model: {
      type: [Object, Array],
      default: () => ({}),
    },
    schema: {
      type: [Object, Array],
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "update:modelValue",
    "clickOutside",
    "intersect",
    "swipe",
    "resize",
    "mouseenter",
    "mouseenter",
    "mouseleave",
    "blue",
    "focus",
    "input",
  ],
  data() {
    return {
      flatCombinedArray: [],
      clear,
      button,
      treeview,
      list,
      focus,
      blur,
      append,
      appendOuter,
      prepend,
      prependInner,
      hour,
      minute,
      second,
    };
  },
  computed: {
    valueIntern() {
      // use <formbase :model="myData" />  ->  legacy code <formbase :value="myData" />
      let model = this.modelValue || this.model;
      this.updateArrayFromState(model, this.schema);
      return model;
    },
    parent() {
      let p = this as any;
      if (p.$parent && p.$parent.$parent) {
        while (p.id.startsWith(p.$parent.$parent.id + "-")) {
          p = p.$parent.$parent;
        }
      }
      return p;
    },
    index() {
      const m = this.id && this.id.match(/\d+/g);
      return m ? m.map(Number) : null;
    },
    getRow() {
      return this.row || rowDefault;
    },
    flatCombinedArraySorted(): any[] {
      //@ts-ignore
      return orderBy(this.flatCombinedArray, ["schema.sort"], [orderDirection]);
    },
    storeStateData() {
      this.updateArrayFromState(this.valueIntern, this.schema);

      return this.valueIntern;
    },
    storeStateSchema() {
      this.updateArrayFromState(this.valueIntern, this.schema);

      return this.schema;
    },
  },
  watch: {
    schema: function (newSchema) {
      this.rebuildArrays(this.valueIntern, newSchema);
    },
  },
  methods: {
    mapTypeToComponent(type: string) {
      const allTypeComponents = {
        ...typeToComponent,
        ...this.$options.components,
      } as any;

      return allTypeComponents[type] ? allTypeComponents[type] : `v-${type}`;
    },
    // CHECK FOR TYPE: DATE, TIME OR COLOR and EXT: TEXT
    isDateTimeColorTypeAndExtensionText(obj: any) {
      return isPicker.includes(obj.schema.type) && obj.schema.ext === "text";
    },
    // CHECK FOR EXT: DATE, TIME OR COLOR
    isDateTimeColorExtension(obj: any) {
      return isPicker.includes(obj.schema.ext);
    },
    // BIND SCHEMA TEXT OPTIONS
    bindOptions(b: string | any) {
      // schema.options in RADIO/BUTTON
      return isString(b) ? { value: b, label: b } : b;
    },
    bindSchemaText(obj: any) {
      return { ...defaultPickerSchemaText, ...obj.schema.text };
    },
    bindSchemaMenu(obj: any) {
      return { ...defaultPickerSchemaMenu, ...obj.schema.menu };
    },
    bindSchema(obj: any) {
      return obj.schema;
    },
    suspendClickAppend(obj: any) {
      // select|combobox|autocomplete -> suspend 'click:append' for working down arrow
      return /(select|combobox|autocomplete)/.test(obj.schema.type)
        ? ""
        : "click:append";
    },
    searchInputSync(obj: any) {
      // schema.searchInput ->   bind 'search-input'
      return typeof obj.schema.searchInput !== "undefined"
        ? "search-input"
        : "";
    },
    // EXT TYPE
    checkExtensionType(obj: any) {
      return obj.schema.ext || obj.schema.type;
    },
    // V-INTERN TYPE
    checkInternType(obj: any) {
      return obj.schema.typeInt || obj.schema.type;
    },
    checkInternGroupType(obj: any) {
      const typeInt = obj.schema.typeInt || defaultInternGroupType;
      return typeInt.startsWith("v-") ? typeInt : `v-${typeInt}`;
    },
    getKeyForArray(id: number | string, obj: any, item: any, index: number) {
      const k = obj.schema.key;
      return k
        ? Array.isArray(k)
          ? k.map((i) => item[i]).join("_")
          : item[k]
        : !isNaN(index)
        ? `${id}-${obj.key}-${index}`
        : index;
    },
    getImageSource(obj: any) {
      return obj.schema.src
        ? obj.schema.src
        : `${obj.schema.base}${obj.value}${obj.schema.tail}`;
    },
    //
    // ICON
    getIconValue(obj: any) {
      return obj.schema.label ? obj.schema.label : this.setValue(obj);
    },
    //
    // TOOLTIP
    getShorthandTooltip(schemaTooltip: any) {
      return isString(schemaTooltip)
        ? { bottom: true, label: schemaTooltip }
        : schemaTooltip;
    },
    getShorthandTooltipLabel(schemaTooltip: any) {
      return isString(schemaTooltip)
        ? schemaTooltip
        : schemaTooltip && schemaTooltip.label;
    },
    //
    // FORM SLOTS
    getFormTopSlot() {
      return `${topSlotAppendix}-${this.id}`;
    },
    getFormBottomSlot() {
      return `${bottomSlotAppendix}-${this.id}`;
    },
    //
    // KEY SLOTS
    getKeyInjectSlot(obj: any, inject: any) {
      return this.getKeyClassNameWithAppendix(
        obj,
        `${injectSlotAppendix}-${inject}-${keyClassAppendix}`
      );
    },
    getKeyTopSlot(obj: any) {
      return this.getKeyClassNameWithAppendix(
        obj,
        `${topSlotAppendix}-${keyClassAppendix}`
      );
    },
    getKeyItemSlot(obj: any) {
      return this.getKeyClassNameWithAppendix(
        obj,
        `${itemSlotAppendix}-${keyClassAppendix}`
      );
    },
    getKeyBottomSlot(obj: any) {
      return this.getKeyClassNameWithAppendix(
        obj,
        `${bottomSlotAppendix}-${keyClassAppendix}`
      );
    },
    getKeyTooltipSlot(obj: any) {
      return this.getKeyClassNameWithAppendix(
        obj,
        `${tooltipSlotAppendix}-${keyClassAppendix}`
      );
    },
    getTooltipSlot(obj: any) {
      return `${tooltipSlotAppendix}`;
    },
    // ARRAY SLOTS
    getArrayTopSlot(obj: any) {
      return this.getKeyClassNameWithAppendix(
        obj,
        `${topSlotAppendix}-${arrayClassAppendix}`
      );
    },
    getArrayItemSlot(obj: any) {
      return this.getKeyClassNameWithAppendix(
        obj,
        `${itemSlotAppendix}-${arrayClassAppendix}`
      );
    },
    getArrayBottomSlot(obj: any) {
      return this.getKeyClassNameWithAppendix(
        obj,
        `${bottomSlotAppendix}-${arrayClassAppendix}`
      );
    },
    //
    // TYPE SLOTS
    getTypeTopSlot(obj: any) {
      return this.getTypeClassNameWithAppendix(
        obj,
        `${topSlotAppendix}-${typeClassAppendix}`
      );
    },
    getTypeItemSlot(obj: any) {
      return this.getTypeClassNameWithAppendix(
        obj,
        `${itemSlotAppendix}-${typeClassAppendix}`
      );
    },
    getTypeBottomSlot(obj: any) {
      return this.getTypeClassNameWithAppendix(
        obj,
        `${bottomSlotAppendix}-${typeClassAppendix}`
      );
    },
    //
    // CLASS Names
    getPropertyClassNameWithAppendix(obj: any, appendix: any) {
      return obj.key
        ? obj.key
            .split(pathDelimiter)
            .map(
              (s: any) => `${appendix ? appendix + classKeyDelimiter : ""}${s}`
            )
            .join(" ")
        : "";
    },
    getPropertyClassName(obj: any) {
      return this.getPropertyClassNameWithAppendix(obj, propertyClassAppendix);
    },
    getKeyClassNameWithAppendix(obj: any, appendix: any) {
      return `${appendix ? appendix + classKeyDelimiter : ""}${
        this.id ? this.id + classKeyDelimiter : ""
      }${obj.key.replace(/\./g, "-")}`;
    },
    getKeyClassName(obj: any) {
      return this.getKeyClassNameWithAppendix(obj, keyClassAppendix);
    },
    getTypeClassNameWithAppendix(obj: any, appendix: any) {
      return `${appendix ? appendix + classKeyDelimiter : ""}${
        this.id ? this.id + classKeyDelimiter : ""
      }${obj.schema.type}`;
    },
    getTypeClassName(obj: any) {
      return this.getTypeClassNameWithAppendix(obj, typeClassAppendix);
    },
    getClassName(obj: any) {
      return `${itemClassAppendix} ${this.getTypeClassName(
        obj
      )} ${this.getKeyClassName(obj)} ${this.getPropertyClassName(obj)}`;
    },
    //
    // GRID
    gridMapper(obj: any, prepender: any) {
      if (obj)
        ["sm", "md", "lg", "xl"].map((k) => {
          if (obj[k]) {
            obj[prepender + k] = obj[k];
            delete obj[k];
          }
        });
    },
    gridReplaceXS(obj: any, replacer: any) {
      if (obj && obj.xs) {
        obj[replacer] = obj.xs;
        delete obj.xs;
      }
    },
    getGridAttributes(obj: any) {
      const colSchema = obj.schema.col || obj.schema.flex;

      const colAttr = this.col || this.flex || colDefault;

      let colObject = colSchema
        ? // if available use schema definition of cols
          isPlainObject(colSchema)
          ? colSchema
          : isNumber(colSchema) || isString(colSchema)
          ? { cols: colSchema }
          : { cols: "" }
        : // else use formbase attribute definition of cols
        colAttr
        ? isPlainObject(colAttr)
          ? colAttr
          : isNumber(colAttr) || isString(colAttr)
          ? { cols: colAttr }
          : { cols: "" }
        : // if no definition set cols to 'auto'
          { cols: "" };

      this.gridReplaceXS(colObject, "cols");

      // schema definition of offset
      const offset = obj.schema.offset;
      let offsetObject = offset
        ? isPlainObject(offset)
          ? offset
          : { offset }
        : offset;
      this.gridMapper(offsetObject, "offset-");
      this.gridReplaceXS(offsetObject, "offset");

      // schema definition of offset
      const order = obj.schema.order;
      let orderObject = order
        ? isPlainObject(order)
          ? order
          : { order }
        : order;
      this.gridMapper(orderObject, "order-");
      this.gridReplaceXS(orderObject, "order");

      return { ...colObject, ...offsetObject, ...orderObject };
    },
    getRowGroupOrArray(obj: any) {
      return obj.schema.row || this.row || rowDefault;
    },
    getColGroupOrArray(obj: any) {
      return obj.schema.col || this.col || colDefault;
    },
    // SANITIZE SLOTS
    getInjectedScopedSlots(id: string, obj: { key: string }): string[] {
      const rx = new RegExp(`${injectSlotAppendix}-(.*?)-${keyClassAppendix}`);
      return Object.keys(this.$slots)
        .filter(
          (s) =>
            s.includes(
              `${id}${classKeyDelimiter}${obj.key.replace(/\./g, "-")}`
            ) && s.includes(injectSlotAppendix)
        )
        .map((i: any) => i.match(rx)[1]);
    },
    //
    toCtrl(params: any) {
      return params.obj.schema && isFunction(params.obj.schema.toCtrl)
        ? params.obj.schema.toCtrl(params)
        : params.value;
    },
    fromCtrl(params: any) {
      return params.obj.schema && isFunction(params.obj.schema.fromCtrl)
        ? params.obj.schema.fromCtrl(params)
        : params.value;
    },
    dropCtrl(params: any) {
      return params.obj.schema && isFunction(params.obj.schema.drop)
        ? params.obj.schema.drop(params)
        : params.value;
    },
    //
    dragstart(event: any, obj: any) {
      if (!obj.schema.drag) return;

      event.dataTransfer.dropEffect = dropEffect;
      event.dataTransfer.effectAllowed = dropEffect;

      const dragEvent = this.onEvent(event, obj);
      event.dataTransfer.setData("text", JSON.stringify(dragEvent));
    },

    dragover(event: any, obj: any) {
      return obj.schema.drop ? event.preventDefault() : null;
    },

    drop(event: any, obj: any) {
      if (!obj.schema.drop) return event.preventDefault();
      // get dragEvent and dragEvent.obj
      obj.dragEvent = JSON.parse(event.dataTransfer.getData("text"));

      // no drop on drag object
      if (obj.key === obj.dragEvent.obj.key && obj.id === obj.dragEvent.id)
        return event.preventDefault();
      // handle schema.drop function
      if (isFunction(obj.schema.drop)) obj.value = this.dropValue(obj, event);

      this.onEvent(event, obj);

      event.preventDefault();
    },

    dropValue(obj: any, event: any) {
      return this.dropCtrl({
        value: obj.dragEvent.value,
        obj,
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema,
      });
    },
    //
    // Set Value
    setValue(obj: any) {
      return obj.schema.type === "wrap"
        ? this.toCtrl({
            value: this.storeStateData,
            obj,
            data: this.storeStateData,
            schema: this.storeStateSchema,
          })
        : this.toCtrl({
            value: obj.value,
            obj,
            data: this.storeStateData,
            schema: this.storeStateSchema,
          });
    },
    //
    onInput(value: any, obj: any, type = "input" as any) {
      // Value after change in Control

      value = this.fromCtrl({
        value,
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema,
      });
      value = !value || value === "" ? null : value;
      value = obj.schema.type === "number" ? Number(value) : value;
      this.setObjectByPath(this.storeStateData, obj.key, value);

      const emitObj = {
        on: type,
        id: this.id,
        index: this.index,
        params: { index: this.index, lastValue: obj.value },
        key: obj.key,
        value,
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema,
        parent: this.parent,
      };

      this.$emit(type, emitObj);
      this.$emit("update:modelValue", emitObj.data);
      return emitObj;
    },
    onEvent(event = {} as any, obj: any, tag = null as any) {
      const text = event && event.srcElement && event.srcElement.innerText;
      const model = obj.schema.model;
      const open = obj.schema.open;
      const index = this.index;
      const parent = event.type !== "dragstart" ? this.parent : undefined;

      const emitObj = {
        on: event.type,
        id: this.id,
        index,
        params: { text, tag, model, open, index },
        key: obj.key,
        value: obj.value,
        obj,
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema,
        parent,
      };

      delay(() => {
        this.$emit(event.type, emitObj), onEventDelay;
      }, 300);

      return emitObj;
    },
    onClickOutside(event: any, obj: any) {
      if (!obj.schema || !obj.schema.clickOutside) return;
      if (isFunction(obj.schema.clickOutside))
        return obj.schema.clickOutside(obj, event);
      this.$emit("clickOutside", {
        on: "clickOutside",
        id: this.id,
        key: obj.key,
        value: obj.value,
        obj,
        params: { x: event.clientX, y: event.clientY },
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema,
      });
    },
    onIntersect(
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
      obj: any
    ) {
      const isIntersecting = entries[0].isIntersecting;
      const index = this.index;
      this.$emit("intersect", {
        on: "intersect",
        id: this.id,
        index,
        key: obj.key,
        value: obj.value,
        obj,
        params: { isIntersecting, entries, observer },
        data: this.storeStateData,
        schema: this.storeStateSchema,
      });
    },
    onSwipe(tag: any, obj: any) {
      this.$emit("swipe", {
        on: "swipe",
        id: this.id,
        key: obj.key,
        value: obj.value,
        obj,
        params: { tag },
        data: this.storeStateData,
        schema: this.storeStateSchema,
      });
    },
    onResize(event: any) {
      this.$emit("resize", {
        on: "resize",
        id: this.id,
        params: { x: window.innerWidth, y: window.innerHeight },
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema,
      });
    },
    //
    setObjectByPath(object: any, path: any, value: any) {
      let pathArray = path.split(pathDelimiter);
      pathArray.forEach((p: any, ix: number) => {
        if (ix === pathArray.length - 1) object[p] = value;
        object = object[p];
      });
    },
    updateArrayFromState(data: any, schema: any) {
      this.flatCombinedArray.forEach((obj: { [key: string]: any }) => {
        obj.value = get(data, obj.key, null); // get - lodash
        obj.schema = get(schema, obj.key, null); // get - lodash
      });
    },
    sanitizeShorthandType(key: any, schema: any) {
      return isString(schema) ? { type: schema, label: key } : schema;
    },
    flattenObjects(dat = {} as any, sch: any) {
      let data = {} as any;
      let schema = {} as any;
      Object.keys(sch).forEach((key: string) => {
        sch[key] = this.sanitizeShorthandType(key, sch[key]);

        const bothArray = Array.isArray(dat[key]) && Array.isArray(sch[key]);
        const datObjectWithoutSchemaType =
          isPlainObject(dat[key]) && !sch[key].type;
        const datObjectContainsTypeKey =
          dat[key] && dat[key].type && sch[key] && sch[key].type;
        const notInstanceOfFileObject = !(dat[key] instanceof File);

        if (
          bothArray ||
          datObjectWithoutSchemaType ||
          (datObjectContainsTypeKey && notInstanceOfFileObject)
        ) {
          let { data: flatData, schema: flatSchema }: any = this.flattenObjects(
            dat[key],
            sch[key]
          );
          Object.keys(flatData).forEach((ii: string) => {
            data[key + pathDelimiter + ii] = flatData[ii];
            schema[key + pathDelimiter + ii] = flatSchema[ii];
          });
        } else {
          data[key] = dat[key];
          schema[key] = sch[key];
        }
      });
      return { data, schema };
    },
    combineObjectsToArray({ data, schema }: any) {
      let arr = [] as any;
      Object.keys(schema).forEach((key) => {
        if (!isPlainObject(schema[key])) {
          console.warn(
            `Schema '${JSON.stringify(
              schema
            )}' of Prop '${key}' must be a string with value of type key:'text' or a plainobject with at least key:{ type:'text'} definition.  Prop '${key}' will be ignored!`
          );
          return;
        }
        arr.push({ key, value: data[key], schema: schema[key] });
      });
      return arr;
    },
    flattenAndCombineToArray(data: any, schema: any) {
      let flattenedObjects = this.flattenObjects(data, schema);
      return this.combineObjectsToArray(flattenedObjects);
    },
    autogenerateSchema(value: any) {
      let schema = JSON.stringify(value, (key, val) =>
        val === undefined ? null : val
      );
      schema = JSON.parse(schema, (key, val) => {
        if (val === null || val === undefined)
          return defaultSchemaIfValueIsNullOrUndefined(key);
        if (typeof val === "string") return defaultSchemaIfValueIsString(key);
        if (typeof val === "number") return defaultSchemaIfValueIsNumber(key);
        if (typeof val === "boolean") return defaultSchemaIfValueIsBoolean(key);
        return val;
      });
      Object.keys(schema).forEach(
        //@ts-ignore
        (key: any) => (this.schema[key] = schema[key])
      );
    },

    tryAutogenerateModelStructure(model: any, schema: any) {
      Object.keys(schema).forEach((key) => {
        if (!isEmpty(model[key])) return;

        let val = schema[key] as { type: string; schema: any };
        if (val.type === "group") {
          model[key] = {};
          this.tryAutogenerateModelStructure(model[key], val.schema);
        } else if (val.type === "array") {
          model[key] = [];
          this.tryAutogenerateModelStructure(model[key], val.schema);
        } else if (val.type === "list") {
          model[key] = [];
        } else if (isPlainObject(val) && !val.type) {
          model[key] = {};
          this.tryAutogenerateModelStructure(model[key], val);
        }
        if (Array.isArray(val) && !val.type) {
          model[key] = [];
          this.tryAutogenerateModelStructure(model[key], val);
        }
      });
    },
    rebuildArrays(model: any, schema: any) {
      if (!model)
        throw `Property 'model' is null or undefined. Use '<v-form-base :model="myModel" :schema="mySchema" />'. myModel must be at least an empty Object.`;

      if (isEmpty(schema) && isEmpty(model)) {
        console.warn(
          `At least one of the properties 'model' or 'schema' in <v-form-base /> must be at least an empty Object. Ignore this Warning on async loading 'model' or 'schema' `
        );
      }
      this.tryAutogenerateModelStructure(model, schema);

      if (isEmpty(schema)) this.autogenerateSchema(model);

      this.flatCombinedArray = this.flattenAndCombineToArray(
        this.storeStateData,
        this.storeStateSchema
      );
    },
  },
  created() {
    this.rebuildArrays(this.valueIntern, this.schema);
  },
});
</script>
<template>
  <v-row v-if="loading" class="ma-0">
    <v-col class="text-center py-6">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-col>
  </v-row>
  <v-row v-show="!loading" :id="id" v-bind="getRow" v-resize.quiet="onResize">
    <!-- FORM-BASE TOP SLOT -->
    <slot :name="getFormTopSlot()" :id="id" />
    <!-- main loop over components/controls -->
    <template v-for="(obj, index) in flatCombinedArraySorted" :key="index">
      <!-- Tooltip Wrapper -->
      <v-tooltip
        :disabled="!obj.schema.tooltip"
        v-bind="getShorthandTooltip(obj.schema.tooltip)"
      >
        <template v-slot:activator="{ props }">
          <v-col
            v-show="!obj.schema.hidden"
            :key="index"
            v-bind="getGridAttributes(obj)"
            v-intersect="
              (observer:IntersectionObserver,entries:IntersectionObserverEntry[]) => onIntersect(entries, observer, obj)
            "
            v-touch="{
              left: () => onSwipe('left', obj),
              right: () => onSwipe('right', obj),
              up: () => onSwipe('up', obj),
              down: () => onSwipe('down', obj),
            }"
            v-click-outside="(event:any) => onClickOutside(event, obj)"
            :class="getClassName(obj)"
            :draggable="obj.schema.drag"
            @mouseenter="onEvent($event, obj)"
            @mouseleave="onEvent($event, obj)"
            v-on="props"
            @dragstart="dragstart($event, obj)"
            @dragover="dragover($event, obj)"
            @drop="drop($event, obj)"
          >
            <!-- slot on top of type  -> <div slot="slot-bottom-type-[propertyName]"> -->
            <slot :name="getTypeTopSlot(obj)" v-bind="{ obj, index, id }" />
            <!-- slot on top of key  -> <v-btn slot="slot-bottom-key-[propertyName]"> -->
            <slot :name="getKeyTopSlot(obj)" v-bind="{ obj, index, id }" />
            <!-- slot replaces complete item of defined TYPE -> <v-btn slot="slot-item-type-[propertyName]">-->
            <slot :name="getTypeItemSlot(obj)" v-bind="{ obj, index, id }">
              <!-- slot replaces complete item of defined KEY -> <div slot="slot-item-key-[propertyName]">-->
              <slot :name="getKeyItemSlot(obj)" v-bind="{ obj, index, id }">
                <!-- <div class="caption">
                    OBJ:{{obj}}
                    <br>
                    FORM:{{getFormTopSlot()}}
                    <br>
                    INJECT:{{getKeyInjectSlot(obj)}}
                    <br>
                    ARRAY:{{getArrayItemSlot(obj)}}
                    <br>
                    TYPE:{{getTypeItemSlot(obj)}}
                    <br>
                    KEY:{{getKeyItemSlot(obj)}}
                    <br>
                    CLASS:{{getClassName(obj)}}
                    <br>
                    Slots: {{getInjectedScopedSlots(id, obj)}}
                    <br>
                    VAL:{{setValue(obj)}}
                  </div> -->

                <!-- RADIO -->
                <v-radio-group
                  v-if="obj.schema.type === 'radio'"
                  v-bind="bindSchema(obj)"
                  :model-value="setValue(obj)"
                  @change="onInput($event, obj)"
                >
                  <v-radio
                    v-for="(option, idx) in obj.schema.options"
                    :key="idx"
                    v-bind="bindOptions(option)"
                  >
                    <!-- component doesn't work with #[s]="slotData" " -->

                    <template v-for="s in getInjectedScopedSlots(id, obj)" #[s]
                      ><slot
                        :name="getKeyInjectSlot(obj, s)"
                        v-bind="{ id, obj, index, idx, option }"
                    /></template>
                  </v-radio>
                </v-radio-group>
                <!-- END RADIO -->

                <!-- DATE, TIME, COLOR TEXT-MENU -->
                <v-menu
                  v-else-if="isDateTimeColorTypeAndExtensionText(obj)"
                  v-bind="bindSchemaMenu(obj)"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-on="props"
                      v-bind="bindSchemaText(obj)"
                      :model-value="setValue(obj)"
                      @[suspendClickAppend(obj)]="onEvent($event, obj, append)"
                      @click:append-outer="onEvent($event, obj, appendOuter)"
                      @click:prepend="onEvent($event, obj, prepend)"
                      @click:prepend-inner="onEvent($event, obj, prependInner)"
                    />
                    <!-- SLOTS append|prepend|message for picker not avilable, try custom component -->
                  </template>
                  <component
                    :is="mapTypeToComponent(obj.schema.type)"
                    v-bind="bindSchema(obj)"
                    :type="checkInternType(obj)"
                    :model-value="setValue(obj)"
                    @update:model-value="onInput($event, obj)"
                    @click:hour="onEvent({ type: 'click' }, obj, hour)"
                    @click:minute="onEvent({ type: 'click' }, obj, minute)"
                    @click:second="onEvent({ type: 'click' }, obj, second)"
                  />
                </v-menu>
                <!-- END DATE, TIME, COLOR TEXT-MENU -->

                <!-- ARRAY -->
                <template v-else-if="obj.schema.type === 'array'">
                  <div
                    v-for="(item, idx) in setValue(obj)"
                    :key="getKeyForArray(id, obj, item, idx)"
                    v-bind="bindSchema(obj)"
                    :value="setValue(obj)"
                  >
                    <slot
                      :name="getArrayTopSlot(obj)"
                      v-bind="{ obj, id, index, idx, item }"
                    />
                    <slot
                      :name="getArrayItemSlot(obj)"
                      v-bind="{ obj, id, index, idx, item }"
                    >
                      <VFormBase
                        :id="`${id}-${obj.key}-${idx}`"
                        :model="item"
                        :schema="obj.schema.schema"
                        :row="getRowGroupOrArray(obj)"
                        :col="getColGroupOrArray(obj)"
                        :class="`${id}-${obj.key}`"
                        v-on="$listeners"
                      >
                        <!-- Based on https://gist.github.com/loilo/73c55ed04917ecf5d682ec70a2a1b8e2 -->
                        <template v-for="(_, name) in $slots" #[name]="slotData"
                          ><slot
                            :name="name"
                            v-bind="{ id, obj, index, idx, item, ...slotData }"
                        /></template>
                      </VFormBase>
                    </slot>
                    <slot
                      :name="getArrayBottomSlot(obj)"
                      v-bind="{ obj, id, index, idx, item }"
                    />
                  </div>
                </template>
                <!-- END ARRAY -->

                <!-- GROUP | WRAP-->
                <template v-else-if="/(wrap|group)/.test(obj.schema.type)">
                  <component
                    :is="checkInternGroupType(obj)"
                    v-bind="bindSchema(obj)"
                    @click="onEvent($event, obj)"
                  >
                    <v-card-title v-if="obj.schema.title">{{
                      obj.schema.title
                    }}</v-card-title>
                    <v-card-subtitle v-if="obj.schema.subtitle">{{
                      obj.schema.subtitle
                    }}</v-card-subtitle>

                    <v-form-base
                      :id="`${id}-${obj.key}`"
                      :model="setValue(obj)"
                      :schema="obj.schema.schema"
                      :row="getRowGroupOrArray(obj)"
                      :col="getColGroupOrArray(obj)"
                      :class="`${id}-${obj.key}`"
                      v-on="$listeners"
                    >
                      <!-- Based on https://gist.github.com/loilo/73c55ed04917ecf5d682ec70a2a1b8e2 -->
                      <template v-for="(_, name) in $slots" #[name]="slotData"
                        ><slot
                          :name="name"
                          v-bind="{ id, obj, index, ...slotData }"
                      /></template>
                    </v-form-base>
                  </component>
                </template>
                <!-- END GROUP | WRAP -->

                <!-- TREEVIEW -->
                <v-treeview
                  v-else-if="obj.schema.type === treeview"
                  v-model="obj.schema.model"
                  :items="setValue(obj)"
                  :active.sync="obj.schema.model"
                  :open.sync="obj.schema.open"
                  v-bind="bindSchema(obj)"
                  @update:open="onEvent({ type: 'click' }, obj, 'open')"
                  @update:active="onEvent({ type: 'click' }, obj, 'selected')"
                >
                  <!-- works with #[s]="slotData" " -->
                  <template
                    v-for="s in getInjectedScopedSlots(id, obj)"
                    #[s]="slotData"
                    ><slot
                      :name="getKeyInjectSlot(obj, s)"
                      v-bind="{ id, obj, index, ...slotData }"
                  /></template>
                </v-treeview>
                <!-- END TREEVIEW -->

                <!-- LIST -->
                <template v-else-if="obj.schema.type === list">
                  <v-list>
                    <slot
                      :name="getKeyInjectSlot(obj, 'label')"
                      v-bind="{ id, obj, index }"
                    >
                      <v-toolbar
                        v-if="obj.schema.label"
                        v-bind="bindSchema(obj)"
                        dark
                      >
                        <v-toolbar-title>{{
                          obj.schema.label
                        }}</v-toolbar-title>
                      </v-toolbar>
                    </slot>
                    <v-list-group
                      v-model="obj.schema.model"
                      v-bind="bindSchema(obj)"
                      light
                    >
                      <template v-for="(item, idx) in setValue(obj)" :key="idx">
                        <v-list-item
                          :prepend-icon="obj.schema.icon"
                          @click="onEvent($event, obj, list)"
                        >
                          <slot
                            :name="getArrayItemSlot(obj)"
                            v-bind="{ obj, id, index, idx, item }"
                          >
                            <v-list-item-title
                              v-text="
                                obj.schema.item ? item[obj.schema.item] : item
                              "
                            />
                          </slot>
                        </v-list-item>
                      </template>
                    </v-list-group>
                  </v-list>
                </template>
                <!-- END LIST -->

                <!-- CHECKBOX | SWITCH -->
                <component
                  v-else-if="/(switch|checkbox)/.test(obj.schema.type)"
                  :is="mapTypeToComponent(obj.schema.type)"
                  :input-value="setValue(obj)"
                  v-bind="bindSchema(obj)"
                  @update:model-value="onInput($event, obj)"
                >
                  <!-- component doesn't work with #[s]="slotData" " -->
                  <template v-for="s in getInjectedScopedSlots(id, obj)" #[s]
                    ><slot
                      :name="getKeyInjectSlot(obj, s)"
                      v-bind="{ id, obj, index }"
                  /></template>
                </component>
                <!-- END CHECKBOX | SWITCH -->

                <!-- FILE -->
                <v-file-input
                  v-else-if="obj.schema.type === 'file'"
                  v-bind="bindSchema(obj)"
                  :model-value="setValue(obj)"
                  @focus="onEvent($event, obj)"
                  @blur="onEvent($event, obj)"
                  @update:model-value="onInput($event, obj)"
                >
                  <template
                    v-for="s in getInjectedScopedSlots(id, obj)"
                    #[s]="scopeData"
                    ><slot
                      :name="getKeyInjectSlot(obj, s)"
                      v-bind="{ id, obj, index, ...scopeData }"
                  /></template>
                </v-file-input>
                <!-- END FILE -->

                <!-- ICON -->
                <v-icon
                  v-else-if="obj.schema.type === 'icon'"
                  v-bind="bindSchema(obj)"
                  v-text="getIconValue(obj)"
                  @click="onEvent($event, obj)"
                />
                <!-- END ICON -->

                <!-- SLIDER -->
                <v-slider
                  v-else-if="obj.schema.type === 'slider'"
                  v-bind="bindSchema(obj)"
                  @update:model-value="onInput($event, obj)"
                >
                  <!-- some component works with #[s]="slotData"  some doesn't work with slot data ie: 'label'  / but 'thumb-label' works only with scopeData -->
                  <template v-for="s in getInjectedScopedSlots(id, obj)" #[s]
                    ><slot
                      :name="getKeyInjectSlot(obj, s)"
                      v-bind="{ id, obj, index }"
                  /></template>
                  <!-- <template v-for="s in getInjectedScopedSlots(id, obj)" #[s]="scopeData"><slot :name="getKeyInjectSlot(obj, s)" v-bind= "{ id, obj, index, ...scopeData}" /></template> -->
                </v-slider>
                <!-- END SLIDER -->

                <!-- IMG -->
                <v-img
                  v-else-if="obj.schema.type === 'img'"
                  :src="getImageSource(obj)"
                  v-bind="bindSchema(obj)"
                  @click="onEvent($event, obj)"
                >
                  <!-- component doesn't work with #[s]="slotData" " -->
                  <template v-for="s in getInjectedScopedSlots(id, obj)" #[s]>
                    <slot
                      :name="getKeyInjectSlot(obj, s)"
                      v-bind="{ id, obj, index }"
                    />
                  </template>
                </v-img>
                <!-- END IMG -->

                <!-- BTN-TOGGLE -->
                <v-btn-toggle
                  v-else-if="obj.schema.type === 'btn-toggle'"
                  v-bind="bindSchema(obj)"
                  :model-value="setValue(obj)"
                  @change="onInput($event, obj)"
                >
                  <v-btn
                    v-for="(option, idx) in obj.schema.options"
                    :key="idx"
                    v-bind="bindOptions(option)"
                    :icon="option.icon ? true : false"
                  >
                    <v-icon :dark="obj.schema.dark">
                      {{ bindOptions(option).icon }}
                    </v-icon>
                    {{ bindOptions(option).label }}
                  </v-btn>
                </v-btn-toggle>
                <!-- END BTN-TOGGLE -->

                <!-- BTN -->
                <v-btn
                  v-else-if="obj.schema.type === 'btn'"
                  v-bind="bindSchema(obj)"
                  @click="onEvent($event, obj, button)"
                >
                  <v-icon
                    v-if="obj.schema.iconLeft"
                    left
                    :dark="obj.schema.dark"
                  >
                    {{ obj.schema.iconLeft }}
                  </v-icon>
                  {{ setValue(obj) }}
                  <v-icon v-if="obj.schema.iconCenter" :dark="obj.schema.dark">
                    {{ obj.schema.iconCenter }}
                  </v-icon>
                  {{ obj.schema.label }}
                  <v-icon
                    v-if="obj.schema.iconRight"
                    right
                    :dark="obj.schema.dark"
                  >
                    {{ obj.schema.iconRight }}
                  </v-icon>
                </v-btn>
                <!-- END BTN -->

                <!-- MASK  -->
                <component
                  :is="mapTypeToComponent(obj.schema.type)"
                  v-else-if="obj.schema.mask"
                  v-bind="bindSchema(obj)"
                  v-maska="obj.schema.mask"
                  :type="checkExtensionType(obj)"
                  :model-value="setValue(obj)"
                  :obj="obj"
                  :[searchInputSync(obj)].sync="obj.schema.searchInput"
                  @focus="onEvent($event, obj)"
                  @blur="onEvent($event, obj)"
                  @[suspendClickAppend(obj)]="onEvent($event, obj, append)"
                  @click:append-outer="onEvent($event, obj, appendOuter)"
                  @click:prepend="onEvent($event, obj, prepend)"
                  @click:prepend-inner="onEvent($event, obj, prependInner)"
                  @click:clear="onEvent($event, obj, clear)"
                  @click:hour="onEvent({ type: 'click' }, obj, hour)"
                  @click:minute="onEvent({ type: 'click' }, obj, minute)"
                  @click:second="onEvent({ type: 'click' }, obj, second)"
                  @update:model-value="onInput($event, obj)"
                >
                  <!-- component doesn't work with #[s]="slotData" " -->
                  <template v-for="s in getInjectedScopedSlots(id, obj)" #[s]
                    ><slot
                      :name="getKeyInjectSlot(obj, s)"
                      v-bind="{ id, obj, index }"
                  /></template>
                </component>
                <!-- END MASK -->

                <!-- DEFAULT all other Types -> typeToComponent -->
                <component
                  v-else
                  :is="mapTypeToComponent(obj.schema.type)"
                  v-bind="bindSchema(obj)"
                  :type="checkExtensionType(obj)"
                  :model-value="setValue(obj)"
                  :return-object="false"
                  :obj="obj"
                  :[searchInputSync(obj)].sync="obj.schema.searchInput"
                  @focus="onEvent($event, obj)"
                  @blur="onEvent($event, obj)"
                  @[suspendClickAppend(obj)]="onEvent($event, obj, append)"
                  @click:append-outer="onEvent($event, obj, appendOuter)"
                  @click:prepend="onEvent($event, obj, prepend)"
                  @click:prepend-inner="onEvent($event, obj, prependInner)"
                  @click:clear="onEvent($event, obj, clear)"
                  @click:hour="onEvent({ type: 'click' }, obj, hour)"
                  @click:minute="onEvent({ type: 'click' }, obj, minute)"
                  @click:second="onEvent({ type: 'click' }, obj, second)"
                  @update:model-value="onInput($event, obj)"
                >
                  <!-- component doesn't work with #[s]="slotData" " -->
                  <template v-for="s in getInjectedScopedSlots(id, obj)" #[s]
                    ><slot
                      :name="getKeyInjectSlot(obj, s)"
                      v-bind="{ id, obj, index }"
                  /></template>
                </component>
                <!-- END DEFAULT -->
              </slot>
            </slot>

            <!-- slot at bottom of item  -> <div slot="slot-bottom-key-[deep-nested-key-name]"> -->
            <slot :name="getTypeBottomSlot(obj)" v-bind="{ obj, index, id }" />
            <slot :name="getKeyBottomSlot(obj)" v-bind="{ obj, index, id }" />
          </v-col>

          <!-- schema.spacer:true - push next item to the right and fill space between items -->
          <v-spacer v-if="obj.schema.spacer" :key="`s-${index}`" />
        </template>
        <!-- slot for Tooltip or use shorthand schema.tooltip:'myTooltip' | any tooltip activated by schema:{ key:{ tooltip:'myTooltip', ...} -->
        <slot :name="getTooltipSlot(obj)" v-bind="{ obj, index, id }">
          <span>{{ getShorthandTooltipLabel(obj.schema.tooltip) }}</span>
        </slot>
        <slot :name="getKeyTooltipSlot(obj)" v-bind="{ obj, index, id }" />
      </v-tooltip>
    </template>
    <!-- FORM-BASE BOTTOM SLOT -->
    <slot :name="getFormBottomSlot()" :id="id" />
  </v-row>
</template>
