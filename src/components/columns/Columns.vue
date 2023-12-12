<script setup lang="ts">
import ColumnsItem from "@/components/columns/ColumnsItem.vue";
import { Column } from "@/types/Column.d";
defineProps<{
  columns: Column[];
}>();

const emits = defineEmits<{
  createCard: [string, string];
}>();
</script>

<template>
  <div class="flex gap-x-3 overflow-x-auto container py-4">
    <ColumnsItem
      v-for="column in columns"
      :key="column.title"
      :column="column"
      @create-card="emits('createCard', $event, column.title)"
    />
  </div>
</template>
