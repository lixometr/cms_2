<template>
  <div class="select" :id="itemId">
    <input class="select__input" type="hidden" name="" />
    <div class="select__head">Марка</div>
    <ul class="select__list" style="display: none">
      <li class="select__item">shevrolet</li>
      <li class="select__item">nissan</li>
      <li class="select__item">hyundai</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: String
  },
  computed: {
    itemId() {
      return `select-${this.uid}`;
    },
  },
  mounted() {
    jQuery(($) => {
      $(".select").on("click", ".select__head", function () {
        if ($(this).hasClass("open")) {
          $(this).removeClass("open");
          $(this).next().fadeOut();
        } else {
          $(".select__head").removeClass("open");
          $(".select__list").fadeOut();
          $(this).addClass("open");
          $(this).next().fadeIn();
        }
      });

      $(".select").on("click", ".select__item", function () {
        $(".select__head").removeClass("open");
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).text());
      });

      $(document).click(function (e) {
        if (!$(e.target).closest(".select").length) {
          $(".select__head").removeClass("open");
          $(".select__list").fadeOut();
        }
      });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>