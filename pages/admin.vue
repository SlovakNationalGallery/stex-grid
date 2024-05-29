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
  <div class="relative mt-20">
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
      </template>
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
              v-for="id in ids"
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
import { mockData } from "../data";

const openedPopover = ref(null);
const SQUARE_DIMENSION = `calc((100vh - 80px) / ${NUM_OF_ROWS})`;
const NUM_OF_COLUMNS = 30;
const NUM_OF_ROWS = 7;

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

const ids = [
  "SVK:SNG.UP-I_12-a",
  "SVK:SNG.UP-T_601",
  "SVK:SNG.UP-F_1258",
  "SVK:SNG.UP-I_30",
  "SVK:SNG.UP-F_1225",
  "SVK:SNG.UP-I_72",
  "SVK:SNG.UP-T_73",
  "SVK:SNG.UP-T_74",
  "SVK:SNG.UP-T_76",
  "SVK:SNG.UP-T_77",
  "SVK:SNG.UP-F_1246",
  "SVK:SNG.UP-F_1181",
  "SVK:SNG.UP-F_126",
  "SVK:SNG.UP-DK_3812",
  "SVK:SNG.UP-DK_3813",
  "SVK:SNG.UP-DK_3814",
  "SVK:SNG.UPS-S_5-1-8",
  "SVK:SNG.UP-P_3072",
  "SVK:SNG.UP-DK_628",
  "SVK:SNG.UP-DK_960",
  "SVK:SNG.UP-F_988-1-24",
  "SVK:SNG.UP-P_3050",
  "SVK:SNG.UP-T_438",
  "SVK:SNG.UP-DK_1362",
  "SVK:SNG.UP-DK_75",
  "SVK:SNG.UP-DK_548",
  "SVK:SNG.UP-T_81",
  "SVK:SNG.MK_195",
  "SVK:SNG.UP-DK_5421",
  "SVK:SNG.UP-DK_5456",
  "SVK:SNG.UP-DK_5457",
  "SVK:SNG.UP-DK_5458",
  "SVK:SNG.UP-DK_5459",
  "SVK:SNG.UP-F_58-62",
  "SVK:SNG.K_17320",
  "SVK:SNG.UP-DK_5460",
  "SVK:SNG.UP-P_2987",
  "SVK:SNG.UP-DK_151",
  "SVK:SNG.UP-DK_90",
  "SVK:SNG.UP-T_252",
  "SVK:SNG.UP-T_286",
  "SVK:SNG.UP-DK_630",
  "SVK:SNG.UP-DK_5329",
  "SVK:SNG.UP-T_80",
  "SVK:SNG.UP-DK_5235",
  "SVK:SNG.UP-DK_162",
  "SVK:SNG.UP-DK_5330",
  "SVK:SNG.Z_10328",
  "SVK:SNG.P_2431",
  "SVK:SNG.UP-F_723",
  "SVK:SNG.UP-P_2992",
  "SVK:SNG.UP-F_675",
  "SVK:SNG.UP-DK_197",
  "SVK:SNG.UP-DK_130",
  "SVK:SNG.UP-DK_142",
  "SVK:SNG.UPR-F_3",
  "SVK:SNG.UPS-K_6-Z-6",
  "SVK:SNG.UP-DK_4727",
  "SVK:SNG.UP-F_1203",
  "SVK:SNG.UP-T_7-1-3",
  "SVK:SNG.UP-P_1297",
  "SVK:SNG.UP-DK_5227",
  "SVK:SNG.UP-DK_738",
  "SVK:SNG.UP-T_153",
  "SVK:SNG.UP-T_365",
  "SVK:SNG.UP-T_580",
  "SVK:SNG.UP-T_534",
  "SVK:SNG.UP-P_3068",
  "SVK:SNG.UP-T_624",
  "SVK:SNG.UP-T_341",
  "SVK:SNG.UP-T_345",
  "SVK:SNG.UP-T_340",
  "SVK:SNG.UP-T_619",
  "SVK:SNG.UP-DK_455",
  "SVK:SNG.UP-F_1112",
  "SVK:SNG.UP-F_399",
  "SVK:SNG.UP-F_213",
  "SVK:GMB.D_1",
  "SVK:SNG.UP-F_495-2",
  "SVK:SNG.P_1939",
  "SVK:SNG.UP-T_99",
  "SVK:SNG.UP-T_162",
  "SVK:SNG.UP-T_483",
  "SVK:SNG.UPS-K_15-M-2-3",
  "SVK:SNG.UPS-N_33",
];
</script>
