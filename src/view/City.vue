<template>
    <!-- 城市页面子页面 -->
    <div>
        <div class="container" :style="style">
            <div class="center">
                <div class="center_header">
                    <!-- <h2>{{cityname}}</h2> -->
                    <div>
                        <el-select
                                v-model="cityname"
                                @change="provinceNamechange(cityname)"
                                style="width:120px;marginLeft:10px"
                        >
                            <el-option
                                    v-for="(item,index) in provincelist"
                                    :key="index"
                                    :label="item.provinceName"
                                    :value="item.provinceName"
                            ></el-option>
                        </el-select>
                        <el-select
                                v-model="newid"
                                placeholder="请选择"
                                @change="change(newid)"
                                style="width:120px;marginLeft:10px"
                        >
                            <el-option
                                    v-for="(item,index) in citylist"
                                    :key="index"
                                    :label="item.cityName"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="sign">
                        <div>
                            <h1>物业费建议参考价</h1>
                            <h2 style="margin-top:4px">(原则上不低于建议参考价)</h2>
                        </div>
                        <span v-show="isshow"
                              :title="defaultdata.lumpSumOrSalary">{{defaultdata.lumpSumOrSalary}}</span>
                        <span v-show="isshow" :title="defaultdata.aFeeOrNotAFee">{{defaultdata.aFeeOrNotAFee}}</span>
                    </div>
                </div>
                <div class="left_header">
                    <div>
                        <div>
                            <h1>时间</h1>
                            <h2>{{defaultdata.year}}</h2>
                        </div>
                        <div>
                            <h1>高层</h1>
                            <h2>{{defaultdata.highRiseFee | number}}元/m²/月</h2>
                        </div>
                        <div>
                            <h1>洋房</h1>
                            <h2>{{defaultdata.westernFee | number}}元/m²/月</h2>
                        </div>
                        <div>
                            <h1>别墅</h1>
                            <h2>{{defaultdata.villaFee | number}}元/m²/月</h2>
                        </div>
                        <div>
                            <h1>商业</h1>
                            <h2>{{defaultdata.businessFee | number}}元/m²/月</h2>
                        </div>
                        <div>
                            <h1>车库</h1>
                            <h2>{{defaultdata.garageFee | number}}元/月/个</h2>
                        </div>
                    </div>
                </div>
                <div class="center_body">
                    <ul>
                        <li
                                v-for="(item,index) in tablelist"
                                :key="index"
                                :class="{active:index == num}"
                                @click="control(index)"
                        >{{item}}
                        </li>
                    </ul>
                    <div v-if="xs1">
                        <img :src="defaultdata.mapImg" alt/>
                    </div>
                    <div v-if="xs">
                        <div class="right">
                            <ul class="right_body">
                                <li v-for="(item,index) in defaultlist" :key="index">
                                    <h2>{{item.regulationsName}}</h2>
                                    <h3>{{item.keyPolicyInterpretation}}</h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="left">
                <div class="left_body">
                    <div>
                        <!-- table1 -->
                        <h1 class="titlezt">竞品项目物业费备案价</h1>
                        <div style="height:100%">
                            <el-table
                                    :data="defaultable2"
                                    :row-style="tableRowStyle"
                                    :header-cell-style="tableHeaderColor"
                                    height="80%"
                                    fit:true
                                    border
                                    style="width: 100%;font-size:10px;min-width:100%;"
                                    :show-overflow-tooltip="true"
                                    ref="configurationTable"
                                    v-scrollBar:el-table
                            >
                                <el-table-column
                                        prop="itemName"
                                        label="项目名称"
                                        align="left"
                                        width="80px"
                                        :show-overflow-tooltip="true"
                                >
                               
                                </el-table-column>
                                <el-table-column
                                        prop="aFeeSystem"
                                        label="是否一费制"
                                        min-width="60px"
                                        align="center"></el-table-column>
                                <el-table-column
                                        prop="highRiseFee"
                                        label="高层"
                                        min-width="30px"
                                        align="center">
                                    <template slot-scope="{row}">
                                        {{ row.highRiseFee== 0 ? "-":row.highRiseFee}}
                                    </template>
                                        </el-table-column>
                                <el-table-column
                                        prop="westernFee"
                                        label="洋房"
                                        min-width="30px"
                                        align="center"
                                >
                                    <template slot-scope="{row}">
                                        {{ row.westernFee== 0 ? "-":row.westernFee}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="villaFee"
                                        label="别墅"
                                        min-width="30px"
                                        align="center">
                                        
                                    <template slot-scope="{row}">
                                        {{ row.villaFee== 0 ? "-" : row.villaFee}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="businessFee"
                                        label="商业"
                                        min-width="30px"
                                        align="center">
                                    <template slot-scope="{row}">
                                        {{ row.businessFee== 0 ? "-" : row.businessFee}}
                                    </template>
                                        </el-table-column>
                                <el-table-column
                                        prop="garageFee"
                                        label="车库"
                                        min-width="30px"
                                        align="center">
                                    <template slot-scope="{row}">
                                        {{ row.garageFee== 0 ? "-" : row.garageFee}}
                                    </template>
                                        </el-table-column>
                                <el-table-column
                                        prop="remark"
                                        label="备注"
                                        align="center"
                                        min-width="30px"
                                        :show-overflow-tooltip="true"
                                ></el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div>
                        <h1 class="titlezt">金科自建项目物业费备案价</h1>
                        <el-table
                                border
                                :data="defaultable1"
                                :row-style="tableRowStyle"
                                :header-cell-style="tableHeaderColor"
                                height="80%"
                                fit:true
                                style="font-size:10px;min-width:100%;width:100%"
                                ref="configurationTable"
                                v-scrollBar:el-table
                        >
                            <el-table-column
                                    prop="itemName"
                                    label="项目名称"
                                    align="left"
                                    width="80px"
                                    :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                    prop="aFeeSystem"
                                    label="是否一费制"
                                    min-width="60px"
                                    align="center"
                                    :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                    prop="highRiseFee"
                                    label="高层"
                                    min-width="30px"
                                    align="center"
                                    :show-overflow-tooltip="true"
                            >
                                 <template slot-scope="{row}">
                                        {{ row.highRiseFee== 0 ? "-" : row.highRiseFee}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="westernFee"
                                    label="洋房"
                                    min-width="30px"
                                    align="center"
                                    :show-overflow-tooltip="true"
                            >
                                <template slot-scope="{row}">
                                        {{ row.westernFee== 0 ? "-" : row.westernFee}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="villaFee"
                                    label="别墅"
                                    min-width="30px"
                                    align="center"
                                    :show-overflow-tooltip="true"
                            >
                                 <template slot-scope="{row}">
                                        {{ row.villaFee== 0 ? "-" : row.villaFee}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="businessFee"
                                    min-width="30px"
                                    label="商业"
                                    align="center"
                                    :show-overflow-tooltip="true"
                            >
                                 <template slot-scope="{row}">
                                        {{ row.businessFee== 0 ? "-" : row.businessFee}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="garageFee"
                                    label="车库"
                                    min-width="30px"
                                    align="center"
                                    :show-overflow-tooltip="true"
                            >
                                <template slot-scope="{row}">
                                        {{ row.garageFee== 0 ? "-" : row.garageFee}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="备注"
                                    min-width="30px"
                                    align="center"
                                    :show-overflow-tooltip="true"
                            ></el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <h1 class="titlezt">当地政府物业费指导价</h1>
                        <el-table
                                border
                                :data="defaultable3"
                                height="96%"
                                fit:true
                                :row-style="tableRowStyle"
                                :header-cell-style="tableHeaderColor"
                                style="width: 100%;min-width:100%;font-size:10px"
                                ref="configurationTable"
                                v-scrollBar:el-table
                        >
                            <el-table-column prop="propertyClass" label="物业类别" align="left"
                                             width="80px"></el-table-column>
                            <el-table-column prop="serviceLevel" label="最高服务等级" min-width="74px"
                                             align="center"></el-table-column>
                            <el-table-column prop="standardPrice" label="最高基准价" min-width="68px"
                                             align="center"></el-table-column>
                            <el-table-column prop="limitedPrive" label="上浮后最高限价" min-width="90px"
                                             align="center"></el-table-column>
                        </el-table>
                        <div class="Explain">
                            <h1>上浮说明</h1>
                            <p>{{sfsm}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from "axios";
    export default {
        data() {
            return {
                defailtcity: "", //默认的省份数据
                name1: "",
                isshow: true,
                newid: "请选择城市",
                name: "",
                cityname: "", //默认的省份数据
                list: [], //数据值
                id: "", //默认的城市id
                citylist: [],
                provincelist: [],
                defaultdata: [], //物业费指导价
                defaultable1: [], //金科自建物业费备案价格
                defaultable2: [], //竞品项目物业费备案价
                defaultable3: [], //物业费政府指导价
                defaultlist: [], //关键政策解读列表
                tablelist: ["地图价格"], //切换列表
                // tablelist: ["地图价格", "关键政策解读"], //切换列表
                num: 0,
                xs: false,
                xs1: true,
                sfsm: "",
                style: {
                    height: ""
                }
            };
        },
        mounted() {
            this.getheight();
            // console.log(this.$route.query.name)
            this.cityname = this.$route.query.name;
            this.axios.get("/api/cityDataProvince").then(res => {
                // console.log(res.data.data)
                this.provincelist = res.data.data;
            });
            //请求默认显示的初始值id和城市列表
            axios
                .get("/api/cityData03?provinceName=" + encodeURI(this.cityname))
                .then(res => {
                    // console.log(res.data.data)
                    if (res.data.data[0] === undefined) {
                        // return false
                    } else {
                        this.newid = res.data.data[0].cityName; //下拉菜单默认显示第一条
                        this.id = res.data.data[0].id; //默认的初始页面id
                    }
                    this.citylist = res.data.data; //下拉菜单数据

                    // 获取物业费指导价数据
                    if (res.data.data[0] === undefined) {
                        //
                    } else {
                        axios.get("/api/cityData04?id=" + res.data.data[0].id).then(res => {
                            console.log(res.data.data)
                            this.defaultdata = res.data.data[0];

                            // console.log(res.data.data[0])
                        });
                        // 获取金科自建物业费备案价  table1
                        axios.get("/api/cityData05?id=" + res.data.data[0].id).then(res => {
                            // console.log(res.data.data)
                            this.defaultable1 = res.data.data;
                        });
                        // 获取竞品项目物业费备案价 table2
                        axios
                            .get("/api/cityData06?cityDataId=" + res.data.data[0].id)
                            .then(res => {
                                // console.log(res.data.data)
                                this.defaultable2 = res.data.data;
                            });
                        //获取物业费政府指导价          table3
                        axios
                            .get("/api/cityData08?cityDataId=" + res.data.data[0].id)
                            .then(res => {
                                this.defaultable3 = res.data.data;
                            });
                        // 关键政策解读
                        axios
                            .get("/api/cityData07?cityDataId=" + res.data.data[0].id)
                            .then(res => {
                                this.defaultlist = res.data.data;
                                // console.log(res.data.data)
                            });
                        // 城市当地政府物业费指导价上浮说明数据
                        this.axios.get("/api/cityDataRemark?id=" + this.id).then(res => {
                            this.sfsm = res.data.data[0].remark;
                        });
                    }
                });
            this.$nextTick(() => {
                this.$refs.configurationTable.doLayout();
            });
        },
        filters: {
            number: function (data) {
                if (data == undefined) {
                    // return false
                } else {
                    return data.toFixed(1);
                }
            }
        },
        watch: {
            //省市路由发生变化后执行再次赋值
            $route: {
                handler(newVal) {
                    this.cityname = newVal.query.name;
                    this.axios
                        .get("/api/cityData03?provinceName=" + encodeURI(this.cityname))
                        .then(res => {
                            this.newid = res.data.data[0].cityName;
                            this.defaultdata = res.data.data[0];
                            this.citylist = res.data.data; //下拉菜单数据
                        });
                }
            },
            defaultdata: {
                handler(newval) {
                    // console.log(newval.aFeeOrNotAFee==null)
                    if (newval.aFeeOrNotAFee == null) {
                        this.isshow = false;
                    } else {
                        this.isshow = true;
                    }
                }
            },
            deep: true, //深度监测
            immediate: true //将立即以表达式的当前值触发回调
        },
        methods: {
            getheight() {
                // console.log(window.innerHeight- 130)
                // 获取当前浏览器的高度赋值给元素
                this.style.height = window.innerHeight - 20 + "px";
            },
            // 城市切换
            change(name) {
                // 拿到当前选中的城市id
                this.id = name;
                // 获取物业指导价数据
                axios.get("/api/cityData04?id=" + name).then(res => {
                    // console.log(res.data.data[0])
                    this.defaultdata = res.data.data[0];
                });
                // 获取金科自建物业费备案价  table1
                axios.get("/api/cityData05?id=" + name).then(res => {
                    // console.log(res.data.data)
                    this.defaultable1 = res.data.data;
                    // console.log(this.defaultable1)
                });
                // 获取竞品项目物业费备案价 table2
                axios.get("/api/cityData06?cityDataId=" + name).then(res => {
                    // console.log(res.data.data)
                    this.defaultable2 = res.data.data;
                });
                //获取物业费政府指导价
                axios.get("/api/cityData08?cityDataId=" + name).then(res => {
                    // console.log(res.data.data)
                    this.defaultable3 = res.data.data;
                });
                // 关键政策解读
                axios.get("/api/cityData07?cityDataId=" + name).then(res => {
                    this.defaultlist = res.data.data;
                    // console.log(res.data.data)
                });
                // 城市当地政府物业费指导价上浮说明数据
                this.axios.get("/api/cityDataRemark?id=" + this.id).then(res => {
                    // console.log(res.data.data[0].remark)
                    this.sfsm = res.data.data[0].remark;
                });
                setTimeout(() => {
                    this.$refs.configurationTable.doLayout()
                }, 1200)
            },
            control(index) {
                this.num = index;
                if (index == 0) {
                    this.xs = false;
                    this.xs1 = true;
                } else {
                    this.xs = true;
                    this.xs1 = false;
                }
            },
            // 修改table tr行的背景色
            tableRowStyle() {
                // return "background-color: #fbfbfb";
            },
            // 修改table header的背景色
            tableHeaderColor({rowIndex}) {
                if (rowIndex === 0) {
                    return "background-color:#fbfbfb";
                }
            },
            // 省份切换
            provinceNamechange(cityname) {
                this.$router.push({path: "/city", query: {name: cityname}});
                location.reload();
            }
        }
    };
</script>

<style scoped>
    /* .active {
        border-bottom: 2px solid #3a9fda !important;
        color: #3a9fda !important;
    } */

    .container {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background: #eee;
    }

    .container > div {
        width: 50%;
        background: #fff;
        padding: 12px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
    }

    .container > div:nth-of-type(2) {
        margin: 0 0 0 10px;
    }

    .container > div:nth-of-type(3) {
        width: 20%;
    }

    .left_header > div {
        display: flex;
        justify-content: space-around;
        margin: 14px 0 24px;
    }

    .left_header > div > div {
        border: 2px solid #e5e5e5;
        width: 15%;
        min-width: 84px;
        border-radius: 5px;
        height: 48px;
        text-align: center;
    }

    .left_header > div > div:hover {
        background: #a9d0ea;
    }

    .left_header > div > div > h1 {
        font-size: 12px;
        color: #666;
        white-space: nowrap;
        line-height: 1;
        margin-top: 6px;
    }

    .left_header > div > div > h2 {
        font-size: 14px;
        color: #333;
        font-weight: 400;
        white-space: nowrap;
        line-height: 1;
        margin-top: 6px;
    }

    .left_body {
        height: 100%;
    }

    .left_body > ul {
        display: flex;
    }

    .left_body > ul > li:nth-of-type(1) {
        margin-right: 32px;
    }

    .left_body > ul > li {
        font-size: 16px;
        color: #333;
        white-space: nowrap;
        margin-bottom: 12px;
        padding-bottom: 8px;
    }

    .left_body > div {
        overflow: hidded;
    }

    .left_body > div:nth-of-type(1) {
        height: 30%;
        /* min-height: 300px */
    }

    .left_body > div:nth-of-type(2) {
        height: 30%;
    }

    .left_body > div:nth-of-type(3) {
        height: 31%;
    }

    .left_footer > h1 {
        font-size: 14px;
        color: #333;
        margin-bottom: 12px;
        white-space: nowrap;
        margin-top: 12px;
    }

    .center_header {
        display: flex;
        line-height: 58px;
        background: #e7ecf3;
    }

    .center_header > h2 {
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        color: #333;
        margin: 0 10px 0 12px;
    }

    .center_body > div > img {
        width: auto;
        height: auto;
        /* height: 518px; */
        max-height: 100%;
        display: block;
        margin: 90px auto 0 auto;
        max-width: 535px;
    }

    .right {
        min-width: 530px;
        max-height: 530px;
        overflow: hidden;
        overflow-x: hidden;
        overflow-y: scroll;
        /* 当IE下溢出，仍然可以滚动*/
        -ms-overflow-style: none;
        /*火狐下隐藏滚动条*/
        overflow: -moz-scrollbars-none;
    }

    .right::-webkit-scrollbar {
        /* 隐藏滚动条 */
        display: none;
    }

    .right_body > ul {
        font-size: 40px;
    }

    .right_body > li > h2 {
        line-height: 28px;
        color: #333;
        text-indent: 20px;
        font-size: 12px;
        word-wrap: break-word;
        word-break: break-all;
    }

    .right_body > li > h3 {
        line-height: 28px;
        color: #666;
        text-indent: 20px;
        font-size: 12px;
        word-wrap: break-word;
        word-break: break-all;
    }

    .titlezt {
        font-size: 14px;
        color: #333;
        margin-bottom: 12px;
        white-space: nowrap;
    }

    .titlezt:nth-of-type(2) {
        margin-top: 12px;
    }

    .sign {
        display: flex;
        width: 50%;
        margin-left: 5%;
        overflow: hidden;
    }

    .sign > div {
        line-height: 58px;
        padding-top: 17px;
    }

    .sign > div > h1 {
        font-size: 14px;
        font-weight: 600;
        margin-right: 30px;
        white-space: nowrap;
        line-height: 1;
        text-align: center;
    }

    .sign > div > h2 {
        font-size: 12px;
        font-weight: 400;
        margin-right: 30px;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        transform: scale(0.9);
    }

    .sign > span:nth-of-type(1) {
        font-size: 14px;
        background: #b3d9c0;
        margin-top: 18px;
        height: 20px;
        line-height: 20px;
        color: #049d4a;
        padding: 1px 5px;
        border-radius: 5px;
        margin-right: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .sign > span:nth-of-type(2) {
        font-size: 14px;
        background: #a9d0ea;
        margin: 10px 0;
        margin-top: 18px;
        height: 20px;
        line-height: 20px;
        color: #1e8ccc;
        padding: 1px 5px;
        border-radius: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .center_body > ul {
        display: flex;
        margin-bottom: 24px;
    }

    .center_body > ul > li:nth-of-type(2) {
        margin-left: 22px;
    }

    /* .center_body > ul > li {
        cursor: pointer;
    } */

    .Explain {
        height: 42px;
        border: 1px solid #f0f0f0;
        border-top-color: transparent;
        display: flex;
        justify-content: space-around;
    }

    .Explain > h1 {
        font-size: 10px;
        line-height: 42px;
        min-width: 162px;
        text-align: center;
        font-weight: 100;
        color: #606266;
        border-right: 1px solid #f0f0f0;
    }

    .Explain > p {
        width: 100%;
        font-size: 10px;
        color: #606266;
        height: 30px;
        overflow: hidden;
        overflow-y: auto;
        text-indent: 2em;
        padding-top: 12px;

        /* 当IE下溢出，仍然可以滚动*/
        -ms-overflow-style: none;
        /*火狐下隐藏滚动条*/
        overflow: -moz-scrollbars-none;
        scrollbar-width: none;
    }

    .Explain > p::-webkit-scrollbar {
        display: none;
    }

    .el-tooltip__popper {
        max-width: 400px;
    }

    .center_header > div {
        display: flex;
    }

    .left_body >>> .el-table__header-wrapper {
        height: 57px !important;
        line-height: 56px !important;
    }
</style>


<style>
    /* 全局修改表格内容太多隐藏后鼠标经过提示框的样式 */
    .el-tooltip__popper {
        max-width: 400px;
    }

    .left_body_header .el-table td,
    .el-table th {
        padding: 0;
        font-size: 12px;
    }

    .left_body_header {
        height: 100%;
    }

    .left_footer .el-table td,
    .el-table th {
        padding: 0;
    }

    .left_body_header .left_body_header .el-table td,
    .el-table th {
        font-size: 14px;
    }

    .left_body_header .cell {
        font-size: 14px;
    }

    .left_footer .cell {
        font-size: 14px;
    }

    .container {
        min-width: 1100px;
    }

    .left_body >>> .el-table--border th.gutter:last-of-type {
        display: block !important;
        width: 17px !important;
    }

    .left_body .el-table .cell, .el-table th div {
        padding-right: 0;
    }

    /* 能够解决表格在ie浏览器滚动条边缘样式问题 */
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        .gutter {
            display: block !important;
            width: 17px !important;
        }

    }


</style>
