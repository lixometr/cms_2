<template>
  <div class="contact__form">
    <h2>Мы сважемся с Вами</h2>
    <input type="text" placeholder="Имя" v-model="name"/>
    <input type="text" placeholder="Телефон" v-model="phone"/>
    <input type="text" placeholder="E-mail" v-model="email"/>

    <input id="contact__formch" type="checkbox" checked hidden v-model="agreement"/>
    <label class="contact__formch-check" for="contact__formch"
      ><span> Я согласен(на) на обработку персональных данных</span></label
    >

    <div class="button" @click="submit">
      <a href="#" @click.prevent>Отправить</a>
    </div>
    

    <!-- <input type="button" value="ОТПРАВИТЬ"> -->
  </div>
</template>

<script>
import ContactFormMixin from "@/mixins/ContactFormMixin"
export default {
  mixins: [ContactFormMixin]
};
</script>

<style lang="scss" >
</style>