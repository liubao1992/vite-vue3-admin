<template>
    <div id="myChart" style="width: 50%; height: 300px; border: solid 1px red"></div>
</template>
<script setup>
import { onMounted, getCurrentInstance } from "vue";
const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
onMounted(() => {
    let myChart = echarts.init(document.getElementById("myChart"));
    // 绘制图表
    myChart.setOption({
        tooltip: {},
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20],
            },
        ],
    });
});

</script>

<style scoped>
a {
    color: #42b983;
}
</style>
