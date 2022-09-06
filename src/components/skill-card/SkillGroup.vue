<template>
  <div class="dropdown-item">
    <button
      class="button is-info"
      :class="{ 'is-light': !hideSkills }"
      @click="hideSkills = !hideSkills"
    >
      {{ skillType }}
    </button>
  </div>
  <hr class="dropdown-divider" />
  <div id="skillBody" :class="{ 'is-hidden': hideSkills }">
    <a
      class="dropdown-item"
      v-for="(menuSkill, skillKey) in skillList"
      :key="skillKey"
      :class="{ 'is-active': selectedSkill.oldName === menuSkill.oldName }"
      @click="selectSkill(menuSkill)"
    >
      <SkillName :skill="menuSkill" :remasteredNames="remasteredNames" />
    </a>
  </div>
  <hr class="dropdown-divider" v-if="drawDivider && !hideSkills" />
</template>

<script>
import { Skill } from "../../modules/saga-frontier-combo";

import SkillName from "./SkillName.vue";

export default {
  name: "SkillGroup",
  components: {
    SkillName,
  },
  data() {
    return {
      hideSkills: true,
    };
  },
  props: {
    selectedSkill: {
      type: Skill,
      required: true,
    },
    skillType: {
      type: String,
      required: true,
    },
    skillList: {
      type: Object,
      required: true,
    },
    drawDivider: {
      type: Boolean,
      default: true,
    },
    remasteredNames: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
  emits: {
    skillSelect: (payload) => {
      if (payload.skillType && payload.oldName) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    selectSkill(skill) {
      this.$emit("skillSelect", {
        skillType: skill.skillType,
        oldName: skill.oldName,
      });
    },
  },
};
</script>

<style scoped></style>
