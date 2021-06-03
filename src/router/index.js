import Vue from 'vue'
import store from '~/store'
import Meta from 'vue-meta'
import routes from './routes'
import Router from 'vue-router'
import {sync} from 'vuex-router-sync'

Vue.use(Meta)
Vue.use(Router)

const globalMiddleware = ['locale']


const resolveMiddleware = (requireContext) => {
  return requireContext.keys()
    .map(file =>
      [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((guards, [name, guard]) => ({...guards, [name]: guard.default}), {})
}


const routeMiddleware = resolveMiddleware(
  require.context('~/middleware', false, /.*\.js$/)
)

const createRouter = () => {
  const router = new Router({
    mode: 'history',
    routes
  })

  router.beforeEach(beforeEach)
  router.afterEach(afterEach)

  return router
}


const beforeEach = async (to, from, next) => {
  let components = []

  try {
    components = await resolveComponents(
      router.getMatchedComponents({...to})
    )
  } catch (error) {
    if (/^Loading( CSS)? chunk (\d)+ failed\./.test(error.message)) {
      window.location.reload(true)
      return
    }
  }

  if (components.length === 0) {
    return next()
  }

  if (components[components.length - 1].loading !== false) {
    router.app.$nextTick(() => router.app.$loading.start())
  }

  const middleware = getMiddleware(components)

  callMiddleware(middleware, to, from, (...args) => {
    if (args.length === 0) {
      router.app.setLayout(components[0].layout || '')
    }
    next(...args)
  })
}


const afterEach = async (to, from, next) => {
  await router.app.$nextTick()

  router.app.$loading.finish()
}

const callMiddleware = (middleware, to, from, next) => {
  const stack = middleware.reverse()
  const _next = (...args) => {
    if (args.length > 0 || stack.length === 0) {
      if (args.length > 0) {
        router.app.$loading.finish()
      }
      return next(...args)
    }

    const {middleware, params} = parseMiddleware(stack.pop())

    if (typeof middleware === 'function') {
      middleware(to, from, _next, params)
    } else if (routeMiddleware[middleware]) {
      routeMiddleware[middleware](to, from, _next, params)
    } else {
      throw Error(`Undefined middleware [${middleware}]`)
    }
  }
  _next()
}

const parseMiddleware = middleware => {
  if (typeof middleware === 'function') {
    return {middleware}
  }
  const [name, params] = middleware.split(':')
  return {middleware: name, params}
}

const resolveComponents = components => {
  return Promise.all(components.map(component => {
    return typeof component === 'function' ? component() : component
  }))
}

const getMiddleware = components => {
  const middleware = [...globalMiddleware]
  components.filter(c => c.middleware).forEach(component => {
    if (Array.isArray(component.middleware)) {
      middleware.push(...component.middleware)
    } else {
      middleware.push(component.middleware)
    }
  })

  return middleware
}

const router = createRouter()

sync(store, router)

export default router
