<template>
    <div>
        <div class="container" :style="contentStyleObj">
            <div class="top">
                <div class="top_left">
                    <div class="top_left_header">
                        <ul>
                            <li @click="toSR" style="cursor: pointer;">
                                <h1 style="color:#2cabe3">收入</h1>
                                <h2 :title="yysrtitle.income">{{yysrtitle.income}}</h2>
                            </li>
                            <li>
                                <h1>利润</h1>
                                <h2 :title="yysrtitle.profit">{{yysrtitle.profit}}</h2>
                            </li>
                            <li>
                                <h1>回款</h1>
                                <h2 :title="yysrtitle.returnedMoney">{{yysrtitle.returnedMoney}}</h2>
                            </li>
                            <li>
                                <h1>人均效能</h1>
                                <h2 :title="yysrtitle.perCapita">{{yysrtitle.perCapita}}</h2>
                            </li>
                        </ul>
                    </div>
                    <div class="top_left_body">
                        <!-- <h3>营业收入占比</h3> -->
                        <div>
                            <yysrzb></yysrzb>
                        </div>
                    </div>
                </div>
                <div class="top_center">
                    <div class="top_left_header">
                        <ul>
                            <li>
                                <h1>在管项目总数</h1>
                                <h2 :title="yysrtitle.projectCount">{{yysrtitle.projectCount}}</h2>
                            </li>
                            <li>
                                <h1>住宅项目</h1>
                                <h2 :title="yysrtitle.projectResidenceCount">{{yysrtitle.projectResidenceCount}}</h2>
                            </li>
                            <li>
                                <h1>非住宅项目</h1>
                                <h2 :title="yysrtitle.projectNoResidenceCount">
                                    {{yysrtitle.projectNoResidenceCount}}</h2>
                            </li>
                        </ul>
                    </div>
                    <div class="top_left_body">
                        <div>
                            <xmfb :msg="msg"></xmfb>
                        </div>
                    </div>
                </div>
                <div class="top_right">
                    <ul>
                        <li
                                v-for="(item,index) in list1"
                                :key="index"
                                :class="{active:index==num1}"
                                @click="tab(index)"
                        >
                            <h2>{{item}}</h2>
                        </li>
                    </ul>
                    <div class="top_right_body">
                        <div>
                            <div class="top_right_body_one" v-if="show">
                                <topone :topone="topone" :num1="num1"></topone>  
                            </div>
                            <div class="top_right_body_two" v-if="show1">
                                <!-- <TOP1 :toptwo="toptwo" :num1="num1"></TOP1> -->
                                <toptwo :toptwo="toptwo" :num1="num1"></toptwo>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="bottom">
                <div class="top_left">
                    <div class="top_left_header">
                        <ul>
                            <li>
                                <h1>在管总面积</h1>
                                <h2 :title="yysrtitle.projectTubeArea">{{yysrtitle.projectTubeArea}}</h2>
                            </li>
                            <li>
                                <h1>住宅项目</h1>
                                <h2 :title="yysrtitle.projectTubeAreaResidence">
                                    {{yysrtitle.projectTubeAreaResidence}}</h2>
                            </li>
                            <li>
                                <h1>非住宅项目</h1>
                                <h2 :title="yysrtitle.projectTubeAreaNoResidence">
                                    {{yysrtitle.projectTubeAreaNoResidence}}</h2>
                            </li>
                        </ul>
                    </div>
                    <div class="top_left_body">
                        <div>
                            <wyxt></wyxt>
                        </div>
                    </div>
                </div>
                <div class="top_center">
                    <div class="top_left_header">
                        <ul>
                            <li>
                                <h1>报事总数</h1>
                                <h2 :title="yysrtitle.projectNewspapersCount">{{yysrtitle.projectNewspapersCount}}</h2>
                            </li>
                            <li>
                                <h1>完成报事数量</h1>
                                <h2 :title="yysrtitle.projectNewspapersCompletedCount">
                                    {{yysrtitle.projectNewspapersCompletedCount}}</h2>
                            </li>
                            <li>
                                <h1>完结率</h1>
                                <h2 :title="yysrtitle.projectNewspapersRate">{{yysrtitle.projectNewspapersRate}}</h2>
                            </li>
                        </ul>
                    </div>
                    <div class="top_left_body">
                        <div>
                            <wybs :msgtwo="msgtwo"></wybs>
                        </div>
                    </div>
                </div>
                <div class="top_right bottom_right">
                    <div>
                        <img src="@/assets/ima/development.png" alt="">
                        <h1>即将上线</h1>
                        <!-- <pzfwzb></pzfwzb> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import yysrzb from "@/components/echarts/zbsjhz/yysrzb"; //营业收入占比
    import xmfb from "@/components/echarts/zbsjhz/xmfb"; //项目分布
    import topone from "@/components/echarts/zbsjhz/TOPone"; //top节点达成率
    import toptwo from "@/components/echarts/zbsjhz/TOPtwo"; //top关键节点达成率
    import wyxt from "@/components/echarts/zbsjhz/wyxt"; //物业形态
    import wybs from "@/components/echarts/zbsjhz/wybs"; //物业报事
    export default {
        components: {
            yysrzb,
            xmfb,
            topone,
            toptwo,
            wyxt,
            wybs,
            // pzfwzb
        },
        data() {
            return {
                show: true,
                show1: false,
                num: null,
                num1: 0,
                contentStyleObj: {
                    height: ""
                },
                yysrtitle: [], //营业收入占比title数据
                list: [
                    {title: "升序", name: "iconiconasc iconfont"},
                    {title: "降序", name: "iconiconsort iconfont"}
                ],
                msg: [], //默认显示的项目分布数据为升序
                msgtwo: [],        //物业报事
                list1: ["TOP节点达成率", "TOP关键节点达成率"],
                topone: [],
                toptwo: []
            };
        },
        mounted() {
            this.getHight();

            // 获取营业收入占比title数据
            this.axios.get("/api/zb_002").then(res => {
                this.yysrtitle = res.data.data[0];
            });
            // 获取项目分布数据
            this.axios.get("/api/zb_006").then(res => {
                // console.log(res.data.data)
                var obj = res.data.data;
                this.msg = obj;
            });
            // 获取TOP节点达成率数据
            this.axios.get("/api/zb_001").then(res => {
                // console.log(res.data.data)
                res.data.data.sort(function (a, b) {
                    return b.nodeAchievingRate - a.nodeAchievingRate;
                });
                //   console.log(res.data.data)

                this.topone = res.data.data;
            });
            // 获取TOP关键节点达成率数据
            this.axios.get("/api/zb_005").then(res => {
                // console.log(res.data.data)

                res.data.data.sort(function (a, b) {
                    return b.rate - a.rate;
                });
                this.toptwo = res.data.data;
            });
            // 获取物业报事数据
            this.axios.get("/api/zb_007").then(res => {
                var obj = res.data.data;
                this.msgtwo = obj;
            });
        },
        methods: {
            toSR() {
                // this.$router
                this.$router.push("/qygssr")
            },
            xmfbpxsx() {  //   项目分布排序   升序
                this.axios.get("/api/zb_006").then(res => {
                    var obj = res.data.data;

                    function compare(property) {
                        return function (a, b) {
                            var value1 = a[property];
                            var value2 = b[property];
                            return value1 - value2;
                        };
                    }

                    this.msg = obj.sort(compare("projectCount"));
                });
            },

            xmfbpxjx() { //   项目分布排序  降序
                this.axios.get("/api/zb_006").then(res => {
                    var obj = res.data.data;

                    function compare(property) {
                        return function (a, b) {
                            var value1 = a[property];
                            var value2 = b[property];
                            return value2 - value1;
                        };
                    }

                    this.msg = obj.sort(compare("projectCount"));
                });
            },
            wybssx() {
                //项目分布数据升序
                this.axios.get("/api/zb_007").then(res => { //物业报事数据升序
                    var obj1 = res.data.data;

                    function compare(property) {
                        return function (a, b) {
                            var value1 = a[property];
                            var value2 = b[property];
                            return value1 - value2;
                        };
                    }

                    this.msgtwo = obj1.sort(compare("rate"));
                });
            },
            wybajx() {
                this.axios.get("/api/zb_007").then(res => { //物业报事数据降序
                    var obj1 = res.data.data;

                    function compare(property) {
                        return function (a, b) {
                            var value1 = a[property];
                            var value2 = b[property];
                            return value2 - value1;
                        };
                    }

                    this.msgtwo = obj1.sort(compare("rate"));
                });

            },


            getHight() {
                this.contentStyleObj.height = window.innerHeight - 20 + "px";
            },
            tab(index) {
                this.num1 = index;
                if (index == 0) {
                    this.show = true;
                    this.show1 = false;
                    this.axios.get("/api/zb_001").then(res => {
                        res.data.data.sort(function (a, b) {
                            return b.nodeAchievingRate - a.nodeAchievingRate;
                        });
                        this.topone = res.data.data;
                    });
                } else {
                    this.show = false;
                    this.show1 = true;
                    this.axios.get("/api/zb_005").then(res => {
                        res.data.data.sort(function (a, b) {
                            return b.rate - a.rate;
                        });
                        this.toptwo = res.data.data;
                    });
                }
            }
        }
    };
</script>


<style scoped>
    .container {
        background: #eeeeee;
        padding: 10px;
    }

    .top {
        min-height: 370px;
        margin-bottom: 10px;
        height: 49%;
        display: flex;
        /* justify-content: space-around */
    }

    .bottom {
        height: 49%;
        min-height: 372px;
        display: flex;
    }

    .bottom > div {
        background: #ffffff;
        border: 1px solid #e0dfe8;
    }

    .top > div {
        background: #ffffff;
        border: 1px solid #e0dfe8;
    }

    .top_left {
        width: 35%;
    }

    .top_center {
        width: 35%;
        margin: 0 8px 0 10px;
    }

    .top_right {
        width: 30%;
    }

    .top_left_header {
        height: 20%;
        min-height: 70px;
        margin: 0 20px;
        border-bottom: 1px dashed #f0f0f0;
    }

    .top_left_header > ul {
        display: flex;
        justify-content: space-around;
    }

    .top_left_header > ul > li {
        padding-top: 25px;
        width: 25%;
    }

    .top_left_header > ul > li > h1 {
        font-size: 14px;
        font-weight: 500;
        line-height: 1;
        text-align: center;
    }

    .top_left_header > ul > li > h2 {
        font-size: 20px;
        line-height: 1;
        font-weight: 500;
        margin-top: 10px;
        color: #fd7858;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .top_left_body {
        height: 80%;
        display: flex;
        align-items: center;
        position: relative;
    }

    .top_left_body > div {
        flex: 1;
    }

    .top_left_body > h3 {
        font-size: 14px;
        color: #666;
        position: absolute;
        top: 10px;
        left: 20px;
    }

    .top_right_body {
        display: flex;
        align-items: center;
        position: relative;
    }

    .top_right_body > div {
        flex: 1
    }

    .top_right > ul {
        display: flex;
        height: 18%;
        min-height: 60px;
        margin: 0 16px;
        /* background: powderblue */
    }

    .top_right > ul > li {
        margin-top: 25px;
        font-size: 14px;
        color: #666;
        padding-bottom: 5px;
        line-height: 1;
        height: 15px;
        cursor: pointer;
    }

    .top_right > ul > li > h2 {
        font-size: 14px;
        color: #666;
        padding-bottom: 5px;
        line-height: 1;
        height: 15px;
        font-weight: 500;
    }

    .top_right > ul > li:last-child {
        margin-left: 16px;
    }

    .active {
        color: #01aeee;
        border-bottom: 2px solid #01aeee;
    }

    .top_right_body {
        /* background:papayawhip; */
        height: 80%;
        position: relative;
    }

    .bottom_right {
        display: flex;
        align-items: center;
        justify-content: center
    }

    .bottom_right > div > h1 {
        text-align: center;
        font-weight: 500;
        font-size: 12px;
        margin-top: 14px;
        color: rgb(102, 102, 102);
    }

    .container {
        min-width: 1110px
    }

    /* .top_left_header>ul>li:nth-of-type(1){
      cursor: pointer;
    } */
</style>