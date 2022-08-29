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
