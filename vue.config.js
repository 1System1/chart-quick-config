/*
 * @Author: shj shj@cnbisoft.com
 * @Date: 2022-08-29 10:33:22
 * @LastEditors: shj shj@cnbisoft.com
 * @LastEditTime: 2022-12-29 16:13:21
 * @FilePath: \chart-quick-config\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const { defineConfig } = require('@vue/cli-service')
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
module.exports = defineConfig({
     transpileDependencies: true,
     
      configureWebpack() {
        return {
            resolve: {
                alias: {
                    '~': resolve('.'),
                    '@': resolve('src'),
                    
                },
            },
          
        };
    },
 
})
