<template>
  <transition
    enter-active-class="duration-150 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <slot />
  </transition>
</template>
