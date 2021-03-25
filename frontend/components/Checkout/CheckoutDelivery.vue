<template>
  <div class="checkout__shipping">
    <span class="checkout__title">Доставка:</span>
    <span class="checkout__number">
      <input type="radio" id="checkout__shipping-check1" name="prim" />
      <label for="checkout__shipping-check1"
        >Самовывоз: г. Воронеж, ул. Короленко 5</label
      >

      <input type="radio" id="checkout__shipping-check2" name="prim" />
      <label for="checkout__shipping-check2">Доставка курьером</label>

      <input type="radio" id="checkout__shipping-check3" name="prim" />
      <label for="checkout__shipping-check3">Доставка службой IML</label>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" >
</style>