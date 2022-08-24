<template>
  <div class="box">
      {{skill.newName}}
  </div>
</template>

<script>
import {Skill} from '../modules/saga-frontier-combo'

export default {
  name: 'SkillCard',
  props: {
    skill: {
      type: Skill,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
