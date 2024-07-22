<template>
  <div
    class="fixed z-40 h-screen w-screen bg-black/80 text-white backdrop-blur"
  >
    <Navbar>
      <template v-slot:icon class="w-20">
        <div class="flex h-full w-20 items-center justify-center">
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
    <div class="flex h-full w-full items-center justify-center gap-16 pb-5">
      <div class="flex w-80 flex-col gap-9">
        <span class="font-display text-5xl font-medium">
          {{ $t("Čo spája diela v expozícii?") }}
        </span>
        <span class="text-2xl">
          {{
            $t(
              "Vystavené objekty sme spojili do tematických skupín podľa spoločného motívu alebo iných prekvapivých súvislostí.",
            )
          }}
        </span>
        <span class="pb-16 text-2xl font-bold">
          {{ $t("Vyber si dielo, dotkni sa ho a dozvieš sa viac.") }}
        </span>
        <button
          @click="$emit('close')"
          class="flex w-full justify-center rounded-xl bg-blue-ribbon-600 py-3 text-lg font-medium"
        >
          {{ $t("Začni objavovať") }}
        </button>
      </div>
      <div class="flex flex-col items-center gap-10">
        <img
          src="assets/img/tutorial_modal.png"
          class="border-2 border-black rounded-2xl"
        />
        <span
          class="text-lg"
          v-html="
            $t(
              '<strong>Potiahnutím</strong> na presúvaš po ploche. <strong>Dotkni sa diela</strong> a otvoríš skupinu. <strong>Dotkni sa diela ešte raz</strong> a otvoríš zoom.',
            )
          "
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from "~/assets/img/logo.svg?component";
</script>
