<script setup lang="ts">
import { ref, watch } from "vue";
import TheHeader from "./components/the-header/TheHeader.vue";
import CreateColumn from "./components/create/CreateColumn.vue";
import Columns from "./components/columns/Columns.vue";
import { Column } from "./types/Column.d";

const showCreateColumnPopup = ref(false);
const columns = ref<Column[]>(
  JSON.parse(localStorage.getItem("columns") || "[]"),
);

function createCard(text: string, columnTitle: string) {
  const column = columns.value.find((column) => column.title === columnTitle);

  if (column) {
    column.cards.push({
      text,
      comments: [],
    });
  }
}

function editCard(text: string, index: number, columnTitle: string) {
  const column = columns.value.find((column) => column.title === columnTitle);

  if (column) {
    column.cards[index].text = text;
  }
}

function deleteCard(index: number, columnTitle: string) {
  const column = columns.value.find((column) => column.title === columnTitle);

  if (column) {
    column.cards.splice(index, 1);
  }
}

function createComment(
  comment: string,
  author: string,
  index: number,
  columnTitle: string,
) {
  const column = columns.value.find((column) => column.title === columnTitle);

  if (column) {
    column.cards[index].comments.push({
      comment,
      author,
    });
  }
}

watch(
  () => columns.value,
  (columns) => {
    localStorage.setItem("columns", JSON.stringify(columns));
  },
  { deep: true },
);
</script>

<template>
  <div class="wrapper">
    <TheHeader @create-column="showCreateColumnPopup = true" />
    <Columns
      v-if="columns.length"
      :columns="columns"
      @create-card="createCard"
      @edit-card="editCard"
      @delete-card="deleteCard"
      @create-comment="createComment"
    />
    <CreateColumn
      v-if="showCreateColumnPopup"
      @close="showCreateColumnPopup = false"
      @create="columns.push({ title: $event, cards: [] })"
    />
  </div>
</template>
