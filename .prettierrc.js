 
module.exports = {
    printWidth: 160, // 指定代码换行的行长度。单行代码宽度超过指定的最大宽度，将会换行。默认为80
    tabWidth: 4, //指定每个缩进级别的空格数
    useTabs: false, // 使用制表符 (tab) 缩进行而不是空格 (space)
    semi: true, //在语句结尾处自动添加分号,false就是不添加
    singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
    quoteProps: 'as-needed', //仅在需要时在对象属性周围添加引号
    jsxSingleQuote: false, //在JSX中使用单引号而不是双引号
    trailingComma: 'es5', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
    bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
    bracketSameLine: true, //将 > 多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）。
    arrowParens: 'always', //在单个箭头函数参数周围加上括号。
    htmlWhitespaceSensitivity: 'ignore', //指定 HTML 文件的全局空白区域敏感度："css"-遵守CSS display属性的默认值,"strict" - 空格被认为是敏感的，"ignore" - 空格被认为是不敏感的。
    vueIndentScriptAndStyle: true,
    endOfLine: 'lf',
};
