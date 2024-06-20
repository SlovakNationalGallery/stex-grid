<template>
  <div class="w-full relative">
    <!-- Fake rail -->
    <div class="absolute inset-x-0 bg-blue-400 h-1 top-[calc(50%-2px)] bg-blue-ribbon-600/20 rounded-xl"></div>
    <VueSlider
      :min="0"
      :max="100"
      @update:modelValue="(value: number) => $emit('touch', value)"
      :modelValue="props.sliderValue"
      :step="1"
      :drag-on-click="true"
      class="mx-16"
      :process="false"
      :tooltip="'none'"
    >
      <template #dot>
        <div class="flex h-full w-full flex-nowrap items-center justify-center">
          <div
            class="flex items-center gap-2 rounded-full border-4 border-white bg-blue-ribbon-600 px-4 text-white"
          >
            <MouseScroll class="h-8 w-8 rotate-90 fill-white" />
            <span class="py-2">{{ $t("Navigácia") }}</span>
          </div>
        </div>
      </template>
    </VueSlider>
  </div>
</template>

<script setup lang="ts">
import MouseScroll from "~/assets/img/mouse-scroll.svg?component";
import VueSlider from "vue-3-slider-component";
const props = defineProps(["sliderValue"]);
</script>
