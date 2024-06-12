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
  <div class="mt-20 w-screen overflow-x-scroll no-scrollbar">
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
          gridColumnEnd: artwork.x + artwork.spanX + 1,
          gridRowEnd: artwork.y + artwork.spanY + 1,
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
              <label for="spanX">SpanX</label>
              <input
                type="number"
                class="border"
                min="1"
                max="9"
                v-model="selectedItem.spanX"
                id="spanX"
              />
            </div>
            <div class="flex gap-2">
              <label for="spanY">SpanY</label>
              <input
                min="1"
                max="9"
                type="number"
                class="border"
                v-model="selectedItem.spanY"
                id="spanY"
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
            class="pointer-events-auto flex h-full w-full flex-col items-center justify-center overflow-auto p-6"
          >
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
          </div>
        </template>
      </Popover>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import Logo from "~/assets/img/logo.svg?component";
import {
  NUM_OF_COLUMNS,
  NUM_OF_ROWS,
  SQUARE_DIMENSION,
  artworkIds,
} from "../consts";

const openedPopover = ref(null);

const EMPTY_ITEM = {
  id: null,
  spanX: 1,
  spanY: 1,
};

const selectedItem = reactive({
  ...EMPTY_ITEM,
});

const openArtwork = (artwork) => {
  const { id, spanX, spanY, x, y } = artwork;
  openedPopover.value = { x, y };
  selectedItem.value = { id, spanX, spanY };
};

const closePopover = () => {
  selectedItem.value = EMPTY_ITEM;
  openedPopover.value = null;
};

const addTile = ({ x, y }) => {
  artworks.value = artworks.value.filter(
    (item) => item.x !== x || item.y !== y,
  );
  artworks.value.push({ x, y, ...selectedItem });
  openedPopover.value = null;
  selectedItem.value = EMPTY_ITEM;
};

const clearTile = ({ x, y }) => {
  artworks.value = artworks.value.filter(
    (item) => item.x !== x || item.y !== y,
  );
  openedPopover.value = null;
  selectedItem.value = EMPTY_ITEM;
};

const artworks = ref([]);
</script>
