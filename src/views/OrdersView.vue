<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-400">
      <div class="flex p-4">
        <div class="relative mt-1 w-1/2">
          <label for="table-search" class="sr-only">Search</label>
          <div
            class="
              absolute
              inset-y-0
              left-0
              flex
              items-center
              pl-3
              pointer-events-none
            "
          >
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-80
              pl-10
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
            placeholder="Search for items"
            v-model="search"
          />
        </div>
        <div class="w-1/2"></div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="
            text-xs text-gray-700
            uppercase
            bg-gray-50
            dark:bg-gray-700 dark:text-gray-400
          "
        >
          <tr>
            <!-- <th scope="col" class="p-4">#SL</th> -->
            <th scope="col" class="px-6 py-3">Order ID</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Phone</th>
            <th scope="col" class="px-6 py-3">Total Amount</th>
            <th scope="col" class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody v-for="(order, index) in filteredOrders" :key="index">
          <SingleOrder :order="order" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SingleOrder from "../components/orders/SingleOrder.vue";
export default {
  components: { SingleOrder },
  data() {
    return {
      search: "",
      orders: [],
      order: {},
    };
  },
  mounted() {
    this.getAllOrders();
  },
  created() {
    this.eventBus.on("newOrderCreated", (order) => {
      console.log("sd");
      this.orders.unshift(order);
    });
  },
  computed: {
    filteredOrders() {
      return this.orders.filter((order) => {
        return order.order_id.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    getAllOrders() {
      this.$store
        .dispatch("getOrders")
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>