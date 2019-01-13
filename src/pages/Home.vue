<template>
      <div>
            <ul>

                  <li v-for="(item,index) in listData" @click="goDetail(index)">
                        <img :src="item.newsPhoto" :alt="item.title">
                        <div class="hidden">
                              <h1>{{item.title}}</h1>
                              <div v-html="item.content"></div>
                              <p>{{item.createrName}}    {{item.updateTime}}</p>
                        </div>
                       
                  </li>
            </ul>
      </div>
</template>


<script>
import axios from 'axios'
export default {
      asyncData () {
        return axios.get('http://192.168.1.4:8080/api/list.json').then((res) => {
            return {
              listData: res.data.data
            }
        })
      },
      data () {
        return {
        }
      },
      created () {
      },
      mounted() {
        // alert("1111")
      },
      methods: {
        goDetail (index) {
          this.$router.push('/detail/'+index)
        }
      }
}
</script>


<style scoped lang="stylus">
ul
    overflow hidden
    font-size 0
    padding-top 30px
    li
        overflow hidden
        margin-bottom 20px
        img
            float left
            width 200px
            height 120px
        .hidden
            overflow hidden
            font-size 14px
            line-height 20px
            color #666
            padding-left 15px
            height 120px
            text-overflow ellipsis
            >div
                height 60px
                overflow hidden
            h1
                font-size 16px
                line-height 22px
                color #333
            >p
                font-size 12px
                color #999
                line-height 55px
            
            
</style>
