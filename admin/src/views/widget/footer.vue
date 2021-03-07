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
       
      </CCardBody>
    </CCard>
   
    <CCard>
      <CCardHeader>Копирайт</CCardHeader>
      <CCardBody>
         <EditComponent
          c="AInput"
          v="copyright1"
          label="Копирайт"
          :changeValue.sync="values"
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
      values: {},
      schema: {},
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
          v: "title",
          label: "Заголовок",
        },
        {
          c: "AInput",
          v: "url",
          label: "Ссылка",
        },
       
        {
          c: "EditImage",
          v: "icon",
          label: "Иконка",
        },
      ];
    },
   
  },
  methods: {
    async save() {
      return this.$api.put("widget", { slug: "footer" }, {values: this.values});
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