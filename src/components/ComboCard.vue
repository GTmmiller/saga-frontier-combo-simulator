<template>
  <div
    class="box has-text-centered has-background-primary has-text-light"
    :class="{ 'is-hidden': level === 0 }"
  >
    {{ level }}
  </div>
</template>

<script>
export default {
  name: "ComboCard",
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
