const lazyComponent = path => {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

export default [
  {
    path: '/',
    name: 'home',
    component: lazyComponent('Home')
  },
  {
    path: '/repositories/:id',
    name: 'repositories',
    component: lazyComponent('repos/Index'),
  },
  {
    path: '/repositories/:id/:repo',
    name: 'repository',
    component: lazyComponent('repos/Commits'),
  },
  {
    path: '*',
    component: lazyComponent('errors/404')
  }
]
