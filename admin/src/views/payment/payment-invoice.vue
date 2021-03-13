<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Безналичными (выставить счет)</CCardHeader>
      <CCardBody>
        <AInput
          class="mb-3"
          label="Наименование компании"
          v-model="values.company"
        />
        <AInput class="mb-3" label="ИНН" v-model="values.inn" />
        <AInput class="mb-3" label="ОГРН" v-model="values.ogrn" />
        <AInput class="mb-3" label="КПП" v-model="values.kpp" />
        <AInput class="mb-3" label="Банк" v-model="values.bank" />
        <AInput class="mb-3" label="Расчетный счет" v-model="values.rc" />
        <AInput class="mb-3" label="Кор счет" v-model="values.kc" />
        <AInput class="mb-3" label="Руководитель" v-model="values.leader" />
        <AInput class="mb-3" label="Главный бухгалтер" v-model="values.buhgalter" />
        <BtnSave class="mt-5" @click="save">Сохранить</BtnSave>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import EditImage from "@/components/EditImage";

export default {
  data() {
    return {
      values: {},
      schema: {},
    };
  },

  components: {
    AInput,
    EditImage,
  },
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  computed: {},
  methods: {
    async save() {
      try {
        const { data } = await this.$api.put(
          "widget",
          { slug: "invoice" },
          { values: this.values }
        );
        this.values = data.values;
        this.$notify({
          group: "main",
          title: "Сохранено!",
          type: "success",
        });
      } catch (err) {
        this.$error(err);
      }
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetAdmin", {
          slug: "invoice",
        });
        const values = Object.assign({}, this.values, data.values);
        this.values = values;
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>