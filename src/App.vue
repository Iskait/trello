<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "./components/the-header/TheHeader.vue";
import CreateColumn from "./components/create/CreateColumn.vue";
import Columns from "./components/columns/Columns.vue";
import { Column } from "./types/Column.d";

const showCreateColumnPopup = ref(false);
const columns = ref<Column[]>([]);

function addCard(card: string, columnTitle: string) {
  const column = columns.value.find((column) => column.title === columnTitle);

  if (column) {
    column.cards.push(card);
  }
}
</script>

<template>
  <div class="wrapper">
    <TheHeader @create-column="showCreateColumnPopup = true" />
    <Columns v-if="columns.length" :columns="columns" @create-card="addCard" />
    <CreateColumn
      v-if="showCreateColumnPopup"
      @close="showCreateColumnPopup = false"
      @create="columns.push({ title: $event, cards: [] })"
    />
  </div>
</template>
