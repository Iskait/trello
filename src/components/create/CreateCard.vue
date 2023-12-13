<script setup lang="ts">
import UiPopup from "@/components/ui/UiPopup.vue";
import XMark from "@/assets/x-mark.svg?component";
import { ref } from "vue";

const emits = defineEmits<{
  close: [];
  create: [string];
}>();

const cardText = ref("");

function createCard() {
  if (cardText.value) {
    emits("create", cardText.value);
    emits("close");
  }
}
</script>

<template>
  <UiPopup @close="emits('close')" @on-enter-press="createCard">
    <div
      class="bg-[#f1f2f4] flex flex-col justify-between p-5 h-[500px] w-[580px] rounded-md"
    >
      <div class="flex justify-between items-center text-gray-500">
        <h2 class="text-4xl">Создание карточки</h2>
        <XMark
          class="cursor-pointer hover:text-gray-700 transition-colors"
          @click="emits('close')"
        />
      </div>
      <div class="relative">
        <input
          v-model="cardText"
          v-focus
          type="text"
          placeholder="Введите название карточки..."
        />
        <XMark
          v-if="cardText"
          class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
          @click="cardText = ''"
        />
      </div>
      <div class="flex gap-x-2 ml-auto">
        <button class="button danger" @click="emits('close')">Отменить</button>
        <button
          :disabled="!cardText"
          class="button success"
          @click="createCard"
        >
          Сохранить
        </button>
      </div>
    </div>
  </UiPopup>
</template>
