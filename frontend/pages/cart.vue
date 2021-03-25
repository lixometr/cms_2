<template>
    <section class="basket">
		<h2>В корзине <span class="basket__cout">3</span> товара</h2>
		<div class="container">

			<!-- блок с продуктами -->
			<div class="basket__products">
				<ProductCard cardType="cart" v-for="(item, idx) in items" :product="item" :key="idx" :idx="idx"/>
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
				
			} catch(err) {
				error(err)
			}
		},
		computed:{
			items() {
				return this.$store.getters['cart/items']
			}
		}
    }
</script>

<style lang="scss" >

</style>