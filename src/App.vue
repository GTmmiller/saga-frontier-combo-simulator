<template>

  <section class="hero is-primary">
    <div class="hero-body">
      <p class="title">
        SaGa Frontier Combo Simulator
      </p>
    </div>
  </section>

  <div class="container block">
    <div class="block">
      <label class="checkbox">
        <input type="checkbox" v-model.lazy="remasteredNames" />
        Remastered Names
      </label>
    </div>

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
    <div class="content">
    <p>Source code for this website is licenced with Apache 2.0</p>
    <p>Data about the skills can be used freely</p>

    <p>Information for this tool was found in the following sources</p>
    <ul>
      <li>
        <a href="http://sf.data.project.tripod.com/Zaraktheus/Combo_Data_Export.htm">
          Combo data and explaination
        </a> by Henry (Hank) Jones
      </li>
      <li>
        <a href="https://web.archive.org/web/20190627033802/http://uri.sakura.ne.jp/~saga/sf1/neta/combo_st.html">
          Japanese source for how Combos Work
        </a> by リュート16たーぼさん
      </li>
      <li>
        <a href="https://web.archive.org/web/20190519040045/http://www.uri.sakura.ne.jp/~saga/sf1/wazajutu/combo_st.html">
          Japanese skill and Combo type list
        </a> by リュート16たーぼさん
      </li>
      <li>
        <a href="https://essenceofsaga.wordpress.com/home/book-index/combo-system/">
          Translation of Kyoji Koizumi (Battle System Director)'s explaination of the Combo system
        </a> by Sevon
      </li>
      <li>
        <a href="https://essenceofsaga.wordpress.com/home/name-comparisons/">
          Skill names from the original English translation and from SaGa Frontier Remastered
        </a> by Sevon
      </li>
      <li>
        <a href="https://www.neoseeker.com/saga-frontier/faqs/32730-combo-a.html">
          Combos used to test the simulator
        </a> by Shippu
      </li>
      <li>
        <a href="https://www.spriters-resource.com/playstation/sagafrontier/sheet/54217/">
          Sprite Sheet used to create the favicon for this site
        </a> by Reichu
      </li>
    </ul>

    <p>
      This is a fan work created without the intention of profit
    </p>
    <p>
      The SaGa series, SaGa frontier and SaGa Frontier Remastered are all owned by Square Enix.
    </p>
    </div>
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
