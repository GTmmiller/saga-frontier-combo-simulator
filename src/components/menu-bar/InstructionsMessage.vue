<template>
  <h2>Usage</h2>
  <p>
    Click on one of the five drop downs to select a skill. The 'Combo Skills
    Only' checkbox will filter the drop down to skills that are compatible with
    the previous skill. This filter will display attack-all skills that may not
    combo due to how the combo sytem works.
  </p>

  <h2>Symbol Key</h2>
  <p>
    <font-awesome-icon icon="fas fa-repeat" /> - Skills that can combo with
    themselves.
  </p>

  <p>
    <font-awesome-icon icon="fas fa-reply-all" /> - Attacks that target all
    enemies. Attack-all skills have some additional combo properties.
  </p>

  <h2>How Combos Work</h2>
  <p>
    Special Moves in SaGa Frontier (Heavy Weapons, Skills, etc) all have skill
    types that they "send" and skill types that they "recieve". There are eight
    total skill types:
  </p>

  <ComboTypeTags :comboTypes="fullSet" />
  <p>
    These skill types only affect combos and have no bearing on damage types,
    weaknesses, or how much damage a combo will do. For example:
    <SkillName :skill="stunSlash" :remasteredNames="remasteredNames" />
    can combo with
    <SkillName :skill="doubleSlash" :remasteredNames="remasteredNames" />
    because
    <SkillName :skill="stunSlash" :remasteredNames="remasteredNames" />
    sends <span class="tag is-link">Down</span> and
    <SkillName :skill="doubleSlash" :remasteredNames="remasteredNames" />
    recieves <span class="tag is-link">Down</span>. Nothing can combo after
    <SkillName :skill="doubleSlash" :remasteredNames="remasteredNames" />
    because it does not send any combo types to the next slot.
  </p>
  <p>
    Combos can be disrupted both by party members moving out of turn and enemies
    attacking. For example, if you wanted to perform the
    <SkillName :skill="stunSlash" :remasteredNames="remasteredNames" /> ->
    <SkillName :skill="doubleSlash" :remasteredNames="remasteredNames" /> combo
    with Blue and Lute, but Lute used
    <SkillName :skill="doubleSlash" :remasteredNames="remasteredNames" /> before
    Blue used
    <SkillName :skill="stunSlash" :remasteredNames="remasteredNames" />, then
    the combo would not work. If Blue were to perform
    <SkillName :skill="stunSlash" :remasteredNames="remasteredNames" />, then an
    enemy performed Trample, and then Lute performed
    <SkillName :skill="doubleSlash" :remasteredNames="remasteredNames" />, there
    would be no combo due to enemy interruption.
  </p>

  <h3>Attack-All Skills <font-awesome-icon icon="fas fa-reply-all" /></h3>
  <p>
    Attack-all skills appear to have some special combo behavior that differs
    from single target/area target skills. Attack-all skills don't appear to be
    able to combo with other attack all skills. Level 2 combos involving attack
    all skills can only begin with one and can't end with one. This doesn't
    appear to be the case for Level 3 combos onward. Keep in mind that this is
    only speculation, but this behavior seems consistent with the information
    I've consulted and my own game play experience. Feel free to
    <a href="https://github.com/GTmmiller/saga-frontier-combo-simulator/issues"
      >open a ticket</a
    >
    if you have proof of a combo that can break these rules.
  </p>

  <h3>The <span class="tag is-info is-light">Snow</span> Combo Type</h3>
  <p>
    Snow is an odd type as it's
    <a href="https://essenceofsaga.wordpress.com/home/book-index/combo-system/"
      >not included in the official write up about the combo system</a
    >. It's only sent by
    <SkillName :skill="finalStrike" :remasteredNames="remasteredNames" /> and
    <SkillName :skill="blizzard" :remasteredNames="remasteredNames" /> and
    recived by
    <SkillName :skill="moonlightCut" :remasteredNames="remasteredNames" />. It's
    possible that Snow was a beta name for the Cold type that slipped past
    testing, but that's pure speculation and may not be true.
  </p>
</template>

<script>
import { Set } from "immutable";
import { ComboTypes, Skill } from "../../modules/saga-frontier-combo";
import jsonSkills from "../../data/skills.json";

import SkillName from "../skill-card/SkillName.vue";
import ComboTypeTags from "../skill-card/ComboTypeTags.vue";

export default {
  name: "InstructionsMessage",
  components: {
    SkillName,
    ComboTypeTags,
  },
  data() {
    return {
      downSet: Set([ComboTypes.Down]),
      fullSet: Set([
        ComboTypes["Dead Stop"],
        ComboTypes.Down,
        ComboTypes["Instant Stop"],
        ComboTypes.Move,
        ComboTypes.Hot,
        ComboTypes.Cold,
        ComboTypes["Black Out"],
        ComboTypes.Snow,
      ]),
      snowSet: Set([ComboTypes.Snow]),
      stunSlash: Skill.fromJson(jsonSkills.Sword.StunSlash),
      doubleSlash: Skill.fromJson(jsonSkills.Sword.DoubleSlash),
      finalStrike: Skill.fromJson(jsonSkills["Item-Inherent"].FinalStrike),
      blizzard: Skill.fromJson(jsonSkills.Katana.Blizzard),
      moonlightCut: Skill.fromJson(jsonSkills.Katana.MoonlightCut),
    };
  },
  props: {
    remasteredNames: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style></style>
