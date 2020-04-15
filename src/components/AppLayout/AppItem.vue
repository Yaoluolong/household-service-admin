<template>
  <div class="app-item">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.app-item{
  display: inline-block;
  margin:2px 2px;
  padding:2px  2px;
  box-shadow: 0px 1px 8px 0px #d3d3d3
}
</style>
