<template>
  <form ref="form" class="checkout__enter-data">
    <h5>Введите ваши данные</h5>
    <input
      type="text"
      class="name"
      placeholder="Имя*"
      v-model="info.name"
      required
    />
    <input type="text" placeholder="Фамилия *" v-model="info.surname" />
    <input type="text" class="city" placeholder="Город" v-model="info.city" />
    <input
      type="text"
      class="index"
      placeholder="Индекс *"
      v-model="info.index"
    />
    <input
      type="text"
      class="city"
      placeholder="Адрес *"
      v-model="info.address"
    />
    <input type="text" class="index" placeholder="Дом" v-model="info.house" />
    <input
      type="text"
      class="phone"
      placeholder="Телефон *"
      v-model="info.phone"
    />
    <input
      type="text"
      class="phone"
      placeholder="Email *"
      v-model="info.email"
    />
    <textarea
      name="text"
      class="note"
      placeholder="Примечание к заказу"
      v-model="info.note"
    ></textarea>
    <!--<input type="textarea" class="note"  placeholder="Примечание к заказу">-->
  </form>
</template>

<script>
import { required, email, integer} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  data() {
    return {
      info: {},
    };
  },
  mixins: [validationMixin],
  validations: {
    info: {
      name: {
        required,
      },
      surname: {
        required,
      },
      city: {
        required,
      },
      house: {
        required
      },
      index: {
        required,
        integer
      },
      address: {
        required,
      },
      phone: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    showErrors() {
      const messages = {
        name: "имя",
        surname: "фамилия",
        city: 'город',
        index: 'индекс',
        house: 'дом',
        address: 'адрес',
        phone: "телефон",
        email: 'email'
      };
      let message = "";
      Object.keys(this.$v.info).map((key) => {
        if (this.$v.info[key].$error && !message) {
          message = `Заполните поле ${messages[key]}`;
        }
      });
      this.$toast.error(message);
    },
    validate() {
      this.$v.$touch();
      return !this.$v.$error;
    },
    submit() {
      const isValid = this.validate();
      if (!isValid) {
        console.log(this.$v);
        this.showErrors();
        return false;
      }
      return true;
    },
  },
  watch: {
    info: {
      deep: true,
      handler() {
        this.$emit("input", this.info);
      },
    },
  },
};
</script>

<style lang="scss" >
</style>