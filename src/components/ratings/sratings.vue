<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-container">
			<!--头部区域-->
			<div class="ratings-header">
				<!--综合-评分-->
				<div class="score-zh">
					<div class="score-num">{{seller.score}}</div>
					<div class="text">综合评分</div>
					<div class="rank">
						高于周围商家{{seller.rankRate}}%
					</div>
				</div>
				<!--评分-细则-->
				<div class="score-xz">
					<!--服务评分-->
					<div class="score-fw">
						<span class="des">服务态度</span>
						<starts v-bind:score="seller.serviceScore"></starts>
					</div>
					<!--商品评分-->
					<div class="score-sp">
						<span class="des">商品评价</span>
						<starts v-bind:score="seller.foodScore"></starts>
					</div>
					<!--送达时间-->
					<div class="deliveryTime">
						<span class="des">送达时间</span>
						<span class="text">{{seller.deliveryTime}}</span>
					</div>
				</div>
			</div>
			<!--评论选择-->
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
					<div class="choose">
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
	import data from "@/assets/data/data.json";
	import starts from "@/components/starts/starts";
	import betterScroll from "better-scroll";
	export default {
		name: "sratings",
		props: ["seller"],
		data() {
			return {
				ratings: [],
				hasconent:false,//---挑选 内容的参考值
				choose:2,//2,0,1 ---挑选类型的参考值
			}
		},
		methods: {
			//改变挑选内容的 参考值
			Ehasconent(){
				this.hasconent = !this.hasconent
			},
			//改变 挑选类型的 参考值
			Echoose(num){
				this.choose = num;
			},
		},
		computed:{
			//先根据内容挑选
			allratings(){
				if(this.hasconent==false){
					return this.ratings;
				}else{
					var list = [];
					this.ratings.forEach((rating)=>{
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
		components: {
			starts
		},
		created() {
			//ajax 请求数据
			//			this.$http.get("http://127.0.0.1:3000/api/ratings").then((response)=>{
			//				this.ratings = response.body.data;
			//			})
			this.ratings = data.ratings;
		},
		mounted(){
			//在组件创建过程中 给组件添加 滚动效果
			this.$nextTick(()=>{
				if(!this.bs){
					this.bs = new betterScroll(this.$refs.ratings);
				}else{
					this.bs.refresh();
				}
				
			})
		},
	}
</script>

<style lang="less">
	@import url("../../assets/less/mixin.less");
	.ratings {
		.border-1px;
		border-top-style:solid;
		position: absolute;
		top: 174px;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		background-color: #f3f5f7;
		.ratings-header {
			background-color: #fff;
			padding: 18px 24px;
			margin-bottom: 16px;
			display: flex;
			.border-1px;
			.score-zh {
				/*width: 275px;*/
				padding-right:12px;
				.border-1px;
				margin-right: 12px;
				border-bottom: none;
				border-right-style: solid;
				.score-num {
					font-size: 24px;
					color: #ffc068;
					line-height: 28px;
					margin-bottom: 6px;
					text-align: center;
				}
				.text {
					text-align: center;
					font-size: 12px;
					color: rgb(7, 17, 27);
					line-height: 12px;
					margin-bottom: 8px;
				}
				.rank {
					font-size: 10px;
					text-align: center;
					color: rgba(7, 17, 27, 0.3);
					line-height: 10px;
					margin-bottom: 6px;
				}
			}
			.score-xz {
				flex: 1;
				.des {
					margin-right: 6px;
					color: rgb(7, 17, 27);
					font-size: 12px;
					line-height: 18px;
				}
				.starts {
					margin-bottom: 0;
					padding-top: 5px;
					span {
						margin:0 5px;
						width: 12px;
						height: 12px;
					}
				}
				.score-fw {
					margin-bottom: 8px;
					display: flex;
				}
			}
			.score-sp {
				margin-bottom: 8px;
				display: flex;
			}
			.deliveryTime {
				.text {
					font-size: 12px;
					color: 147, 153, 159;
					line-height: 18px;
				}
			}
		}
		/*评论选择及评论列表*/
		.detail-rating {
			background-color: #fff;
			padding: 18px;
			.border-1px;
			border-top-style: solid;
			.title {
				font-size: 14px;
				color: rgb(7, 17, 27);
				line-height: 14px;
				margin-bottom: 18px;
			}
			.choose-rating {
				display: flex;
				justify-content: flex-start;
				padding-bottom: 18px;
				margin-bottom: 12px;
				.border-1px;
				span {
					font-size: 12px;
					color: #000;
					line-height: 16px;
					padding: 6px 12px;
					margin-right: 8px;
				}
				/*active 类名 根据变量的情况选择添加或者不添加*/
				.all {
					background-color: rgba(0, 160, 100, 0.2);
					&.active {
						background-color: rgba(0, 160, 100, 1);
						color: #FFFFFF;
					}
				}
				.tj {
					background-color: rgba(0, 160, 220, 0.2);
					&.active {
						background-color: rgba(0, 160, 220, 1);
						color: #FFFFFF;
					}
				}
				.tc {
					background-color: rgba(77, 85, 93, 0.2);
					&.active {
						background-color: rgba(77, 85, 93, 1);
						color: #FFFFFF;
					}
				}
			}
			.choose-content {
				font-size: 12px;
				color: rgb(147, 153, 159);
				line-height: 24px;
				/*此类名根据挑选内容的参考值添加或者不添加*/
				&.active {
					color: lightseagreen;
				}
			}
		}
		.detail-list {
			background-color: #fff;
			padding: 0 18px;
			.item {
				padding: 16px 0;
				.timecontainer {
					color: rgb(147, 153, 159);
					margin-bottom: 6px;
					display: flex;
					justify-content: space-between;
					.time {
						font-size: 10px;
						line-height: 12px;
					}
					.avatar {
						font-size: 10px;
						line-height: 12px;
						.bg-avatar {
							font-size: 0;
							width: 12px;
							height: 12px;
							overflow: hidden;
							border-radius: 50%;
						}
					}
				}
				.content {
					.up {
						color: #00A0DC;
					}
					.down {
						color: #B7BBBF
					}
					.text {
						color: #000;
					}
				}
			}
		}
	}
</style>