<template>
  <div class="flex h-20 w-full items-center justify-between gap-16">
    <div class="flex h-full min-w-max items-center">
      <slot name="icon" />
      <slot name="content" />
    </div>
    <slot name="center" />
    <div class="flex gap-5">
      <slot name="aside"></slot>
      <LanguageSwitcher class="flex gap-5 pr-6 font-display text-3xl" />
    </div>
  </div>
</template>
