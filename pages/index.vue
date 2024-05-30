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
  <div class="mt-20">
    <div
      :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${NUM_OF_COLUMNS}, ${SQUARE_DIMENSION})`,
        gridTemplateRows: `repeat(${NUM_OF_ROWS}, ${SQUARE_DIMENSION})`,
      }"
    >
      <div
        v-for="cell in mockData"
        :key="cell.id"
        class="bg-blue-500"
        :style="{
          background: 'blue',
          gridColumnStart: cell.x,
          gridRowStart: cell.y,
          gridColumnEnd: cell.x + cell.spanX,
          gridRowEnd: cell.y + cell.spanY,
        }"
      ></div>
    </div>
  </div>
</template>
<script setup>
import Logo from "~/assets/img/logo.svg?component";
import { mockData } from "../data";

const SQUARE_DIMENSION = "104px";
const NUM_OF_COLUMNS = 30;
const NUM_OF_ROWS = 7;
</script>
