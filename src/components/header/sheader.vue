<template>
	<div class="header">
		<!--容器-->
		<div class="content-container">
			<!--左侧的logo-->
			<div class="avatar">
				<img v-bind:src="seller.avatar" alt="" width="64" height="64"/>
			</div>
			<!--右侧内容-->
			<div class="content">
				<!--标题-->
				<div class="title">
					<span class="brand"></span><span class="name">{{seller.name}}</span>
				</div>
				<!--描述-->
				<div class="description">
					<span>{{seller.description}}</span>
					/
					<span>{{seller.deliveryTime}}</span>
					分钟送达
				</div>
				<!--支持-->
				<div class="supports">
					<span class="icon"></span>
					<span>{{seller.supports[0].description}}</span>
				</div>
			</div>
			<!--支持的数目-->
			<div class="supports-count" @click="startShow">
				<span>{{seller.supports.length}}个</span><i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<!--公告-->
		<div class="bulletin" @click="startShow">
			<span class="icon"></span><span class="text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
		</div>
		<!--背景图-->
		<div class="background">
			<img v-bind:src="seller.avatar"/>
		</div>
		<!--调用商家评分组件-->
		<sstart v-show="start" v-if="seller" v-bind:seller="seller"></sstart>
	</div>
</template>

<script>
	import sstart from "@/components/start/SStart";
	export default{
		name:"sheader",
		props:["seller"],
		data:function(){
			return {
				start:false
			}
		},
		methods:{
			startShow:function(){
				this.start = true
			}
		},
		components:{
			sstart
		}
	}
</script>

<style lang="less">
@import url("../../assets/less/mixin.less");
.header{
	background-color: rgba(7,17,27,.5);/*透明背景色*/
	position: relative;
	.content-container{
		position: relative;
		padding: 24px 12px 18px 24px;
		display:flex;
		.avatar{
			margin-right: 16px;
			width: 64px;
			height: 64px;
			img{
				border-radius: 10px;
			}
		}
		.content{
			.title{
				font-size: 16px;
				color: #fff;
				font-weight: bold;
				line-height: 18px;
				margin: 2px 0 8px 0;
				display: flex;
				.brand{
					display: inline-block;
					width: 30px;
					height: 18px;
					.bg-img("../../components/header/brand")
				}
				.name{
					margin-left: 6px;
				}
			}
			.description{
				margin-bottom: 10px;
				font-size: 12px;
				color: #fff;
				font-weight: 200;
				line-height: 12px;
			}
			.supports{
				font-size: 10px;
				color: #FFFFFF;
				font-weight: 200;
				line-height: 12px;
				.icon{
					display: inline-block;
					width: 12px;
					height: 12px;
					.bg-img("../../components/header/decrease_1")
				}
			}
		}
		.supports-count{
			position: absolute;
			right: 12px;
			bottom: 12px;
			height: 24px;
			line-height: 24px;
			border-radius: 8px;
			padding: 0 8px ;
			font-size: 10px;
			color: #FFFFFF;
			font-weight: 200;
			background-color: rgba(0,0,0,0.2);
			i{
				position: relative;
				top: 1px;
			}
		}
	}
	/*<div class="bulletin">
			<span class="icon"></span>
			<span>{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
	</div>*/
	.bulletin{
		height: 28px;
		line-height: 28px;
		padding: 0 12px;
		font-size: 10px;
		color: #FFFFFF;
		font-weight: 200;
		background-color: rgba(7,17,27,0.2);
		
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		position: relative;
		.icon{
			display: inline-block;
			width: 22px;
			height: 12px;
			line-height:28px ;
			.bg-img("../../components/header/bulletin");
			vertical-align: middle;
			margin-right: 4px;
		}
		.text{
			margin-right:4px ;
		}
		i{
			position: absolute;	
			right: 5px;
			top: 12px;
		}
	}
	.background{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -10;
		img{
			width: 100%;
			height: 100%;
			/*控制滤镜:blue() 羽化*/
			filter: blur(5px);
		}
	}
}
</style>