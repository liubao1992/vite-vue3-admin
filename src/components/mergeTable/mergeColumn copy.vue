<template>
  <el-table-column
   :prop="column.prop" 
   :label="column.label"
   :type="column.type"
    :index="column.index"
    :column-key="column.columnKey"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :render-header="column.renderHeader"
    :sortable="column.sortable || false"
    :sort-method="column.sortMethod"
    :sort-by="column.sortBy"
    :sort-orders="column.sortOrders"
    :resizable="column.resizable || true"
    :formatter="column.formatter"
    :show-overflow-tooltip="column.showOverflowTooltip || false"
    :align="column.align || align || 'left'"
    :header-align="column.headerAlign || headerAlign || column.align || align || 'left'"
    :class-name="column.className"
    :label-class-name="column.labelClassName"
    :selectable="column.selectable"
    :reserve-selection="column.reserveSelection || false"
    :filters="column.filters"
    :filter-placement="column.filterPlacement"
    :filter-multiple="column.filterMultiple"
    :filter-method="column.filterMethod"
    :filtered-value="column.filteredValue">
    <!-- <template slot="header"
      slot-scope="scope">
      <mergeRender v-if="column.renderHeader"
        :scope="scope"
        :render="column.renderHeader">
      </mergeRender>
      <span v-else>{{ scope.column.label }}</span>
    </template>

    <template slot-scope="scope">
      <mergeRender :scope="scope"
        :render="column.render">
      </mergeRender>
    </template>

    <template v-if="column.children">
      <lb-column v-for="(col, index) in column.children"
        :key="index"
        :column="col">
      </lb-column>
    </template> -->
  </el-table-column>
</template>
<script setup>
import mergeRender from './mergeRender.vue'
//import forced from './forced.js'
import { columnFormatter, columnRender } from './column.jsx'
import { onMounted, watch } from "vue";
const props = defineProps({  //获取传参的数据
  column: Object,
  headerAlign: String,
  align: String
})
const setColumn = () => {
  console.log(props.column)
  if (props.column.type) {
    props.column.renderHeader = forced[props.column.type].renderHeader
    props.column.render = props.column.render || forced[props.column.type].renderCell
  }
  if (props.column.formatter) {
    props.column.render = (h, scope) => {
      return columnFormatter(scope)
    }
  }
  if (!props.column.render) {
    props.column.render = (h, scope) => {
      return columnRender(scope)
    }
  }
}

watch(() => [props.column], (data) => {
 // setColumn()
}, {
  immediate: true,
  deep: false
})
</script>
