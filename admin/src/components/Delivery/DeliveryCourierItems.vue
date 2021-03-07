<template>
  <div>
    <CCard>
      <CCardHeader> Адреса доставки </CCardHeader>
      <CCardBody>
        <DeliveryCourierItem
          class="mb-3"
          v-for="(item, idx) in items"
          :key="idx"
          :value="item"
          @input="onItemChange($event, idx)"
          @delete="onDelete(item, idx)"
          @save="saveItem(item, idx)"
        />
        <div class="d-flex justify-content-center">
          <CButton color="warning" class="mt-3 w-100" @click="addItem">Добавить адрес</CButton>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import DeliveryCourierItem from "./DeliveryCourierItem";
import _ from "lodash";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      items: _.cloneDeep(this.value),
    };
  },
  components: {
    DeliveryCourierItem,
  },
  methods: {
    async saveItem(item, idx) {
      try {
        if (item.id === undefined) {
          const { data } = await this.$api.post(
            "deliveries",
            {},
            {
              type: "courier",
              ...item,
            }
          );
          this.$set(this.items, idx, {...data, isChanged: false});
        } else {
          const { data } = await this.$api.put(
            "deliveryById",
            { id: item.id },
            item
          );
          this.$set(this.items, idx, {...data, isChanged: false});
        }
        this.$notify({
          group: "main",
          title: "Сохранено!",
          type: "success",
        });
      } catch (err) {
        this.$error(err);
      }
    },
    onItemChange(newItem, idx) {
      this.$set(this.items, idx, newItem);
    },
    addItem() {
      const newItem = {
        locale: [],
        prices: [],
      };
      this.items.push(newItem);
    },
    async onDelete(item, idx) {
      try {
        if (item.id !== undefined) {
          const { data } = await this.$api.delete("deliveryById", {
            id: item.id,
          });
          this.$notify({
            group: "main",
            title: "Удалено!",
            type: "success",
          });
        }

        this.items.splice(idx, 1);
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>