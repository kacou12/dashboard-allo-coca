<template>
  <div class="max-w-4xl mx-auto py-2 space-y-6">
    <!-- En-tête de la commande -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h1 class="font-bold text-gray-900">
            Commande {{ order.reference }}
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            {{ formatRelativeDate(new Date(order.order_date)) }}
          </p>
        </div>
      </div>

      <OrderStatusBloc :order="order"></OrderStatusBloc>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">Client</h3>
          <p class="text-gray-900">{{ order.user.name }}</p>
          <p class="text-sm text-gray-600">{{ order.user.email }}</p>
          <p class="text-sm text-gray-600">{{ order.user.phone }}</p>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">Livraison</h3>
          <p class="text-gray-900">{{ order.delivery.full_name }}</p>
          <p class="text-sm text-gray-600">{{ order.delivery.phone_number }}</p>
          <p class="text-sm text-gray-600">{{ order.delivery.address }}</p>
          <p class="text-sm text-gray-600">{{ order.delivery.municipality }}</p>
          <p
            v-if="order.delivery.notes"
            class="text-sm text-gray-500 italic mt-2"
          >
            Note: {{ order.delivery.notes }}
          </p>
        </div>
      </div>
    </div>

    <!-- Articles de la commande -->
    <div
      class="bg-white rounded-lg shadow h-[calc(100vh-600px)] overflow-y-auto"
    >
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Article(s)</h2>
      </div>
      <div class="divide-y divide-gray-200">
        <div
          v-for="item in order.items"
          :key="item.id"
          class="px-6 py-4 flex justify-between items-center"
        >
          <div class="flex-1">
            <p class="font-medium text-gray-900">
              {{ item.variant.product.name }} {{ item.variant.label }} ({{
                item.variant.size
              }}
              <span v-if="item.type.toLowerCase() === 'water'"
                >, {{ item.variant.description }}</span
              >)
            </p>
            <!-- <p class="text-sm text-gray-600">{{ item.variant.name }}</p> -->
            <p class="text-sm text-gray-500 mt-1">
              {{ formatPrice(item.unit_price) }} × {{ item.quantity }}
            </p>
          </div>
          <div class="text-right">
            <p class="font-semibold text-gray-900">
              {{ formatPrice(item.line_total) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Récapitulatif -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="space-y-2">
        <div class="flex justify-between text-gray-600">
          <span>Sous-total</span>
          <span>{{ formatPrice(subtotal) }}</span>
        </div>
        <div v-if="order.is_settled" class="flex justify-between text-gray-600">
          <span>Consignation</span>
          <span>{{ formatPrice(order.number_of_casier * 3600) }}</span>
        </div>
        <div
          class="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t"
        >
          <span>Total</span>
          <span>{{ formatPrice(order.total_amount) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatPrice, formatRelativeDate } from "@/myUtils";
import type { OrderResponse } from "@/services/allococa/orders/order-type";
import { computed, type PropType } from "vue";
import OrderStatusBloc from "./orderStatusBloc.vue";

const { order } = defineProps({
  order: {
    type: Object as PropType<OrderResponse>,
    required: true,
  },
});

const subtotal = computed(() => {
  return order.items.reduce((acc, item) => acc + item.line_total, 0);
});
</script>

<style scoped></style>
