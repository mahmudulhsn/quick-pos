<template>
  <span class="text-red-500 font-bold">{{ message }}</span>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>