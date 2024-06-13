<template>
  <Navbar ref="navbar" class="fixed top-0 border-t-3">
    <template v-slot:icon class="w-20">
      <div class="flex h-full w-20 items-center justify-center bg-black">
        <Logo class="h-12 w-12" />
      </div>
    </template>
    <template v-slot:content>
      <div class="flex items-end gap-6 px-6">
        <span class="align-bottom font-display text-3xl font-bold">{{
          $t("Dizajn v kocke")
        }}</span>
      </div>
    </template>
  </Navbar>
  <div class="no-scrollbar mt-20 w-screen overflow-x-scroll">
    <div
      :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${NUM_OF_COLUMNS}, ${SQUARE_DIMENSION})`,
        gridTemplateRows: `repeat(${NUM_OF_ROWS}, ${SQUARE_DIMENSION})`,
      }"
    >
      <template
        v-for="(_, y) in Array.from({ length: NUM_OF_ROWS })"
        :key="y"
        class="border border-black"
      >
        <button
          v-for="(_, x) in Array.from({ length: NUM_OF_COLUMNS })"
          @click="openedPopover = { x, y }"
          :key="`${y} ${x}`"
          class="border border-black"
          :style="{
            gridColumnStart: x + 1,
            gridRowStart: y + 1,
            gridColumnEnd: x + 2,
            gridRowEnd: y + 2,
          }"
        >
          {{ x }}x{{ y }}
        </button>
      </template>
      <button
        v-for="artwork in artworks"
        :key="artwork.id"
        class="z-10 bg-red-500"
        :style="{
          gridColumnStart: artwork.x + 1,
          gridRowStart: artwork.y + 1,
          gridColumnEnd: artwork.x + artwork.span_x + 1,
          gridRowEnd: artwork.y + artwork.span_y + 1,
        }"
        @click="() => openArtwork(artwork)"
      >
        <img
          class="h-full w-full object-cover"
          :src="`https://www.webumenia.sk/dielo/nahlad/${artwork.id}/600`"
        />
      </button>
    </div>
    <div
      class="fixed inset-x-0 inset-y-0 z-10 bg-black/50"
      v-if="openedPopover"
    >
      <Popover
        class="absolute bottom-0 right-0 h-[95%] w-1/3"
        @close="closePopover"
      >
        <template v-slot:header>
          <div class="flex flex-col items-center justify-center">
            🕸️ {{ openedPopover }}
            <div class="flex gap-2">
              <label for="span_x">span_x</label>
              <input
                type="number"
                class="border"
                min="1"
                max="9"
                v-model="selectedItem.span_x"
                id="span_x"
              />
            </div>
            <div class="flex gap-2">
              <label for="span_y">span_y</label>
              <input
                min="1"
                max="9"
                type="number"
                class="border"
                v-model="selectedItem.span_y"
                id="span_y"
              />
            </div>
            <div class="flex gap-2">
              <label for="id">Id</label>
              <text>{{ selectedItem.id }}</text>
            </div>
            <div class="flex w-full justify-between">
              <button
                class="bg-green-500"
                @click="
                  () => addTile({ x: openedPopover.x, y: openedPopover.y })
                "
              >
                SAVE
              </button>
              <button
                class="bg-red-500"
                @click="
                  () => clearTile({ x: openedPopover.x, y: openedPopover.y })
                "
              >
                CLEAR
              </button>
            </div>
          </div>
        </template>
        <template v-slot:body>
          <div
            v-for="id in artworkIds"
            :key="id"
            class="flex w-full justify-between"
          >
            <button class="h-12" @click="selectedItem.id = id">
              {{ id }}
            </button>
            <img
              class="h-12 w-12"
              :src="`https://www.webumenia.sk/dielo/nahlad/${id}/600`"
            />
          </div>
        </template>
      </Popover>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import Logo from "~/assets/img/logo.svg?component";
import { NUM_OF_COLUMNS, NUM_OF_ROWS, SQUARE_DIMENSION } from "../consts";

const openedPopover = ref(null);

const EMPTY_ITEM = {
  id: null,
  span_x: 1,
  span_y: 1,
};

const selectedItem = reactive({
  ...EMPTY_ITEM,
});

const openArtwork = (artwork) => {
  const { id, span_x, span_y, x, y } = artwork;
  openedPopover.value = { x, y };
  selectedItem.value = { id, span_x, span_y };
};

const closePopover = () => {
  selectedItem.value = EMPTY_ITEM;
  openedPopover.value = null;
};

const addTile = async ({ x, y }) => {
  artworks.value = artworks.value.filter(
    (item) => item.x !== x || item.y !== y,
  );
  await useFetch(`${apiUrl}/items/${selectedItem.id}`, {
    method: "put",
    params: {
      x,
      y,
      span_x: selectedItem.span_x,
      span_y: selectedItem.span_y,
    },
  });
  artworks.value.push({ x, y, ...selectedItem });
  openedPopover.value = null;
  selectedItem.value = EMPTY_ITEM;
};

const clearTile = async ({ x, y }) => {
  const selectedItem = artworks.value.find(
    (item) => item.x === x && item.y === y,
  );
  if (!selectedItem) return;

  artworks.value = artworks.value.filter(
    (item) => item.x !== x || item.y !== y,
  );

  await useFetch(`${apiUrl}/items/${selectedItem.id}`, {
    method: "put",
    params: {
      x: null,
      y: null,
      span_x: null,
      span_y: null,
    },
  });
  openedPopover.value = null;
  selectedItem.value = EMPTY_ITEM;
};

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const { data } = await useFetch(`${apiUrl}/items`);

const artworksData = computed(() => data.value.data);
const artworkIds = computed(() => artworksData.value.map((item) => item.id));
const artworkTiles = computed(() =>
  artworksData.value.filter(
    (item) => item.span_x && item.span_y && item.x !== null && item.y !== null,
  ),
);

const artworks = ref([...artworkTiles.value]);
</script>
