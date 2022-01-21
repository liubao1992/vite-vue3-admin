<template>
  <div class="lb-table">
    <el-table
      :data="data"
      :span-method="this.merge ? this.mergeMethod : this.spanMethod"
      style="width: 100%"
    >
      <mergeColumn v-for="(item, index) in column" :column="item" :key="index">
      </mergeColumn>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, defineProps} from "vue";
import mergeColumn from "./mergeColumn.vue";

const props = defineProps({
  //获取传参的数据
  data: Array,
  column: Array,
  merge: Array,
  spanMethod: Function,
});
let mergeIndex = {};
let mergeLine = {}
let mergeMethod = null;
onMounted(() => {
  mergeMethod = ({ row, column, rowIndex, columnIndex }) => {
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
  getMergeArr(props.data,props.merge)
});
function getMergeArr(tableData, merge){
  if (!merge) return
      mergeLine = {}
      mergeIndex = {}
      merge.forEach((item, k) => {
        tableData.forEach((data, i) => {
          if (i === 0) {
            mergeIndex[item] = mergeIndex[item] || []
            mergeIndex[item].push(1)
            mergeLine[item] = 0
          } else {
            if (data[item] === tableData[i - 1][item]) {
              mergeIndex[item][mergeLine[item]] += 1
              mergeIndex[item].push(0)
            } else {
              mergeIndex[item].push(1)
              mergeLine[item] = i
            }
          }
        })
      })
}
</script>
