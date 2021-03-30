<template>
  <div class="modalwind">
    <!-- <div class="modalwind__position"> -->
    <ContactModalForm @send="onSend" />

    <!-- </div> -->
  </div>
</template>

<script>
import ContactModalForm from "@/components/ContactModalForm";
export default {
  components: { ContactModalForm },
  methods: {
    onSend() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" >
.modalwind {
  display: block !important;
  position: relative;
  width: auto;
  height: auto;
  .contact__form {
    position: relative;
    height: 616px;
  }
  .button {
    margin-bottom: 0 !important;
  }
}
</style>