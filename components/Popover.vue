<template>
  <div class="flex">
    <div
      class="w-full rounded-tl-xl border-l-2 border-t-2 border-l-black border-t-black bg-white"
    >
      <div
        class="pointer-events-auto flex items-center justify-between gap-4 border-b-2 border-black p-6 pb-5 pt-2"
      >
        <slot name="header" />
        <button @click="$emit('close')" class="absolute top-6 right-6">
          <Close class="h-10 w-10" />
        </button>
      </div>
        <slot name="body" />
    </div>
  </div>
</template>

<script setup>
import Close from "~/assets/img/x-mark.svg?component";
</script>
