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
    <!-- <td class="w-4 p-4">{{ product.id }}</td> -->
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
    <td class="px-6 py-4">{{ product.price }}</td>
    <td class="px-6 py-4">{{ product.quantity }}</td>
    <td class="px-6 py-4 float-right space-x-3 items-center content-end">
      <a href="#" class="font-medium text-white py-2 px-3 bg-sky-500 rounded">
        <i class="fas fa-edit"></i>
      </a>
      <a href="#" class="font-medium text-white py-2 px-3 bg-red-500 rounded">
        <i class="fas fa-trash"></i>
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>