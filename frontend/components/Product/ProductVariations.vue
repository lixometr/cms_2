<template>
  <div>
    {{groupedVariations}}
    <div class="description__choose" v-for="(group, idx) in groupedVariations" :key="idx">
      <div class="description__choose-title">
        <span>Выберите {{ group.attr.name }}</span>
      </div>
      <div class="description__choose-image">
        <AppImage
          class="active"
          :src="value.variation.image"
          alt=""
          v-for="(value, idx) in group.values"
          :key="idx"
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
  },
  computed: {
    variations() {
      return this.item.variations;
    },
    groupedVariations() {
      const groups = [];
      this.variations.map((variation) => {
        variation.attributes.map((attribute) => {
          console.log(attribute)

          const attrId = attribute.attr.id;

          const groupIdx = groups.findIndex(
            (group) => group.attr.id === attrId
          );
          if (groupIdx < 0) {
            groups.push({
              attr: attribute.attr,
              values: [
                {
                  variation,
                  attrValue: attribute.attrValue
                },
              ],
            });
          } else {
            
            const currentGroup = groups[groupIdx];
            const attrValueInGroup =  currentGroup.values.findIndex(value => value.attrValue.id === attribute.attrValue.id)
            if(attrValueInGroup < 0) {
              currentGroup.values.push({
                variation,
                attrValue: attribute.attrValue
              })
            } 
          }
        });
      });
      return groups;
    },
  },
};
</script>

<style lang="scss" >
</style>