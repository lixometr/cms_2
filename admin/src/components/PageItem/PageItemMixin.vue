
<script>
import _ from "lodash";
import {makeSlug} from "@/helpers/slug"  
export default {
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      createRoute: "",
      editRoute: "",
      fetchRoute: "",
      itemsRouteName: "",
      itemRouteName: "",
      item: {},
      noSlug: true,
      autoSlug: true,
      isLoading: false,
    };
  },
  computed: {
    itemRouteCreateParams() {
      return { id: this.item.id };
    },
    itemRouteDeleteParams() {
      return {};
    },
  },
  validations: {},
  async created() {
    this.$loading.start();
    await this.fetchItem();
    this.$loading.stop();
  },
  methods: {
    validate() {
      this.$v.$touch();
      return !this.$v.$error;
    },
    afterFetchItem() {
      return;
    },
    async fetchItem() {
      try {
        if (!this.isNew) {
          const { data } = await this.$api.get(this.fetchRoute, {
            id: this.$route.params.id,
          });
          this.item = Object.assign({}, this.item, data);
          if (this.item.slug) this.noSlug = false;
        }
        await this.afterFetchItem();
      } catch (err) {
        this.$error(err);
      }
    },
    afterSave() {
      return;
    },
    async save() {
      if (this.isLoading) return;
      if (!this.validate()) {
        this.$notify({
          group: "main",
          title: "Исправьте ошибки!",
          type: "error",
        });
        return;
      }
      try {
        this.isLoading = true;
        let result;
        if (this.isNew) {
          result = await this.$api.post(this.createRoute, {}, this.item);
        } else {
          result = await this.$api.put(
            this.editRoute,
            { id: this.item.id },
            this.item
          );
        }
        this.item = result.data;
        await this.afterSave();
        if (this.isNew) {
          const params = this.itemRouteCreateParams;
          this.$router.push({
            name: this.itemRouteName,
            params,
          });
        }
        this.saveSuccess();
      } catch (err) {
        this.$error(err);
      } finally {
        this.isLoading = false;
      }
    },
    saveSuccess() {
      this.$notify({
        group: "main",
        title: "Сохранено!",
        type: "success",
      });
    },
    deleteSuccess() {
      this.$notify({
        group: "main",
        title: "Удалено!",
        type: "success",
      });
    },
    afterDelete() {},
    async onDelete() {
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        const { data } = await this.$api.delete(this.editRoute, {
          id: this.item.id,
        });
        await this.afterDelete();
        this.deleteSuccess();
        const params = this.itemRouteDeleteParams;
        this.$router.push({ name: this.itemsRouteName, params });
      } catch (err) {
        this.$error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  watch: {
    item: {
      deep: true,
      handler() {
        if (this.autoSlug && this.noSlug) {
          const name = this.$getLocaleValue(this.item.locale, "name") || "";
          const sValue = makeSlug(name);
          this.$set(this.item, "slug", sValue);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>