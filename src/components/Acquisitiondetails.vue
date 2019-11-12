<!--收并购信息二级列表页面组件-->
<template>
    <div>
        <div>
             <div class="box"> 
                <el-table :data="Merger1" style="width: auto" fit:true >
                <el-table-column prop="acquiringfirm" label="收购方"></el-table-column>
                <el-table-column prop="acquiree" label="被收购方"></el-table-column>
                <el-table-column prop="acquisitiontime" label="日期" ></el-table-column>
                <el-table-column prop="capital" label="资金" ></el-table-column>
                <el-table-column prop="ratio" label="占股比例" ></el-table-column>
                <el-table-column prop="remark"  label="备注"  style="text-align:center !important"  ></el-table-column>
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
.el-table_2_column_11> .cell{
    text-align: left !important
}
.el-table_2_column_11:nth-of-type(1)> .call{
     /* text-align: center !important */
    /* color: red  !important */
    }
/* .el-table_2_column_11{
    color: red
} */

</style>