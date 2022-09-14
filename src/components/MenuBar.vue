<template>
  <nav
    class="navbar is-primary block"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <div class="navbar-item is-size-4 has-text-weight-bold">
        SaGa Frontier Combo Simulator
      </div>

      <!-- Do some is-active stuff for this -->
      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': menuDropDown }"
        aria-label="menu"
        aria-expanded="false"
        data-target="modalNavBar"
        @click="menuDropDown = !menuDropDown"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <!-- is Active logic needed here too -->
    <div
      id="modalNavBar"
      class="navbar-menu"
      :class="{ 'is-active': menuDropDown }"
    >
      <div class="navbar-start">
        <a
          role="button"
          class="navbar-item"
          @click="modal = ModalTypes.INSTRUCTIONS"
        >
          Instructions
        </a>

        <a
          role="button"
          class="navbar-item"
          @click="modal = ModalTypes.ACKNOWLEDGEMENTS"
        >
          Acknowledgements
        </a>

        <a role="button" class="navbar-item" @click="modal = ModalTypes.REPORT">
          Report an issue
        </a>
      </div>
    </div>
  </nav>
  <MenuModal
    title="Instructions"
    @closeModal="onCloseModal"
    v-if="modal === ModalTypes.INSTRUCTIONS"
  >
    <InstructionsMessage :remasteredNames="remasteredNames" />
  </MenuModal>
  <MenuModal
    title="Acknowledgements"
    @closeModal="onCloseModal"
    v-else-if="modal === ModalTypes.ACKNOWLEDGEMENTS"
  >
    <AcknowledgementsMessage />
  </MenuModal>
  <MenuModal
    title="Report an issue"
    @closeModal="onCloseModal"
    v-else-if="modal === ModalTypes.REPORT"
  >
    <ReportAnIssueMessage />
  </MenuModal>
</template>

<script>
import MenuModal from "./menu-bar/MenuModal.vue";
import InstructionsMessage from "./menu-bar/InstructionsMessage.vue";
import AcknowledgementsMessage from "./menu-bar/AcknowledgementsMessage.vue";
import ReportAnIssueMessage from "./menu-bar/ReportAnIssueMessage.vue";

const ModalTypes = {
  INSTRUCTIONS: "INSTRUCTIONS",
  ACKNOWLEDGEMENTS: "ACKNOWLEDGEMENTS",
  REPORT: "REPORT",
  NONE: "NONE",
};

export default {
  name: "MenuBar",
  components: {
    MenuModal,
    InstructionsMessage,
    AcknowledgementsMessage,
    ReportAnIssueMessage,
  },
  data() {
    return {
      modal: ModalTypes.NONE,
      ModalTypes,
      menuDropDown: false,
    };
  },
  methods: {
    onCloseModal() {
      this.modal = ModalTypes.NONE;
    },
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
