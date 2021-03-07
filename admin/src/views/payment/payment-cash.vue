<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardBody>
        <ACheckbox label="Использовать оплату наличными?" :value="active" @input="onChange" />
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: undefined,
    };
  },
  async created() {
    this.$loading.start();
    await this.fetchData();
    this.$loading.stop();
  },
  methods: {
    async fetchData() {
      try {
        const { data } = await this.$api.get("setting", {
          slug: "use-payment-cash",
        });
        this.active = data.value;
      } catch (err) {
        this.$error(err);
      }
    },
    async onChange(value) {
      try {
        const { data } = await this.$api.put(
          "setting",
          {
            slug: "use-payment-cash",
          },
          {
            value,
          }
        );
        this.active = value
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>