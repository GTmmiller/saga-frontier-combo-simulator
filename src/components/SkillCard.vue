<template>
  <div class="box">
    <div class="dropdown"
      :class="{'is-active': dropDownActive}">
      <div class="dropdown-trigger">
        <button class="button" @click="dropDownActive = !dropDownActive">
          <span>{{skill.oldName}}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu extended-menu"
        :class="{'is-hidden': !dropDownActive}">
        <div class="dropdown-content scroll-content">
        <SkillGroup
          v-for="(skills, skillType, index) in jsonSkills" :key="skillType" 
          :selectedSkill="skill"
          :skillType="skillType"
          :skills="skills"
          :drawDivider="index < Object.keys(jsonSkills).length - 1" 
          @skillSelect="handleSkillSelect" />
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        *
        <ComboTypeTags :comboTypes="skill.recieves" />
      </div>
      <div class="column">
        ->
        <ComboTypeTags :comboTypes="skill.sends" />
      </div>
    </div>
  </div>
</template>

<script>
import {Skill} from '../modules/saga-frontier-combo'

import SkillGroup from './skill-card/SkillGroup.vue'
import ComboTypeTags from './skill-card/ComboTypeTags.vue'

export default {
  name: 'SkillCard',
  components: {
    SkillGroup,
    ComboTypeTags
  },
  data() {
    return {
      dropDownActive: false
    }
  },
  props: {
    skill: {
      type: Skill,
      required: true
    },
    jsonSkills: {
      type: Object,
      required: true
    },
    comboIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
  },
  emits: {
    skillSelect: (payload) => {
      if ((payload.index === 0 || payload.index) && payload.skillKey) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    handleSkillSelect(event) {
      event.index = this.comboIndex
      this.$emit('skillSelect', event)
      this.dropDownActive = false
    }
  }
}
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
