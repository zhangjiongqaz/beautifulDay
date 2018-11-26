<template>
	<div class="starts">
		<span class="on" v-for="item in on"></span>
		<span class="half" v-for="item in half"></span>
		<span class="off" v-for="item in off"></span>
	</div>
</template>

<script>
	export default {
		name: "starts",
		props: ["score"],
		data: function() {
			return {
				on:0,
				half:0,
				off:0,
			}
		},
		created:function(){
			//获取评分
			var num = this.score;
			//获取评分的整数位，并设置满星的个数
			this.on = Math.floor(num);
			//判断小数位  并设置 half 即半星的个数
			if((num-this.on)>=0.5){
				this.half = 1
			}
			//设置 没有没有星星的个数（灰色的星星）
			this.off = 5 - this.on -this.half;
		}
	}
</script>

<style lang="less">
	@import url("../../assets/less/mixin.less");
	.starts {
		display: flex;
		justify-content: center;
		margin-bottom: 28px;
		span {
			margin: 0 10px;
			width: 20px;
			height: 19px;
			&.on {
				.bg-img("../../components/start/star48_on")
			}
			&.half {
				.bg-img("../../components/start/star48_half")
			}
			&.off {
				.bg-img("../../components/start/star48_off")
			}
		}
	}
</style>