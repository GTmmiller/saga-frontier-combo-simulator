<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('closeModal')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button
          class="delete"
          @click="$emit('closeModal')"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <slot></slot>
        </div>
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuModal",
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  emits: ["closeModal"],
};
</script>

<style></style>
