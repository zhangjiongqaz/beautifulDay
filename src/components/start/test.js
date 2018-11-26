export default {
	name: "SStart",
	props: ["seller"],
	data: function() {
		return {
			on: 0,
			half: 0,
			off: 0,
			classGroup: ["decrease", "discount", "guarantee", "invoice", "special"]
		}
	},
	methods: {
		startHide: function() {
			this.$parent.start = false;
		}
	},
	created: function() {
		//获取评分
		var num = this.seller.score;
		//获取评分的整数位，并设置满星的个数
		this.on = Math.floor(num);
		//判断小数位  并设置 half 即半星的个数
		if((num - this.on) >= 0.5) {
			this.half = 1
		}
		//设置 没有没有星星的个数（灰色的星星）
		this.off = 5 - this.on - this.half;
	}
}

<<!--支持列表-- >
<div class="supports">
	<div class="support-item" v-for="data in seller.supports">
		<span class="icon" v-bind:class="classGroup[data.type]"></span>
		<span>{{data.description}}</span>
	</div>
</div>