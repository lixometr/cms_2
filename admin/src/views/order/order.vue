<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div>
          Создан:
          <b>{{ order.created_at | moment("DD.MM.YYYY hh:mm") }}</b>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardBody>
        <Label class="mb-3" label="Id">{{ order.order_id }}</Label>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <Label class="mb-3" label="Сумма"
          >{{ order.totalPrice }}{{ order.currency.sign }}</Label
        >
        <Label class="mb-3" label="Статус">
          <v-select
            :multiple="false"
            v-model="order.status"
            :options="statuses"
            label="label"
            :reduce="(item) => item.key"
            :searchable="false"
        /></Label>
        <Label class="mb-3" label="Промокод">{{
          order.promocode && order.promocode.name
        }}</Label>
        <Label class="mb-3" label="Способ оплаты">{{
          order.payment_method
        }}</Label>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Информация о товарах</CCardHeader>
      <CCardBody>
        <OrderProduct
          v-for="(item, idx) in order.products"
          :key="idx"
          :item="item"
          :order="order"
        />
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader>Информация о пользователе</CCardHeader>
      <CCardBody>
        <Label class="mb-3" label="Email">{{ order.info.email }}</Label>
        <Label class="mb-3" label="Имя">{{ order.info.name }}</Label>
        <Label class="mb-3" label="Фамилия">{{ order.info.surName }}</Label>
        <Label class="mb-3" label="Телефон">{{ order.info.phone }}</Label>
      </CCardBody>
    </CCard>
    
    <CCard>
      <CCardBody>
        <Label label=""></Label>
      </CCardBody>
    </CCard>

    <BtnSave @click="save">Сохранить</BtnSave>
    <CButton color="danger mb-3" @click="onDelete">Удалить</CButton>
  </div>
</template>

<script>
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import EditImage from "@/components/EditImage";
import AppColorPicker from "@/components/AppColorPicker";
import OrderProduct from "@/components/Order/OrderProduct";
export default {
  components: {
    AInput,
    NInput,
    EditImage,
    AppColorPicker,
    OrderProduct,
  },
  props: {
    isNew: Boolean,
  },
  data() {
    return {
      order: {
        name: "",
      },
    };
  },
  computed: {
    statuses() {
      return [
        {
          label: "CANCELLED",
          key: 0,
        },
        {
          label: "COMPLETED",
          key: 1,
        },
        {
          label: "IN PROGRESS",
          key: 2,
        },
        {
          label: "NEW ORDER",
          key: 3,
        },
      ];
    },
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
  async created() {
    this.$loading.start();
    try {
      if (!this.isNew) {
        const { data } = await this.$api.get("orderByIdAdmin", {
          id: this.$route.params.id,
        });
        this.order = data;
      } else {
        const { data } = await this.$api.post("orders");
        this.$router.push({ name: "Order", params: { id: data.id } });
      }
    } catch (err) {
      this.$error(err);
    }

    this.$loading.stop();
  },
  methods: {
    async save() {
      try {
        const { data: response } = await this.$api.put(
          "orderChangeStatus",
          { id: this.order.id },
          {
            status: this.order.status,
          }
        );
        this.$notify({
          group: "main",
          title: "Сохранено!",
          type: "success",
        });
      } catch (err) {
        this.$error(err);
      }
    },
    async onDelete() {
      try {
        const { data } = await this.$api.delete("orderById", {
          id: this.order.id,
        });
        this.$notify({
          group: "main",
          title: "Удалено!",
          type: "success",
        });
        this.$router.push({ name: "Users" });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>