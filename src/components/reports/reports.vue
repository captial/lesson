<template>
    <div>
        <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
         <div id="main" style="width: 1000px;height:400px;"></div>
    </el-card>
    </div>
</template>

<script>
//第一步 echarts导入
import echarts from 'echarts'
import _ from "lodash";

export default {
    created(){
        
    },
    data(){
        return{
            options: {
          title: {
            text: '用户来源'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#E9EEF3'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ]
        }
     }
    },
    //第二步  元素渲染完毕后初始化echarts图表
    mounted(){
        //第三步 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        this.$http.get(`reports/type/1`)
           .then(res=>{
               if(res.data.meta.status !== 200) return 
              const newData=  _.merge(res.data.data,this.options)
               //第五步 使用刚指定的配置项和数据显示图表。
               myChart.setOption(newData);
           })
        //第四步 指定图表的配置项和数据
        // var option = {
        //     title: {
        //         text: 'ECharts 入门示例'
        //     },
        //     tooltip: {},
        //     legend: {
        //         data:['销量']
        //     },
        //     xAxis: {
        //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '销量',
        //         type: 'bar',
        //         data: [5, 20, 36, 10, 10, 20]
        //     }]
        // };

        
    },
    methods:{
       getEchartsData(){
           
       }
    }
    
}
</script>

<style lang="less" scoped>

</style>