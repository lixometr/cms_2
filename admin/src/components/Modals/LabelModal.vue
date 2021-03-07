<template>
  <Modal title="Флаги" @close="$emit('close')">
    <template>
      <LocaleInput
        class="mb-3"
        label="Название"
        v-model="item.locale"
        prop="name"
        :isValid="$v.item.locale.$each"
      ></LocaleInput>
      <AInput label="Slug" v-model="item.slug"></AInput>
      <CButton color="success" @click="save">Сохранить</CButton>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modals/Modal";
import { required } from "vuelidate/lib/validators";
export default {
  props: {
    new: Boolean,
    id: String,
  },
  components: {
    Modal,
  },
  validations: {
    item: {
      locale: {
        $each: {
          name: { required },
        },
      },
    },
  },
  data() {
    return {
      isNew: this.new,
      thisId: this.id,
      item: {
        name: "",
        slug: "",
      },
    };
  },
  async created() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      try {
        if (!this.isNew) {
          const { data } = await this.$api.get("labelByIdAdmin", {
            id: this.thisId,
          });
          this.item = data;
        }
      } catch (err) {
        this.$error(err);
      }
      this.isLoading = false;
    },
    async save() {
      if (this.isSaving) return;
      this.$v.$touch()
      if(this.$v.$error) return
      this.isSaving = true;
      try {
        if (this.isNew) {
          const { data } = await this.$api.post("labels", null, this.item);
          this.item = data;
          this.thisId = this.item.id;
          this.$notify({
            group: "main",
            type: "success",
            text: "Сохранено!",
          });
          this.isNew = false;
        } else {
          const { data } = await this.$api.put(
            "labelById",
            { id: this.thisId },
            this.item
          );
          this.$notify({
            group: "main",

            type: "success",
            text: "Сохранено!",
          });
        }
      } catch (err) {
        this.$error(err);
      }
      this.isSaving = false;
    },
  },
  watch: {
    id() {
      this.thisId = this.id;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>