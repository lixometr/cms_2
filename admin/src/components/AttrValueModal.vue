<template>
  <Modal
    title="Редактировать значение атрибута"
    v-if="!isLoading"
    class="modal-attr-value"
    :adaptive="true"
    width="100%"
    height="100%"
    @close="$emit('close')"
  >
    <template>
      <CCard>
        <CCardHeader>Редактировать значение атрибута</CCardHeader>
        <CCardBody>
          <LocaleInput
            :isValid="$v.attributeValue.locale.$each"
            label="Название"
            class="mb-4"
            v-model="attributeValue.locale"
            prop="name"
          />
          <AInput
            :isValid="$v.attributeValue.slug.$error ? false : undefined"
            class="mb-4"
            label="Slug"
            v-model="attributeValue.slug"
          />

          <AttributeSelect
            label="Атрибут"
            :multiple="false"
            v-model="attributeValue.attributeId"
          />
        </CCardBody>
      </CCard>
    </template>
    <template #footer>
      <div class="d-flex justify-content-end">
        <CButton class="mr-2" color="secondary" @click="$emit('close')"
          >Отменить</CButton
        >
        <CButton color="success" @click="save">Сохранить</CButton>
      </div>
    </template>
  </Modal>
</template>

<script>
import AttributeSelect from "@/components/AttributeSelect";
import Modal from "@/components/Modals/Modal";
import { required } from "vuelidate/lib/validators";
export default {
  props: {
    //   attrId
    attributeId: [String, Number],
    // attrValueId
    id: [String, Number],
    new: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      attributeValue: {
        locale: [],
        slug: "",
        attributeId: this.attributeId,
      },
      thisId: this.id,
      isNew: this.new,
      isLoading: false,
    };
  },
  validations: {
    attributeValue: {
      locale: {
        $each: {
          name: {
            required,
          },
        },
      },
      slug: {
        required,
      },
    },
  },
  components: {
    AttributeSelect,
    Modal,
  },
  computed: {},
  async created() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      try {
        if (this.isNew) {
          //   const { data: attrValue } = await this.$api.post("attributeValues", null, {
          //       attributeId: this.attributeId
          //   });
          //   this.attributeValue = attrValue;
        } else {
          const { data: attrValue } = await this.$api.get(
            "attributeValueByIdAdmin",
            {
              id: this.id,
            }
          );
          this.attributeValue = attrValue;
        }
      } catch (err) {
        this.$error(err);
      }
      this.isLoading = false;
    },
    async save() {
      this.$v.$touch();
      if (this.$v.$error) return;
      if (this.isSaving) return;
      this.isSaving = true;
      try {
        if (this.isNew) {
          const { data: result } = await this.$api.post(
            "attributeValues",
            null,
            this.attributeValue
          );
          this.isNew = false;
          this.thisId = result.id;
        } else {
          const { data: result } = await this.$api.put(
            "attributeValueById",
            { id: this.thisId },
            this.attributeValue
          );
        }
        this.$notify({
          group: "main",
          type: "success",
          title: "Сохранено!",
        });
        this.$emit("close");
      } catch (err) {
        this.$error(err);
      }
      this.isSaving = false;
    },
    close() {
      this.$emit("close");
    },
  },
  watch: {
    async id() {
      this.thisId = this.id;
      await this.fetch();
    },
    new() {
      this.isNew = this.new;
    },
    attributeId() {
      this.attributeValue.attributeId = this.attributeId;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-attr-value {
  width: 100%;
  height: 100%;
}
</style>