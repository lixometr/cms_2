<template>
  <PageItem :item="item" @save="save" @delete="onDelete" :isNew="isNew">
    <CCard>
      <CCardHeader>Редактировать метку</CCardHeader>
      <CCardBody>
        <LocaleInput
          :isValid="$v.item.locale.$each"
          class="mb-3"
          label="Название"
          v-model="item.locale"
          prop="name"
        />
        <AInput
          :isValid="$v.item.slug.$error ? false : undefined"
          class="mb-3"
          label="Slug"
          v-model="item.slug"
          @input="noSlug = false"
        />
      </CCardBody>
    </CCard>
  </PageItem>
</template>

<script>
import NInput from "@/components/NInput";
import PageItemMixin from "@/components/PageItem/PageItemMixin";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  components: {
    NInput,
  },
  mixins: [PageItemMixin],
  validations: {
    item: {
      slug: {
        required,
      },
      locale: {
        minLength: minLength(1),
        required,
        $each: {
          name: {
            required,
          },
        },
      },
    },
  },
  data() {
    return {
      fetchRoute: "labelByIdAdmin",
      createRoute: "labels",
      editRoute: "labelById",
      itemsRouteName: "Labels",
      itemRouteName: "Label",
      item: {
        locale: [],
        slug: "",
      },
    };
  },

  methods: {},
};
</script>

<style lang="scss">
</style>