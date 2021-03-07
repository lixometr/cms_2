<template>
  <PageItem @save="save" @delete="onDelete" :isNew="isNew" :item="item">
    <CCard>
      <CCardHeader>Тексты</CCardHeader>
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
          label="Slug"
          v-model="item.slug"
          @input="noSlug = false"
        />
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader>Значения</CCardHeader>
      <CCardBody>
        <CDataTable :items="values" :fields="valueFields" hover>
          <template #actions="{ item }">
            <td>
              <CButton color="danger" class="mr-2" @click="deleteValue(item)">
                <CIcon name="cil-trash"></CIcon>
              </CButton>
              <CButton color="warning" @click="editValue(item)">
                <CIcon name="cil-pencil"></CIcon>
              </CButton>
            </td>
          </template>
        </CDataTable>
        <CButton color="primary" @click="addValue" v-if="!isNew">
          Добавить значение
          <CIcon class="ml-1" name="cib-addthis" />
        </CButton>
      </CCardBody>
    </CCard>
  </PageItem>
</template>

<script>
import NInput from "@/components/NInput";
import ImageUpload from "@/components/ImageUpload";
import AttrValueModal from "@/components/AttrValueModal";
import Label from "@/components/Label";
import LocaleInput from "@/components/LocaleComponents/LocaleInput";
import PageItemMixin from "@/components/PageItem/PageItemMixin";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    NInput,
    ImageUpload,
    Label,
    LocaleInput,
  },
  mixins: [PageItemMixin],
  data() {
    return {
      item: {
        name: "",
        slug: "",
        locale: [],
      },
      autoSlug: true,
      fetchRoute: "attributeByIdAdmin",
      editRoute: "attributeById",
      createRoute: "attributes",
      itemsRouteName: "Attributes",
      itemRouteName: "Attribute",
      values: [],
    };
  },
  validations: {
    item: {
      slug: {
        required,
      },
      locale: {
        $each: {
          name: {
            required,
          },
        },
      },
    },
  },
  computed: {
    valueFields() {
      return [
        { key: "actions", label: "Действия" },
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },
      ];
    },
  },
  async created() {
    this.$loading.start();
    try {
      if (!this.isNew) {
        await this.fetchValues();
      }
    } catch (err) {
      this.$error(err);
    }
    this.$loading.stop();
  },

  methods: {
    async fetchValues() {
      const { data } = await this.$api.get(
        "attributeByIdValues",
        {
          id: this.$route.params.id,
        },
        {
          params: {
            perPage: -1,
          },
        }
      );
      const values = data.items;
      this.values = values;
    },
    async deleteValue(item) {
      try {
        const { data: result } = await this.$api.delete("attributeValueById", {
          id: item.id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        await this.fetchValues();
      } catch (err) {
        this.$error(err);
      }
    },
    editValue(item) {
      this.$modal.show(
        AttrValueModal,
        { id: item.id, itemId: this.item.id },
        { height: "100%", width: "100%" },
        {
          closed: () => {
            this.fetchValues();
          },
        }
      );
    },
    async addValue() {
      this.$modal.show(
        AttrValueModal,
        { new: true, attributeId: this.item.id },
        { height: "100%", width: "100%" },
        {
          closed: () => {
            this.fetchValues();
          },
        }
      );
    },
  },
};
</script>

<style lang="scss">
</style>