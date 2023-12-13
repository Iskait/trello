<script setup lang="ts">
import PlusSign from "@/assets/plus.svg?component";
import Trash from "@/assets/trash.svg?component";
import Chat from "@/assets/chat.svg?component";
import { Column } from "@/types/Column.d";
import CreateCard from "@/components/create/CreateCard.vue";
import { VueDraggableNext as draggable } from "vue-draggable-next";
import { ref } from "vue";
import CreateComment from "../create/CreateComment.vue";
import { Comment } from "@/types/Column.d";

defineProps<{
  column: Column;
  index: number;
}>();

const showCreateCard = ref(false);
const showCreateComment = ref(false);

const existingComments = ref<Comment[]>([]);

function editCard(e: Event, index: number) {
  const target = e.target as HTMLLIElement;
  emits("editCard", target.innerText, index);
}

const emits = defineEmits<{
  createCard: [string];
  editCard: [string, number];
  deleteCard: [number];
  createComment: [string, string, number];
}>();

function onOpenCreateComment(comments: Comment[]) {
  showCreateComment.value = true;
  existingComments.value = comments;
}
</script>

<template>
  <div
    class="bg-[#f1f2f4] py-4 px-3 rounded-md flex h-max flex-col gap-y-4 w-[240px]"
  >
    <h3 class="text-gray-800 text-lg">{{ column.title }}</h3>
    <draggable
      v-if="column.cards.length"
      v-model="column.cards"
      tag="ul"
      group="sortable-list-items"
      :sort="true"
      class="flex flex-col gap-y-2 max-h-[300px] overflow-y-auto"
    >
      <li
        v-for="(card, i) in column.cards"
        :key="card.text"
        class="bg-white flex flex-col gap-y-2 rounded-md text-sm p-2 text-gray-700 border border-gray-300 shadow-sm outline-none"
      >
        <p contenteditable="true" @blur="editCard($event, i)">
          {{ card.text }}
        </p>
        <div class="flex gap-x-2 items-center">
          <div
            class="flex gap-x-1 items-center"
            @click="onOpenCreateComment(card.comments)"
          >
            <Chat height="16" width="16" class="cursor-pointer" />
            <span v-if="card.comments.length">{{ card.comments.length }}</span>
          </div>
          <Trash
            height="16"
            width="16"
            class="text-red-500 cursor-pointer"
            @click="emits('deleteCard', i)"
          />
          <CreateComment
            v-if="showCreateComment"
            :comments="existingComments"
            @close="showCreateComment = false"
            @create="
              (comment, author) => emits('createComment', comment, author, i)
            "
          />
        </div>
      </li>
    </draggable>
    <button
      class="text-gray-500 items-center text-sm flex gap-x-2 hover:text-gray-700 transition-colors"
      @click="showCreateCard = true"
    >
      <PlusSign height="20" width="20" /> Add a card
    </button>
    <CreateCard
      v-if="showCreateCard"
      @close="showCreateCard = false"
      @create="emits('createCard', $event)"
    />
  </div>
</template>
