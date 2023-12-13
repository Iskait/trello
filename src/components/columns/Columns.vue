<script setup lang="ts">
import ColumnsItem from "@/components/columns/ColumnsItem.vue";
import { Column } from "@/types/Column.d";
defineProps<{
  columns: Column[];
}>();

const emits = defineEmits<{
  createCard: [string, string];
  editCard: [string, number, string];
  deleteCard: [number, string];
  createComment: [string, string, number, string];
}>();
</script>

<template>
  <div class="flex gap-x-3 overflow-x-auto container py-4">
    <ColumnsItem
      v-for="(column, index) in columns"
      :key="column.title"
      :column="column"
      :index="index"
      @create-card="emits('createCard', $event, column.title)"
      @edit-card="(text, i) => emits('editCard', text, i, column.title)"
      @delete-card="emits('deleteCard', $event, column.title)"
      @create-comment="
        (comment, author, i) =>
          emits('createComment', comment, author, i, column.title)
      "
    />
  </div>
</template>
