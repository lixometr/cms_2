<template>
  <StatusSelect v-on="$listeners" v-bind="$attrs" />
</template>

<script>
import StatusSelect from "@/components/StatusSelect";
export default {
  components: {
    StatusSelect,
  },
};
</script>

<style lang="scss" scoped>
</style>