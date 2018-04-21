//字符串参数是chunk name，不同chunk独立加载。
const Page0 = r => require.ensure([], () => r(require('../pages/overview/Page0')), 'Page0') 
const Page1 = r => require.ensure([], () => r(require('../pages/overview/Page1')), 'Page1')
const Page2 = r => require.ensure([], () => r(require('../pages/overview/Page2')), 'Page2')
const Page3 = r => require.ensure([], () => r(require('../pages/overview/Page3')), 'Page3')
const Page4 = r => require.ensure([], () => r(require('../pages/overview/Page4')), 'Page4')
const Page5 = r => require.ensure([], () => r(require('../pages/overview/Page5')), 'Page5')
const Service = r => require.ensure([], () => r(require('../pages/Service')), 'Service')
const About = r => require.ensure([], () => r(require('../pages/About')), 'About')
const Home = r => require.ensure([], () => r(require('../pages/Home')), 'Home')

//移除每个字段首个字符中可能存在的slash——存在于顶层路由中
function removeSlash(path){
    if(path[0]=='/'){
        return path.slice(1)
    }
    return path
}

//遍历树，把每个结点的字段和名称作为一个kv pair存起来。
function getPageTitlesOf(nodes){
    let titles=new Object()
    for(let i=0;i<nodes.length;i++){
        titles[removeSlash(nodes[i].path)]=nodes[i].name
        if("children" in nodes[i]){
            let subtitles=getPageTitlesOf(nodes[i].children)
            titles= Object.assign(titles, subtitles) 
        }
    }
    return titles
}

function getAllRoutesOf(nodes, base_route){
    let routes=new Array()
    for(let i=0;i<nodes.length;i++){
        let node=nodes[i]
        let new_route=base_route+"/"+removeSlash(node.path)
        routes.push(new_route)
        if("children" in node){
            let subroutes=getAllRoutesOf(node.children, new_route)
            routes=routes.concat(subroutes)
        }
    }
    return routes
}

export default {
    // 得到完整路由地址的数组，比如pg1实质上应该是/overview/pg1
    getAllRoutes () {
        let routes = getAllRoutesOf(this.routes, '')
        return routes
    },
    // 遍历树，得到所有path_seg:name key value pairs。
    getPageTitles(){
        let titles = getPageTitlesOf(this.routes)
        return titles
    },
    routes: [
        {
          name: '首页',
          path: '/',   //注意，顶层路由必须加slash
          component: Home
        },
        {
          name: '总览',
          path: '/overview',  //注意，顶层路由必须加slash
          component: Page0,
          children: [
            {
                name: '第1页',
                path: 'pg1', 
                component: Page1,
            }, 
            {
                name: '第2页',
                path: 'pg2', 
                component: Page2,
            }, 
            {
                name: '第3页',                
                path: 'pg3', 
                component: Page3,
            }, 
            {
                name: '第4页',                
                path: 'pg4', 
                component: Page4,
            }, 
            {
                name: '第5页',
                path: 'pg5', 
                component: Page5,
            }
          ]
        },
        {
            name: '服务',
            path: '/service',
            component: Service
        },
        {
            name: '关于',
            path: '/about',
            component: About
        }
      ]
}