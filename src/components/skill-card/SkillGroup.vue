<template>
  <div class="dropdown-item">
    <button class="button is-info"
      :class="{'is-light': !hideSkills}"
      @click="hideSkills = !hideSkills">
      {{skillType}}
    </button>
  </div>
  <hr class="dropdown-divider"/>
  <div id="skillBody" :class="{'is-hidden': hideSkills}">
    <a class="dropdown-item"
        v-for="(menuSkill, skillKey) in skills" :key="skillKey"
        :class="{'is-active': selectedSkill.oldName === menuSkill.oldName}"
        @click="selectSkill(createSkillKey(menuSkill))">
        {{menuSkill.oldName}}
    </a>
  </div>
  <hr class="dropdown-divider" v-if="drawDivider && !hideSkills"/>
</template>

<script>
import {Skill} from '../../modules/saga-frontier-combo'

export default {
  name: 'SkillGroup',
  data() {
    return {
      hideSkills: true
    }
  },
  props: {
    selectedSkill: {
      type: Skill,
      required: true
    },
    skillType: {
      type: String,
      required: true
    },
    skills: {
      type: Object,
      required: true
    },
    drawDivider: {
      type: Boolean,
      default: true
    }
  },
  computed: {
  },
  emits: {
    skillSelect: (payload) => {
      if (payload.skillKey) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    selectSkill(skillKey) {
      this.$emit('skillSelect', {skillKey})
    },
    createSkillKey(skill) {
      return "".concat(skill.skillType, "_", skill.oldName)
    }
  }
}
</script>

<style scoped>
</style>
