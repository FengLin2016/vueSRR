<template>
      <div class="showInfo" v-if="showInfo">
            <h1>{{showInfo.title}}</h1>
            <p class="intor">{{showInfo.createTime}}</p>
            <div class="content" v-html="showInfo.content"></div>
      </div>
</template>


<script>
import axios from 'axios'
export default {
	asyncData ({route, store}) {
		return axios.get('http://192.168.1.4:8080/api/list.json').then((res) => {
		    return {
		      showInfo: res.data.data[route.params.id]
		    }
		})
	},
	mounted() {
	}
}
</script>


<style scoped lang="stylus">
.showInfo
	padding-top 30px
	h1
		font-size 18px
		color #333
		text-align center
	.intor
		line-height 40px
		background #f5f5f5
		text-align center
		margin 10px 0
		font-size 12px
		color #666
	.content
		padding 10px
		line-height 30px
		font-size 14px
</style>