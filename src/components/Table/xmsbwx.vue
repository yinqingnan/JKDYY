<template>

    <div>
        <div class="box" id="sbwx">
            <div class="boxTitle">
                <button @click="TO" class="fhsj">
                    <i class="el-icon-back "></i>返回
                </button>

                <h3 style="margin:0 auto">{{projectName}}设施设备台账</h3>

                <div class="queryParent">
                    <el-input @focus="inputfocus" @keyup.enter.native="search()" v-model="tableDataEnd"
                              style="display: inline-block;width: 200px;" :class="isShow===true ? 'info':'success'"
                              placeholder="输入设备名称查询" class="sss">
                    </el-input>
                    <img @click="btnbtn" class="query" src="@/assets/ima/search.png">
                </div>
                <h2 @click="exportExcel" class="daochu" :class="isShow===true ? 'info1':'success1'">导出</h2>
                <h2 @click="Backstage" class="Backstage" v-if="isShow">后台管理</h2>

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
                <el-table-column prop="deviceName" label="设备名称" min-width="90px" :show-overflow-tooltip="true"
                                 align="center"></el-table-column>
                <el-table-column prop="projectName" label="所属项目" :show-overflow-tooltip="true"
                                 align="center"></el-table-column>
                <el-table-column prop="deviceCategory" label="类别" :show-overflow-tooltip="true"
                                 align="center"></el-table-column>
                <el-table-column prop="deviceModel" label="规格/型号" :show-overflow-tooltip="true" align="center"
                                 min-width="94px"></el-table-column>
                <el-table-column prop="installTime" label="安装时间" :show-overflow-tooltip="true" align="center"
                                 min-width="76px"></el-table-column>
                <el-table-column prop="installPosition" label="安装地点" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
                <el-table-column prop="maintenanceCompany" label="维保单位" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
                <el-table-column prop="maintenanceCycle" label="维保周期" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
                <el-table-column prop="nextTime" label="下次维保时间" :show-overflow-tooltip="true" align="center"
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
                <el-table-column prop="deviceName" label="设备名称" min-width="90px" :show-overflow-tooltip="true"
                                 align="center"></el-table-column>
                <el-table-column prop="projectName" label="所属项目" :show-overflow-tooltip="true"
                                 align="center"></el-table-column>
                <el-table-column prop="deviceCategory" label="类别" :show-overflow-tooltip="true"
                                 align="center"></el-table-column>
                <el-table-column prop="deviceModel" label="规格/型号" :show-overflow-tooltip="true" align="center"
                                 min-width="94px"></el-table-column>
                <el-table-column prop="installTime" label="安装时间" :show-overflow-tooltip="true" align="center"
                                 min-width="76px"></el-table-column>
                <el-table-column prop="installPosition" label="安装地点" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
                <el-table-column prop="maintenanceCompany" label="维保单位" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
                <el-table-column prop="maintenanceCycle" label="维保周期" :show-overflow-tooltip="true" align="center"
                                 min-width="90px"></el-table-column>
                <el-table-column prop="nextTime" label="下次维保时间" :show-overflow-tooltip="true" align="center"
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
            // // 通过项目id查询到区域公司的id并查询数据
            this.axios.get("/api/projectInfoName?projectIdName=" + this.xmid).then(res => {
                //     //   console.log(res.data.data[0].projectName)
                this.projectName = res.data.data[0].projectName
                this.xmid = this.$route.query.xmid
                this.axios.get("/api/projectEquipment?projectId=" + this.xmid).then((res) => {
                    this.totalCount = res.data.data.length
                    this.tablemsg = res.data.data
                    this.tablemsgmsg = res.data.data
                })
            });
            this.axios.get("/api/userToProject?staffId=10000&projectId=" + this.xmid).then((res) => {
                if (res.data.data[0].state == 0) {
                    this.isShow = false
                } else {
                    this.isShow = true

                }
            })


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
                window.location.href = (this.url + "jkData/data/daq/projectEquipment/index?loginName=" + this.login + "&token=1")
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
                                let name = res.data.data[0].projectName + "设施设备台账";
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

                // this.tablemsg=[];                   //每次手动将数据置空,因为会出现多次点击搜索情况
                this.filterTableDataEnd = []

                this.tablemsg.forEach((value) => {
                    // console.log(value.contractName)

                    if (value.deviceName) {
                        if (value.deviceName.indexOf(this.tableDataEnd) >= 0) {
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
                // console.log(this.xmid)
                this.tableDataEnd = ""
                this.axios.get("/api/projectInfoName?projectIdName=" + this.xmid).then(res => {
                    this.projectName = res.data.data[0].projectName
                    this.xmid = this.$route.query.xmid
                    this.axios.get("/api/projectEquipment?projectId=" + this.xmid).then((res) => {
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

    .boxTitle > h2 {
        font-size: 12px;
        color: #666;
        font-weight: 500;
        cursor: pointer;
        height: 35px;
        line-height: 35px;
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
        height: 26px !important;
        width: 55px !important;
        line-height: 26px !important;
        margin-top: 19px;
        padding: 0 5px;
        border-radius: 5px;
        background: #4ac48b;
        color: #fff !important;
        position: absolute;
        top: 4px;
        text-align: center;
        right: 92px;
        cursor: pointer;
        font-size: 12px;
    }

    .success1 {
        right: 20px !important
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
        height: 26px !important;
        width: 55px !important;
        line-height: 26px !important;
        margin-top: 8px;
        padding: 0 5px;
        border-radius: 5px;
        background: #409eff;
        color: #fff !important;
        position: absolute;
        top: 15px;
        text-align: center;
        right: 20px;
        font-size: 14px;
        cursor: pointer;
        font-size: 12px;
    }

    .sss >>> .el-input__inner {
        font-size: 14px !important;
        height: 29px;
        line-height: 29px;
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

    #sbwx .has-gutter > tr > th {
        padding: 0 !important
    }
</style>