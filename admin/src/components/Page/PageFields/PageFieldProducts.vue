<template>
  <Label label=" ">
    <template v-slot:label>
      <div>{{ label }}</div>
      <div class="page-field-var-name">
        <i>{{ varName }}</i>
      </div>
    </template>
    <template v-slot:default>
      <ProductSelect :multiple="true" :value="value" @input="onInput" />
    </template>
  </Label>
</template>



<script>
import Mixin from "./PageFieldMixin";
// import { required,} from "vuelidate/lib/validators";
import ProductSelect from "@/components/ProductSelect"
export default {
  // validations: {
  //   value: {
  //     required
  //   }
  // },
  components: {ProductSelect},
  mixins: [Mixin],
  methods: {
    onInput(value) {
      this.emitData(value);
    },
  },
};
</script>

<style>
</style>