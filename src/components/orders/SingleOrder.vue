<template>
  <tr
    class="
      bg-white
      border-b
      dark:bg-gray-800 dark:border-gray-700
      hover:bg-gray-50
      dark:hover:bg-gray-600
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
      {{ order.order_id }}
    </th>
    <td class="px-6 py-4">{{ order.customer.name }}</td>
    <td class="px-6 py-4">{{ order.customer.phone }}</td>
    <td class="px-6 py-4">{{ order.total }}</td>
    <td class="px-6 py-4 float-right space-x-3 items-center content-end">
      <button
        class="font-medium text-white py-2 px-3 bg-sky-500 rounded"
        @click.prevent="showOrderDetails(order.id)"
      >
        <i class="fas fa-edit"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
    },
  },

  methods: {
    // edit customer
    showOrderDetails(orderID) {
      this.$store
        .dispatch("getSingleOrder", orderID)
        .then((response) => {
          this.eventBus.emit("openShowDetailsModal", response.data.data);
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