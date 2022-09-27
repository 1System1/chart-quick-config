 
### 存储图形配置JSON文件
1.文件名：
        位置：自动生成文件放至custom文件下，系统文件放至default文件下
        格式：type(第一个字母大写)-字母（随机2位）-数字（随机4位） 例：bar-Aa-123456.json
2.生成方式： 
        custom文件下：配置页面点击保存自动生成文件
        default文件下：默认配置（不给修改）

#### json 格式
```
{

    option:{}, // 图形配置
    keyMap:{}, // 需要传入的字段映射key  
    config:{// 一些未知配置存放
         referenceCount:0, // 引用次数
    }, 
    imgUrl:"", // 保存时截图base64
    title:"",  // 名称
    type:"",   // 图形类型；例如：bar、line
    componentName:"",//组件名称
    isCustom:"",// 自定义:只有自定义文件可以修改
    createUser:"", // 创建人
    createTime:"", // 创建时间
    updateTime:"", // 更新时间 
   
}
```
