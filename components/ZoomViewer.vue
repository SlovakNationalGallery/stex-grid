<template>
  <div id="viewer" class="absolute inset-0 z-20 bg-black/25" />
  <div v-if="!viewer" class="absolute inset-0 z-20 bg-white">
    <img
      class="z-20 h-full w-full object-contain"
      :src="`https://www.webumenia.sk/dielo/nahlad/${item.id}/600`"
    />
  </div>
  <button
    class="absolute right-4 top-4 p-0.5 z-20 rounded-xl border-2 border-black bg-white"
    @click="$emit('close')"
  >
    <Close class="h-10 w-10" />
  </button>
  <div
    v-if="viewer"
    class="absolute right-4 top-1/2 z-20 -mt-10 flex flex-col gap-4"
  >
    <button @click="zoomIn" class="p-1.5 rounded-xl border-2 border-black bg-white">
      <MagnifyingGlassPlus class="h-8 w-8" />
    </button>
    <button @click="zoomOut" class="p-1.5 rounded-xl border-2 border-black bg-white">
      <MagnifyingGlassMinus class="h-8 w-8" />
    </button>
  </div>
  <div
    :key="item.id"
    class="absolute inset-x-0 bottom-24 z-20 m-1 flex items-center justify-center text-white"
  >
    <div class="rounded-xl bg-black/50 px-3 py-2 font-bold">
      {{ item.title }}
    </div>
  </div>
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
  if (!props.item?.images.length) return;

  viewer.value = OpenSeadragon({
    id: "viewer",
    tileSources: props.item.images.map((image) => image.deep_zoom_url),
    showNavigationControl: false,
    showNavigator: false,
  });
  selectedZoom.value = 0;
  viewer.value.goToPage(selectedZoom.value);
};

onMounted(loadOpenSeaDragon);

watch(
  () => props.item,
  () => {
    loadOpenSeaDragon();
  },
);

watch(selectedZoom, () => {
  viewer.value.goToPage(selectedZoom.value);
});

onUnmounted(() => {
  if (viewer.value?.destroy) {
    viewer.value.destroy();
  }
});
</script>
