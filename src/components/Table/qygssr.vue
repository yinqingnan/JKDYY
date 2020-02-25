<template>
    <!-- 区域公司一览表页面 -->
    <div>
        <div class="box" id="srylb">
            <div class="boxTitle">
                <button @click="TO" class="fhsj">
                    <i class="el-icon-back"></i>返回
                </button>
                <h3 style="margin:0 auto">区域公司一览表</h3>
            </div>
            <!-- 显示表格 -->
            <el-table
                    :data="tablemsg.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    :style="style"
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    class="table"
            >
                <el-table-column
                        label="序号"
                        type="index"
                        width="60"
                        :show-overflow-tooltip="true"
                        align="center"
                        min-width="40px"
                ></el-table-column>
                <el-table-column
                        prop="companyName"
                        label="区域公司名称"
                        min-width="90px"
                        :show-overflow-tooltip="true"
                        align="center"
                >
                    <template slot-scope="scope">
            <span
                    size="mini"
                    style="cursor:pointer;text-decoration: underline"
                    @click="handleEdit(scope.row)"
            >{{ scope.row.companyName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="incomAmount"
                        label="收入金额（万元）"
                        :show-overflow-tooltip="true"
                        align="center"
                        min-width="90"
                ></el-table-column>
                <el-table-column
                        prop="tubeArea"
                        label="在管面积（万方）"
                        :show-overflow-tooltip="true"
                        align="center"
                        min-width="90px"
                ></el-table-column>
                <el-table-column
                        prop="nodeRate"
                        label="节点达成率"
                        :show-overflow-tooltip="true"
                        align="center"
                        min-width="90px"
                >
                    <template slot-scope="scope">
                        {{scope.row.nodeRate}}%
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
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
</template>
<script>
    // 引入导出excel图表的工具
    // import FileSaver from "file-saver";
    // import XLSX from "xlsx";
    export default {
        data() {
            return {
                show: false,
                projectName: null,
                xmid: null,
                year: null,
                month: null,
                yeardefaultdefault: "", //------------------默认显示的年份信息
                tablemsg: [], //显示的表格数据
                num: 1,
                totalCount: null, //--------------------------------默认数据总数
                currentPage: 1, //----------------------------------默认开始页面
                istag: true,
                pagesize: 12, //------------------------------------每页显示的数据条数
                style: {
                    width: "100%",
                    height: ""
                }
            };
        },
        mounted() {
            // console.log(this.$route.query.xmid)
            this.axios.get("/api/projectCompanyList").then(res => {
                this.tablemsg = res.data.data;
            });
            this.getheight();
        },
        methods: {
            getheight() {
                // console.log(window.innerHeight)
                // 获取当前浏览器的高度赋值给元素
                this.style.height = window.innerHeight - 130 + "px";
            },

            handleSizeChange(cpage) {
                this.pagesize = cpage;
            },
            current_change: function (currentPage) {
                this.currentPage = currentPage;
            },
            TO() {
                this.$router.go(-1);
            },
            handleEdit(row) {
                this.$router.push("project?name=" + encodeURI(row.companyName));
            }
        }
    };
</script>
<style scoped>
    .box {
        background: #eeeeee;
        padding: 10px;
    }

    .boxTitle {
        display: flex;
        height: 55px;
        line-height: 55px;
        background: #fff;
        border-bottom: 1px solid #f5f5f5;
        padding: 0 12px;
        justify-content: space-between;
    }

    .boxTitle > button {
        width: 62px;
        border: 0;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        margin-top: 15px;
        background: #fff;
        font-size: 12px;
    }

    .boxTitle > h3 {
        font-size: 20px;
        color: #666;
        line-height: 50px;
        text-align: center;
        font-weight: 600;
    }

    .boxTitle > h2 {
        font-size: 14px;
        color: #666;
        font-weight: 500;
        /* margin-left: 20px */
        cursor: pointer;
        height: 35px;
        line-height: 35px;
    }

    .box1 {
        /* width: 100% */
        background: #fff;
        height: 50px;
    }

    .fhsj {
        border: 1px solid #4ac48b !important;
        background: #4ac48b !important;
        color: #fff !important;
        border-radius: 5px;
    }

    .boxTitle > button:hover {
        border: 1px solid #3c8dbc;
        box-shadow: none;
    }

    .box >>> .el-table__header-wrapper {
        height: 60px !important;
        line-height: 60px !important;
    }
</style>
<style>
    .month .el-input__inner {
        text-align: center;
    }

    .el-table--fit td.gutter,
    .el-table--fit th.gutter {
        border-right-width: 1px;
        background: #f5f7fa;
    }

    .el-table__body-wrapper:-webkit-scrollbar {
        display: none;
    }

    .is-scrolling-right:-webkit-scrollbar {
        display: none;
    }

    #srylb .has-gutter > tr > th {
        padding: 0 !important;
    }
</style>