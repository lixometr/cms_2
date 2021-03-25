<template>
  <div class="checkout__payment">
    <span class="checkout__title">Оплата:</span>
    <span class="checkout__number">
      <input type="radio" id="checkout__number-check1" name="prim2" />
      <label for="checkout__number-check1">Наличными при получении</label>

      <input type="radio" id="checkout__number-check2" name="prim2" />
      <label for="checkout__number-check2"
        >Банковской картой при получении</label
      >

      <input type="radio" id="checkout__number-check3" name="prim2" />
      <label for="checkout__number-check3">Онлайн платежом</label>

      <input type="radio" id="checkout__number-check4" name="prim2" />
      <label for="checkout__number-check4">Безналичный расчет</label>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" >
</style>