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
        <div class="w-1/2">
          <button
            class="
              float-right
              px-5
              py-2
              bg-blue-500
              text-white
              rounded
              hover:bg-indigo-500
              ease-out
              duration-300
            "
            @click="openModal"
          >
            Create new customer
          </button>
        </div>
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
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Phone</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody v-for="(customer, index) in filteredCustomers" :key="index">
          <SingleCustomer
            :customer="customer"
            @customerDeleted="deleteCustomer"
          />
        </tbody>
      </table>
    </div>

    <!-- modal -->
    <CreateCustomer
      :isOpenModal="isModalOpen"
      @modalClose="closeModal"
      @newCustomerCreated="createdNewCustomer"
    />
    <!-- end model -->

    <!-- edit modal -->
    <EditCustomer
      :openEditModal="openEditModal"
      @customerUpdated="customerUpdated"
    />
    <!-- end edit model -->
  </div>
</template>

<script>
import EditCustomer from "../components/customers/EditCustomer.vue";
import CreateCustomer from "../components/customers/CreateCustomer.vue";
import SingleCustomer from "../components/customers/SingleCustomer.vue";
export default {
  components: { SingleCustomer, CreateCustomer, EditCustomer },
  data() {
    return {
      isModalOpen: false,
      openEditModal: false,
      search: "",
      search: "",
      customers: [],
      customer: {},
    };
  },
  mounted() {
    this.getAllCustomers();
  },
  created() {
    this.eventBus.on("openEditModal", (customer) => {
      this.openEditModal = true;
      this.customer = customer.customer;
    });
    this.eventBus.on("closeEditModal", () => {
      this.openEditModal = false;
    });
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter((customer) => {
        return customer.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
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

    createdNewCustomer(customer) {
      this.customers.unshift(customer);
    },

    customerUpdated(updatedCustomer) {
      const item = updatedCustomer;
      this.customers = this.customers.map((x) => (x.id === item.id ? item : x));
    },

    deleteCustomer(customerID) {
      this.customers.splice(
        this.customers.find((item) => item.id === customerID),
        1
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>