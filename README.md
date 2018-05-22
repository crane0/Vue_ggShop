### 1.项目源码目录设计

- `api`，与后台交互，发送ajax请求的模块

- `common`，通用资源模块，如fonts/img/stylus

- `components`，非路由组件模块
    - `AlertTip`，提供对话框，配合登陆路由验证信息的返回
    - `CartControl`，添加购物车的按钮
    - `FooterGuide`，底部导航
    - `HeaderTop`，4个导航对应的头部公共样式
    - `ShopCart`，购物车
    - `ShopHeader`，首页，商家详情对应的头部
    - `ShopList`，首页，商家列表
    - `ShowFood`，商家详情，对应的食物，点击显示的大图
    - `Star`，首页，商家列表中，评分显示

- `filters`，自定义过滤器模块
    - 定义了格式化时间的过滤器

- `mock`，模拟数据接口模块

- `pages`，路由组件模块
    - `Login`，登陆页面
    - `Msite`，主页
    - `Order`，订单页面
    - `Profile`，个人中心页面
    - `Search`，搜索页面
    - `Shop`，主页->商家列表->商家详情
        - `ShopGoods`，点餐子路由页面
        - `ShopInfo`，评价子路由页面
        - `ShopRatings`，商家子路由页面

- `router`，路由器模块

- `store`，vuex相关模块

- `App.vue`，应用组件
- `main.js`，入口js

