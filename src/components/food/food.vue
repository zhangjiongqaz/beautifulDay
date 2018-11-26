<template>
	<div class="fooddetail" v-show="isshow" ref="food">
		<div> <!--添加一个空标签：因为被betterscroll 封装的父标签的直接字标签只能有一个-->
			<!--头部图片区域-->
		<div class="datail-header">
			<img v-bind:src="selectfood.image" alt="" />
		</div>
		<!--返回按钮：因为层级问题，所以写在了图片之后-->
		<div class="close" @click="back">
			<span class="icon-close"></span>
		</div>
		<!--商品信息-->
		<div class="detail-msg">
			<div class="title">
				{{selectfood.name}}
			</div>
			<div class="sell-count">
				<span class="count">月售{{selectfood.sellCount}}份</span>
				<span class="rate">好评率{{selectfood.rating}}%</span>
			</div>
			<div class="price">
				<span class="new">￥{{selectfood.price}}</span>
				<span class="old" v-if="selectfood.oldPrice">￥{{selectfood.oldPrice}}</span>
			</div>
			<div class="shoping">
				<!--调用控制按钮组件-->
				<carcontrol v-bind:food="selectfood" v-show="selectfood.count" v-on:balladd="getball"></carcontrol>
				<div class="addshop" @click="addfood" v-show="!selectfood.count">加入购物车</div>
			</div>
		</div>
		<!--商品介绍-->
		<div class="detail-dec">
			<div class="title">商品介绍</div>
			<!--使用 v-if 添加一个没有介绍信息时的标签-->
			<p v-if="selectfood.info" class="info">{{selectfood.info}}</p>
			<!--<p v-else class="info">暂无介绍</p>-->
		</div>
		<!--商品评价-->
		<div class="detail-rating">
			<div class="title">商品评价</div>
			<div class="choose-rating">
				<!--注意这几个标签的背景色都先添加透明颜色：点击之后再改为不透明-->
				<span class="all" @click="Echoose(2)" v-bind:class="{active:choose==2}">
					全部
				</span>
				<span class="tj" @click="Echoose(0)" v-bind:class="{active:choose==0}">
					推荐
				</span>
				<span class="tc" @click="Echoose(1)" v-bind:class="{active:choose==1}">
					吐槽
				</span>
			</div>
			<!--选择内容-->
			<div class="choose-content" @click="Ehasconent" v-bind:class="{active:hasconent}">
				<div class="choose" >
					<span class="icon-check_circle"></span>
					<span>只看有内容的评价</span>
				</div>
			</div>
		</div>
		<!--评论列表-->
		<div class="detail-list">
			<ul>
				<li v-for="item in chooseratings" v-bind:key="item.rateTime" class="item">
					<div class="timecontainer">
						<span class="time">{{item.rateTime | time}}</span>
						<span class="avatar">
							{{item.username}}
							<img class="bg-avatar" v-bind:src="item.avatar"/>
						</span>
					</div>
					<div class="content">
					<!--不同类型的评价显示不同图标-->
						<span v-show="item.rateType==0" class="icon-thumb_up up"></span>
						<span v-show="item.rateType==1" class="icon-thumb_down down"></span>
						<span class="text">{{item.text}}</span>
					</div>
				</li>
			</ul>
		</div>
		</div>
	</div>
</template>

<script>
	import betterScroll from "better-scroll";
	import carcontrol from "@/components/carcontrol/carcontrol";
	export default {
		name: "food",
		props: ["selectfood"],
		data() {
			return {
				isshow: false, // 页面是否显示的参考值
				hasconent:false,//---挑选 内容的参考值
				choose:2,//2,0,1 ---挑选类型的参考值
			}
		},
		methods: {
			//改变返回判断的值
			back() {
				this.isshow = false
			},
			//改变挑选内容的 参考值
			Ehasconent(){
				this.hasconent = !this.hasconent
			},
			//改变 挑选类型的 参考值
			Echoose(num){
				this.choose = num;
			},
//			点击加入购物车 添加第一个商品
			addfood(e){
				
				this.$set(this.selectfood,"count",1);
				//同控制按钮，触发点击事件
				var target = e.target;
//				console.log("添加第一个商品，并获取元素坐标");
				this.$parent.getball(target);
			},
//			获取点击的控制按钮的DOM ,传递给good父组件
			getball(target){
//				console.log("获取点击事件发送的数据，调用父组件good")
				this.$parent.getball(target);
			}
		},
		computed:{
			//先根据内容挑选
			allratings(){
				if(this.hasconent==false){
					return this.selectfood.ratings
				}else{
					var list = [];
					this.selectfood.ratings.forEach((rating)=>{
						if(rating.text){
							list.push(rating)
						}
					})
					return list;
				}
			},
			//再根据类型挑选
			chooseratings(){
				if(this.choose ==2){
					return this.allratings
				}else if(this.choose == 0){
					var list = [];
					this.allratings.forEach((rating)=>{
						if(rating.rateType ==0){
							list.push(rating)
						}
					})
					return list;
				}else if(this.choose == 1){
					var list = [];
					this.allratings.forEach((rating)=>{
						if(rating.rateType ==1){
							list.push(rating)
						}
					})
					return list;
				}
			}
		},
		filters:{
			//过滤日期格式的显示
			time(value){
				return new Date(value).toLocaleString()
			}
		},
		mounted(){
			//在组件创建过程中 给组件添加 滚动效果
			this.$nextTick(()=>{
				if(!this.food){
					this.food = new betterScroll(this.$refs.food);
				}else{
					this.food.refresh();
				}
				
			})
		},
		components:{
			carcontrol
		}
	}
</script>

<style lang="less">
	@import url("../../assets/less/mixin.less");
	.fooddetail {
		position: fixed;
		width: 100%;
		min-height: 500px;
		top: 0;
		bottom: 50px;
		background-color: #f3f5f7;
		color: #FFFFFF;
		.close {
			position: absolute;
			top: 10px;
			left: 10px;
			padding: 10px;
			color: #FFFFFF;
		}
		.datail-header {
			width: 100%;
			height: 0;
			padding-top: 100%;
			/*相对的是宽度*/
			background-color: #fff;
			position: relative;
			img {
				position: absolute;
				/*定位以后的元素  100%  相对父标签总大小的百分比*/
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}
		}
		.detail-msg {
			margin-bottom: 16px;
			.border-1px;
			padding: 18px;
			background-color: #fff;
			position: relative;
			.title {
				color: rgb(7,17,27);
				font-weight: 700;
				font-size: 14px;
				line-height: 14px;
				margin-bottom: 8px;
			}
			.sell-count {
				font-size: 10px;
				color: rgb(147,153,159);
				line-height: 10px;
				margin-bottom: 18px;
			}
			.price {
				.new{
					font-size: 14px;
					font-weight: 700;
					color: rgb(240,20,20);
					line-height: 14px;
				}
				.old{
					font-size: 10px;
					font-weight: 700;
					color: rgb(147,153,159);
					text-decoration: line-through;
					font-style: italic;
					line-height: 24px;
				}
				
			}
			/*<div class="shoping">
				<carcontrol v-bind:food="selectfood"></carcontrol>
				<div class="addshop"></div>
			</div>*/
			.shoping{
				position: absolute;
				width: 74px;
				height: 24px;
				right: 20px;
				bottom: 20px;
				.carcontrol{
					position: absolute;
					top: 0;
					right: 0;
					.count{
						color: #000000;
					}
				}
				.addshop{
					position: absolute;
					font-size: 12px;
					top: 0;
					left: 0;
					width: 74px;
					height: 24px;
					border-radius: 10px;
					background-color: #00A0DC;
					color: #FFFFFF;
					line-height: 24px;
					text-align: center;
				}
			}
		}
		.detail-dec {
			background-color: #fff;
			padding: 18px;
			margin-bottom: 16px;
			.border-1px;
			border-top-style:solid;
			.title {
				font-size: 14px;
				color: rgb(7,17,27);
				line-height: 14px;
				margin-bottom: 6px;
			}
			.info {
				color: rgb(77,85,93);
				font-size: 12px;
				font-weight: 200;
				line-height: 24px;
				padding: 0 8px;
			}
		}
		.detail-rating {
			background-color: #fff;
			padding: 18px;
			.border-1px;
			border-top-style:solid;
			.title {
				font-size: 14px;
				color: rgb(7,17,27);
				line-height: 14px;
				margin-bottom: 18px;
			}
			.choose-rating {
				display: flex;
				justify-content: flex-start;
				padding-bottom: 18px;
				margin-bottom: 12px;
				.border-1px;
				span{
					font-size: 12px;
					color: #000;
					line-height: 16px;
					padding: 6px 12px;
					margin-right: 8px;
				}
				/*active 类名 根据变量的情况选择添加或者不添加*/
				.all{
					background-color: rgba(0,160,100,0.2);
					&.active{
						background-color: rgba(0,160,100,1);
						color: #FFFFFF;
					}
				}
				.tj{
					background-color: rgba(0,160,220,0.2);
					&.active{
						background-color: rgba(0,160,220,1);
						color: #FFFFFF;
					}
				}
				.tc{
					background-color: rgba(77,85,93,0.2);
					&.active{
						background-color: rgba(77,85,93,1);
						color: #FFFFFF;
					}
				}
			}
			.choose-content {
				font-size: 12px;
				color: rgb(147,153,159);
				line-height: 24px;
				/*此类名根据挑选内容的参考值添加或者不添加*/
				&.active{
					color: lightseagreen;
				}
			}
		}
		.detail-list {
			background-color: #fff;
			padding: 0 18px;
			.item{
				padding: 16px 0;
				.timecontainer{
					color: rgb(147,153,159);
					margin-bottom: 6px;
					display: flex;
					justify-content: space-between;
					.time{
						font-size: 10px;
						line-height: 12px;
					}
					.avatar{
						font-size: 10px;
						line-height: 12px;
						.bg-avatar{
							font-size: 0;
							width: 12px;
							height: 12px;
							overflow: hidden;
							border-radius: 50%;
						}
					}
					
				}
				.content{
					.up{
						color: #00A0DC;
					}
					.down{
						color:#B7BBBF
					}
					.text{
						color: #000;
					}
				}
			}
			
		}
	}
</style>