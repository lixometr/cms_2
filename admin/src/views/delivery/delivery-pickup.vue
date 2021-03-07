<template>
  <div v-if="!$store.getters.isLoading">
    <DeliveryPickupItems :value="items" />
  </div>
</template>

<script>
import DeliveryPickupItems from "@/components/Delivery/DeliveryPickupItems";
export default {
  components: { DeliveryPickupItems },
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
        const { data } = await this.$api.get("deliveryPickupAdmin");
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