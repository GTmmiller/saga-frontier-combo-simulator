<template>
  <div class="container">
    <h1>Combo Simulator</h1>
    <div class="columns is-vcentered">
      
      <template v-for="(skill, index) in combo" :key="skill">
        <div class="column">
          <SkillCard :skill="skill" :jsonSkills="jsonSkills" />
        </div>
        <div class="column is-narrow" v-if="index < comboLevels.length">
          <ComboCard :level="comboLevels[index]" />
        </div>
      </template>
      
    </div>
  </div>

    <!--
    <div class="columns">
      <span v-for="i in combo.getLength()" :key="i">
        <SkillCard :skill="combo.getSkill(i - 1)" />
      </span>
    </div>
-->


    <!-- <div class="columns is-gapless">
      <div class="column">
          <div class="box">
            <figure class="image is-32x32">
              <img src="img/sword_icon.png"/>
            </figure>
            New Slash

            <div class="field is-grouped">
              <button class="button">
                Sends
              </button>
              <button class="button">
                Recieves
              </button>
            </div>
            <p>
              Additional Information
            </p>
            

          </div>
        </div>
        <div class="column is-1">
          <div class="box is-primary has-text-centered">
            <p>1</p>
          </div>
        </div>
        <div class="column">
          <SkillCard :skill="combo.getSkill(2)" />
        </div>
        <div class="column">
          <div class="box">Three</div>
            
          </div>
        <div class="column">
          <div class="box">Four</div></div>
        <div class="column"><div class="box">Five</div></div> 
    </div> -->
        

      <!--
      <div class="columns">
        <div class="column notification is-primary">
          Dead Stop
        </div>
        <div class="column notification is-error">
          Down
        </div>
        <div class="column">
          Instant Stop
        </div>
        <div class="column">
          Move
        </div>
        <div class="column">
          Hot
        </div>
        <div class="column">
          Cold
        </div>
        <div class="column">
          Black Out
        </div>
        <div class="column">
          Snow
        </div>
      </div>
    </div> -->
    <footer class="footer">
      <p>
          Information presented in this tool was obtained from this document:
        The information from that document is copyright x 2009
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
import {Combo} from './modules/saga-frontier-combo'

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
    let comboLevels = new Array(combo.getLength() - 1)
    
    for (let i = 0; i < comboLevels.length; i++) {
      comboLevels[i] = 0
    }

    Object.freeze(jsonSkills)


    
    return {
      combo,
      comboLevels,
      jsonSkills
    }
  },
}
</script>

<style>
@import '../node_modules/bulma/css/bulma.css';
</style>
