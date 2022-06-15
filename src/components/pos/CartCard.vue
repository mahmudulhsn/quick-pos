<template>
  <div class="w-2/6 bg-gray-200 shadow-xl rounded h-fit">
    <div class="mx-2" v-if="cartProducts.length > 0">
      <div class="cart-title py-3 border-b-2 border-gray-500">
        <h1 class="text-center font-bold text-xl">
          Cart Items ({{ cartProducts.length }})
        </h1>
      </div>
      <div class="cart-details my-2">
        <!-- single cart item -->
        <div v-for="(product, index) in cartProducts" :key="index">
          <SingleCartProduct
            :product="product"
            @remove="removeCartItem"
            @removeQuantityFromCart="removeQuantityFromCart"
          />
        </div>
        <!-- single cart item -->
      </div>

      <!-- checkout section -->
      <div class="checkout pt-10 pb-2">
        <div class="w-full">
          <button
            @click="showOrderDetailsModal"
            class="
              float-right
              bg-teal-800
              px-4
              py-2
              text-white
              font-bold
              rounded
            "
          >
            Checkout
          </button>

          <!-- modal -->
          <CheckoutModal
            :showOrderDetails="showOrderDetails"
            @closeOrderDetailsModal="closeOrderDetailsModal"
            :cartProducts="cartProducts"
            :total="total"
            :discount="discount"
            :finalTotal="finalTotal"
          />
          <!-- modal -->
        </div>
      </div>
      <!-- checkout section -->

      <div class="cart-footer pt-10 pb-2">
        <!-- subtotal  -->
        <div
          class="
            sub-total
            justify-between
            flex
            font-bold
            py-2
            border-y border-gray-500
          "
        >
          <h5>Subtotal</h5>
          <h5>{{ total }}</h5>
        </div>
        <!-- subtotal -->

        <!-- discount -->
        <div
          class="
            sub-total
            justify-between
            flex
            font-bold
            py-2
            border-b border-gray-500
          "
        >
          <h5>Discount</h5>
          <h5>
            <input
              class="w-24 text-center text-green-500 rounded focus:outline-none"
              type="number"
              v-model="discount"
              @keyup.enter="countDiscount"
            />
          </h5>
          <h5 class="text-red-700">-{{ discount }}</h5>
        </div>
        <!-- discount -->

        <!-- discount -->
        <div class="sub-total justify-between flex font-bold py-2">
          <h5>Total</h5>
          <h5>{{ finalTotal }}</h5>
        </div>
        <!-- discount -->
      </div>
    </div>

    <div v-else class="grid h-80 place-items-center">
      <h1
        class="
          text-center
          font-bold
          text-2xl text-teal-800
          bg-gray-100
          px-4
          py-3
          rounded
          shadow-2xl
        "
      >
        Please add product to cart.
      </h1>
    </div>
  </div>
</template>

<script>
import CheckoutModal from "./CheckoutModal.vue";
import SingleCartProduct from "./SingleCartProduct.vue";
export default {
  components: {
    SingleCartProduct,
    CheckoutModal,
  },
  data() {
    return {
      cartProducts: [],
      total: 0,
      finalTotal: 0,
      discount: 0,
      showOrderDetails: false,
    };
  },

  mounted() {
    this.eventBus.on("addToCart", (product) => {
      let cartProduct = {
        id: product.id,
        name: product.name,
        totalAmount: parseFloat(product.price),
        price: parseFloat(product.price),
        quantity: 1,
      };

      let tempFinalTotal = cartProduct.totalAmount * cartProduct.quantity;

      let findItem = this.cartProducts.find(
        (element) => element.id == cartProduct.id
      );
      if (findItem) {
        this.cartProducts.map((element) => {
          if (element.id == cartProduct.id) {
            element.quantity = element.quantity + cartProduct.quantity;
            element.totalAmount += tempFinalTotal;
          }
        });
      } else {
        this.cartProducts.push(cartProduct);
      }
      this.total += tempFinalTotal;
      this.countDiscount();

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
        title: "Product added to cart.",
      });
      // toast message
    });
  },

  methods: {
    // count discount
    countDiscount() {
      if (this.total - parseFloat(this.discount) > 0) {
        this.finalTotal = this.total - parseFloat(this.discount);
      } else {
        this.finalTotal = 0;
        this.discount = 0;
      }
    },

    // remove item from cart
    removeCartItem(cartProduct) {
      const indexOfObject = this.cartProducts.findIndex(
        (object) => object.id == cartProduct.id
      );
      this.cartProducts.splice(indexOfObject, 1);

      this.total -= cartProduct.totalAmount;
      this.countDiscount();

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
        title: "Product removed from cart.",
      });
      // toast message

      // return item to the products
      // this.eventBus.emit("returnItems", cartItem);
    },

    // remove quantity from cart
    removeQuantityFromCart(product) {
      let cartProduct = {
        id: product.id,
        name: product.name,
        totalAmount: parseFloat(product.price),
        price: parseFloat(product.price),
        quantity: 1,
      };

      let tempFinalTotal = cartProduct.totalAmount * cartProduct.quantity;

      let findItem = this.cartProducts.find(
        (element) => element.id == cartProduct.id
      );
      if (findItem) {
        this.cartProducts.map((element) => {
          if (element.id == cartProduct.id) {
            if (element.quantity - cartProduct.quantity <= 0) {
              const indexOfObject = this.cartProducts.findIndex(
                (object) => object.id == cartProduct.id
              );
              this.cartProducts.splice(indexOfObject, 1);
            } else {
              element.quantity = element.quantity - cartProduct.quantity;
              element.totalAmount -= tempFinalTotal;
            }
          }
        });

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
          title: "Product removed from cart.",
        });
        // toast message
      } else {
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
          icon: "warning",
          title: "No product found.",
        });
        // toast message
      }
      this.total -= tempFinalTotal;
      this.countDiscount();
    },

    showOrderDetailsModal() {
      this.showOrderDetails = true;
    },

    closeOrderDetailsModal() {
      this.showOrderDetails = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>