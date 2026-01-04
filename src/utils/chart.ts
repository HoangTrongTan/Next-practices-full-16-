import { Chart, ChartArea, LegendItem } from "chart.js";
import {
  ActiveElement,
  Align,
  ChartEvent,
  LayoutPosition,
  ChartOptions,
  Tick,
} from "chart.js";

export type IArrowItem = {
  label: string;
  start: number;
  end: number;
  left: boolean;
  right: boolean;
  lineVertical: boolean;
  background?: string;
  startPixel?: number;
  endPixel?: number;
};

export const CHART_BASE_CONFIG: IChartConfig = {
    titleOptions: {
      display: false,
      text: "",
    },
    subTitleOptions: {
      display: false,
      text: "",
    },
    layout: {
      padding: {
        top: 30,
        right: 0,
        left: 0,
        bottom: 0,
      },
    },
    xScale: {
      display: true,
      type: "linear",
      isCallBack: false,
      title: {
        display: false,
      },
    },
    yScale: {
      display: true,
      isDefault: false,
      type: "linear",
      width: 150,
      fixMax: true,
      isCallBack: false,
      title: {
        display: false,
      },
    },
    legend: {
      display: true,
      position: "right",
      align: "start",
    },
    callback: {
      pan: (range: { min: number; max: number }) => {
        return range;
      },
      animationCompleted: () => {
        // if (setIsChartRenderCompleted) {
        //   setIsChartRenderCompleted(true);
        // }
      },
      ticksXaxis: (tickValue): string => {
        return Number(tickValue).toLocaleString();
      },
      ticksYaxis: (tickValue): string => {
        return Number(tickValue).toLocaleString();
      },
    },
  };

const defaultChartConfig: IChartConfig = {
  ...CHART_BASE_CONFIG,
  titleOptions: {
    display: true,
    text: "",
  },
  layout: {
    padding: {
      ...CHART_BASE_CONFIG.layout.padding,
      top: 5,
      right: 5,
    },
  },
  legend: {
    display: false,
    position: "top",
  },
  xScale: {
    ...CHART_BASE_CONFIG.xScale,
    title: {
      display: false,
    },
    stepSize: 2,
    isCallBack: true,
  },
  yScale: {
    ...CHART_BASE_CONFIG.yScale,
    title: {
      display: false,
    },
    min: 20,
    isCallBack: true,
    beginAtZero: true,
  },
  callback: {
    ...CHART_BASE_CONFIG.callback,
    ticksXaxis: (tickValue: string | number, index: number, ticks: Tick[]) => {
      if (Number(tickValue) % 10 === 0 || index === ticks.length - 1) {
        return `${tickValue}`;
      }
      return "";
    },
    ticksYaxis: (_: string | number, index: number, ticks: Tick[]) => {
      // const initialDecimalPlaces = 1;
      // const tickValues = ticks.map((tick) => String(tick.value));
      // const formattedValues = refineValuesToUnique(tickValues, initialDecimalPlaces);
      // return formattedValues[index];
      return index.toString();
    },
    animationCompleted: () => {
      // if (setIsChartRenderCompleted) {
      //   handleSetIsComplete();
      // }
    },
  },
};

type TRBL = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

export type IChartConfig = {
  titleOptions: {
    text: string;
    display: boolean;
  };
  subTitleOptions: {
    text: string;
    display: boolean;
  };
  layout: {
    padding: TRBL;
  };
  xScale: {
    display: boolean;
    unit?: string;
    type: "logarithmic" | "linear";
    getTickLabel?: (tickValue: number) => string | string[];
    max?: number;
    min?: number;
    length?: number;
    stepSize?: number;
    isCallBack?: boolean;
    title: {
      display: boolean;
      text?: string;
    };
  };
  yScale: {
    display: boolean;
    isDefault?: boolean;
    type: "linear" | "logarithmic";
    width: number;
    max?: number;
    min?: number;
    fixMax: boolean;
    isCallBack?: boolean;
    stepSize?: number;
    title: {
      display: boolean;
      text?: string;
    };
    beginAtZero?: boolean;
  };
  legend?: {
    display: boolean;
    position?: LayoutPosition;
    align?: Align;
    generateLabels?: (chart: Chart) => LegendItem[];
  };
  callback: {
    pan: (range: { min: number; max: number }) => void;
    hover?: (event: ChartEvent, elements: ActiveElement[]) => void;
    animationCompleted?: () => void;
    ticksYaxis: (
      tickValue: string | number,
      index: number,
      ticks: Tick[]
    ) => string;
    ticksXaxis: (
      tickValue: string | number,
      index: number,
      ticks: Tick[]
    ) => string;
  };
};

export const calculateChartOptions = (config: IChartConfig): ChartOptions => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scaleX: any = {
    type: config.xScale.type,
    max: config.xScale.max,
    min: config.xScale.min,
    ticks: {
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: true,
      major: {
        enabled: true,
      },
      autoSkip: false,
      minRotation: 0,
      maxRotation: 0,
      showLabelBackdrop: false,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2,
      color: "#666",
      stepSize: config.xScale.stepSize,
      callback: (tickValue: number | string, index: number, ticks: Tick[]) => {
        if (config.xScale.isCallBack) {
          return config.callback.ticksXaxis(tickValue, index, ticks);
        }
        return tickValue;
      },
    },
    beginAtZero: true,
    display: true,
    offset: false,
    reverse: false,
    bounds: "ticks",
    clip: true,
    grid: {
      display: true,
      lineWidth: 1,
      drawOnChartArea: true,
      drawTicks: false,
      // tickLength: 10,
      offset: false,
      color: "#D4D4D4",
    },
    border: {
      display: true,
      dash: [],
      dashOffset: 0,
      width: 2,
      color: "#000000",
    },
    title: {
      display: config.xScale.title.display,
      text: config.xScale.title.text,
      align: "center",
      color: "#000000",
      font: {
        size: 14,
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scaleY: any = {
    type: config.yScale.type,
    isDefault: !!config.yScale.isDefault,
    display: true,
    position: "left",
    offset: false,
    reverse: false,
    beginAtZero: !!config.yScale.beginAtZero,
    bounds: "ticks",
    clip: true,
    suggestedMax: config.yScale.max,
    max: config.yScale.max,
    min: config.yScale.min,
    grid: {
      display: true,
      lineWidth: 1,
      drawOnChartArea: true,
      drawTicks: false,
      tickLength: 10,
      offset: false,
      color: "rgba(0,0,0,0.1)",
    },
    ticks: {
      major: {
        enabled: false,
      },
      stepSize: config.yScale.stepSize,
      minRotation: 0,
      maxRotation: 0,
      mirror: false,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 10,
      display: true,
      autoSkip: true,
      autoSkipPadding: 3,
      labelOffset: 0,
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: false,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2,
      color: "#666",
      callback: (tickValue: number | string, index: number, ticks: Tick[]) => {
        if (config.yScale.isCallBack) {
          return config.callback.ticksYaxis(tickValue, index, ticks);
        }
        return tickValue;
      },
    },
    border: {
      display: true,
      width: 2,
      color: "#000000",
      dash: [],
      dashOffset: 0,
    },
    title: {
      display: config.yScale.title.display,
      text: config.yScale.title.text,
      align: "center",
      color: "#444",
      font: {
        size: 14,
      },
    },
  };

  return {
    responsive: false,
    maintainAspectRatio: false,
    clip: false,
    transitions: {
      zoom: {
        animation: {
          duration: 0,
        },
      },
    },
    layout: {
      padding: {
        top: config.layout.padding.top ?? 0,
        right: config.layout.padding.right ?? 0,
        left: config.layout.padding.left ?? 0,
        bottom: config.layout.padding.bottom ?? 0,
      },
    },
    animation: {
      duration: 0,
      easing: "linear",
      onComplete: (chart): void => {
        if (
          config.callback.animationCompleted &&
          chart.chart.data.datasets.length
        ) {
          config.callback.animationCompleted();
        }
      },
    },
    onHover: (event: ChartEvent, elements: ActiveElement[]): void => {
      if (config.callback.hover) {
        config.callback.hover(event, elements);
      }
    },
    events: [],
    scales: {
      y: {
        ...scaleY,
      },
      x: {
        ...scaleX,
      },
    },
    plugins: {
      title: {
        display: config.titleOptions.display,
        text: config.titleOptions.text,
        align: "center",
        color: "rgb(71, 75, 85)",
        font: {
          family: "Noto Sans JP",
          size: 14,
          weight: "normal",
        },
      },
      subtitle: {
        display: config.subTitleOptions.display,
        text: config.subTitleOptions.text,
        color: "#474b55",
        align: "start",
        font: {
          family: "Noto Sans JP",
          size: 14,
          weight: 500,
        },
        padding: {
          bottom: 10,
        },
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        display: config.legend?.display,
        position: config.legend?.position ?? "right",
        align: config.legend?.align ?? "start",
        onClick: (): void => {
          return;
        },
        labels: {
          boxWidth: 50,
          boxHeight: 10,
          color: "rgba(0, 0, 0, 0.88)",
          generateLabels: (chart): LegendItem[] => {
            if (!config.legend?.display) {
              return [];
            }

            return chart.data.datasets
              .filter((dataset) => !!dataset.label)
              .map((dataset, i) => {
                return {
                  text: dataset.label,
                  fillStyle: dataset.borderColor || "rgba(0, 0, 0, 0)",
                  strokeStyle: dataset.borderColor || "rgba(0, 0, 0, 0)",
                  fontColor: "rgba(0, 0, 0, 0.88)",
                  lineWidth: 1,
                  hidden: false,
                  datasetIndex: i,
                } as LegendItem;
              });
          },
        },
      },
    },
  };
};

// DataSet
// {
//           label: '',
//           type: 'line',
//           data: calculateLineData(),
//           stack: '',
//           borderColor: 'red',
//           borderWidth: 2,
//           pointBorderWidth: 0,
//           pointStyle: false,
//           fill: false,
//         },
//  const calculateChartDataSet = (
//     chartScale: SCALE_TYPE,
//     valveType: string,
//     flowRateCondition: IFlowRateCondition,
//     arrowData: IArrowItem[],
//     maxX: number,
//     rawData?: RawChartData,
//   ): IChartData => {
//     if (!rawData) {
//       return {
//         labels: DEFAULT_FLOW_CHART_LABELS,
//         datasets: [
//           {
//             label: '',
//             data: DEFAULT_CHART_DATA,
//             borderColor: 'blue',
//             borderWidth: 0,
//             pointBorderWidth: 0,
//             pointStyle: false,
//             fill: false,
//           },
//         ],
//       };
//     }
// export const ArrowPlugins: Plugin = {
//   id: 'ArrowPlugins',
//   afterDatasetsDraw(chart, args, options) {
//     const arrowConfigOtions = JSON.parse(JSON.stringify(options)) as IDataArrowOptions;
//     const parseArrowConfig = arrowConfigOtions.arrowConfig;
//     const { ctx } = chart;

//     const chartArea = chart.chartArea;

//     if (!chartArea) {
//       return;
//     }

//     if (Array.isArray(parseArrowConfig)) {
//       if (parseArrowConfig.length > 1) {
//         const dataPointsWithPixels = convertStartEndToPixels(chart, parseArrowConfig);
//         dataPointsWithPixels.forEach((item: IArrowItem, i: number) => {
//           const newItem =
//             parseArrowConfig.length - 1 === i ? { ...item, lineVertical: false } : { ...item, lineVertical: true };
//           drawArrow(ctx, newItem, chartArea, arrowConfigOtions.chartScale);
//         });
//       }
//     }
//   },
// };
// Bạn đã gửi
// ChartJS.register(
//   LineController,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   SubTitle,
//   Tooltip,
//   Legend,
//   FlowPoint,
//   CategoryScale,
// );
import { BubbleController } from "chart.js";

export class FlowPoint extends BubbleController {
  draw(): void {
    super.draw();

    const meta = this.getMeta();
    const pt0 = meta.data[0];
    const label = meta.label;

    const { x, y } = pt0.getProps(["x", "y"]);
    const r = 15;

    const ctx = this.chart.ctx;
    ctx.lineWidth = 1;
    ctx.beginPath();
    // draw circle
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.stroke();

    const crossLength = r - 5;
    ctx.font = "bold 12px Noto Sans JP";
    ctx.fillText(label, x - r, y - r - 10);
    ctx.moveTo(x - crossLength, y);
    ctx.lineTo(x + crossLength, y);
    ctx.moveTo(x, y - crossLength);
    ctx.lineTo(x, y + crossLength);
    ctx.stroke();
  }
}
FlowPoint.id = "flowPoint";
FlowPoint.defaults = BubbleController.defaults;
