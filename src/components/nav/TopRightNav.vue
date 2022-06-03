<template>
  <div class="w-3/4 right-top">
    <nav class="inline-block align-middle float-right">
      <ul class="flex">
        <RouterLink to="/home">
          <li
            class="
              py-5
              px-2
              hover:bg-slate-800 hover:text-white
              font-bold
              text-slate-800
            "
          >
            Home
          </li>
        </RouterLink>

        <RouterLink to="/about">
          <li
            class="
              py-5
              px-2
              transition
              duration-300
              hover:bg-slate-800 hover:text-white
              font-bold
              text-slate-800
            "
          >
            About
          </li>
        </RouterLink>

        <RouterLink to="/about">
          <li
            class="
              py-5
              px-2
              hover:bg-slate-800 hover:text-white
              font-bold
              text-slate-800
            "
          >
            Logout
          </li>
        </RouterLink>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>