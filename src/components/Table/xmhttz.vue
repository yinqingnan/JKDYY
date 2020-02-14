<template>
    <div>
        <div class="box" id="httz">
            <div class="boxTitle">
                <button @click="TO" class="fhsj">
                    <i class="el-icon-back "></i>返回
                </button>

                <h3 style="margin:0 auto">{{projectName}}合同台账</h3>
                <div class="queryParent">
                    <el-input @focus="inputfocus" @keyup.enter.native="search()" v-model="tableDataEnd"
                              style="display: inline-block;width: 200px;" :class="isShow===true ? 'info':'success'"
                              placeholder="输入合同名称查询" class="sss">
                    </el-input>
                    <img @click="btnbtn" class="query" src="@/assets/ima/search.png">
                </div>

                <h2 @click="Backstage" class="Backstage" v-if="isShow">后台管理</h2>
                <h2 @click="exportExcel" class="daochu" :class="isShow===true ? 'info1':'success1'">导出</h2>
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
                        width="50"
                        :show-overflow-tooltip="true"
                        align="center"
                        min-width="40px"
                ></el-table-column>
                <el-table-column prop="contractName" label="合同名称" min-width="90px" :show-overflow-tooltip="true" header-align="center"
                                 align="left"></el-table-column>
                <el-table-column prop="partyA" label="甲方单位" :show-overflow-tooltip="true" 
                                 align="center"></el-table-column>
                <el-table-column prop="partyB" label="乙方单位" :show-overflow-tooltip="true"
                                 align="center"></el-table-column>
                <el-table-column prop="contractVolume" label="签约金额" :show-overflow-tooltip="true" align="center"
                                 min-width="94px"></el-table-column>
                <el-table-column prop="startTime" label="开始时间" :show-overflow-tooltip="true" align="center"
                                 min-width="76px"></el-table-column>
                <el-table-column prop="overTime" label="完结时间" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
                <el-table-column prop="contractType" label="合同类型" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
                <el-table-column prop="attachment" label="附件信息" :show-overflow-tooltip="true" align="center"
                                 min-width="90px">
                    <template slot-scope="scope">
                        <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="operator" label="经办人" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
            </el-table>


            <!-- 下载表格 -->
            <el-table
                    :data="tablemsgmsg"
                    :style="style"
                    :default-sort="{prop: 'date', order: 'descending'}"
                    v-show="show"
                    class="xiazai"
            >
                <el-table-column
                        label="序号"
                        type="index"
                        width="50"
                        :show-overflow-tooltip="true"
                        align="center"
                        min-width="40px"
                ></el-table-column>
                <el-table-column prop="contractName" label="合同名称" min-width="90px" :show-overflow-tooltip="true"
                                 align="center"></el-table-column>
                <el-table-column prop="partyA" label="甲方单位" :show-overflow-tooltip="true"
                                 align="center"></el-table-column>
                <el-table-column prop="partyB" label="乙方单位" :show-overflow-tooltip="true"
                                 align="center"></el-table-column>
                <el-table-column prop="contractVolume" label="签约金额" :show-overflow-tooltip="true" align="center"
                                 min-width="94px"></el-table-column>
                <el-table-column prop="startTime" label="开始时间" :show-overflow-tooltip="true" align="center"
                                 min-width="76px"></el-table-column>
                <el-table-column prop="overTime" label="完结时间" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
                <el-table-column prop="contractType" label="合同类型" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
                <el-table-column prop="attachment" label="附件信息" :show-overflow-tooltip="true" align="center"
                                 min-width="90px">
                    <template slot-scope="scope">
                        <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="operator" label="经办人" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
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
    import FileSaver from "file-saver";
    import XLSX from "xlsx";

    export default {
        data() {
            return {
                tableDataEnd: "",
                show: false,
                projectName: null,
                xmid: null,
                tablemsg: [],                 //显示的表格数据
                tablemsgmsg: [],                 //下载的表格数据
                num: 1,
                totalCount: null, //--------------------------------默认数据总数
                currentPage: 1, //----------------------------------默认开始页面
                istag: true,
                pagesize: 12, //------------------------------------每页显示的数据条数
                style: {
                    width: "100%",
                    height: ""
                },
                filterTableDataEnd: [],      //过滤后的数据
                flag: false,                 //
                isShow: "",
                url: this.GLOBAL.Url,
                login: ""

            };
        },
        mounted() {
            // console.log(this.$route.query.login)
            this.login = this.$route.query.login
            this.xmid = this.$route.query.xmid; //获取到路由参数 （项目的id）

            // console.log(this.xmid)
            // // 通过项目id查询到区域公司的id并查询数据
            this.axios.get("/api/projectInfoName?projectIdName=" + this.xmid).then(res => {
                    //   console.log(res.data.data[0].projectName)
                this.projectName = res.data.data[0].projectName
                // this.xmid = this.$route.query.xmid
                this.axios.get("/api/projectContract?projectId=" + this.xmid).then((res) => {
                    // console.log(res.data.data)
                    this.totalCount = res.data.data.length
                    this.tablemsg = res.data.data
                    this.tablemsgmsg = res.data.data
                })
            });

            this.axios.get("/api/userToProject?staffId=10000&projectId=" + this.xmid).then((res) => {
                // console.log(res.data.data)
                if (res.data.data[0].state == 0) {
                    this.isShow = false
                } else {
                    this.isShow = true

                }
            })
            this.getheight();
        },
        methods: {
            // 附件信息下载
            download(val) {
                window.open(val.attachment)
            },
            getheight() {
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
                //  this.axios.get("/api/projectInfoName?projectIdName="+this.xmid).then((res)=>{
                //           // 跳转回上级
                //           this.$router.push({
                //               path:'/region',
                //               query:{
                //                   quid:res.data.data[0].companyId,
                //                   xmid:res.data.data[0].projectId
                //               }
                //           })
                //       })
                this.$router.go(-1)

            },
            Backstage() {
                // console.log(this.url+"jkData/data/daq/projectContract/index?loginName="+this.login)
                window.location.href = (this.url + "jkData/data/daq/projectContract/index?loginName=" + this.login + "&token=1")
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
                            this.axios.get("/api/projectInfoName?projectIdName=" + this.xmid).then(res => {
                                //   console.log(res.data.data[0].projectName)
                                let name = res.data.data[0].projectName + "合同台账";
                                var wb = XLSX.utils.table_to_book(
                                    document.querySelector(".xiazai")
                                );
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
                                    if (typeof console !== "undefined") console.log(e, wbout);
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
            btnbtn() {
                // 模糊搜索
                if (this.tableDataEnd == "") {
                    this.$message.warning("查询条件不能为空！");
                    return;
                }

                //每次手动将数据置空,因为会出现多次点击搜索情况
                this.filterTableDataEnd = []
                this.tablemsg.forEach((value) => {

                    if (value.contractName) {
                        if (value.contractName.indexOf(this.tableDataEnd) >= 0) {
                            this.filterTableDataEnd.push(value)
                        }
                    }
                });
                this.tablemsg = this.filterTableDataEnd
            },
            search() {
                // 模糊搜索
                if (this.tableDataEnd == "") {
                    this.$message.warning("查询条件不能为空！");
                    return;
                }

                //每次手动将数据置空,因为会出现多次点击搜索情况
                this.filterTableDataEnd = []
                this.tablemsg.forEach((value) => {

                    if (value.contractName) {
                        if (value.contractName.indexOf(this.tableDataEnd) >= 0) {
                            this.filterTableDataEnd.push(value)
                        }
                    }
                });
                this.tablemsg = this.filterTableDataEnd

            },

            inputfocus() {
                this.tableDataEnd = ""
                this.axios.get("/api/projectInfoName?projectIdName=" + this.xmid).then(res => {
                    this.projectName = res.data.data[0].projectName
                    this.xmid = this.$route.query.xmid
                    this.axios.get("/api/projectContract?projectId=" + this.xmid).then((res) => {
                        // console.log(res.data.data)
                        this.totalCount = res.data.data.length
                        this.tablemsg = res.data.data
                        this.tablemsgmsg = res.data.data
                    })
                });

            }

        },
        computed: {},
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

    .query {
        font-size: 12px;
        border: 0;
        height: 26px;
        line-height: 26px;
        position: absolute;
        left: 170px;
        top: 18px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .queryParent {
        position: relative;
    }

    .fhsj {
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
        width: 55px;
        color: #666;
        font-weight: 500;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        margin-top: 19px;
        margin-right: 10px
    }

    .select {
        margin-right: 22px;
    }

    .box1 {
        background: #fff;
        height: 50px;
    }

    .daochu {
        border: 1px solid #4ac48b;
        height: 26px;
        width: 55px;
        line-height: 26px;
        margin-top: 8px;
        padding: 0 5px;
        border-radius: 5px;
        background: #4ac48b;
        color: #fff !important;
        position: absolute;
        top: 4px;
        text-align: center;
        right: 82px;
        font-size: 14px;
        cursor: pointer;
        font-size: 12px !important;

    }

    .daochu:hover {
        border: 1px solid #3c8dbc;
        box-shadow: none;
    }

    .fhsj {
        border: 1px solid #4ac48b !important;
        background: #4ac48b !important;
        color: #fff !important;
        border-radius: 5px;
    }

    .box >>> .el-table__header-wrapper {
        height: 60px !important;
        line-height: 60px !important;
    }

    .success {
        margin-right: 80px;
    }

    .info {
        margin-right: 143px;
    }

    .Backstage {
        border: 1px solid #409eff;
        height: 26px;
        width: 55px !important;
        line-height: 26px;
        margin-top: 8px;
        padding: 0 5px;
        border-radius: 5px;
        background: #409eff;
        color: #fff !important;
        position: absolute;
        top: 4px;
        text-align: center;
        right: 10px;
        font-size: 14px;
        cursor: pointer;
        font-size: 12px !important;
    }

    .sss >>> .el-input__inner {
        font-size: 14px !important;
        height: 29px;
        line-height: 29px;
    }

    .success1 {
        right: 10px !important
    }

    .sss {
        position: relative;
    }

    /* .query{
      position: absolute;
      left: 0;
    } */
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

    #httz .has-gutter > tr > th {
        padding: 0 !important
    }
</style>