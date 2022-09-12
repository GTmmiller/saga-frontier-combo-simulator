<template>
  <div class="tags">
    <span
      class="tag"
      v-for="comboType in comboTypes"
      :key="comboType"
      :class="tagClasses(comboType)"
    >
      {{ comboType.toString() }}
    </span>
  </div>
</template>

<script>
import { ComboTypes } from "../../modules/saga-frontier-combo";
import { Set } from "immutable";

export default {
  name: "ComboTypeTags",
  data() {
    return {};
  },
  props: {
    comboTypes: {
      type: Set,
      required: true,
    },
  },
  methods: {
    tagClasses(comboType) {
      return {
        "is-dark": comboType === ComboTypes["Dead Stop"],
        "is-link": comboType === ComboTypes.Down,
        "is-light": comboType === ComboTypes["Instant Stop"],
        "is-warning": comboType === ComboTypes.Move,
        "is-danger": comboType === ComboTypes.Hot,
        "is-info": comboType === ComboTypes.Cold,
        "is-black": comboType === ComboTypes["Black Out"],
        "is-info is-light": comboType === ComboTypes["Snow"],
      };
    },
  },
};
</script>

<style scoped></style>
