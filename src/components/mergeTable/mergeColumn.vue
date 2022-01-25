<template>
    <el-table-column :prop="column.prop"
    :label="column.label">
    </el-table-column>
</template>
<script setup>
// import LbColumn from './lb-column'
// import {defineProps} from 'vue'

  const props =defineProps({  //获取传参的数据
    column:Object
  })
</script>
