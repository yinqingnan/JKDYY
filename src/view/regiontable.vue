<template>
    <!-- 区域项目table -->
    <div>
        <div class="tablecontainer">
            <div class="tablecontainer_header">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="区域公司">
                        <el-select v-model="qydefault" placeholder="请选择" @change="qychange(qydefault)">
                            <el-option
                                    v-for="(item,index) in qygslist"
                                    :key="index"
                                    :value="item.companyName"
                            >
                            </el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目" class="form2">
                        <el-input v-model="msg" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <button type="button" @click="btnone" class="btn">查询</button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tablecontainer_body">
                <ul class="tablecontainer_body_header">
                    <li v-for="(item,index) in list "
                        :key="index"
                        @click="btn(index)"
                        :class="{active:index == num}"
                    >
                        {{item}}
                    </li>
                </ul>
            </div>
            <div class="tablecontainer_footer">
                <Table1 v-show="0==num" :tablemsg="tablemsg" :number="number"/>
                <Table2 v-show="1==num" :tablemsg="tablemsg"/>
                <Table3 v-show="2==num" :tablemsg="tablemsg"/>
            </div>

        </div>


    </div>
</template>

<script>
    import Table1 from "@/components/Table/table1"
    import Table2 from "@/components/Table/table2"
    import Table3 from "@/components/Table/table3"

    export default {
        components: {
            Table1, Table2, Table3
        },
        data() {
            return {
                show1: true,
                show2: false,
                show3: false,
                msg: "",//---------------------------------------------------表单绑定
                qygslist: [],//-----------------------------------------------区域公司列表数据
                qydefault: "物业重庆区域公司",//----------------------------默认显示的区域公司
                Selection: "物业重庆区域公司",//----------------------------------------------区域公司选中项
                list: ["在管项目基本情况", "招标物业费情况", "停车备案情况"],// 显示的项目信息
                num: 0,//-----------------------------------------------------默认显示的列表
                tablelength: '',//-------------------------------------------table长度
                tablemsg: [],//---------------------------------------------table的内容
                number: 0

            };
        },
        methods: {
            // 查询点击事件
            btnone() {
                if (this.msg === "") {
                    this.axios.get("/api/projectinfopage2?companyName=" + encodeURI(this.Selection)).then((res) => {
                        this.tablemsg = res.data.data
                    })
                } else {
                    this.axios.get("/api/projectinfopage?companyName=" + encodeURI(this.Selection) + "&projectName=" + encodeURI(this.msg))
                        .then((res) => {
                            if (res.data.data != undefined) {
                                this.tablemsg = res.data.data
                            }
                        })
                }

            },
            // 监听下拉选中项目并赋值给默认项
            qychange(qydefault) {//-------区域选中项
                this.Selection = qydefault
            },
            btn(index) {
                this.num = index
            }

        },
        mounted() {
            // 获取区域公司列表信息
            this.axios.get("/api/projectCompanyList").then((res) => {
                this.qygslist = res.data.data

            });
            //获取默认显示的table数据
            this.axios.get("/api/projectinfopage2?companyName=" + encodeURI(this.qydefault)).then((res) => {
                this.tablemsg = res.data.data;
            })

        }

    };
</script>


<style scoped>
    .tablecontainer_header {
        width: 100%;
        height: 55px;
        padding-top: 6px;
        box-sizing: border-box;
        border-bottom: 1px solid #d9d9d9;
        background: #ffffff
    }

    .from1 {
        margin-left: 12px
    }

    .form2 {
        margin-left: 50px
    }

    .tablecontainer_body {
        height: 45px;
        background: #fff;
        padding-left: 12px
    }

    .tablecontainer_body_header {
        display: flex;
        line-height: 45px;
        background: #ffffff;
        border-bottom: 1px solid #d9d9d9;
        margin-bottom: 10px
    }

    .tablecontainer_body_header > li {
        margin-right: 40px;
        font-size: 16px;
        color: #333;
        cursor: pointer;

    }

    .active {
        border-bottom: 2px solid #3a9fda;
        color: #3a9fda !important
    }

    .tablecontainer_footer {
        height: 100%;
        width: 100%;
        /* min-width: 1136px; */
        /* position: fixed; */
        margin-top: 2px
        /* background: pink; */
        /* z-index: -1 */
    }

    .btn {
        width: 50px;
        border: 1px solid #4ac48b;
        background: #4ac48b;
        font-size: 12px;
        color: #fff;
        height: 26px;
        line-height: 26px;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
<style>
    .el-form-item {
        margin-left: 12px !important
    }

    .el-form-item__label {
        font-size: 12px !important;
        color: #666 !important
    }

    .el-button--primary {
        background: #4ac48b !important;
        border-color: #4ac48b !important;
    }

    .el-button--primary:hover {
        background: #4ac48b !important;
        border-color: #4ac48b !important;
    }
</style>



