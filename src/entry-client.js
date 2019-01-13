import { createApp } from './app'

// 客户端特定引导逻辑……

const { app, router} = createApp()

// 这里假定 App.vue 模板中根元素具有 `id="app"`
//所有操作都必须放在路由ready函数里面执行，不然会报警告（客户端和服务端dom不匹配）
router.onReady(() => {
  app.$mount('#app')
})

//这里的执行顺序比上边的还快些！
router.afterEach((to, from) => {
  // 设置 router 的位置
  const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        console.log('客户端路由匹配错误！')
        return false
      }
      console.log('客户端路由变化')
      // 还原数据
      let componentData = window._INITDATA_ || {}
      matchedComponents.map(component => {
        let componented = component._Ctor[0]
        if (componented.options.asyncData) {
          if (componentData[componented.options.__file]) {
            componented.options.data = function () {
              return componentData[componented.options.__file]
            }
          } else {
            // 客户端路由加载的时候就不会去触发服务端渲染
            componented.options.asyncData({store:app.$store, route: router.currentRoute}).then((res) => {
                let datas
                if (componented.options.data) { // 可能data没有被初始化及没有data选项
                  datas = componented.options.data()
                } else {
                  datas = {}
                }
                let obj = Object.assign(datas, res)
                componented.options.data = function () {
                  return obj
                }
              })
          }
        }
      })
})




