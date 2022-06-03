<template>
  <div class="">
    <!-- header starts -->
    <header
      class="w-full fixed top-0 left-0 mb-15 border-b border-b-gray-400 z-40"
    >
      <div class="grid grid-cols-5">
        <div class="logo">
          <RouterLink to="/">
            <img class="w-4/5 mx-auto" src="/src/images/site-logo.png" alt="" />
          </RouterLink>
        </div>
        <div class="col-span-4 bg-white">
          <div class="flex">
            <div class="w-1/4 left-top">
              <nav class="float-left inline-block align-center">
                <ul>
                  <button class="ml-2" @click="toggleSidebar">
                    <i class="fa-solid fa-bars text-2xl p-4"></i>
                  </button>
                </ul>
              </nav>
            </div>
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
          </div>
        </div>
      </div>
    </header>
    <!-- header end -->

    <main class="w-full">
      <div class="grid grid-cols-5">
        <div class="bg-gray-600 text-white">
          <div class="fixed left-0 top-9 mt-8 w-1/5 p-2 bg-gray-600 h-screen">
            <div class="user-info py-3 px-2 border-b border-b-gray-500">
              <div class="avatar flex space-x-2 content-center">
                <div class="w-1/4">
                  <RouterLink to="/">
                    <img
                      class="h-10 rounded-full"
                      src="/src/images/user-2.jpg"
                      alt="Logo"
                    />
                  </RouterLink>
                </div>
                <div class="w-3/4 inline-block py-2">
                  <RouterLink to="/"> M H Hasib </RouterLink>
                </div>
              </div>
            </div>
            <div class="left-sidebar mt-2">
              <nav>
                <ul class="">
                  <RouterLink to="/">
                    <li class="py-2 hover:bg-gray-500 rounded">
                      <span class="px-2"
                        ><i class="fa-solid fa-gauge"></i
                      ></span>
                      <span>Dashboard</span>
                    </li>
                  </RouterLink>
                  <RouterLink to="/products">
                    <li class="py-2 hover:bg-gray-500 rounded">
                      <span class="px-2"
                        ><i class="fa-brands fa-product-hunt"></i
                      ></span>
                      <span>Products</span>
                    </li>
                  </RouterLink>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div class="col-span-4">
          <div class="p-2 mt-16">
            <RouterView />
          </div>
        </div>
      </div>
    </main>

    <!-- footer starts -->
    <footer class="w-full fixed bottom-0 left-0">
      <div class="grid grid-cols-5">
        <div class="bg-gray-600"></div>
        <div
          class="
            col-span-4
            bg-gray-700
            h-8
            text-sm text-white
            flex
            items-center
            justify-center
          "
        >
          <p>
            Copyright © 2022
            <RouterLink to="/" class="text-blue-500">Quick POS</RouterLink>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
    <!-- footer end -->
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>