<template>
  <div>
    <div
      class="description__choose"
      v-for="(group, idx) in groupedVariations"
      :key="idx"
    >
      <div class="description__choose-title">
        <span>{{ group.attr.name }} </span>
      </div>
      <div class="description__choose-image">
        <AppImage
          :class="{ active: isActiveVariationValue(group, groupValue) }"
          :src="groupValue.variation.defaultImage"
          alt=""
          v-for="(groupValue, idx) in group.values"
          :key="idx"
          @click="chooseVariation(groupValue)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    // variationId
    value: Number,
  },
  computed: {
    isActiveVariationValue() {
      return (group, groupValue) => {
        const attrInActiveVarIdx = this.activeVariation.attributes.findIndex(
          (activeVarAttr) =>
            group.attr.id === activeVarAttr.attr.id &&
            groupValue.attrValue.id === activeVarAttr.attrValue.id
        );
        return attrInActiveVarIdx > -1;
      };
    },
    variations() {
      return this.item.variations;
    },
    activeVariation() {
      return (
        this.item.variations.find((variation) => variation.id === this.value) ||
        {}
      );
    },
    groupedVariations() {
      const groups = [];
      this.variations.map((variation) => {
        variation.attributes.map((attribute, attrIndex) => {
          const attrId = attribute.attr.id;

          const groupIdx = groups.findIndex(
            (group) => group.attr.id === attrId
          );
          if (groupIdx < 0) {
            const currentGroup = {
              attr: attribute.attr,
              values: [
                {
                  variation,
                  attrValue: attribute.attrValue,
                },
              ],
            };
            groups.push(currentGroup);
            if (attrIndex > 0) {
              currentGroup.values = currentGroup.values.filter((groupValue) => {
                const groupValueVariation = groupValue.variation;
                const prevAttrs = this.activeVariation.attributes.slice(
                  0,
                  attrIndex
                );

                const prevAttrsHas = prevAttrs.map((prevAttr) => {
                  const groupValueVariationAttributeIdx = groupValueVariation.attributes.findIndex(
                    (gValVarAttr) =>
                      gValVarAttr.attr.id === prevAttr.attr.id &&
                      gValVarAttr.attrValue.id === prevAttr.attrValue.id
                  );
                  return groupValueVariationAttributeIdx > -1;
                });
                return !prevAttrsHas.includes(false);
              });
            }
          } else {
            const currentGroup = groups[groupIdx];
            const attrValueInGroup = currentGroup.values.findIndex(
              (value) => value.attrValue.id === attribute.attrValue.id
            );
            if (attrValueInGroup < 0) {
              currentGroup.values.push({
                variation,
                attrValue: attribute.attrValue,
              });
            }
            if (attrIndex > 0) {
              currentGroup.values = currentGroup.values.filter((groupValue) => {
                const groupValueVariation = groupValue.variation;
                const prevAttrs = this.activeVariation.attributes.slice(
                  0,
                  attrIndex
                );
                const prevAttrsHas = prevAttrs.map((prevAttr) => {
                  const groupValueVariationAttributeIdx = groupValueVariation.attributes.findIndex(
                    (gValVarAttr) =>
                      gValVarAttr.attr.id === prevAttr.attr.id &&
                      gValVarAttr.attrValue.id === prevAttr.attrValue.id
                  );
                  return groupValueVariationAttributeIdx > -1;
                });
                return !prevAttrsHas.includes(false);
              });
            }
          }
        });
      });
      return groups;
    },
  },
  methods: {
    chooseVariation(value) {
      this.$emit("input", value.variation.id);
    },
  },
};
</script>

<style lang="scss" >
</style>