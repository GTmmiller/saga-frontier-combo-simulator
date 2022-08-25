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
          <a class="dropdown-item"
            v-for="(menuSkill, skillKey) in skills" :key="skillKey"
            :class="{'is-active': skill.oldName === menuSkill.oldName}"
            @click="selectSkill(createSkillKey(menuSkill))">
            {{menuSkill.newName}}
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
    selectSkill(skillKey) {
      this.$emit('skillSelect', {index: this.comboIndex, skillKey})
    },
    createSkillKey(skill) {
      return "".concat(skill.skillType, "_", skill.oldName)
    }
  }
}
</script>

<style scoped>
</style>
