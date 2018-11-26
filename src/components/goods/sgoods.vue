<template>
	<div class="goods">
		<!--相对body绝对定位，top：176  bottom ：50  overflow：hidden ；开启弹性布局 -->
		<div class="goods-menu" ref="mscroll">
			<!--固定宽度80px  背景色  -->
			<ul class="item-container">
				<!--宽度56px 元素居中  文字居中-->
				<li v-for="(item,index) in goods" v-bind:class="{'menu-item':true,'active':index==currentIndex,'v-menu-item':true}" @click=clickIndex(index)>
					<!--设置内容垂直居中的父标签代码：dispaly：table -->
					<span class="name"> <!--设置内容垂直居中的字标签代码：display：table-cell； vertical-align：middle-->
						<!--根据数据的type值，显示不同的图标-->
						<span v-if="item.type>=0" class="icon" v-bind:class="classGroup[item.type]"></span> {{item.name}}
					<!-- 显示当前项目的名称-->
					</span>
				</li>
			</ul>
		</div>
		<!--右侧商品列表区域-->
		<div class="goods-content" ref="gscroll">
			<!--高度100%  overflow-y：auto    flex：1（兄弟标签固定大小，自己占剩余所有的位置）-->
			<ul>
				<li v-for="good in goods" class="good v-good">
					<h1>{{good.name}}</h1>
					<ol>
						<li v-for="food in good.foods" class="food" @click="Eselectfood(food)">
							<div class="avatar">
								<img v-bind:src="food.icon" alt="" />
							</div>
							<div class="food-content">
								<h2 class="title">{{food.name}}</h2>
								<div class="description">{{food.description}}</div>
								<div class="totle">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="new">￥{{food.price}}</span><span v-if="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
								</div>
							</div>
							<!--使用控制组件
								接受子组件自动事件的触发，调用自己的事件处理函数
							-->
							<carcontrol v-bind:food="food" v-on:balladd="getball"></carcontrol>
						</li>
					</ol>
				</li>
			</ul>
		</div>
		<!--调用购物车组件   将选中的商品列表及商家信息传入子组件-->
		<shopcart v-bind:selectfoods="selectfoods" v-bind:seller="seller" ref="shopcart"></shopcart>
		<!--调用购物车列表组件-->
		<carlists v-bind:selectfoods="selectfoods" v-show="carlistshow" ref="carlists"></carlists>
		<!--调用食品详情页组件-->
		<food v-bind:selectfood="selectfood" ref="food"></food>
	</div>
</template>

<script>
	import betterScroll from "better-scroll";
	import shopcart from "@/components/shopcart/shopcart";
	import carcontrol from "@/components/carcontrol/carcontrol";
	import carlists from "@/components/carlists/carlists";
	import food from "@/components/food/food";
	import data from "@/assets/data/data.json";
	
	export default {
		name: "sgoods",
		props:["seller"],
		data: function() {
			return {
				goods: [], //定义接受到的数据
				classGroup: ["decrease", "discount", "special", "guarantee", "invoice"], //定义类名数组
				listHeight: [],//商品区li的高度 数组
				currentIndex: 0, //判断获取的商品区滚动到哪个范围
				carlistshow:false,
				//食品列表的数据
				selectfood:{},
			}
		},
		watch:{
			selectfoods:function(newvalue){
				if(newvalue.length<1){
					this.carlistshow = false
				}
			}
		},
		computed:{
			//选出所有 count大于0 的商品
			selectfoods(){
				var select = [];
				this.goods.forEach(function(good){
					good.foods.forEach(function(food){
						if(food.count>0){
							select.push(food);
						}
					})
				})
				return select;
			}
		},
		methods: {
//			点击选择某个商品
			"Eselectfood"(food){
				this.selectfood = food;
				this.$refs.food.isshow = true;
			},
			
			//betterscroll 初始化标签 并给标签添加事件处理函数
			_initScroll() {
				//使用betterscroll插件初始化标签并获取对象
				this.mscroll = new betterScroll(this.$refs.mscroll, {
					click: true,
					probeType: 3
				});
				this.gscroll = new betterScroll(this.$refs.gscroll, {
					click: true,
					probeType: 3
				}); //使用betterscroll插件初始化标签并获取对象
				//给betterscrll对象（可以理解dom对象）添加事件处理
				this.gscroll.on("scroll", (pos) => {
					//获取滚动距离的绝对值
					var currentHeight = pos.y
					if(currentHeight<=0){
						currentHeight = - currentHeight;
					}
					 currentHeight ++;
					for(var i = 0; i < this.listHeight.length; i++) {
						var preHeight = this.listHeight[i];
						var nextHeight = this.listHeight[i + 1]
						if(currentHeight >= preHeight && currentHeight < nextHeight) {
							this.currentIndex = i;
							break;
						}
					}
					//设置左侧菜单滚动到 高亮的 选项
					var currentTag = this.$refs.mscroll.getElementsByClassName("v-menu-item")[this.currentIndex];
					this.mscroll.scrollToElement(currentTag, 300); //betterscrll绑定的标签滚动到指定的字标签位置
				})

			},
			//获取 产品列表 每一个项目的高度
			_computedHeight() {
				var height = 0;
				this.listHeight.push(height);
				//获取所有的li 循环li
				//document 调用的找标签的方法，有些只能document调用   有些所有标签都能使用——获取字标签
				var lists = this.$refs.gscroll.getElementsByClassName("v-good");
				//循环li 获取滚动到某个li所需距离
				for(var i = 0; i < lists.length; i++) {
					//循环li 累加 高度
					var liHeight = lists[i].offsetHeight;
					height = height + liHeight;
					this.listHeight.push(height);
				}
			},
			clickIndex(index){
				//点的是第几个已经知道了---获取右侧所有的li
				var lists = this.$refs.gscroll.getElementsByClassName("v-good");
				this.gscroll.scrollToElement(lists[index],300)
			},
			//接受按钮并调用购物车的方法
			getball(target){
				//使用子链 直接获取字标签（子组件） 使用自子组件调用子组件的方法
//				this.$parent
				this.$refs.shopcart.ballchange(target);
			}
		},
		//获取数据  及调用函数
		created: function() {
			//在组件创建过程中请求数据，并将请求到的数据赋值给定义的变量
			/*
			this.$http.get("http://127.0.0.1:3000/api/goods").then((response) => {
				this.goods = response.body.data
				//保证拿到数据之后,进行DOM操作---可能会出问题---保证DOM生成以后再调用betterscroll
				this.$nextTick(() => {
					//这里边就代表获取data成功，及DOM渲染成功
					this._initScroll();
					this._computedHeight();
				})
			})
			*/
			this.goods = data.goods;
			this.$nextTick(() => {
					//这里边就代表获取data成功，及DOM渲染成功
					this._initScroll();
					this._computedHeight();
			})
		},
		components:{
			shopcart,
			carcontrol,
			carlists,
			food
		}
	}
</script>

<style lang="less">
	@import "../../assets/less/mixin.less";
	.goods {
		position: absolute;
		top: 174px;
		bottom: 50px;
		width: 100%;
		display: flex;
		overflow: hidden;
		.goods-menu {
			background-color: #F3F5F7;
			width: 80px;
			/*overflow-y:auto;*/
			.item-container {
				.menu-item {
					height: 54px;
					width: 56px;
					font-size: 12px;
					color: #3A4148;
					font-weight: 200;
					line-height: 14px;
					text-align: center;
					margin: 0 auto;
					display: table;
					&.active {
						background-color: #fff;
						color: red;
						font-size: 14px;
					}
					.border-1px;
					.name {
						display: table-cell;
						vertical-align: middle;
						.icon {
							display: inline-block;
							width: 12px;
							height: 12px;
							&.decrease {
								.bg-img("../../components/goods/decrease_3");
							}
							&.discount {
								.bg-img("../../components/goods/discount_3");
							}
							&.guarantee {
								.bg-img("../../components/goods/guarantee_3");
							}
							&.invoice {
								.bg-img("../../components/goods/invoice_3");
							}
							&.special {
								.bg-img("../../components/goods/special_3");
							}
						}
					}
				}
			}
		}
		.goods-content {
			height: 100%;
			/*overflow-y: auto;*/
			flex: 1;
			.good {
				h1 {
					border-left: 2px solid #d9dde1;
					font-size: 12px;
					color: rgb(147, 153, 159);
					font-weight: 700;
					line-height: 30px;
					height: 30px;
					background-color: #f3f5f7;
					padding-left: 14px;
				}
				li.food {
					display: flex;
					margin: 18px 18px 0;
					padding-bottom: 18px;
					position: relative;
					.border-1px;
					.avatar {
						width: 67px;
						height: 67px;
						margin-right: 10px;
						img {
							width: 100%;
							height: 100%;
							border-radius: 5px;
						}
					}
					.food-content {
						padding-top: 2px;
						.title {
							font-size: 14px;
							color: rgb(7, 17, 27);
							line-height: 14px;
							margin-bottom: 8px;
						}
						.description {
							font-size: 10px;
							color: rgb(147, 153, 159);
							line-height: 10px;
							margin-bottom: 8px;
						}
						.totle {
							font-size: 10px;
							color: rgb(147, 153, 159);
							line-height: 10px;
						}
						.price {
							.new {
								font-size: 14px;
								color: #f01414;
								font-weight: 700;
								line-height: 24px;
								margin-right: 4px;
								vertical-align: top;
							}
							.old {
								font-size: 10px;
								color: rgb(147, 153, 159);
								font-weight: 700;
								line-height: 24px;
								font-style: italic;
								text-decoration: line-through;
							}
						}
					}
				}
			}
		}
	}
</style>