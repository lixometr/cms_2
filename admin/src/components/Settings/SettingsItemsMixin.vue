
<script>
export default {
  data() {
    return {
      values: {},
    };
  },
  mounted() {
  },
  async created() {
    this.$loading.start();
    try {
      const resolvers = this.settings.map(async (setting) => {
        const { data: response } = await this.$api.get("settingAdmin", {
          slug: setting.slug,
        });
        this.$set(this.values, setting.slug, response && response.value);
      });
      await Promise.all(resolvers);
    } catch (err) {
      this.$error(err);
    }
    this.$loading.stop();
  },
  methods: {
    async save(index) {
      try {
        const resolvers = this.settings.map(async (setting) => {
          await this.$api.put(
            "setting",
            {
              slug: setting.slug,
            },
            {
              value: this.values[setting.slug],
            }
          );
        });
        await Promise.all(resolvers);
        this.$notify({
          group: "main",
          type: "success",
          title: "Сохранено!",
        });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>
