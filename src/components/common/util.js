export const showTitle = (item, vm) => {
  // console.log(vm)
  return vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)
}
