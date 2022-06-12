<template>
  <div>
    <div class="flex w-full space-x-2">
      <div class="w-2/6 bg-gray-200 shadow-xl rounded">
        <div class="mx-2">
          <div class="cart-title py-4 border-b-2 border-gray-500">
            <h1 class="text-center font-bold text-2xl">Cart Items (5)</h1>
          </div>
          <div class="cart-details my-2">
            <!-- single cart item -->
            <div
              class="
                single-cart
                shadow-md
                bg-slate-100
                rounded
                py-3
                my-3
                relative
              "
            >
              <span
                class="
                  absolute
                  top-0
                  right-0
                  px-2
                  bg-red-600
                  rounded
                  text-white
                  cursor-pointer
                "
                ><i class="fa-solid fa-xmark"></i
              ></span>
              <h5 class="text-center py-1 text-lg text-bold my-1">
                Boots Tampon
              </h5>
              <div class="md:flex space-x-2 mx-2">
                <div class="md:w-2/5 flex space-x-2 sm:w-full">
                  <div
                    class="
                      py-1
                      px-3
                      bg-gray-300
                      rounded
                      cursor-pointer
                      font-bold
                    "
                  >
                    -
                  </div>
                  <div class="py-1">2</div>
                  <div
                    class="
                      py-1
                      px-3
                      bg-gray-300
                      rounded
                      cursor-pointer
                      font-bold
                    "
                  >
                    +
                  </div>
                </div>
                <div class="md:w-1/5 text-center py-1 font-bold sm:w-full">
                  X
                </div>
                <div class="md:w-2/5 bg-gray-300 mr-2 rounded sm:w-full">
                  <div class="text-right mr-2 py-1 font-bold sm:text-center">
                    680
                  </div>
                </div>
              </div>
            </div>
            <!-- single cart item -->
          </div>
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
              <h5>500</h5>
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
              <h5>0</h5>
            </div>
            <!-- discount -->

            <!-- discount -->
            <div class="sub-total justify-between flex font-bold py-2">
              <h5>Total</h5>
              <h5>500</h5>
            </div>
            <!-- discount -->
          </div>
        </div>
      </div>
      <div class="w-4/6 bg-gray-300 shadow-xl rounded"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>