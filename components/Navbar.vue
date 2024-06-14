<template>
  <div
    class="flex h-20 w-full items-center justify-between gap-16 border-b-3 border-black bg-white"
  >
    <div class="flex h-full min-w-max items-center">
      <slot name="icon" />
      <slot name="content" />
    </div>
    <div class="flex w-full items-center gap-4">
      <span class="bg-blue-ribbon-600/20 text-blue-ribbon-600 py-1 px-1.5 rounded text-sm">Vchod</span>
      <GridSlider />
      <span class="bg-blue-ribbon-600/20 text-blue-ribbon-600 py-1 px-1.5 rounded text-sm">Vchod</span>
    </div>
    <LanguageSwitcher class="flex gap-4 pr-10 font-display text-3xl" />
  </div>
</template>
