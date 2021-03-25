<template>
    <section class="basket">
		<h2>В корзине <span class="basket__cout">3</span> товара</h2>
		<div class="container">

			<!-- блок с продуктами -->
			<div class="basket__products">
				<CartProduct />
			</div>
			<!-- конец блок с продуктами -->

			<!-- Блок с информацией о цене и заказе -->
			<CartInfo />
			<!-- Конец  Блок с информацией о цене и заказе-->

		</div>
	</section>
</template>

<script>
    export default {
        async asyncData({$api, error, store}) {
			try {	
				store.getters['cart/items']
				$api.$get('')
			} catch(err) {
				error(err)
			}
		}
    }
</script>

<style lang="scss" >

</style>