import { createApp } from './app'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    let componentData = {}
    // 设置服务器端 router 的位置
    router.push(context.url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      Promise.all(matchedComponents.map(component => {
        let componented = component._Ctor[0] // 这里目前是写死的，应该是循环读取的，待验证多组件的时候问题。暂时不知道会有啥副作用？
        if (componented.options.asyncData) {
              return componented.options.asyncData({store:app.$store, route: router.currentRoute}).then((res) => {
                let datas
                if (componented.options.data) { // 可能data没有被初始化及没有data选项
                  datas = componented.options.data()
                } else {
                  datas = {}
                }
                let obj = Object.assign(datas, res)
                componentData[componented.options.__file] = obj
                componented.options.data = function () {
                  return obj
                }
                return componentData
              })
        }
      })).then((data) => {
          resolve({app, data: data[0]})
      }).catch(reject)
      // Promise 应该 resolve 应用程序实例，以便它可以渲染
    }, reject)
  })
}