<template>
  <MenuBar :remasteredNames="remasteredNames" />

  <div class="container block">
    <div class="block">
      <label class="checkbox">
        <input type="checkbox" v-model.lazy="remasteredNames" />
        Remastered Names
      </label>
    </div>

    <div class="columns is-vcentered main-box">
      <template v-for="(skill, index) in combo" :key="index">
        <div class="column p-0">
          <SkillCard
            :skill="skill"
            :previousSkill="index > 0 ? combo.getSkill(index - 1) : null"
            :skills="skills"
            :comboIndex="index"
            :remasteredNames="remasteredNames"
            @skillSelect="handleSkillSelect"
          />
        </div>
        <div
          class="column is-narrow"
          :class="{ 'p-0': comboLevels[index] > 1 }"
          v-if="index < comboLevels.length"
        >
          <ComboCard :level="comboLevels[index]" />
        </div>
      </template>
    </div>
  </div>

  <footer class="footer">
    <div class="content">
      <p>Simulator Version: {{ version }}</p>
      <p>
        Source code for this website is
        <a
          href="https://github.com/GTmmiller/saga-frontier-combo-simulator/blob/main/LICENSE"
          >licenced with Apache 2.0</a
        >
      </p>
      <p>
        <a
          href="https://github.com/GTmmiller/saga-frontier-combo-simulator/blob/main/src/data/skills.json"
        >
          Data about the skills can be used freely
        </a>
      </p>

      <p>This is a fan work created without the intention of profit</p>
      <p>
        The SaGa series, SaGa frontier and SaGa Frontier Remastered are all
        owned by Square Enix.
      </p>
    </div>
  </footer>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { Combo, Skill } from "./modules/saga-frontier-combo";

//import SkillCard from "./components/SkillCard.vue";
import ComboCard from "./components/ComboCard.vue";
import MenuBar from "./components/MenuBar.vue";

import jsonSkills from "./data/skills.json";

export default {
  name: "App",
  components: {
    SkillCard: defineAsyncComponent(() => import("./components/SkillCard.vue")),
    ComboCard,
    MenuBar,
  },
  data() {
    let combo = new Combo();

    const skills = Skill.skillsFromJson(jsonSkills);

    return {
      combo,
      skills,
      remasteredNames: false,
      version: __APP_VERSION__,
    };
  },
  computed: {
    comboLevels() {
      let comboLevels = new Array(this.combo.getLength() - 1);
      for (let i = 0; i < comboLevels.length; i++) {
        comboLevels[i] = 0;
      }
      const comboRanges = this.combo.getCombos();

      for (const comboRange of comboRanges) {
        for (let i = comboRange.start; i < comboRange.end; i++) {
          comboLevels[i] = comboRange.level;
        }
      }
      return comboLevels;
    },
  },
  methods: {
    handleSkillSelect(payload) {
      this.combo.setSkill(
        payload.index,
        this.skills[payload.skillType][payload.oldName]
      );
    },
  },
};
</script>

<style>
.main-box {
  min-height: 10rem;
}
</style>
