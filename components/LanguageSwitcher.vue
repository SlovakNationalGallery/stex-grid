<script setup lang="ts">
import { LocaleObject } from "@nuxtjs/i18n/dist/runtime/composables";

const { locale, locales, setLocale } = useI18n();
</script>

<template>
  <div>
    <button @click="setLocale('sk')" :class="[{ 'font-bold': locale === 'sk' }]">
      SK
    </button>
    <button @click="setLocale('en')" :class="[{ 'font-bold': locale === 'en' }]">
      EN
    </button>
  </div>
</template>
