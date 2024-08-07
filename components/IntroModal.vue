<template>
  <div class="fixed z-40 h-screen w-screen bg-black text-white backdrop-blur">
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
    <div
      class="h-[calc(100vh-175px)] w-full max-w-screen-lg justify-center gap-16 overflow-y-scroll px-20 py-20 pb-5 text-white"
    >
      <h1 class="pb-4 text-4xl">
        Vyjadrenie k odvolaniu Alexandry Kusej, generálnej riaditeľky SNG
      </h1>
      <h2 class="pb-4 text-2xl">
        Generálna riaditeľka Slovenskej národnej galérie Alexandra Kusá prevzala
        odvolací dekrét, ktorý jej bol doručený z Ministerstva kultúry SR dnes
        7. augusta 2024. Kolektív zamestnancov a zamestnankýň SNG stojí za
        Alexandrou Kusou, pretože si uvedomuje, koľko úsilia, času, odbornosti,
        ľudskosti, inovatívnych vízií a nápadov a niekedy až nadľudských výkonov
        venovala budovaniu národnej kultúrnej inštitúcie, ktorá pozná reálny
        význam a hodnotu slov „národná“, „kultúra“ a „inštitúcia“.
      </h2>
      <p class="pb-4 text-lg">
        Za vyše 20 rokov, počas ktorých doteraz pôsobila v SNG ako kurátorka a
        od roku 2010 ako generálna riaditeľka, spolu so svojím tímom odviedla
        množstvo práce, ktorej reálne výsledky zasahujú kultúrnu sféru nielen na
        celom Slovensku, ale sú nadmieru vnímané a oceňované aj v medzinárodnom
        kontexte. Pevne veríme, že všetky tieto hodnoty a pozitíva vníma nielen
        kolektív SNG, ale aj mnoho ľudí z rôznych odvetví na Slovensku a v
        zahraničí. Preto dúfame, že ďalšie z bezdôvodných odvolaní kľúčových
        osobností vrcholových umeleckých inštitúcií, úspešných manažérov a
        rešpektovaných odborníkov neostane bez odozvy. Kultúra nie je len o
        výstavách, divadelných predstaveniach či koncertoch, je to najmä nástroj
        a priestor, v ktorom sa dokáže celá spoločnosť posúvať vpred.
      </p>
      <p class="pb-6 text-lg">
        Oddnes do nedele môžete navštíviť SNG v Bratislave, Zvolenský zámok a
        Kaštieľ Strážky v Spišskej Belej zadarmo. Nájdete u nás dôkaz našej
        práce a veľa zaujímavého!
      </p>
      <button
        @click="$emit('close')"
        class="flex justify-center overflow-y-scroll rounded-xl bg-blue-ribbon-600 px-4 py-3 text-lg font-medium"
      >
        {{ $t("Pokračovať") }}
      </button>
    </div>
    <!-- <div class="flex h-full w-full items-center justify-center gap-16 pb-5">
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
        <video
          loop
          autoplay
          width="934p"
          height="527"
          class="rounded-2xl border-2 border-black"
        >
          <source src="assets/videos/kocka_loop.mp4" type="video/mp4" />
        </video>

        <span
          class="text-lg"
          v-html="
            $t(
              '<strong>Potiahnutím</strong> na presúvaš po ploche. <strong>Dotkni sa diela</strong> a otvoríš skupinu. <strong>Dotkni sa diela ešte raz</strong> a otvoríš zoom.',
            )
          "
        />
      </div>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import Logo from "~/assets/img/logo.svg?component";
</script>
