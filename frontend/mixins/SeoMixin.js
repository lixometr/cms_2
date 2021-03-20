
export default (valueKey = 'item') => ({
  head() {
    return {
      title: this[valueKey].seo.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this[valueKey].seo.description,
        },
        { name: "keywords", content: this[valueKey].seo.keywords },
      ],
    };
  },

})
