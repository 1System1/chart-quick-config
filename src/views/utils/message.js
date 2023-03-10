import { ElMessage } from 'element-plus';

/**
 * @description 全局Message
 * @param {string|VNode} message 消息文字
 * @param {'success'|'warning'|'info'|'error'} type 主题
 * @param {string} customClass 自定义类名
 * @param {boolean} dangerouslyUseHTMLString 是否将message属性作为HTML片段处理
 */
export function baseMessage(message, type = 'info', customClass = undefined, dangerouslyUseHTMLString = false) {
    // 消息框消失时间
    const messageDuration = 3000;
    ElMessage({
        message,
        type,
        customClass,
        duration: messageDuration,
        dangerouslyUseHTMLString,
        showClose: true,
    });
}
