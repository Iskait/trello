<script setup lang="ts">
import PlusSign from "@/assets/plus.svg?component";
import { Column } from "@/types/Column.d";
import CreateCard from "@/components/create/CreateCard.vue";
import { ref } from "vue";

defineProps<{
  column: Column;
}>();

const showCreateCard = ref(false);
const emits = defineEmits<{
  createCard: [string];
}>();
</script>

<template>
  <div
    class="bg-[#f1f2f4] py-4 px-3 rounded-md flex flex-col gap-y-4 min-w-[200px]"
  >
    <h3 class="text-gray-800">{{ column.title }}</h3>
    <ul
      v-if="column.cards.length"
      class="flex flex-col gap-y-2 max-h-[300px] overflow-y-auto"
    >
      <li
        v-for="card in column.cards"
        :key="card"
        class="bg-white rounded-md p-1 text-gray-400"
      >
        {{ card }}
      </li>
    </ul>
    <button
      class="text-gray-500 items-center flex gap-x-2 hover:text-gray-700 transition-colors"
      @click="showCreateCard = true"
    >
      <PlusSign /> Add a card
    </button>
    <CreateCard
      v-if="showCreateCard"
      @close="showCreateCard = false"
      @create="emits('createCard', $event)"
    />
  </div>
</template>
