<template>
  <div id="viewer" class="absolute inset-0 z-20 bg-black/25" />
  <div v-if="!viewer" class="absolute inset-0 z-20 bg-white">
    <img
      class="z-20 h-full w-full object-contain"
      :src="`https://www.webumenia.sk/dielo/nahlad/${item.id}/600`"
    />
  </div>
  <button
    class="absolute right-5 top-4 z-20 rounded-xl border-2 border-black bg-white"
    @click="$emit('close')"
  >
    <Close class="h-10 w-10" />
  </button>
  <div
    class="absolute right-5 top-1/2 z-20 -mt-10 flex flex-col rounded-xl border-2 border-black bg-white"
  >
    <button @click="zoomIn" class="h-10 w-10 p-1">
      <MagnifyingGlassPlus class="h-full w-full" />
    </button>
    <button @click="zoomOut" class="h-10 w-10 p-1">
      <MagnifyingGlassMinus class="h-full w-full" />
    </button>
  </div>
  <OpacityTransition mode="out-in">
    <div
      :key="item.id"
      class="absolute inset-x-0 bottom-24 z-20 flex items-center justify-center text-white"
    >
      <div class="rounded-xl bg-black/50 px-3 py-2 font-bold">
        {{ item.title }}
      </div>
    </div>
  </OpacityTransition>
  <slot :selectedZoom="selectedZoom" :selectZoom="selectZoom" />
</template>
<script setup>
import OpenSeadragon from "openseadragon";
import Close from "~/assets/img/x-mark.svg?component";
import MagnifyingGlassPlus from "~/assets/img/magnifying-glass-plus.svg?component";
import MagnifyingGlassMinus from "~/assets/img/magnifying-glass-minus.svg?component";

const props = defineProps(["item"]);
const emit = defineEmits(["close"]);
const viewer = ref();
const selectedZoom = ref(0);
const ZoomPerClick = 1.5;

const selectZoom = (zoomIndex) => (selectedZoom.value = zoomIndex);
const zoomIn = () => {
  viewer.value.viewport.zoomBy(ZoomPerClick);
  viewer.value.viewport.applyConstraints();
};
const zoomOut = () => {
  viewer.value.viewport.zoomBy(1 / ZoomPerClick);
  viewer.value.viewport.applyConstraints();
};

const loadOpenSeaDragon = () => {
  if (viewer.value?.destroy) {
    viewer.value.destroy();
  }

  viewer.value = null;
  if (!props.item?.images[selectedZoom.value]) return;

  viewer.value = OpenSeadragon({
    id: "viewer",
    tileSources: props.item.images[selectedZoom.value].deep_zoom_url,
    showNavigationControl: false,
    showNavigator: false,
  });
};

onMounted(loadOpenSeaDragon);

watch(
  () => props.item,
  () => {
    selectedZoom.value = 0;
    loadOpenSeaDragon();
  },
);

watch(selectedZoom, loadOpenSeaDragon);

onUnmounted(() => {
  if (viewer.value) {
    viewer.value.destroy();
  }
});
</script>
