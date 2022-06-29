<template>
  <div
    class="
      flex
      justify-center
      items-center
      bg-gray-900
      h-screen
      bg-black bg-opacity-90
      fixed
      inset-0
      overflow-x-hidden
      justify-center
      items-center
      text-white text-center
      z-50
    "
  >
    <div
      class="
        bg-white
        flex
        space-x-2
        p-5
        rounded-full
        justify-center
        items-center
      "
    >
      <div
        class="bg-blue-600 p-2 w-4 h-4 rounded-full animate-bounce blue-circle"
      ></div>
      <div
        class="
          bg-green-600
          p-2
          w-4
          h-4
          rounded-full
          animate-bounce
          green-circle
        "
      ></div>
      <div
        class="bg-red-600 p-2 w-4 h-4 rounded-full animate-bounce red-circle"
      ></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.blue-circle {
  animation-delay: 0.1s;
}
.green-circle {
  animation-delay: 0.2s;
}
.red-circle {
  animation-delay: 0.3s;
}
</style>