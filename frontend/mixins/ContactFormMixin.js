import { required, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
  data: () => ({
    name: "",
    phone: "",
    email: "",
    agreement: true,
  }),
  validations: {
    email: {
      required,
      email,
    },
    name: {
      required,
    },
    phone: {
      required,
    },
  },
  methods: {
    showErrors() {
      const messages = {
        name: "имя",
        phone: "телефон",
        email: "email",
      };
      let message = "";
      Object.keys(messages).map((key) => {
        if (this.$v[key].$error && !message) {
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
      this.sendForm();
    },
    async sendForm() {
      try {
        const toSend = {
          name: this.name,
          email: this.email,
          phone: this.phone,
        };
        await this.$api.$post("sendForm", {}, toSend);
        this.$toast.success('Ваша заявка успешно отправлена!')
        this.$emit('send')
      } catch (err) {
        this.$error(err);
      }
    },
  },
};