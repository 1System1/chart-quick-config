import * as echarts from "echarts";
/**
 * 设置echarts dom元素背景图片
 * dom：dom元素
 * flag：是否设置背景图片
 * size：大小：默认250px
 */
export function setDomBackground  (dom, isEmpty, size = "250px")  {
    if (isEmpty && dom) {
      // 添加样式
      dom.style.backgroundImage = "url(./empty.png)";
      dom.style.backgroundRepeat = "no-repeat"; //设置背景不平铺
      dom.style.backgroundPosition = "center"; //设置背景图的位置
      dom.style.backgroundSize = size;
      let echartsInstance = echarts.getInstanceByDom(dom); // 获取该dom元素上echart实例
      if (echartsInstance) echartsInstance.clear();
    } else if (dom) {
      // 移除样式属性
      dom.style.removeProperty("background-image");
      dom.style.removeProperty("background-repeat-x");
      dom.style.removeProperty("background-repeat-y");
      dom.style.removeProperty("background-position-x");
      dom.style.removeProperty("background-position-y");
      dom.style.removeProperty("background-size");
    }
  }