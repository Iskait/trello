<script setup lang="ts">
import TheLogo from "@/assets/logo.svg?component";
import TheHeaderSecondary from "./TheHeaderSecondary.vue";

const links = ["Workspaces", "Recent", "Starred", "Templates"];

const emits = defineEmits<{
  "create-column": [];
}>();
</script>

<template>
  <header class="bg-[#0336A1] border-b border-b-[#257AB1] flex flex-col">
    <div class="flex gap-x-5 container py-2 items-center">
      <TheLogo />
      <ul class="flex gap-x-4">
        <li
          v-for="link in links"
          :key="link"
          class="cursor-pointer hover:text-gray-400 transition-colors"
        >
          {{ link }}
        </li>
      </ul>
      <button class="button" @click="emits('create-column')">Create</button>
    </div>
    <TheHeaderSecondary />
  </header>
</template>
