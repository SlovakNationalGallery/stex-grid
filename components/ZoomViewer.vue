<template>
  <div id="viewer" class="absolute inset-0 z-20 bg-black/25" />
  <div v-if="!viewer" class="absolute inset-0 z-20 bg-white">
    <img
      class="z-20 h-full w-full object-contain"
      :src="`https://www.webumenia.sk/dielo/nahlad/${item.id}/600`"
    />
  </div>
  <button
    class="absolute right-5 top-4 z-20 rounded-xl bg-white"
    @click="$emit('close')"
  >
    <Close class="h-10 w-10 rounded-xl border-2 border-black" />
  </button>
  <slot :selectedZoom="selectedZoom" :selectZoom="selectZoom" />
</template>
<script setup>
import OpenSeadragon from "openseadragon";
import Close from "~/assets/img/x-mark.svg?component";

const props = defineProps(["item"]);
const emit = defineEmits(["close"]);
const viewer = ref();
const selectedZoom = ref(0);

const selectZoom = (zoomIndex) => (selectedZoom.value = zoomIndex);
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
