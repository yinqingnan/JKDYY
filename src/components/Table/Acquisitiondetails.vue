<!--收并购信息二级列表页面组件-->
<template>
    <div>
        <div>
             <div class="box"> 
                <el-table :data="Merger1" style="width: auto" fit:true  :cell-style="cellStyle" >
                <el-table-column prop="acquiringfirm" label="收购方" :show-overflow-tooltip="true"  align="left" style="marginRight:10px"></el-table-column>
                <el-table-column prop="acquiree" label="被收购方" :show-overflow-tooltip="true" align="left"></el-table-column>
                <el-table-column prop="acquisitiontime" label="日期" :show-overflow-tooltip="true" align="center"></el-table-column>
                <el-table-column prop="capital" label="资金(亿)" :show-overflow-tooltip="true" align="center"></el-table-column>
                <el-table-column prop="ratio" label="占股比例" :show-overflow-tooltip="true"  align="center"></el-table-column>
                <el-table-column prop="remark"  label="备注"   :show-overflow-tooltip="true" class="beizhu" align="left"></el-table-column>
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
        cellStyle({row, column, rowIndex, columnIndex}){
        //   console.log(row)           //-------------------对象形式，填入的当列所有数据      
        //   console.log(column)            
        //   console.log(rowIndex)      //--------行
        //   console.log(columnIndex)   //--------列
         
            // if(columnIndex === 5){ //指定坐标
            //     return 'text-align:left'
            // }else{
            //     return ''
            // }
        }
    },

}
</script>

<style scoped>

</style>
