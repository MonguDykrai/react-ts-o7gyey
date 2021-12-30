/**
 * options.meta —— 全局化配置图表数据元信息，以字段为单位进行配置，来定义数据的类型和展示方式。在 meta 上的配置将同时影响所有组件的文本信息。 https://g2plot.antv.vision/zh/docs/api/plots/column#meta
 * options.meta.alias —— 字段的别名
 * options.meta.tickInterval —— tick 间隔，只对分类型和时间型适用，优先级高于 tickCount。
 * options.yAxis.line.style.stroke —— Y轴线颜色
 * options.xAxis.line.style.stroke —— X轴线颜色
 * options.barWidthRatio —— 柱宽度
 * options.yAxis.tickLine —— 坐标轴刻度线的配置项，null 表示不展示。
 * options.color —— color | Functon 指定柱的颜色 https://g2plot.antv.vision/zh/docs/api/plots/column#color
 * options.appendPadding —— 图表容器额外的 padding https://g2plot.antv.vision/zh/docs/api/plots/bar#appendpadding
 * options.autoFit —— 图表是否自适应容器宽高 https://g2plot.antv.vision/zh/docs/api/plots/bar#autofit
 * options.yAxis.top —— boolean 是否渲染在画布顶层，防止部分图形中，需要将 axis 显示在图形上面，避免被图形遮挡。 https://g2plot.antv.vision/zh/docs/api/plots/bar#top
 * options.tooltip.domStyles —— 传入各个 dom 的样式 https://g2plot.antv.vision/zh/docs/api/plots/bar#domstyles
 */

import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Bar as AntBar } from '@ant-design/charts';

type Data = { type: string; count: number; content: string };

const htmlFontSize = 100;

const propsData = [
  {
    type: '连续不下说明书',
    count: 25,
    content: '15m10s',
  },
  {
    type: '产品未进纸盒',
    count: 11,
    content: '2h15m3s', // 累积时间
  },
  {
    type: '连续不下盒',
    count: 63,
    content: '5m',
  },
  {
    type: '推杆过载',
    count: 4,
    content: '4m33s',
  },
  {
    type: '压杆抬起',
    count: 6,
    content: '10m2s',
  },
  {
    type: '开盒失败',
    count: 22,
    content: '3h',
  },
  {
    type: '摇手未脱开',
    count: 1,
    content: '10s',
  },
  {
    type: '后续设备停机',
    count: 2,
    content: '7m12s',
  },
  {
    type: '急停',
    count: 1,
    content: '1h',
  },
];

const Bar = () => {
  const [data, setData] = useState([]);
  const [annotations, setAnnotations] = useState<any | []>([]);

  useEffect(() => {
    const tempData = JSON.parse(JSON.stringify(propsData)).splice(0, 5);
    const tempAnnotations = Object.values(tempData).map((d: any) => {
      // console.log(d);
      return {
        type: 'text',
        content: d.content,
        // position: (xScale, yScale) => ({}),
        position: [d.type, d.count], // 类型，标注内容
        style: {
          textAlign: 'left', // 左边怼到柱上
          fill: 'rgba(255, 255, 255, 1)',
          fontSize: 0.12 * htmlFontSize, // 模拟 rem 项目，屏幕缩放重新计算 fontSize
        },
        offsetX: 10, // 往右偏移10像素
      };
    });
    setAnnotations(tempAnnotations);
    setData(tempData);
  }, []);
  const config = {
    autoFit: true, // 图表是否自适应容器宽高
    appendPadding: [0, 60, 0, 0], // 图形容器额外 padding，这里使用是因为图表标注字符太多会导致溢出，因此出于安全的考虑给了 60 像素的右 padding
    data,
    xField: 'count',
    xAxis: {
      label: {
        style: {
          fontSize: 14,
          fill: `rgba(148, 160, 183, 1)`,
          autoEllipsis: true,
        },
      },
      grid: {
        line: {
          style: {
            stroke: `rgba(151, 151, 151, 0.04)`, // X 轴的 grid 网格线条样式
            lineWidth: 1,
          },
        },
      },
    },
    yField: 'type',
    yAxis: {
      top: true, // 是否渲染在画布顶层，防止部分图形中，需要将 axis 显示在图形上面，避免被图形遮挡。
      label: {
        style: {
          fontSize: 14,
          fill: `rgba(148, 160, 183, 1)`,
          autoEllipsis: true,
        },
      },
      tickLine: null, // 坐标轴刻度线的配置项，null 表示不展示。
      line: {
        style: {
          stroke: `rgba(151, 151, 151, 1)`, // Y轴线颜色
        },
      },
    },
    barWidthRatio: 0.44, // 柱宽度
    barStyle: (v: any) => {
      // console.log(v); // { "type": "连续不下说明书", "count": 25 }
      return {
        radius: [5, 5, 0, 0], // 圆角 上左 上右 下右 下左
        // shadowColor: 'red',
        // shadowBlur: 10,
      };
    },
    meta: {
      count: {
        alias: '次数',
        type: 'linear', // 声明度量类型
        // formatter: (text: string, index: number) => {
        //   return text + '次';
        // },
        // tickInterval: 2, // tick 间隔，只对分类型和时间型适用，优先级高于 tickCount。
        tickInterval: 1, // tick 间隔，只对分类型和时间型适用，优先级高于 tickCount。
      },
      type: {
        alias: '类别', // 字段的别名,
        // formatter: (text: string, index: number) => {
        //   return text;
        // },
      },
    },
    animation: false, // 关闭动画
    // colorField: 'type', // 设置后，部分图表使用 seriesField，这里实际可选，给不给都无所谓
    // color: ({ type }) => 'red', // 产品未进纸盒、连续不下盒...
    color: `l(0) 0:rgba(34, 41, 82, 1) 1:rgba(161, 116, 93, 1)`, // 指定柱的颜色
    annotations, // 图表标注
    tooltip: {
      // 覆盖 tooltip 样式
      domStyles: {
        'g2-tooltip': {
          color: 'red',
        },
      },
    },
  };
  return (
    <div style={{ height: '100%' }}>
      <AntBar {...config} />
    </div>
  );
};

export default Bar;
