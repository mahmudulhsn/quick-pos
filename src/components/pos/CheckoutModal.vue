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
            @click="$emit('closeOrderDetailsModal')"
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
              <label for="customer" class="text-xl">Select a Customer: </label>
            </div>
            <div>
              <select
                v-model="customer_id"
                class="text-black max-w-full py-2 px-2 rounded w-full"
              >
                <option
                  v-for="(customer, index) in customers"
                  :key="index"
                  :value="customer.id"
                >
                  {{ customer.name }} ({{ customer.phone }})
                </option>
              </select>
              <!-- error message -->
              <ErrorMessage
                v-if="customerValidation"
                :message="customerValidation"
              />
              <!-- error message -->
            </div>
            <div>
              <button @click="openModal" class="bg-green-700 px-4 py-2 rounded">
                <i class="fa-solid fa-plus"></i>
              </button>

              <!-- modal -->
              <CreateCustomer
                :isOpenModal="isModalOpen"
                @modalClose="closeModal"
                @newCustomerCreated="createdNewCustomer"
              />
              <!-- end model -->
            </div>
          </div>
          <!-- customer selection section -->

          <!-- customer address section -->
          <div
            class="flex justify-between content-start mt-4 mb-4"
            v-if="this.customer_id"
          >
            <div>
              <label for="customer" class="text-xl">Address: </label>
            </div>
            <div>
              <p>{{ showAddress }}</p>
            </div>
            <div></div>
          </div>
          <!-- customer address section -->
        </div>
        <!-- customer info section -->

        <!-- order details section -->
        <div class="order-details mt-5">
          <h1 class="font-bold text-2xl mb-4">Order details</h1>
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
                  v-for="(product, index) in cartProducts"
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
                    {{ total }}
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
                    {{ discount }}
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
                    <input
                      class="
                        w-16
                        py-2
                        px-2
                        rounded
                        text-black text-right
                        focus:shadow-outline focus:outline-2
                        outline-blue-500/60
                      "
                      type="text"
                      v-model="delivery_charge"
                    />
                    <br />

                    <!-- error message -->
                    <ErrorMessage
                      v-if="deliveryChargeValidation"
                      :message="deliveryChargeValidation"
                    />
                    <!-- error message -->
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
                    {{ finalTotal + parseFloat(deliveryCharge) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- order details section -->

        <!-- place order -->
        <div class="place-order mt-5 flex justify-end">
          <button
            class="px-4 py-2 rounded bg-blue-500"
            @click="placeOrder"
            :class="{ 'bg-gray-500': !isValidated }"
            :disabled="!isValidated"
          >
            Place Order
          </button>
        </div>
        <!-- place order -->
      </div>
    </div>
  </div>
</template>

<script>
import ErrorMessage from "../validation/ErrorMessage.vue";
import CreateCustomer from "../customers/CreateCustomer.vue";
export default {
  components: { CreateCustomer, ErrorMessage },
  props: {
    showOrderDetails: {
      type: Boolean,
    },
    cartProducts: {
      type: Array,
    },
    total: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    finalTotal: {
      type: Number,
    },
  },
  data() {
    return {
      //   showOrderDetails: false,
      isModalOpen: false,
      customers: [],
      customer_id: null,
      address: "",
      delivery_charge: 70,
      errors: {},
      // order: {
      //   customer_id: "",
      //   delivery_charge: 70,
      //   billing_address: "",
      //   shipping_address: "",
      //   order_details: [],
      //   sub_total: 0,
      //   discount: 0,
      //   total: 0,
      // },
    };
  },
  computed: {
    deliveryCharge() {
      return this.delivery_charge != "" ? this.delivery_charge : 0;
    },

    showAddress() {
      const selectedCustomer = this.customers.find(
        (item) => item.id === this.customer_id
      );

      return (this.address = selectedCustomer.address);
    },

    customerValidation() {
      if (this.customer_id == "" || this.customer_id == null) {
        this.errors.customer_id = "Please select a customer!";
      } else {
        this.errors.customer_id = null;
      }
      return this.errors.customer_id;
    },

    deliveryChargeValidation() {
      if (this.delivery_charge == "" || this.delivery_charge == null) {
        this.errors.delivery_charge = "Required!";
      } else {
        this.errors.delivery_charge = null;
      }
      return this.errors.delivery_charge;
    },

    isValidated() {
      if (
        this.errors.customer_id === null &&
        this.errors.delivery_charge === null
      ) {
        this.errors = {};
      }

      const isEmpty = Object.keys(this.errors).length === 0;

      return isEmpty;
    },
  },

  mounted() {
    this.getAllCustomers();
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.$emit("modalClose");
    },

    createdNewCustomer(customer) {
      this.customers.unshift(customer);
    },

    getAllCustomers() {
      this.$store
        .dispatch("getCustomers")
        .then((response) => {
          this.customers = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    placeOrder() {
      const order = {
        customer_id: this.customer_id,
        billing_address: this.address,
        shipping_address: this.address,
        order_details: this.cartProducts,
        status: "pending",
        sub_total: this.total,
        discount: this.discount,
        delivery_charge: parseFloat(this.deliveryCharge),
        total: this.finalTotal + parseFloat(this.deliveryCharge),
      };

      this.$store.dispatch("createOrder", order).then((response) => {
        this.eventBus.emit("newOrderCreated", response);

        // toast message
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Order placed successfully..",
        });
        // toast message

        this.closeModal();
      });

      this.$router.push({
        name: "Orders",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>