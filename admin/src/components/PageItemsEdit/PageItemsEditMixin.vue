
<script>
export default {
  data() {
    return {
      createRoute: "",
      fetchRoute: "",
      editRoute: "",
      items: [],
      itemModel: {},
    };
  },
  vallidations: {},
  async created() {
    this.$loading.start();
    try {
      const { data } = await this.$api.get(this.fetchRoute);
      this.items = data.items;
    } catch (err) {
      this.$error(err);
    }
    this.$loading.stop();
  },
  validations: {},
  methods: {
    changeProp(newValue, index) {
      if (!this.items[index]) this.items[index] = {};
      this.$set(this.items[index], "isChanged", true);
    },
    async addItem() {
      try {
        this.items.push({ ...this.itemModel });
      } catch (err) {
        this.$error(err);
      }
    },
    afterSave() {

    },
    async saveItem(index) {
      try {
        this.$v.$touch();
        if (this.$v.$error) return;
        const item = this.items[index];
        if (item.id) {
          const { data: response } = await this.$api.put(
            this.editRoute,
            { id: item.id },
            item
          );
        } else {
          const { data: response } = await this.$api.post(
            this.createRoute,
            {},
            item
          );
          this.$set(this.items, index, { ...item, id: response.id });
          await this.afterSave()
          this.$notify({
            group: "main",
            type: "success",
            title: "Сохранено!",
          });
        }

        this.$set(this.items[index], "isChanged", false);
      } catch (err) {
        this.$error(err);
      }
    },
    afterDelete() {},

    async deleteItem(index) {
      try {
        const item = this.items[index];
        const { data: response } = await this.$api.delete(
          this.editRoute,
          { id: item.id },
          item
        );
        await this.afterDelete();

        this.$notify({
          group: "main",
          type: "success",
          title: "Удалено!",
        });
        this.items.splice(index, 1);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

