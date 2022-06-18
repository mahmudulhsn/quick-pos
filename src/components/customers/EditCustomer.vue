<template>
  <div
    v-show="openEditModal"
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
          <h4 class="font-bold text-2xl">Edit customer</h4>
          <span
            @click="closeModal"
            class="cursor-pointer px-3 py-1 bg-red-700 rounded hover:bg-red-900"
          >
            <i class="fa-solid fa-xmark"></i>
          </span>
        </div>
        <div class="w-full px-5">
          <form
            @submit.prevent="updateCustomer()"
            enctype="multipart/form-data"
          >
            <!-- input start -->
            <div class="from-group w-full">
              <label for="name" class="w-full align-start">
                <span class="py-2 float-left text-md font-bold"
                  >customer Name: *</span
                >
              </label>
              <input
                class="
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:shadow-outline focus:outline-2
                  outline-blue-500/60
                "
                type="text"
                placeholder="customer Name"
                v-model="customer.name"
              />
              <!-- error message -->
              <ErrorMessage v-if="nameValidation" :message="nameValidation" />
              <!-- error message -->
            </div>
            <!-- input end -->

            <!-- input start -->
            <div class="from-group w-full">
              <label for="name" class="w-full align-start">
                <span class="py-2 float-left text-md font-bold"
                  >Phone Number: *
                </span>
              </label>
              <input
                class="
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:shadow-outline focus:outline-2
                  outline-blue-500/60
                "
                type="text"
                placeholder="Phone Number"
                v-model="customer.phone"
              />
              <!-- error message -->
              <ErrorMessage v-if="phoneValidation" :message="phoneValidation" />
              <ErrorMessage
                v-if="resPhoneValidation"
                :message="resPhoneValidation"
              />
              <!-- error message -->
            </div>
            <!-- input end -->

            <!-- input start -->
            <div class="from-group w-full">
              <label for="name" class="w-full align-start">
                <span class="py-2 float-left text-md font-bold">Email: </span>
              </label>
              <input
                class="
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:shadow-outline focus:outline-2
                  outline-blue-500/60
                "
                type="text"
                placeholder="Email"
                v-model="customer.email"
              />
              <!-- error message -->
              <ErrorMessage
                v-if="resEmailValidation"
                :message="resEmailValidation"
              />
              <!-- error message -->
            </div>
            <!-- input end -->

            <!-- input start -->
            <div class="from-group w-full">
              <label for="name" class="w-full align-start">
                <span class="py-2 float-left text-md font-bold"
                  >Address: *
                </span>
              </label>
              <input
                class="
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:shadow-outline focus:outline-2
                  outline-blue-500/60
                "
                type="text"
                placeholder="Address"
                v-model="customer.address"
              />
              <!-- error message -->
              <ErrorMessage
                v-if="addressValidation"
                :message="addressValidation"
              />
              <!-- error message -->
            </div>
            <!-- input end -->

            <!-- button starts -->
            <div
              class="
                from-group
                w-full
                flex
                justify-center
                items-center
                mt-5
                space-x-4
                justify-between
              "
            >
              <button type="reset" class="py-2 px-3 bg-red-500 rounded">
                Cancel
              </button>

              <button
                type="submit"
                class="py-2 px-3 bg-blue-500 rounded"
                :class="{ 'bg-gray-500': !isValidated }"
                :disabled="!isValidated"
              >
                Update
              </button>
            </div>
            <!-- button ends -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorMessage from "../validation/ErrorMessage.vue";
export default {
  components: {
    ErrorMessage,
  },
  props: {
    openEditModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      customer: {
        id: "",
        name: "",
        phone: "",
        email: "",
        address: "",
      },
      errors: {},
      resErrors: {},
    };
  },
  computed: {
    nameValidation() {
      if (this.customer.name == "" || this.customer.name == null) {
        this.errors.name = "Name field is required!";
      } else {
        this.errors.name = null;
      }

      return this.errors.name;
    },

    resPhoneValidation() {
      if (this.resErrors.phone != null) {
        return this.resErrors.phone;
      }
    },

    resEmailValidation() {
      if (this.resErrors.email != null) {
        return this.resErrors.email;
      }
    },

    phoneValidation() {
      if (this.customer.phone == "" || this.customer.phone == null) {
        this.errors.phone = "Phone field is required!";
      } else if (isNaN(this.customer.phone)) {
        this.errors.phone = "Phone field must be a number!";
      } else {
        this.errors.phone = null;
      }
      if (this.errors.phone != null) {
        return this.errors.phone;
      }
      return this.errors.phone;
    },

    addressValidation() {
      if (this.customer.address == "" || this.customer.address == null) {
        this.errors.address = "Address field is required!";
      } else {
        this.errors.address = null;
      }
      return this.errors.address;
    },

    isValidated() {
      if (
        this.errors.name === null &&
        this.errors.address === null &&
        this.errors.phone === null
      ) {
        this.errors = {};
      }

      const isEmpty = Object.keys(this.errors).length === 0;

      return isEmpty;
    },
  },
  created() {
    this.eventBus.on("openEditModal", (customerDetails) => {
      this.customer.id = customerDetails.id;
      this.customer.name = customerDetails.name;
      this.customer.phone = customerDetails.phone;
      this.customer.email = customerDetails.email;
      this.customer.address = customerDetails.address;
    });
  },
  methods: {
    // close modal
    closeModal() {
      this.eventBus.emit("closeEditModal");
    },

    // update customer
    updateCustomer() {
      const updateCustomerDetails = {
        customerID: this.customer.id,
        updateInfo: this.customer,
      };
      this.$store
        .dispatch("updateCustomer", updateCustomerDetails)
        .then((response) => {
          this.$emit("customerUpdated", response.data.data);
          this.closeModal();

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
            title: response.data.message,
          });
        })
        .catch((error) => {
          if (error.response.status == 422) {
            if (error.response.data.errors.phone) {
              this.resErrors.phone = error.response.data.errors.phone[0];
            }
            if (error.response.data.errors.email) {
              this.resErrors.email = error.response.data.errors.email[0];
            }
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>