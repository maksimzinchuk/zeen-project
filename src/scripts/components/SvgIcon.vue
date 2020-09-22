<template>
  <svg :viewBox="icon.viewBox" preserveAspectRatio="none" v-if="icon">
    <use :xlink:href="icon.url"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: ['name'],
  data() {
    return {
      icon: '',
    }
  },
  mounted() {
    this.icon = require(`../../images/icons/${this.name}.svg`).default
  },
}
</script>
