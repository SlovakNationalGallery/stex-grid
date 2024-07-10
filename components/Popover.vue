<template>
  <div
    class="flex border-l-2 border-t-2 border-l-black border-t-black bg-white"
  >
    <div class="flex h-full w-full flex-col">
      <div
        class="pointer-events-auto flex items-start justify-between gap-4 border-b-2 border-black px-6 py-4"
      >
        <slot name="header" />
        <button @click="$emit('close')">
          <Close class="h-10 w-10" />
        </button>
      </div>
      <div class="max-h-full overflow-auto p-6">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Close from "~/assets/img/x-mark.svg?component";
</script>
