<template>
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
            <RouterLink to="/"> {{ user.name }} </RouterLink>
          </div>
        </div>
      </div>
      <div class="left-sidebar mt-2">
        <nav>
          <ul class="">
            <RouterLink to="/">
              <li
                class="py-2 hover:bg-gray-500 rounded"
                :class="{
                  'bg-blue-500 hover:bg-blue-500':
                    currentUrlName == 'Dashboard',
                }"
              >
                <span class="px-2"><i class="fa-solid fa-gauge"></i></span>
                <span>Dashboard</span>
              </li>
            </RouterLink>
            <RouterLink to="/customers">
              <li
                class="py-2 hover:bg-gray-500 rounded"
                :class="{
                  'bg-blue-500 hover:bg-blue-500':
                    currentUrlName == 'Customers',
                }"
              >
                <span class="px-2"><i class="fas fa-users"></i></span>
                <span>Customers</span>
              </li>
            </RouterLink>
            <RouterLink to="/products">
              <li
                class="py-2 hover:bg-gray-500 rounded"
                :class="{
                  'bg-blue-500 hover:bg-blue-500': currentUrlName == 'Products',
                }"
              >
                <span class="px-2"
                  ><i class="fa-brands fa-product-hunt"></i
                ></span>
                <span>Products</span>
              </li>
            </RouterLink>
            <RouterLink to="/pos">
              <li
                class="py-2 hover:bg-gray-500 rounded"
                :class="{
                  'bg-blue-500 hover:bg-blue-500': currentUrlName == 'POS',
                }"
              >
                <span class="px-2"
                  ><i class="fa-brands fa-product-hunt"></i
                ></span>
                <span>POS</span>
              </li>
            </RouterLink>
            <RouterLink to="/orders">
              <li
                class="py-2 hover:bg-gray-500 rounded"
                :class="{
                  'bg-blue-500 hover:bg-blue-500': currentUrlName == 'Orders',
                }"
              >
                <span class="px-2"><i class="fas fa-box-open"></i></span>
                <span>Orders</span>
              </li>
            </RouterLink>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },

  computed: {
    currentUrlName() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>