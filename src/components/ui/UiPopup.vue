<script setup lang="ts">
const emits = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div
    class="fixed inset-0 grid place-items-center"
    @click.self="emits('close')"
  >
    <slot />
  </div>
</template>
