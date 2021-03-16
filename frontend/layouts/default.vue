<template>
  <div class="">
    <MobileMenu />
    <Header />
    <AppFloatBlock />
    <div class="main-content">
      <Nuxt />
    </div>
    <Modal />
    <Footer />
  </div>
</template>
<script>
import Modal from "@/components/Modals/Modal";
export default {
  components: { Modal },
  mounted() {
    this.checkModal();
  },
  methods: {
    checkModal() {
      const modal = this.$route.query.modal;
    },
  },
  watch: {
    "$route.query"() {
      this.checkModal();
    },
  },
};
</script>
<style>
</style>
