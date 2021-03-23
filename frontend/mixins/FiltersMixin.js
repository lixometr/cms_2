export default {
    methods: {
        onFilterChange(value, attrSlug) {
            this.$store.commit("filters/changeAttr", {
                name: attrSlug,
                value: value,
            });
            this.updatePage();
        },
        updatePrice(value) {
            this.$store.commit("filters/setPrice", value);
            this.updatePage();
        },
        getFiltersQuery() {
            const filters = this.$store.getters["filters/active"];
            let query = {};
            query.price = filters.price.join(",");
            const attributes = filters.attributes || {};
            Object.keys(attributes).map((attrSlug) => {
                const attrValues = attributes[attrSlug];
                if (!attrValues || !attrValues.length) return;
                query[attrSlug] = attrValues.join(",");
            });
            return query;
        },
        updatePage() {
            let query = { page: 1, ...this.getFiltersQuery() };
            this.$router.push({
                query,
            });
        },
        clearFilters() {
            this.$store.dispatch("filters/clear");
            let query = { page: 1 };

            this.$router.push({
                query,
            });
        },
    }
}