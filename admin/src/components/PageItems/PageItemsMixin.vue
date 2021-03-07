
<script>
export default {
  data() {
    return {
      fetchRoute: "",
      removeRoute: "",
      editRouteName: "",
      createRouteName: "",
      searchPhrase: "",
      activePage: parseInt(this.$route.query.page) || 1,
      info: {},
      items: [],
      useSearch: true,
    };
  },
  async created() {
    this.$loading.start();
    await this.fetchItems();
    this.$loading.stop();
  },
  computed: {
    totalPages() {
      return this.info.totalPages;
    },
  },
  methods: {
    createItem() {
      
      this.$router.push({ name: this.createRouteName });
    },
    editItem(id) {
      this.$router.push({ name: this.editRouteName, params: { id } });
    },

    afterRemove() {},
    async removeItem(id) {
      try {
        const { data } = await this.$api.delete(this.removeRoute, {
          id,
        });
        await this.afterRemove(data);
        this.$notify({
          group: "main",
          type: "success",
          title: "Удалено!",
        });
        this.fetchItems();
      } catch (err) {
        this.$error(err);
      }
    },
    async afterFetchItems() {
      return;
    },
    async fetchItems() {
      try {
        let data;
        if (this.useSearch) {
          data = await this.$api.get(
            this.fetchRoute,
            {
              text: this.searchPhrase,
            },
            {
              params: {
                page: this.activePage,
              },
            }
          );
        } else {
          data = await this.$api.get(
            this.fetchRoute,
            {},
            {
              params: {
                page: this.activePage,
              },
            }
          );
        }
        this.setData(data.data);
        await this.afterFetchItems();
      } catch (err) {
        this.$error(err);
      }
    },
    setData({ items, info, error }) {
      if (error) {
        throw error;
      }
      this.items = items;
      this.info = info;
    },
  },
  watch: {
    searchPhrase() {
      this.fetchItems();
    },
    activePage() {
      this.$router.replace({
        query: { ...this.$route.query, page: this.activePage },
      });
      this.fetchItems();
    },
  },
};
</script>

