<template>
	<div class="carcontrol">
		<!--减号-->
		<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
			<div class="reduce" v-show="food.count>0" @click.stop="reduce">
			<span class="icon-remove_circle_outline"></span>
		</div>
		</transition>
		
		<!--数字-->
		<transition enter-active-class="animated fadeInRight" eave-active-class="animated fadeOutLeft">
			<div class="count" v-show="food.count>0">
			{{food.count}}
		</div>
		</transition>
		
		<!--加号-->	
		<div class="add" @click.stop="add">
			<span class="icon-add_circle"></span>
		</div>
	</div>
</template>

<script>
	export default {
		name:"carcontrol",
		props:["food"],
		methods:{
			//减号的逻辑
			reduce(){
				if(this.food.count>0){
					this.food.count --;
				}
			},
			//加号的逻辑
			
			add(e){
				if(this.food.count>0){
					this.food.count++;
				}else{
					this.$set(this.food,"count",1);
				}
				//获取点击的元素
				var target = e.target
				//触发自定义事件（设置自定义事件） 并且将点击的元素传送出去
//				console.log("触发点击事件，增加")
				this.$emit("balladd",target);
			}
		}
	}
</script>

<style lang="less">
	.carcontrol{
		position: absolute;
		right: 0;
		bottom: 10px;
		display: flex;
		.reduce{
			width: 24px;
			height: 24px;
			line-height: 24px;
			text-align: center;
			span{
				color: #00A0DC;
				background-color: #fff;
			}
		}
		.count{
			line-height: 24px;
			text-align: center;
			width: 24px;
			height: 24px;
		}
		.add{
			width: 24px;
			height: 24px;
			line-height: 24px;
			text-align: center;
			span{
				color: #00A0DC;
				background-color: #fff;
			}
		}
	}
</style>