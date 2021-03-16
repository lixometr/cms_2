<template>
  <div id="myModal" class="modalwind">
    <!-- <div class="modalwind__position"> -->
    <div class="contact__form">
      <h2>Мы сважемся с Вами</h2>
      <input type="text" placeholder="Имя" />
      <input type="text" placeholder="Телефон" />
      <input type="text" placeholder="E-mail" />

      <input id="contact__formch" type="checkbox" checked hidden />
      <label for="contact__formch"
        ><span> Я согласен(на) на обработку персональных данных</span></label
      >

      <div class="button">
        <a href="#">Отправить</a>
      </div>
      <span class="close"></span>

      <!-- <input type="button" value="ОТПРАВИТЬ"> -->
    </div>

    <!-- </div> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" >
</style>