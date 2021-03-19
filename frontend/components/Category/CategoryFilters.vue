<template>
  <section class="search-block">
    <div class="container">
      <div class="search-block__select">
        <SliderPrice class="search-block__price" />
        <AppSelect
          placeholder="Категория"
          :options="[
            { name: 'Категория', value: 'cat' },
            { name: 'Кат 2', value: 'cat-2' },
          ]"
          v-model="cat"
        />
        <div class="select search-block__item">
          <a href="#0" class="button" @click="search">Найти</a>
          <a href="#0" class="reset__button" @click="reset">Сбросить</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      cat: "",
    };
  },
  methods: {
    search() {

    },
    reset() {

    }
  }
};
</script>

<style lang="scss" >
.search-block {
  &__item {
    width: 250px;
    height: 50px;
  }
}
</style>