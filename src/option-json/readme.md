<!--
 * @Author: shj shj@cnbisoft.com
 * @Date: 2022-08-29 13:37:28
 * @LastEditors: shj shj@cnbisoft.com
 * @LastEditTime: 2023-01-03 11:06:42
 * @FilePath: \chart-quick-config\src\option-json\readme.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

### 存储图形配置 JSON 文件

1.文件名：
位置：自动生成文件放至 custom 文件下，系统文件放至 default 文件下
格式：type(第一个字母大写)-字母（随机 2 位）-数字（随机 4 位） 例：bar-Aa-123456.json 2.生成方式：
custom 文件下：配置页面点击保存自动生成文件
default 文件下：默认配置（不给修改）

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

### 基础柱状图

bar-basis
