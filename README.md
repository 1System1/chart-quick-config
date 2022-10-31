# chart-quick-cofig

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 一、最终想要效果
    传入数据Array、配置Object ==》选择图形配置==》图形展示
### 二、实现
    （1）、 数据集：通过主题、sql、api创建资源生成数据
    （2）、 选择图形配置： 通过图形配置页面保存图形配置
             图形配置：
                        1.选择图形类型==》显示对应的类型图形，点击进入配置页面
                        2.配置页面点击保存自动生成json文件（附带截图base64）
    （3）、 映射key: 资源数据字段 field  对应的图形数据 key 。该field可以是字符串，也可以是对象, 字符串==》数据字段； 对象==》{key:字段,text:"系列名称"}
    （4）、 图形展示调用发布组件


    --chart-quick-config
        -- public
        -- src
            -- components
                -- customComponents // 自定义组件
                    -- index.js 注册成全局组件
            -- option-json
                -- custom 自定义图形配置
                -- default 系统默认图形配置
                -- index.js 获取配置方法
            -- router
                index.js // 路由
            -- store
            -- views
                -- components 
                -- editChart // 图形编辑
                -- keys
                -- previewChart // 图形预览
                -- Index.js // 入口文件    
