<template>
    <div>
        <div class="box" id="khzy">
            <!-- 客户资源明细表 -->
            <div class="box_header">
                <h1>{{projectName}}客户资源明细表</h1>
                <h2 @click="exportExcel" class="daochu">导出</h2>
            </div>
            <div class="box_body">
                <!-- 显示表格 -->
                <el-table
                        :data="tablemsg.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                        :style="style"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        class="table"
                        min-height="600px"
                        :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                >
                    <el-table-column
                            label="序号"
                            type="index"
                            width="50"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="36px"
                    ></el-table-column>
                    <el-table-column
                            prop="projectName"
                            label="项目名称"
                            min-width="60px"
                            :show-overflow-tooltip="true"
                            align="center"
                    ></el-table-column>
                    <el-table-column
                            prop="resouresName"
                            label="资源名称"
                            :show-overflow-tooltip="true"
                            align="left"
                            min-width="46px"
                    ></el-table-column>
                    <el-table-column
                            prop="floorName"
                            label="楼栋"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="unitName"
                            label="单元"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="customerName"
                            label="客户名称"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="resourceArea"
                            label="资源面积"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="amountReceivable"
                            label="应收金额"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="amountReceived"
                            label="实收金额"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="amountArrearage"
                            label="欠费金额"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="rate"
                            label="收缴率"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    >
                        <template slot-scope="scope">
                           {{scope.row.rate}}%
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="状态"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                </el-table>


                <!-- 下载表格 -->

                <el-table
                        :data="tablemsgmsg"
                        :style="style"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        class="xiazai"
                        v-show="show"

                >
                    <el-table-column
                            label="序号"
                            type="index"
                            width="50"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="projectName"
                            label="项目名称"
                            min-width="60px"
                            :show-overflow-tooltip="true"
                            align="center"
                    ></el-table-column>
                    <el-table-column
                            prop="resouresName"
                            label="资源名称"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="floorName"
                            label="楼栋"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="unitName"
                            label="单元"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="customerName"
                            label="客户名称"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="resourceArea"
                            label="资源面积"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="amountReceivable"
                            label="应收金额"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="amountReceived"
                            label="实收金额"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="amountArrearage"
                            label="欠费金额"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                    <el-table-column
                            prop="rate"
                            label="收缴率"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    >
                     <template slot-scope="scope">
                           {{scope.row.rate}}%
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="状态"
                            :show-overflow-tooltip="true"
                            align="center"
                            min-width="40px"
                    ></el-table-column>
                </el-table>

                <!-- //分页器 -->
                <div class="box1">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="current_change"
                            :current-page.sync="num"
                            :page-sizes="[8,16,32,64]"
                            :page-size="pagesize"
                            layout="total, prev, pager, next, jumper"
                            background
                            :total="totalCount"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    // 引入导出excel图表的工具
    import FileSaver from "file-saver";
    import XLSX from "xlsx";

    export default {
        data() {
            return {
                xmid: "",
                num: 1,
                show: false,
                tablemsg: [],                 //显示的表格数据
                tablemsgmsg: [],                 //下载的表格数据
                totalCount: null, //--------------------------------默认数据总数
                currentPage: 1, //----------------------------------默认开始页面
                istag: true,
                pagesize: 12, //------------------------------------每页显示的数据条数
                style: {
                    width: "100%",
                    height: "",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                },
                yeardefaultdefault: "",
                year: "",
                projectName: ""
            }
        },
        mounted() {

            var date = new Date();
            this.yeardefaultdefault = date.getFullYear() + "年";
            this.year = date.getFullYear();
            this.xmid = this.$route.query.xmid
            //获取表格数据
            this.axios.get("/api/proChargeRate01?projectId=" + this.xmid).then((res) => {
                // this.axios.get("/api/proChargeRate01?projectId=101").then((res)=>{
                // console.log(res.data.data)
                let arr=res.data.data
                arr.map((item,index)=>{
                   item.resouresName=item.resouresName.replace(/-/ig,"－")
                })
                this.tablemsgmsg = arr  //下载数据的表格
                this.tablemsg = arr      //展示数据的表格
                this.totalCount = res.data.data.length    //展示数据的总条数
            })

            this.getheight();

            this.axios.get("/api/proChargeRate03?projectId=" + this.xmid).then((res) => {
                this.projectName = res.data.data[0].projectName
            })
        },
        methods: {
            getheight() {
                // 获取当前浏览器的高度赋值给元素
                this.style.height = window.innerHeight - 150 - 12 + "px";
            },
            exportExcel() {
                this.$confirm("即将下载该表格, 是否继续下载?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(res => {
                        if ((res = confirm)) {
                            this.$message({
                                type: "success",
                                message: "下载成功!"
                            });
                            this.axios.get("/api/projectInfoName?projectIdName=" + this.xmid)
                                .then(res => {
                                    // console.log(res.data.data[0].projectName)
                                    let name = res.data.data[0].projectName + this.year + "年" + "客户资源明细表";
                                    var wb = XLSX.utils.table_to_book(
                                        document.querySelector(".xiazai")
                                        
                                    );
                                    // console.log(wb)
                                    var wbout = XLSX.write(wb, {
                                        bookType: "xlsx",
                                        bookSST: true,
                                        type: "array"
                                    });
                                    try {
                                        //  name+'.xlsx'表示导出的excel表格名字
                                        FileSaver.saveAs(
                                            new Blob([wbout], {type: "application/octet-stream"}),
                                            name + ".xlsx"
                                        );
                                    } catch (e) {
                                        if (typeof console !== "undefined") window.console.log(e, wbout);
                                    }
                                    return wbout;
                                });
                        }
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消下载"
                        });
                    });
            },
            handleSizeChange(cpage) {
                this.pagesize = cpage;
            },
            current_change: function (currentPage) {
                this.currentPage = currentPage;
            },
        }
    }
</script>

<style scoped>
    .daochu {
        border: 1px solid #4ac48b;
        height: 26px;
        width: 50px;
        line-height: 26px;
        margin-top: 8px;
        padding: 0 5px;
        border-radius: 5px;
        background: #4ac48b;
        color: #fff !important;
        position: absolute;
        top: 4px;
        text-align: center;
        right: 10px;
        font-size: 14px;
        cursor: pointer;
        font-size: 12px;
    }

    .daochu:hover {
        border: 1px solid #3c8dbc;
        box-shadow: none;
    }

    .box_header {
        width: 100%;
        background: #fff;
        line-height: 50px;
        height: 50px;
        position: relative;
    }

    .box_header > h1 {
        font-size: 20px;
        color: #666;
        line-height: 50px;
        text-align: center;
        font-weight: 600
    }

    .box {
        padding: 0 12px 12px 12px;
        background: #eee
    }

    .box1 {
        height: 50px;
        background: #fff
    }

    .box >>> .el-table__header-wrapper {
        height: 60px !important;
        line-height: 60px !important;
    }

    .box >>> .has-gutter > tr > th {
        text-align: center
    }
</style>

<style>
    #khzy .has-gutter > tr > th {
        padding: 0 !important
    }

</style>