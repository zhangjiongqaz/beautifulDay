<template>
	<div class="carlists">
		<div class="carlisttitle">
			<div class="title">购物车</div>
			<div class="empty" @click="empty">清空</div>
		</div>
		<div class="carlistcontent" ref="carlistcontent">
			<!--配置使用 列表过渡动画-->
				<transition-group tag="ul" leave-active-class="animated bounceOut" enter-active-class="animated bounceIn">
				<li v-for="food in selectfoods" class="carlistfood" v-bind:key="food.name">
					<div class="name">{{food.name}}</div>
					<div class="subtotal">{{food.price*food.count}}</div>
					<!--调用控制组件：接受子组件的事件分发-->
					<carcontrol v-on:balladd="getball" v-bind:food="food"></carcontrol>
				</li>
				</transition-group>
			
		</div>
	</div>
</template>

<script>
	import carcontrol from "@/components/carcontrol/carcontrol";
	import betterScroll from "better-scroll";
	export default {
		name:"calists",
		props:["selectfoods"],
		data(){
			return{
				
			}
		},
		components:{
			carcontrol
		},
		methods:{
			getball(target){
				//接受子组件的事件分发 调用父组件goods的方法
				this.$parent.getball(target);
			},
			//清空购物车逻辑
			empty(){
				this.selectfoods.forEach((food)=> {
					food.count = 0;
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				new betterScroll(this.$refs.carlistcontent,{scrollY:false,scrollX:true,click:true})
			})
		}
	}
</script>

<style lang="less">
	@import url("../../assets/less/mixin.less");
	/*<div class="carlists">
		<div class="carlisttitle">
			<div class="title">购物车</div>
			<div class="empty">清空</div>
		</div>
		<div class="carlistcontent">
			<ul>
				<li v-for="food in selectfoods">
					<div class="name">{{food.name}}</div>
					<div class="subtotal">{{food.price*food.count}}</div>
					<!--调用控制组件-->
					<carcontrol v-bind:food="food"></carcontrol>
				</li>
			</ul>
		</div>
	</div>*/
	.carlists{
		position: fixed;
		z-index:6666;
		bottom: 50px;
		left: 0;
		width: 100%;
		background-color: #fff;
		.carlisttitle{
			height: 40px;
			line-height: 40px;
			background-color: #f3f5f7;
			.border-1px;
			padding: 0 18px;
			display: flex;
			justify-content: space-between;
			.title{
				font-size: 14px;
				font-weight: 200;
				color: rgb(7,17,27);
			}
			.empty{
				font-size: 12px;
				font-weight: 700;
				color: rgb(0,160,220);
			}
		}
		.carlistcontent{
			max-height: 200px;
			overflow: hidden;
			margin: 0 18px;
			.carlistfood{
				height: 48px;
				line-height: 48px;
				display: flex;
				justify-content: space-between;
				position: relative;
				.border-1px;
				.name{
					font-size: 14px;
					color: rgb(7,17,27);
				}
				.subtotal{
					margin-right: 100px;
					font-size: 10px;
					font-weight: 700;
					color: rgb(240,20,20);
					
				}
			}
		}
	}
</style>