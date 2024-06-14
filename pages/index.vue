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
    <template v-slot:center>
      <div class="flex w-full items-center gap-4">
        <span
          class="rounded bg-blue-ribbon-600/20 px-1.5 py-1 text-sm text-blue-ribbon-600"
          >Vchod</span
        >
        <GridSlider @touch="closePopover" />
        <span
          class="rounded bg-blue-ribbon-600/20 px-1.5 py-1 text-sm text-blue-ribbon-600"
          >Vchod</span
        >
      </div>
    </template>
  </Navbar>
  <div
    class="no-scrollbar mt-20 w-screen overflow-x-scroll"
    ref="grid"
    @touchmove="onTouchMove"
    @touchstart="onTouchstart"
    @touchend="onTouchend"
  >
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
        <div
          v-for="(_, x) in Array.from({ length: NUM_OF_COLUMNS })"
          :key="`${y} ${x}`"
          class="relative"
          :style="{
            gridColumnStart: x + 1,
            gridRowStart: y + 1,
            gridColumnEnd: x + 2,
            gridRowEnd: y + 2,
          }"
        >
          <div
            class="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-black opacity-50"
          ></div>
          <div
            class="absolute left-3/4 top-3/4 h-1 w-1 rounded-full bg-black opacity-50"
          ></div>
        </div>
      </template>
      <!-- drop shadow -->
      <template v-for="artwork in mockArtworks">
        <div
          v-if="
            !openedPopover ||
            (openedPopover && artwork.group === openedPopover?.id)
          "
          :class="`${
            artwork.group === openedPopover?.id
              ? 'bg-blue-ribbon-600 blur'
              : 'bg-blue-ribbon-600/20'
          }
          translate-x-[calc(25%+2px)] translate-y-[calc(25%+2px)] transition-all
          `"
          :key="artwork.id"
          :style="{
            gridColumnStart: artwork.x,
            gridRowStart: artwork.y,
            gridColumnEnd: artwork.x + artwork.spanX,
            gridRowEnd: artwork.y + artwork.spanY,
          }"
        />
      </template>
      <!-- tiny legs under artworks -->
      <div
        v-for="artwork in mockArtworks"
        :key="artwork.id + ' legs'"
        :class="[{ 'opacity-0': openedPopover }, 'flex flex-col']"
        :style="{
          gridColumnStart: artwork.x,
          gridRowStart: artwork.y,
          gridColumnEnd: artwork.x + artwork.spanX,
          gridRowEnd: artwork.y + artwork.spanY,
        }"
      >
        <div
          class="flex"
          v-for="y in Array.from({ length: artwork.spanY + 1 })"
        >
          <div v-for="x in Array.from({ length: artwork.spanX + 1 })">
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              :style="{
                width: SQUARE_DIMENSION,
                height: SQUARE_DIMENSION,
                left: SQUARE_DIMENSION * x,
                top: SQUARE_DIMENSION * y,
              }"
              class="stroke-black stroke-2"
            >
              <line x1="0" y1="0" x2="27" y2="27" />
            </svg>
          </div>
        </div>
      </div>
      <!-- artworks -->
      <button
        v-for="artwork in mockArtworks"
        :disabled="openedPopover && artwork.group !== openedPopover.id"
        class="group z-10 outline outline-2 outline-black disabled:-z-10 disabled:outline-gray-500"
        :key="artwork.id"
        :style="{
          gridColumnStart: artwork.x,
          gridRowStart: artwork.y,
          gridColumnEnd: artwork.x + artwork.spanX,
          gridRowEnd: artwork.y + artwork.spanY,
        }"
        @click="
          (e) =>
            openedPopover
              ? openZoomViewer(e, artwork)
              : openGroupPopover(e, artwork)
        "
      >
        <img
          class="z-20 h-full w-full object-cover group-disabled:brightness-150 group-disabled:contrast-75 group-disabled:saturate-50"
          :src="`https://www.webumenia.sk/dielo/nahlad/${artwork.id}/600`"
        />
      </button>
    </div>
  </div>
  <transition
    enter-active-class="duration-150 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="openedZoomId"
      class="absolute bottom-0 left-0 z-20 h-[95%] w-2/3 border-t-2 border-t-black bg-white"
    >
      <ClientOnly>
        <ZoomViewer :id="openedZoomId" @close="closeZoomViewer" />
      </ClientOnly>
    </div>
  </transition>
  <Popover
    v-if="openedPopover"
    :class="[
      { 'rounded-tl-xl': !openedZoomId },
      'absolute bottom-0 right-0 z-20 h-[95%] w-1/3',
    ]"
    @close="closePopover"
  >
    <template v-slot:header>
      <div class="flex flex-col gap-1.5">
        <span class="text-xl text-blue-600"
          >{{ openedPopover.artworks.length }} {{ $t("diel v skupine") }}</span
        >
        <span class="font-display text-2xl font-medium">{{
          openedPopover.title
        }}</span>
      </div>
    </template>
    <template v-slot:body>
      <div class="flex flex-col gap-5">
        <span class="font-display text-2xl font-medium">
          {{ openedPopover.intro }}
        </span>
        <div class="flex flex-col gap-3">
          <div
            v-for="(artwork, i) in openedPopover.artworks"
            class="flex items-baseline gap-3"
          >
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-ribbon-600 text-white"
            >
              {{ i + 1 }}
            </div>
            <div>{{ artwork }}</div>
          </div>
        </div>

        <div
          class="flex items-center gap-2 rounded-xl bg-black/5 px-4 py-3 text-lg"
        >
          <Info class="h-4 w-4" />
          {{ $t("Dotkni sa obrázku diela a preskúmaj ho zblízka") }}
        </div>
        <span class="text-xl">
          {{ openedPopover.body }}
        </span>
      </div>
    </template>
  </Popover>
</template>
<script setup>
import { watchEffect } from "vue";
import Logo from "~/assets/img/logo.svg?component";
import Info from "~/assets/img/info.svg?component";
import { NUM_OF_COLUMNS, NUM_OF_ROWS, SQUARE_DIMENSION } from "../consts";

const openedPopover = ref(null);
const openedZoomId = ref(null);

const grid = ref();
const gridScrollPosition = useGridScrollPosition();
const isTouchingGrid = ref(false);

watchEffect(() => {
  if (!grid.value || isTouchingGrid.value) return;
  const { scrollWidth, offsetWidth } = grid.value;
  grid.value.scrollTo({
    //TODO: better offset calculation
    left: ((scrollWidth - offsetWidth) / 100) * gridScrollPosition.value,
    behavior: "smooth",
  });
});

const onTouchMove = () => {
  closePopover();
  if (!grid.value) return;
  const { scrollLeft, scrollWidth, offsetWidth } = grid.value;
  gridScrollPosition.value = (scrollLeft / (scrollWidth - offsetWidth)) * 100;
};

const onTouchend = () => {
  isTouchingGrid.value = false;
};

const onTouchstart = () => {
  isTouchingGrid.value = true;
};

const openZoomViewer = (e, artwork) => {
  openedZoomId.value = artwork.id;
};

const openGroupPopover = (e, artwork) => {
  if (e.target instanceof Element) {
    const { offsetLeft, offsetWidth } = e.target;
    grid.value.scrollTo({
      //TODO: better offset calculation
      left: Math.max(offsetLeft - grid.value.offsetWidth / 4, 0),
      behavior: "smooth",
    });
  }

  const { group: groupId } = artwork;
  const group = mockGroups.filter((group) => group.id === groupId)[0];

  const artworks = mockArtworks.filter((artwork) =>
    group.artworksIds.includes(artwork.id),
  );

  openedPopover.value = {
    id: group.id,
    title: group.title,
    intro: group.intro,
    body: group.body,
    artworks: artworks,
  };
};

const closeZoomViewer = () => {
  openedZoomId.value = null;
};

const closePopover = () => {
  openedPopover.value = null;
  openedZoomId.value = null;
};

const mockArtworks = [
  { id: "SVK:SNG.UP-T_438", spanX: 1, spanY: 1, x: 2, y: 3, group: 1 },
  { id: "SVK:SNG.UP-DK_75", spanX: 1, spanY: 1, x: 3, y: 1, group: 1 },
  { id: "SVK:SNG.UP-F_1246", spanX: 1, spanY: 1, x: 1, y: 3, group: 1 },
  { id: "SVK:SNG.UP-T_153", spanX: 1, spanY: 1, x: 5, y: 4, group: 1 },
  { id: "SVK:SNG.UP-T_99", spanX: 1, spanY: 1, x: 8, y: 3, group: 2 },
  { id: "SVK:SNG.UPS-K_15-M-2-3", spanX: 1, spanY: 1, x: 9, y: 1, group: 2 },
  { id: "SVK:SNG.UP-F_1112", spanX: 1, spanY: 1, x: 10, y: 3, group: 2 },
  { id: "SVK:SNG.UP-F_1258", spanX: 1, spanY: 1, x: 8, y: 4, group: 2 },
];

const mockGroups = [
  {
    id: 1,
    artworksIds: [
      "SVK:SNG.UP-T_438",
      "SVK:SNG.UP-DK_75",
      "SVK:SNG.UP-F_1246",
      "SVK:SNG.UP-T_153",
    ],
    title: "The title of first group",
    intro: "Random intro Rich text",
    body: "Random Body Rich text",
  },
  {
    id: 2,
    artworksIds: [
      "SVK:SNG.UP-T_99",
      "SVK:SNG.UPS-K_15-M-2-3",
      "SVK:SNG.UP-F_1112",
      "SVK:SNG.UP-F_1258",
    ],
    title: "The title of second group",
    intro: "Random intro Rich text II",
    body: "Random Body Rich text",
  },
];
</script>
