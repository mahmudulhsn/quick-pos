<template>
  <div
    v-if="showOrderDetails"
    class="
      bg-black bg-opacity-50
      fixed
      inset-0
      overflow-x-hidden
      justify-center
      items-center
      text-white text-center
      z-50
    "
  >
    <div class="w-1/2 mx-auto mt-10">
      <div class="bg-gray-800 px-4 py-6 rounded shadow-2xl">
        <!-- header section -->
        <div
          class="
            w-full
            flex
            justify-between
            items-center
            space-x-4
            border-b-2 border-gray-400
            pb-5
          "
        >
          <h4 class="font-bold text-2xl">Order Details</h4>
          <span
            @click="closeModal"
            class="cursor-pointer px-3 py-1 bg-red-700 rounded hover:bg-red-900"
          >
            <i class="fa-solid fa-xmark"></i>
          </span>
        </div>
        <!-- header section -->

        <!-- customer info section -->
        <div class="customer-section w-full px-5 align-middle border-b-2">
          <!-- customer selection section -->
          <div class="flex justify-between content-start mt-4 mb-4 space-x-4">
            <div>
              <label for="customer" class="text-xl">Customer: </label>
            </div>
            <div>
              <p>{{ order.customer.name }}</p>
            </div>
          </div>
          <!-- customer selection section -->

          <!-- customer address section -->
          <div class="flex justify-between content-start mt-4 mb-4">
            <div>
              <label for="customer" class="text-xl">Address: </label>
            </div>
            <div>
              <p>{{ order.customer.address }}</p>
            </div>
          </div>
          <!-- customer address section -->
        </div>
        <!-- customer info section -->

        <!-- order details section -->
        <div class="order-details mt-5">
          <h1 class="font-bold text-2xl mb-4">Order details</h1>
          <h1 class="text-left font-bold text-xl mb-4">
            Order ID: {{ order.order_id }}
          </h1>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="
                  text-xs text-gray-700
                  uppercase
                  bg-gray-50
                  dark:bg-gray-700 dark:text-gray-400
                "
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Product name</th>
                  <th scope="col" class="px-6 py-3 text-center">Unit Price</th>
                  <th scope="col" class="px-6 py-3 text-center">Quantity</th>
                  <th scope="col" class="px-6 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(product, index) in order.order_details"
                  :key="index"
                  class="
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                    odd:bg-white
                    even:bg-gray-50
                    odd:dark:bg-gray-800
                    even:dark:bg-gray-700
                  "
                >
                  <th
                    scope="row"
                    class="
                      px-6
                      py-4
                      font-medium
                      text-gray-900
                      dark:text-white
                      whitespace-nowrap
                    "
                  >
                    {{ product.name }}
                  </th>
                  <td class="px-6 py-4 text-center">{{ product.price }}</td>
                  <td class="px-6 py-4 text-center">{{ product.quantity }}</td>
                  <td class="px-6 py-4 float-right">
                    {{ product.totalAmount }}
                  </td>
                </tr>
                <tr
                  class="
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                    odd:bg-white
                    even:bg-gray-50
                    odd:dark:bg-gray-800
                    even:dark:bg-gray-700
                  "
                >
                  <th
                    scope="row"
                    class="
                      px-6
                      py-4
                      font-medium
                      text-gray-900
                      dark:text-white
                      whitespace-nowrap
                    "
                  ></th>
                  <td class="px-6 py-4"></td>
                  <td class="px-6 py-4 text-white font-bold">Subtotal</td>
                  <td class="px-6 py-4 text-white font-bold float-right">
                    {{ order.sub_total }}
                  </td>
                </tr>
                <tr
                  class="
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                    odd:bg-white
                    even:bg-gray-50
                    odd:dark:bg-gray-800
                    even:dark:bg-gray-700
                  "
                >
                  <th
                    scope="row"
                    class="
                      px-6
                      py-4
                      font-medium
                      text-gray-900
                      dark:text-white
                      whitespace-nowrap
                    "
                  ></th>
                  <td class="px-6 py-4"></td>
                  <td class="px-6 py-4 text-white font-bold">Discount</td>
                  <td class="px-6 py-4 text-white font-bold float-right">
                    {{ order.discount }}
                  </td>
                </tr>
                <tr
                  class="
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                    odd:bg-white
                    even:bg-gray-50
                    odd:dark:bg-gray-800
                    even:dark:bg-gray-700
                  "
                >
                  <th
                    scope="row"
                    class="
                      px-6
                      py-4
                      font-medium
                      text-gray-900
                      dark:text-white
                      whitespace-nowrap
                    "
                  ></th>
                  <td class="px-6 py-4"></td>
                  <td class="px-6 py-4 text-white font-bold">
                    Delivery Charge
                  </td>
                  <td class="px-6 py-4 text-white font-bold float-right">
                    {{ order.delivery_charge }}
                  </td>
                </tr>
                <tr
                  class="
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                    odd:bg-white
                    even:bg-gray-50
                    odd:dark:bg-gray-800
                    even:dark:bg-gray-700
                  "
                >
                  <th
                    scope="row"
                    class="
                      px-6
                      py-4
                      font-medium
                      text-gray-900
                      dark:text-white
                      whitespace-nowrap
                    "
                  ></th>
                  <td class="px-6 py-4"></td>
                  <td class="px-6 py-4 text-white font-bold">Total</td>
                  <td class="px-6 py-4 text-white font-bold float-right">
                    {{ order.total }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- order details section -->

        <!-- place order -->
        <div class="place-order mt-5 flex justify-end">
          <button class="px-4 py-2 rounded bg-blue-500">Print</button>
        </div>
        <!-- place order -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOrderDetails: false,
      order: {},
    };
  },
  created() {
    this.eventBus.on("openShowDetailsModal", (order) => {
      this.order = order;
      this.showOrderDetails = true;
    });
  },
  methods: {
    // close modal
    closeModal() {
      this.showOrderDetails = false;
    },
  },
};
</script>

<style scoped>
</style>