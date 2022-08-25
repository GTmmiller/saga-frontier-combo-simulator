<template>
  <div class="box">
    <div class="dropdown"
      :class="{'is-active': dropDownActive}">
      <div class="dropdown-trigger">
        <button class="button" @click="dropDownActive = !dropDownActive">
          <span>{{skill.newName}}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu"
        :class="{'is-hidden': !dropDownActive}">
        <div class="dropdown-content">
        <template v-for="(skills, skillType, index) in jsonSkills" :key="skillType">
          <div class="dropdown-item has-text-weight-bold">
            {{skillType}}
          </div>
          <hr class="dropdown-divider"/>
          <a class="dropdown-item" v-for="(skill, skillKey) in skills" :key="skillKey">
            {{skill.newName}}
          </a>
          <hr class="dropdown-divider" v-if="index < Object.keys(jsonSkills).length - 1"/>
        </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Skill} from '../modules/saga-frontier-combo'

export default {
  name: 'SkillCard',
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
    }
  },
  computed: {
  }
}
</script>

<style scoped>
</style>
