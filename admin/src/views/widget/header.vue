<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <!-- <CCardHeader></CCardHeader> -->
      <CCardBody>
        <EditComponent
          c="EditImage"
          v="logo"
          label="Логотип"
          :changeValue.sync="values"
          :schema="schema"
        />

        <EditComponent
          c="EditMultiplyer"
          v="menu"
          label="Меню"
          :items="menuItems"
          :changeValue.sync="values"
          :schema="schema"
        />
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import EditImage from "@/components/EditImage";

import merge from "lodash.merge";
export default {
  data() {
    return {
      values: {
        menu: [],
      },
      schema: {
        menu: {
          name: "",
          url: "",
        },
      },
    };
  },

  components: {
    AInput,
    EditImage,
  },
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  computed: {
    menuItems() {
      return [
        {
          c: "AInput",
          v: "name",
          label: "Название",
        },
        {
          c: "AInput",
          v: "url",
          label: "Url",
        },
      ];
    },
  },
  methods: {
    async save() {
      return this.$api.put(
        "widget",
        { slug: "header" },
        { values: this.values }
      );
    },
    async fetchItem() {
      try {
        const { data } = await this.$api.get("widgetAdmin", {
          slug: "header",
        });
        const values = data.values;
        this.values = Object.assign({}, this.values, values);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>