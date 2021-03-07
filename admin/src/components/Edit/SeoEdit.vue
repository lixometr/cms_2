<template>
  <CCard>
    <CCardHeader
      ><span class="badge badge-primary mr-3">{{ prefix }}</span
      >{{ label }}</CCardHeader
    >
    <CCardBody>
      <AInput
        class="mb-3"
        v-model="values.title"
        label="Title"
        @input="onChange"
      />
      <AInput
        class="mb-3"
        v-model="values.description"
        label="Description"
        @input="onChange"
      />
      <AInput v-model="values.keywords" label="Keywords" @input="onChange" />
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  props: {
    label: String,
    value: {
      type: Object,
      default: () => ({}),
    },
    prefix: String,
  },
  data() {
    return {
      values: { ...this.value },
    };
  },
  methods: {
    onChange() {
      this.$emit("input", this.values);
    },
  },
};
</script>

<style>
</style>