<script setup lang="ts">
import UiPopup from "@/components/ui/UiPopup.vue";
import XMark from "@/assets/x-mark.svg?component";
import { ref } from "vue";
import { Comment } from "@/types/Column.d";

defineProps<{
  comments: Comment[];
}>();

const emits = defineEmits<{
  close: [];
  create: [string, string];
}>();

const author = ref("");
const comment = ref("");

function createComment() {
  if (author.value && comment.value) {
    emits("create", comment.value, author.value);
    emits("close");
  }
}
</script>

<template>
  <UiPopup @close="emits('close')" @on-enter-press="createComment">
    <div
      class="bg-[#f1f2f4] flex flex-col justify-between p-5 h-[500px] w-[580px] rounded-md"
    >
      <div class="flex justify-between items-center text-gray-500">
        <h2 class="text-4xl">Комментарии</h2>
        <XMark
          class="cursor-pointer hover:text-gray-700 transition-colors"
          @click="emits('close')"
        />
      </div>
      <div v-if="comments.length" class="flex flex-col gap-y-3">
        <div
          v-for="existingComment in comments"
          :key="existingComment.comment + existingComment.author"
          class="bg-white p-3 rounded-md shadow-sm flex flex-col gap-y-2"
        >
          <h4 class="text-black font-semibold text-xl">
            {{ existingComment.author }}
          </h4>
          <p>{{ existingComment.comment }}</p>
        </div>
      </div>
      <h2 v-else class="text-2xl">
        Пока никто не оставил комментариев, будьте первым
      </h2>
      <div class="flex flex-col gap-y-2">
        <h3 class="text-lg">Оставьте ваш комментарий</h3>
        <div class="relative">
          <input v-model="author" v-focus type="text" placeholder="Автор" />
          <XMark
            v-if="author"
            class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
            @click="author = ''"
          />
        </div>
        <div class="relative">
          <input v-model="comment" type="text" placeholder="Комментарий" />
          <XMark
            v-if="comment"
            class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
            @click="comment = ''"
          />
        </div>
        <div class="flex mt-4 gap-x-2 ml-auto">
          <button class="button danger" @click="emits('close')">
            Отменить
          </button>
          <button
            :disabled="!(author && comment)"
            class="button success"
            @click="createComment"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </UiPopup>
</template>
