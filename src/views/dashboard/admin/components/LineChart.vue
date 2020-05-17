<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { list } from '@/api/order'
import { check } from '@/utils/check-data'
import moment from 'moment'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      date: [
        moment().subtract(6, 'days'),
        moment().subtract(5, 'days'),
        moment().subtract(4, 'days'),
        moment().subtract(3, 'days'),
        moment().subtract(2, 'days'),
        moment().subtract(1, 'days'),
        moment()
      ],
      orderData: [0, 0, 0, 0, 0, 0, 0]
    }
  },
  computed: {
    week() {
      return this.date.map(obj => {
        const val = moment(obj).format('d')
        return val === '0' ? '星期天'
          : val === '1' ? '星期一'
            : val === '2' ? '星期二'
              : val === '3' ? '星期三'
                : val === '4' ? '星期四'
                  : val === '5' ? '星期五'
                    : '星期六'
      })
    }
  },
  watch: {
    orderData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.fetchData()
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    fetchData() {
      list().then(res => {
        const srcData = check(res.data)
        const temp = this.date.map(obj => {
          const current = moment(obj).format('YYYY-MM-DD')
          return srcData.filter(obj => {
            return obj.orderDate === current
          }).length
        })
        this.orderData = temp
      }).catch(err => {
        console.log(err)
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'light')
      this.setOptions(this.orderData)
    },
    setOptions(orderData) {
      this.chart.setOption({
        title: {
          text: '最近一周的订单'
        },
        xAxis: {
          data: this.week,
          boundaryGap: true,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 20,
          bottom: 20,
          top: 40,
          containLabel: true
        },
        yAxis: {
          minInterval: 1,
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['数量']
        },
        series: [{
          smooth: true,
          type: 'bar',
          data: orderData,
          animationDuration: 1500,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>
