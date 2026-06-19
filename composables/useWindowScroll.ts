// Kleine composable die we in de Hero gebruiken om scroll-progressie te tonen.
export const useWindowScroll = () => {
  const y = ref(0)
  const onScroll = () => (y.value = window.scrollY || window.pageYOffset || 0)

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

  return { y }
}
