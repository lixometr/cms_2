<template>
  <section class="pagination">
    <ul class="pagination__block">
      <li class="pagination__block-item active">
        <a class="pagination__block-link" href="#0">1</a>
      </li>
      <li class="pagination__block-item">
        <a class="pagination__block-link" href="#0">2</a>
      </li>
      <li class="pagination__block-item">
        <a class="pagination__block-link" href="#0">3</a>
      </li>
      <li class="pagination__block-item">
        <a class="pagination__block-link" href="#0">...</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
    totalPages: Number,
    page: Number,
    
};
</script>

<style lang="scss" >
</style>