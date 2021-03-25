<template>
  <div>
    <AppBreadcrumbs :items="breadcrumbs" />
    <section class="checkout">
      <h2>Оформление заказа</h2>
      <div class="container">
        <CheckoutForm v-model="info"/>

        <div class="checkout__shipping-payment">
          <h5>Доставка и оплата</h5>
          <div class="wrapperbg">
            <div class="checkout__summa">
              <span class="checkout__title">Сумма:</span>
              <span class="checkout__number">5,980.00 руб.</span>
            </div>
            <div class="checkout__sale">
              <span class="checkout__title">Скидка:</span>
              <span class="checkout__number">-299.00 руб.</span>
            </div>
            <CheckoutDelivery v-model="delivery"/>
            <div class="checkout__total">
              <span class="checkout__title">ИТОГО:</span>
              <span class="checkout__number">7 570 ₽</span>
            </div>
            <CheckoutPayments v-model="payment"/>
            <div class="checkout__info">
              <p>
                Ваши личные данные будут использоваться для обработки ваших
                заказов, упрощения вашей работы с сайтом и для других целей,
                которые описывает наша
              </p>
              <a href="#">политика конфиденциальности</a>

              <input
                type="checkbox"
                id="checkout__info-check"
                checked
                v-model="agreement"
              />
              <label for="checkout__info-check"
                >Я согласен(на) на обработку персональных данных
              </label>
            </div>
            <!-- <input type="button" class="button" value="ОФОРМИТЬ ЗАКАЗ"> -->
            <div class="offer__text-button">
              <a href="#0" class="button" @click.prevent="submit">ОФОРМИТЬ ЗАКАЗ</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      return [
        {
          title: "Оформление заказа",
          link: "#",
        },
      ];
    },
  },
  data: () => ({
    agreement: true,
    delivery: '',
    payment: '',
    info: {}
  }),
  methods: {
      submit() {
      }
  }
};
</script>

<style lang="scss" >
</style>