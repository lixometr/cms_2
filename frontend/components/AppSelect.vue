<template>
  <div class="select" :id="itemId" :class="{ open: isOpen }">
    <input class="select__input" type="hidden" name="" />
    <div class="select__head" @click="toggle">{{ activeOption.name }}</div>
    <ul class="select__list" v-show="isOpen">
      <li
        class="select__item"
        v-for="(item, idx) in options"
        :key="idx"
        @click="selectItem(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
// [ {name: '', value: "'"} ]
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: String,
    placeholder: String,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    activeOption() {
      if (!this.value) {
        return { name: this.placeholder };
      }
      return this.options.find((opt) => opt.value === this.value) || {};
    },
    itemId() {
      return `select-${this.uid}`;
    },
  },
  methods: {
    selectItem(item) {
      this.$emit("input", item.value);
      if (item.value !== this.value) {
        this.close();
      }
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
  },
  mounted() {
    // jQuery(($) => {
    //   $(".select").on("click", ".select__head", function () {
    //     if ($(this).hasClass("open")) {
    //       $(this).removeClass("open");
    //       $(this).next().fadeOut();
    //     } else {
    //       $(".select__head").removeClass("open");
    //       $(".select__list").fadeOut();
    //       $(this).addClass("open");
    //       $(this).next().fadeIn();
    //     }
    //   });
    //   $(".select").on("click", ".select__item", function () {
    //     $(".select__head").removeClass("open");
    //     $(this).parent().fadeOut();
    //     $(this).parent().prev().text($(this).text());
    //     $(this).parent().prev().prev().val($(this).text());
    //   });
    //   $(document).click(function (e) {
    //     if (!$(e.target).closest(".select").length) {
    //       $(".select__head").removeClass("open");
    //       $(".select__list").fadeOut();
    //     }
    //   });
    // });
  },
};
</script>

<style lang="scss" >
.select {
  .select__list {
    display: block;
  }
}
</style>