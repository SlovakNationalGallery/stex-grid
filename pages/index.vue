<template>
  <div
    v-if="loading"
    class="absolute inset-0 z-30 flex items-center justify-center bg-slate-200/90"
  >
    <svg
      class="-ml-1 mr-3 h-5 w-5 animate-spin text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    {{ $t("Načítava sa") }} ...
  </div>
  <div
    v-else-if="error"
    class="absolute inset-0 z-30 flex items-center justify-center bg-slate-200/90"
  >
    <div class="text-center">
      Error occurred while loading data. Please try again.<br />
      <button
        class="mt-2 rounded bg-blue-ribbon-600 px-4 py-2 text-white"
        @click.prevent="fetchData"
      >
        Reload
      </button>
    </div>
  </div>

  <Navbar ref="navbar" class="fixed top-0">
    <template v-slot:icon>
      <Logo class="mx-6 h-10 w-10" />
    </template>
    <template v-slot:content>
      <div class="flex items-end gap-6">
        <span class="align-bottom font-display text-[32px] font-bold">{{
          $t("Dizajn v kocke")
        }}</span>
      </div>
    </template>
    <template v-slot:center>
      <div class="flex w-full items-center gap-4">
        <span
          class="rounded bg-blue-ribbon-600/20 px-1.5 py-1 text-sm text-blue-ribbon-600"
          >{{ $t("Vchod") }}</span
        >
        <GridSlider @touch="closePopover" />
        <span
          class="rounded bg-blue-ribbon-600/20 px-1.5 py-1 text-sm text-blue-ribbon-600"
          >{{ $t("Vchod") }}</span
        >
      </div>
    </template>
  </Navbar>
  <div
    class="no-scrollbar mt-20 w-screen overflow-x-scroll overflow-y-hidden max-h-[calc(100vh-110px)] pt-[10px]"
    ref="grid"
    @touchmove="onTouchMove"
    @touchstart="onTouchstart"
    @touchend="onTouchend"
  >
    <div
      :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${NUM_OF_COLUMNS}, ${SQUARE_DIMENSION})`,
        gridTemplateRows: `repeat(${NUM_OF_ROWS+1}, ${SQUARE_DIMENSION})`,
      }"
    >
      <template
        v-for="(_, y) in Array.from({ length: NUM_OF_ROWS+1 })"
        :key="y"
        class="border-2 border-black"
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
      <template v-for="section in sectionsData">
        <!-- drop shadow -->
        <template v-for="item in section.items">
          <div
            v-if="
              !openedPopover ||
              (openedPopover && section.id === openedPopover?.id)
            "
            :class="`${
              section.id === openedPopover?.id
                ? 'bg-blue-ribbon-600 blur'
                : 'bg-blue-ribbon-600/20'
            }
          transition-all
          `"
            :key="item.id"
            :style="{
              gridColumnStart: item.x,
              gridRowStart: item.y,
              gridColumnEnd: item.x + item.span_x,
              gridRowEnd: item.y + item.span_y,
              ...translateShadowStyle,
            }"
          />
        </template>
        <!-- tiny legs under artworks -->
        <div
          v-for="item in section.items"
          :key="item.id + ' legs'"
          :class="[{ 'opacity-0': openedPopover }, 'flex flex-col']"
          :style="{
            gridColumnStart: item.x,
            gridRowStart: item.y,
            gridColumnEnd: item.x + item.span_x,
            gridRowEnd: item.y + item.span_y,
          }"
        >
          <div
            class="flex"
            v-for="y in Array.from({ length: item.span_y + 1 })"
          >
            <div v-for="x in Array.from({ length: item.span_x + 1 })">
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
          v-for="item in section.items"
          :disabled="openedPopover && section.id !== openedPopover.id"
          class="group z-10 outline outline-2 outline-black disabled:-z-10 disabled:outline-gray-500"
          :key="item.id"
          :style="{
            gridColumnStart: item.x,
            gridRowStart: item.y,
            gridColumnEnd: item.x + item.span_x,
            gridRowEnd: item.y + item.span_y,
          }"
          @click="
            (e) =>
              openedPopover
                ? openZoomViewer(e, item)
                : openGroupPopover(e, section)
          "
        >
          <img
            class="z-20 h-full w-full object-cover group-disabled:brightness-150 group-disabled:contrast-75 group-disabled:saturate-50"
            :src="`https://www.webumenia.sk/dielo/nahlad/${item.id}/600`"
          />
        </button>
      </template>
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
      'absolute bottom-0 right-0 z-20 top-20 w-[528px]',
    ]"
    @close="closePopover"
  >
    <template v-slot:header>
      <div class="flex flex-col gap-1.5">
        <span class="text-xl text-blue-600"
          >{{ openedPopover.items.length }} 
          <template v-if="openedPopover.items.length === 1">
            {{ $t("dielo v skupine") }}
          </template>
          <template v-if="openedPopover.items.length > 1 && openedPopover.items.length < 5">
            {{ $t("diela v skupine") }}
          </template>
          <template v-else>
            {{ $t("diel v skupine") }}
          </template>
        </span
        >
        <span class="font-display text-2xl font-medium">{{
          openedPopover.title
        }}</span>
      </div>
    </template>
    <template v-slot:body>
      <div class="flex flex-col gap-5">
        <div
          class="font-display text-2xl font-medium"
          v-html="openedPopover.perex"
        ></div>
        <div class="flex flex-col gap-3">
          <div
            v-for="(item, i) in openedPopover.items"
            class="flex items-start gap-3"
          >
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-ribbon-600 text-white"
            >
              {{ i + 1 }}
            </div>
            <div class="leading-normal">
              <span class="font-bold">
                <template v-if="item.author"> {{ item.author }}: </template>
                {{ item.title }},</span
              >
              {{ item.dating }}, {{ item.medium }}, {{ item.measurement }}
            </div>
          </div>
        </div>

        <div
          class="flex items-center gap-2 rounded-xl bg-black/5 px-4 py-3 text-lg"
        >
          <Info class="h-6 w-6" />
          {{ $t("Dotkni sa obrázku diela a preskúmaj ho zblízka") }}
        </div>
        <article class="prose-xl" v-html="openedPopover.text"></article>
      </div>
    </template>
  </Popover>
</template>
<script setup>
import { watchEffect, watch } from "vue";
import Logo from "~/assets/img/logo.svg?component";
import Info from "~/assets/img/info.svg?component";
import { NUM_OF_COLUMNS, NUM_OF_ROWS, SQUARE_DIMENSION } from "../consts";

const openedPopover = ref(null);
const openedZoomId = ref(null);
const loading = ref(false);
const error = ref(null);
const sections = ref(null);

const grid = ref();
const gridScrollPosition = useGridScrollPosition();
const isTouchingGrid = ref(false);

const { locale } = useI18n();

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

const openGroupPopover = (e, section) => {
  if (e.target instanceof Element) {
    const { offsetLeft, offsetWidth } = e.target;
    grid.value.scrollTo({
      //TODO: better offset calculation
      left: Math.max(offsetLeft - grid.value.offsetWidth / 4, 0),
      behavior: "smooth",
    });
  }

  openedPopover.value = section;
};

const closeZoomViewer = () => {
  openedZoomId.value = null;
};

const closePopover = () => {
  openedPopover.value = null;
  openedZoomId.value = null;
};

const config = useRuntimeConfig();

const fetchData = async () => {
  const apiUrl = config.public.apiUrl;
  loading.value = true;
  try {
    const { data } = await useFetch(`${apiUrl}/sections`, {
      headers: {
        "Accept-Language": locale,
      },
    });
    sections.value = data.value;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

// watch for changes in locale and fetch data again
watch(locale, () => {
  fetchData();
});

// fetch data initially
fetchData();

// increment all x/y positions +1 to fix issues with grid positioning
const sectionsData = computed(() => {
  if (!sections.value) return [];
  return sections.value.data.map((section) => {
    return {
      ...section,
      items: section.items.map((item) => {
        return {
          ...item,
          x: item.x !== null ? item.x + 1 : item.x,
          y: item.y !== null ? item.y + 1 : item.y,
        };
      }),
    };
  });
});

const calculateSquareDimension = () => {
  const viewportHeight = window.innerHeight;
  const pxValue = 110;
  return (viewportHeight - pxValue) / NUM_OF_ROWS;
};

const translateShadowStyle = computed(() => {
  return {
    transform: `translateX(${calculateSquareDimension() / 4}px) translateY(${
      calculateSquareDimension() / 4
    }px)`,
  };
});
</script>
