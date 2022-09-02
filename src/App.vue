<template>
  <div class="container">
    <h1 class="title">Combo Simulator</h1>
    <label class="checkbox">
      <input type="checkbox" v-model.lazy="remasteredNames" />
      Remastered Names
    </label>
    <div class="columns is-vcentered">
      
      <template v-for="(skill, index) in combo" :key="index">
        <div class="column px-0">
          <SkillCard 
            :skill="skill"
            :previousSkill="index > 0 ? combo.getSkill(index - 1) : null"
            :skills="skills"
            :comboIndex="index"
            :remasteredNames="remasteredNames"
            @skillSelect="handleSkillSelect" />
        </div>
        <div class="column is-narrow"
          :class="{'px-0': comboLevels[index] > 1}"
          v-if="index < comboLevels.length">
          <ComboCard :level="comboLevels[index]" />
        </div>
      </template>

    </div>
  </div>

  <footer class="footer">
    <p>
      Information presented in this tool was obtained from this document:
      The information from that document is copyright x 2009
    </p>
    <p>
      https://saga.fandom.com/wiki/SaGa_Frontier_Techniques
      skill names from here

      https://gamefaqs.gamespot.com/boards/198537-saga-frontier/79409430

      Skill and item names taken from this mod:https://gamefaqs.gamespot.com/boards/198537-saga-frontier/79726629
      
      https://essenceofsaga.wordpress.com/home/name-comparisons/weapons/#Heavy_Weapons
    
      testing combos: https://www.neoseeker.com/saga-frontier/faqs/32730-combo-a.html
    </p>
    
    <p>
      Icons were grabbed from this sprite sheet: 
    </p>

    <p>
      The SaGa series, SaGa frontier and SaGa Frontier remastered are all copywritten to Square Enix
    </p>
  </footer>

</template>

<script>
import {Combo, Skill} from './modules/saga-frontier-combo'

import SkillCard from './components/SkillCard.vue'
import ComboCard from './components/ComboCard.vue'

import jsonSkills from './data/skills.json'

export default {
  name: 'App',
  components: {
    SkillCard,
    ComboCard
  },
  data() {
    let combo = new Combo()
    
    const skills = Skill.skillsFromJson(jsonSkills)

    return {
      combo,
      skills,
      remasteredNames: false
    }
  },
  computed: {
    comboLevels() {
      let comboLevels = new Array(this.combo.getLength() - 1)
      for (let i = 0; i < comboLevels.length; i++) {
        comboLevels[i] = 0
      }
      const comboRanges = this.combo.getCombos()

      for (const comboRange of comboRanges) {
        for(let i = comboRange.start; i < comboRange.end; i++) {
          comboLevels[i] = comboRange.level
        }
      }
      return comboLevels
    },
  },
  methods: {
    handleSkillSelect(payload) {
      this.combo.setSkill(payload.index, this.skills[payload.skillType][payload.oldName])
    }
  }
}
</script>

<style>
@import '../node_modules/bulma/css/bulma.css';
</style>
