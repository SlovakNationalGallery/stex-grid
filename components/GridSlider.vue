<template>
  <div class="w-full">
    <VueSlider
      :min="0"
      :max="100"
      @change="$emit('touch')"
      v-model="gridScrollPosition"
      :step="0.0001"
      :process="false"
      :tooltip="'none'"
    >
      <template #dot>
        <div class="flex h-full w-full flex-nowrap items-center justify-center">
          <div
            class="flex gap-2 items-center rounded-full border-4 border-white bg-blue-ribbon-600 px-4 text-white"
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
const gridScrollPosition = useGridScrollPosition();
</script>
