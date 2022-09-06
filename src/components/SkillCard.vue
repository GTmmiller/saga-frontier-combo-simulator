<template>
  <div class="box">
    <div class="dropdown block" :class="{ 'is-active': dropDownActive }">
      <div class="dropdown-trigger">
        <button class="button" @click="dropDownActive = !dropDownActive">
          <SkillName :skill="skill" :remasteredNames="remasteredNames" />
          <span class="icon is-small">
            <font-awesome-icon icon="fa-solid fa-angle-down" />
          </span>
        </button>
      </div>
      <div
        class="dropdown-menu extended-menu"
        :class="{ 'is-hidden': !dropDownActive }"
      >
        <div class="dropdown-content scroll-content">
          <div class="dropdown-item">
            <label class="checkbox">
              <input type="checkbox" v-model.lazy="comboFilter" />
              Combo Skills Only
            </label>
          </div>
          <template v-if="Object.keys(filteredSkills).length > 0">
            <SkillGroup
              v-for="(skillList, skillType, index) in filteredSkills"
              :key="skillType"
              :selectedSkill="skill"
              :skillType="skillType"
              :skillList="skillList"
              :drawDivider="index < Object.keys(skills).length - 1"
              :remasteredNames="remasteredNames"
              @skillSelect="handleSkillSelect"
            />
          </template>
          <div class="dropdown-item" v-else>No skills selectable</div>
        </div>
      </div>
    </div>

    <div
      class="columns block"
      v-if="skill.sends.size !== 0 || skill.recieves.size !== 0"
    >
      <div class="column has-text-centered">
        <span class="icon is-small">
          <font-awesome-icon icon="fa-solid fa-bullseye" />
        </span>
        <ComboTypeTags :comboTypes="skill.recieves" />
      </div>
      <div class="column has-text-centered">
        <span class="icon is-small">
          <font-awesome-icon icon="fa-solid fa-arrow-right" />
        </span>
        <ComboTypeTags :comboTypes="skill.sends" />
      </div>
    </div>
  </div>
</template>

<script>
import { Skill } from "../modules/saga-frontier-combo";

import SkillGroup from "./skill-card/SkillGroup.vue";
import ComboTypeTags from "./skill-card/ComboTypeTags.vue";
import SkillName from "./skill-card/SkillName.vue";

export default {
  name: "SkillCard",
  components: {
    SkillGroup,
    ComboTypeTags,
    SkillName,
  },
  data() {
    return {
      dropDownActive: false,
      comboFilter: false,
    };
  },
  props: {
    skill: {
      type: Skill,
      required: true,
    },
    skills: {
      type: Object,
      required: true,
    },
    comboIndex: {
      type: Number,
      required: true,
    },
    previousSkill: {
      type: Skill,
    },
    remasteredNames: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    skillSelect: (payload) => {
      if (
        (payload.index === 0 || payload.index) &&
        payload.skillType &&
        payload.oldName
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    filteredSkills() {
      if (this.comboFilter && this.previousSkill !== null) {
        return Object.fromEntries(
          Object.entries(this.skills)
            .map(([skillType, skillList]) => {
              const filteredSkills = Object.fromEntries(
                Object.entries(skillList).filter(([, skill]) =>
                  this.previousSkill.canSendCombo(skill)
                )
              );
              return [skillType, filteredSkills];
            })
            .filter(([, skillList]) => Object.keys(skillList).length > 0)
        );
      } else {
        return this.skills;
      }
    },
  },
  methods: {
    handleSkillSelect(event) {
      event.index = this.comboIndex;
      this.$emit("skillSelect", event);
      this.dropDownActive = false;
    },
  },
};
</script>

<style scoped>
.scroll-content {
  max-height: 20em;
  overflow-y: auto;
}

.extended-menu {
  min-width: 15rem;
}
</style>
