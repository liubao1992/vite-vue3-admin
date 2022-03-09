<template>
  <div class="lb-table">
    <el-table
      ref="elTable"
      v-bind="$attrs"
      :data="data"
      :span-method="merge ? mergeMethod : spanMethod"
      style="width: 100%"
    >
      <mergeColumn
        v-for="(item, index) in column"
        :column="item"
        :key="index"
      ></mergeColumn>
    </el-table>
    <el-pagination
      class="lb-table-pagination"
      v-if="pagination"
      v-bind="$attrs"
      @current-change="paginationCurrentChange"
      :style="{ 'margin-top': paginationTop, 'text-align': paginationAlign }"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import mergeColumn from "./mergeColumn.vue";

const props = defineProps({
  //获取传参的数据
  data: Array,
  column: Array,
  merge: Array,
  spanMethod: Function,
  pagination: {
    type: Boolean,
    default: false,
  },
  paginationTop: {
    type: String,
    default: "15px",
  },
  paginationAlign: {
    type: String,
    default: "right",
  },
});
let mergeIndex = {};
let mergeLine = {};
const mergeMethod = ({ row, column, rowIndex, columnIndex }) => {
  const merge = props.merge;
  const index = merge.indexOf(column.property);
  if (index > -1) {
    const _row = mergeIndex[merge[index]][rowIndex];
    const _col = _row > 0 ? 1 : 0;
    return {
      rowspan: _row,
      colspan: _col,
    };
  }
};
const getMergeArr = (tableData, merge) => {
  if (!merge) return;
  mergeLine = {};
  mergeIndex = {};
  merge.forEach((item, k) => {
    tableData.forEach((data, i) => {
      if (i === 0) {
        mergeIndex[item] = mergeIndex[item] || [];
        mergeIndex[item].push(1);
        mergeLine[item] = 0;
      } else {
        if (data[item] === tableData[i - 1][item]) {
          mergeIndex[item][mergeLine[item]] += 1;
          mergeIndex[item].push(0);
        } else {
          mergeIndex[item].push(1);
          mergeLine[item] = i;
        }
      }
    });
  });
};
onMounted(() => {
  getMergeArr(props.data, props.merge);
});
//监听props里的值要用() => props.merge，直接写props.merge不会被监听到
watch(
  () => [props.merge, props.data],
  (data) => {
    console.log(data);
    getMergeArr(props.data, props.merge);
  },
  {
    // 首次渲染组件就触发一次
    immediate: true,
    // 开启深度监听,对象里面的数据如果发生变化也会被侦听到
    // 如果监听的数据是一个比较长的表达式，那么需要用一个函数的方式
    // 但是写成函数形式之后，里层的数据变化不到，所以需要添加deep选项
    deep: false,
  }
);
</script>
