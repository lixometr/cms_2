<template>
  <div class="description fadeUp t-default" data-t-show="2">
    <div v-for="(item, idx) in items" :key="idx">
      <span class="description__title">{{ item.tab }}</span>
      <p class="description__text">
        <AText :text="item.content" />
      </p>
    </div>

    <!-- <span class="description__title">ОПИСАНИЕ:</span>
    <p class="description__text">
      Чехлы изготовлены из матовой экокожи Аригон с полиуретановым покрытием на
      хлопковой основе. Прочный, легкий, экологически чистый материал не
      вызывающий аллергической реакции. Тыльные и боковые части чехлов сделаны
      из гладкой экокожи, а центральная часть из перфорированной экокожи,
      алькантары или велюра. Чехлы изготовлены со всеми технологическими
      отверстиями и не нарушают заводскую функциональность салона.
    </p> -->
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    items() {
      return this.item.description;
    },
  },
};
</script>

<style lang="scss" >
</style>