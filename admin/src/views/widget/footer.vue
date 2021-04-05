<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <!-- <CCardHeader></CCardHeader> -->
      <CCardBody>
        <AInput class="mb-3" label="Телефон" v-model="values.phone" />
        <AInput class="mb-3" label="Копирайт" v-model="values.copyright" />
        <AppMultiplyer addText="Добавить иконку" v-model="values.socIcons">
          <template v-slot="{ item }">
            <AInput class="mb-3" v-model="item.link" label="Ссылка"/>
            <EditImage v-model="item.icon" label="Иконка"/>
          </template>
        </AppMultiplyer>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import EditImage from "@/components/EditImage";
import AppMultiplyer from "@/components/AppMultiplyer";
import merge from "lodash.merge";
export default {
  data() {
    return {
      values: {},
      schema: {},
    };
  },

  components: {
    AInput,
    AppMultiplyer,
    EditImage,
  },
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  computed: {},
  methods: {
    async save() {
      return await this.$api.put(
        "widget",
        { slug: "footer" },
        { values: this.values }
      );
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetAdmin", {
          slug: "footer",
        });
        const values = data.values;
        this.schema = data.schema || {};
        this.values = merge({}, this.values, values);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>