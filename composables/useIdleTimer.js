export const useIdleTimer = ({ callback }) => {
  const IDLE_TIMEOUT = 60000; // 1 minute
  const idleTimer = ref(null);

  onMounted(() => {
    window.addEventListener("touchstart", handleUserActivity);
    window.addEventListener("mousemove", handleUserActivity);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("touchstart", handleUserActivity);
    window.removeEventListener("mousemove", handleUserActivity);
    if (idleTimer.value) {
      clearTimeout(idleTimer.value);
    }
  });

  const resetOnIdle = () => {
    callback();
    clearTimeout(idleTimer.value);
  };

  const resetIdleTimer = () => {
    if (idleTimer.value) {
      clearTimeout(idleTimer.value);
    }
    idleTimer.value = setTimeout(() => {
      resetOnIdle();
    }, IDLE_TIMEOUT);
  };

  const handleUserActivity = () => {
    resetIdleTimer();
  };
};
