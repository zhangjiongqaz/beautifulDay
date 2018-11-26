<template>
	<div class="start">
		<!--页面内容太少，叉叉 在屏幕下方///页面内容多了，叉叉在内容下边-->
		<div class="container">
			<div class="content">
				<!--商家标题-->
				<h1>{{seller.name}}</h1>
				<!--星星-->
				<!--<div class="starts">
					<span class="on" v-for="item in on"></span>
					<span class="half" v-for="item in half"></span>
					<span class="off" v-for="item in off"></span>
				</div>-->
				<starts v-bind:score="seller.score"></starts>
				<!--模块标题-->
				<div class="title">
					<div class="line"></div>
					<div class="text">优惠信息</div>
					<div class="line"></div>
				</div>
				<!--支持列表-->
				<div class="supports">
					<div class="support-item" v-for="data in seller.supports">
						<span class="icon" v-bind:class="classGroup[data.type]"></span>
						<span>{{data.description}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="close">
			<span class="icon-close" @click="startHide"></span>
		</div>
	</div>
</template>

<script>
	import starts from "@/components/starts/starts"
	export default {
		name: "SStart",
		props: ["seller"],
		data: function() {
			return {
				on:0,
				half:0,
				off:0,
				classGroup:["decrease","discount","special","guarantee","invoice"]
			}
		},
		methods: {
			startHide: function() {
				this.$parent.start = false;
			}
		},
		created:function(){
			//获取评分
			var num = this.seller.score;
			//获取评分的整数位，并设置满星的个数
			this.on = Math.floor(num);
			//判断小数位  并设置 half 即半星的个数
			if((num-this.on)>=0.5){
				this.half = 1
			}
			//设置 没有没有星星的个数（灰色的星星）
			this.off = 5 - this.on -this.half;
		},
		components:{
			starts
		}
	}
</script>

<style lang="less">
	@import url("../../assets/less/mixin.less");
	.start {
		z-index:9999;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(7, 17, 27, 0.8);
		overflow-y:auto;
		.container {
			min-height:100%;
			.content {
				padding: 64px 24px 30px;
				h1 {
					font-size: 16px;
					font-weight: 700;
					color: #FFFFFF;
					line-height: 16px;
					text-align: center;
					margin-bottom: 16px;
				}
				.title{
					display: flex;
					margin-bottom: 12px;
					.line{
						flex: 3;
						.border-1px;
						border-color:#FFFFFF ;
					}
					.text{
						flex: 2;
						padding: 0 12px;
						font-size: 14px;
						font-weight: 700;
						line-height: 14px;
						color: #FFFFFF;
						text-align: center;
					}
				}
				.supports{
					.support-item{
						padding-left:12px ;
						margin-bottom: 12px;
						font-size: 12px;
						color: #FFFFFF;
						font-weight: 200;
						line-height: 12px;
						.icon{
							display: inline-block;
							width: 16px;
							height: 16px;
							margin-right: 6px;
						}
						.decrease{
							.bg-img("../../components/start/decrease_1")
						}
						.discount{
							.bg-img("../../components/start/discount_1")
						}
						.guarantee{
							.bg-img("../../components/start/guarantee_1")
						}
						.invoice{
							.bg-img("../../components/start/invoice_1")
						}
						.special{
							.bg-img("../../components/start/special_1")
						}
					}
				}
			}
		}
		.close{
			margin-top: -30px;
			color: white;
			text-align: center;
			font-size: 32px;
			color: rgba(255,255,255,0.5);
		}
	}
</style>