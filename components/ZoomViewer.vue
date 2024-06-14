<template>
  <div id="viewer" class="absolute inset-0 z-20 bg-white" />
  <div v-if="!viewer" class="absolute inset-0 z-20 bg-white">
    <img
      class="z-20 h-full w-full object-contain"
      :src="`https://www.webumenia.sk/dielo/nahlad/${id}/600`"
    />
  </div>
  <button
    class="absolute right-5 top-4 z-20 rounded-xl bg-white"
    @click="$emit('close')"
  >
    <Close class="h-10 w-10" />
  </button>
</template>
<script setup>
import OpenSeadragon from "openseadragon";
import Close from "~/assets/img/x-mark.svg?component";

const props = defineProps(["id"]);
const viewer = ref();

const { data } = await useFetch(
  `https://www.webumenia.sk/api/v2/items/${props.id}`,
);

onMounted(() => {
  if (data) {
    const firstImage = data.value.data.images
      ? data.value.data.images[0]
      : null;

    if (firstImage) {
      viewer.value = OpenSeadragon({
        id: "viewer",
        tileSources: firstImage.deep_zoom_url,
        showNavigationControl: false,
        showNavigator: false,
      });
    }
  }
});

onBeforeUnmount(() => {
  if (viewer.value) {
    viewer.value.destroy();
  }
});
</script>
