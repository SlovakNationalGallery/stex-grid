<template>
  <Navbar ref="navbar" class="border-t-3">
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
  <div class="mx-auto max-w-screen-2xl px-12 pt-20">
    //TODO: 
  </div>
</template>
<script setup>
import Logo from "~/assets/img/logo.svg?component";
import { ref } from "vue";
import { mockData } from "../data";
</script>
