<template>
  <div class="col-lg-3 col-md-6 col-sm-12 py-2 border px-4 d-flex  flex-column">
    <div class="image-wrapper p-2 rounded d-flex justify-content-center  ">
      <EditImage :value="item" @input="onImageChange" />
    </div>
    <div class="actions mt-auto d-flex justify-content-center">
      <CButton color="danger" class="delete" @click="onDelete">
        <CIcon name="cil-trash"></CIcon>
      </CButton>
    </div>
  </div>
</template>

<script>
import EditImage from "@/components/EditImage";
export default {
  props: {
    item: Object,
  },
  components: {
    EditImage,
  },
  methods: {
    onDelete() {
      this.$emit("delete");
    },
    onImageChange(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-wrapper {
  flex: 1;
}
</style>