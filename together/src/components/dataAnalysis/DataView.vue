<template>
  <div class="dataview">
    <el-card>
      <div id="main1"></div>
    </el-card>
    <el-card>
      <div id="main2"></div>
    </el-card>
  </div>
</template>

<script>
import { dataview } from '@/api/api.js'
export default {
  data () {
    return {

    }
  },
  created () {
    // 第二个图表绘制
    dataview().then(res => {
      console.log(res)
      if (res.data.status === 200) {
        const { legend, xAxis, series } = res.data.data
        this.draw(legend, xAxis, series)
      }
    })
  },
  // 图表结构一般来说写在mounted里面，绘制在BOM结构上面
  mounted () {
    // 调用echarts，初始化init的DOM结构实例
    const myChart = this.$echarts.init(document.getElementById('main1'))
    myChart.setOption({
      title: {
        text: '大佬进阶班'
      },
      tooltip: {},
      xAxis: {
        data: ['一班', '二班', '三班', '四班', '五班', '六班']
      },
      yAxis: {},
      series: [{
        name: '人数',
        type: 'bar',
        data: [45, 42, 46, 48, 52, 47]
      }]
    })
  },
  methods: {
    draw (legend, xAxis, series) {
      const myChart1 = this.$echarts.init(document.getElementById('main2'))
      const option = {
        title: {
          text: '会话量'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: legend
        },
        xAxis: {
          type: 'category',
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: series
      }
      // 调用setOption方法对myCharts1图表进行绘制
      myChart1.setOption(option)
    }
  }
}
</script>

<style lang="less">
.dataview{
width: 100%;
display: flex;
justify-content: space-between;
.el-card{
  width: 50%;
  #main1,#main2{
    height: 500px;
  }
}
}
</style>
