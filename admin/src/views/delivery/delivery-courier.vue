<template>
  <div v-if="!$store.getters.isLoading">
    <DeliveryCourierItems :value="items" />
  </div>
</template>

<script>
import DeliveryCourierItems from "@/components/Delivery/DeliveryCourierItems";
export default {
  components: {
    DeliveryCourierItems,
  },
  data() {
    return {
      items: [],
    };
  },
  async created() {
    this.$loading.start();
    await this.fetchItems();
    this.$loading.stop();
  },
  methods: {
    async fetchItems() {
      try {
        const { data } = await this.$api.get("deliveryCourierAdmin");
        this.items = data.items;
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>