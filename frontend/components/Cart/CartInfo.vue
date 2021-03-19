<template>
  <div class="basket__info">
    <div class="basket__total-prace">
      <div class="basket__line">
        <p class="basket-title">Товары <span>(3)</span></p>
        <p class="basket-price">5 530 ₽</p>
      </div>
      <div class="basket__line">
        <p class="basket-title">Установка</p>
        <p class="basket-price">2 000 ₽</p>
      </div>
      <div class="basket__line">
        <p class="basket-title">Скидка на товары</p>
        <p class="basket-price">530 ₽</p>
      </div>
      <div class="basket__line">
        <p class="basket-title">Итого</p>
        <p class="basket-price">7 530 ₽</p>
      </div>
    </div>
    <div class="">
      <a href="page_checkout.html" class="button button__button-link"
        >ОФОРМИТЬ ЗАКАЗ</a
      >
    </div>
    <div class="basket__promocode">
      <input type="text" placeholder="Пропокод на скидку" />
      <div class="button">
        <a href="#">Применить</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" >
</style>