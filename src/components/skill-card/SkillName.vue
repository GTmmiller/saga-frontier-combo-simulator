<template>
  <span v-if="skill.multiTarget" class="icon-text">
    <span>{{skillName}}</span>
    <span class="icon is-small">
      <font-awesome-icon icon="fas fa-reply-all" />
    </span>
  </span>
  <span v-else> 
    {{skillName}}
  </span>
</template>
  
  <script>
  import {Skill} from '../../modules/saga-frontier-combo'
  
  export default {
    name: 'SkillName',
    data() {
      return {}
    },
    props: {
      skill: {
        type: Skill,
        required: true
      },
      remasteredNames: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      skillName() {
        return this.skill.getName(this.remasteredNames)
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  