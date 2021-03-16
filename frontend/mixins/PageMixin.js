export default ({ slug } = {}) => ({
  head() {
    return {
      title: this.page.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.description,
        },
        { name: "keywords", content: this.page.keywords },
      ],
    }
  },
  computed: {
    
  },
  async asyncData({ $api, error, params }) {
    try {
      const page = await $api.$get("page", { slug: slug || params.slug });
      if (!page) throw { statusCode: 404 }
      return {
        page,
        template: page.template,
      };
    } catch (err) {
      error(err);
    }
  },
})