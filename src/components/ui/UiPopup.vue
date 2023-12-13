<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
const emits = defineEmits<{
  close: [];
  onEnterPress: [];
}>();

function onKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    emits("close");
  }

  if (e.key === "Enter") {
    emits("onEnterPress");
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
  <div
    class="fixed inset-0 grid place-items-center shadow-md bg-black bg-opacity-50"
    @click.self="emits('close')"
  >
    <slot />
  </div>
</template>
