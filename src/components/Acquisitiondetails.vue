<!--收并购信息二级列表页面组件-->
<template>
    <div>
        <div>
             <div class="box"> 
                <el-table :data="Merger1" style="width: auto" fit:true  >
                <el-table-column prop="acquiringfirm" label="收购方" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="acquiree" label="被收购方" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="acquisitiontime" label="日期" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="capital" label="资金" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="ratio" label="占股比例" :show-overflow-tooltip="true" ></el-table-column>
                <el-table-column prop="remark"  label="备注"   :show-overflow-tooltip="true"></el-table-column>
                </el-table>
            </div>
        </div>
       
    </div>
</template>


<script>

import axios from 'axios'


export default {
    data(){
        return{
            Merger1:[]
        }
    },
    mounted() {
        // 获取收并购信息
    axios.get("/api/listedCompany07?topcount=99")
      .then(res => {
        //   console.log(res.data.data)
        this.Merger1 = res.data.data;
    //    console.log(res.data.data.filter(item => item.acquisitiontime) ) 
      });

     
    }, 
    methods:{
        
        // cellStyle({row, column, rowIndex, columnIndex}){
        //     if(rowIndex === 2 && columnIndex === 11){ //指定坐标
        //         return 'background:pink'
        //     }else{
        //         return ''
        //     }
        // }

    },

    created(){
    
    }
}
</script>

<style scoped>
    .box{
        /* width: 100%; */
        /* margin: 12px; */
        
    }
</style>
<style>
/* .el-table_2_column_11> .cell{
    text-align: left !important
} */
/* .el-table_2_column_11> .cell{
    text-align: left !important
} */
/* .el-table_2_column_11:nth-of-type(1)> .call{ */
     /* text-align: center !important */
    /* color: red  !important */
    /* } */
/* .el-table_2_column_11{
    color: red
} */

</style>