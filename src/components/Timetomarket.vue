<!--物业公司上市时间图 -->

<template>
    <div>
        <div class="box">
            <h1>上市时间图</h1>
            <div class="container container_hover">
                <div class="fuhezi_left"></div>
                <div class="fuhezi_right"></div>
                <span class="sjx" @click="rightbtn"></span>
                <div class="Line">
                    <div>
                        <div class="assembly" ref="tabs">
                            <div class="fuhezi" v-for="(item,index) in list" :key="index">
                                <b class="dian"></b>
                                <span class="Arrow"></span>
                                <i class="line"></i>
                                <ul class="Label">
                                    <li :title="item.companyName.split(',')[0]">{{item.companyName.split(",")[0]}}</li>
                                    <li :title="item.companyName.split(',')[1]">{{item.companyName.split(",")[1]}}</li>
                                    <li :title="item.companyName.split(',')[2]">{{item.companyName.split(",")[2]}}</li>
                                    <li :title="item.companyName.split(',')[3]">{{item.companyName.split(",")[3]}}</li>
                                    <li :title="item.companyName.split(',')[4]">{{item.companyName.split(",")[4]}}</li>
                                    <li :title="item.companyName.split(',')[5]">{{item.companyName.split(",")[5]}}</li>
                                    <li :title="item.companyName.split(',')[6]">{{item.companyName.split(",")[6]}}</li>
                                    <li :title="item.companyName.split(',')[7]">{{item.companyName.split(",")[7]}}</li>
                                    <li :title="item.companyName.split(',')[8]">{{item.companyName.split(",")[8]}}</li>
                                    <li :title="item.companyName.split(',')[9]">{{item.companyName.split(",")[9]}}</li>
                                    <li :title="item.companyName.split(',')[10]">{{item.companyName.split(",")[10]}}
                                    </li>
                                    <li :title="item.companyName.split(',')[11]">{{item.companyName.split(",")[11]}}
                                    </li>
                                </ul>
                                <li class="year">{{item.year}}年</li>
                            </div>

                        </div>
                    </div>


                </div>
                <span class="sjx1" @click="leftbtn"></span>


            </div>


        </div>


    </div>
</template>


<script>
    export default {
        data() {
            return {
                list: [],
                number: 0,
                year: [],
                frequency:false

            }
        },
        mounted() {
            //获取上市公司列表数据
            this.axios.get("/api/listedCompany12").then((res) => {
                if(res.data.data.length>7){
                    this.frequency=true
                }
                this.list = res.data.data
                this.year = []
                res.data.data.forEach(element => {
                    this.year.push(element.year)
                });

            })
        },
        methods: {
            leftbtn() {
                this.number = 0
                this.$refs.tabs.style.left = 0 + "px"
            },
            rightbtn() {
                if(this.frequency==true){
                    this.number--
                    if (this.number >= -3) {
                        this.$refs.tabs.style.left = (this.number * 90) + "px"
                    } else {
                        this.number = -3
                    }
                }

            }
        }
    }
</script>
<style scoped>
    .box {
        background: #fff;
        position: relative;
        height: 373px;
        overflow: hidden;
    }

    .box > h1 {
        color: #333;
        font-size: 14px;
        line-height: 50px;
        text-align: center;
        background: #fff;
        color: #333;
        font-weight: 600;
        text-align: left;
        text-indent: 10px;
        padding: 0 17px;
    }

    .container {
        height: 352px;
        width: 100%;
        overflow: hidden;

    }

    .Line {
        width: 96%;
        border-bottom: 1px dashed #999;
        position: absolute;
        height: 1px;
        top: 53%;
        left: 3%;
        right: 0;
        bottom: 0;
    }

    .sjx {
        border: 16px solid #999;
        position: absolute;
        border-top-color: transparent;
        border-right: transparent;
        border-bottom-color: transparent;
        right: -12px;
        top:184px;
        z-index: 2;
        cursor: pointer;
        transition: all 0.4s
    }
    .sjx1 {
        border: 16px solid #999;
        position: absolute;
        border-top-color: transparent;
        border-left: transparent;
        border-bottom-color: transparent;
        left: 18px;
        top: 184px;
        z-index: 2;
        cursor: pointer;
        transition: all 0.4s
    }
    .container_hover:hover .sjx1{
        left: 36px;
    }
    .container_hover:hover .sjx{
        right: 22px;
    }
    .fuhezi {
        position: relative;
        width: 110px;
        margin:0 20px;
    }
    /* 鼠标经过事件 */
    .fuhezi:nth-child(odd) > .Label:hover {
        position: absolute;
        height: auto;
        min-height: 89px;
        z-index: 10;
    }
    /* 鼠标经过事件 */
    .fuhezi:nth-child(even) > .Label:hover {
        position: absolute;
        bottom: 0px;
        z-index: 10;
        top: -34px;
        min-height: 89px;
    }

    .fuhezi:nth-child(odd) {
        top:36px
    }

    .fuhezi:nth-child(even) {
        bottom: 136px
    }

    .Label {
        width: 110px;
        height: 56px;
        background: #fff;
        position: relative;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        overflow-y: auto;
        /* 当IE下溢出，仍然可以滚动*/
        -ms-overflow-style: none;
        /*火狐下隐藏滚动条*/
        overflow: -moz-scrollbars-none;
        scrollbar-width: none
    }

    /* 清除谷歌的浏览器 */
    .Label::-webkit-scrollbar {
        display: none
    }


    .Label > li {
        line-height: 23px;
        width:100%;
        font-size: 14px;
        color: #333;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 110px

    }

    /* 单数样式 */
    .fuhezi:nth-last-child(odd) .year {
        background: #a889e9;
        top: -33px;
        color: #fff;
        text-align: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    /* 双数样式 */
    .fuhezi:nth-last-child(even) .year {
        background: #a889e9;
        bottom: -33px;
        color: #fff;
        text-align: center;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    /* 1 ,4,7 UL的样式 */
    .fuhezi:nth-last-child(3n+1) .year {
        background: #2cabe3;
        color: #fff;
        text-align: center;
    }

    /* 2,5,8，样式 */
    .fuhezi:nth-last-child(3n+0) .year {
        background: #39c359;
        bottom: -33px;
        color: #fff;
        text-align: center;
    }

    .year {
        background: #fff;
        position: absolute;
        width: 110px;
        height: 33px;
        padding-top: 7px;
    }

    /* 最大向左-860px */
    .assembly {
        /* width: 1000px; */
        /* width: 90%; */
        position: absolute;
        transition: all 0.5s;
        display: flex;
        top: 21px;
        left: 85px;
    }

    /* 向上的尖角 */
    .fuhezi:nth-last-child(even) .Arrow {
        display: block;
        border: 10px solid #FCFCFC;
        position: absolute;
        border-top-color: transparent;
        border-right-color: transparent;
        border-left-color: transparent;
        position: absolute;
        top: -20px;
        z-index: 1;
        left: 45px;
    }

    /* 向下的尖角 */
    .fuhezi:nth-last-child(odd) .Arrow {
        display: block;
        border: 10px solid #FCFCFC;
        position: absolute;
        border-bottom-color: transparent;
        border-right-color: transparent;
        border-left-color: transparent;
        position: absolute;
        bottom: -20px;
        z-index: 1;
        left: 45px;

    }

    .fuhezi:nth-last-child(odd) .dian {
        bottom: -67px;
        left: 49px

    }

    .fuhezi:nth-last-child(even) .dian {
        top: -63px;
        left: 49px

    }

    .fuhezi .dian {
        width: 7px;
        height: 7px;
        background: #666;
        display: block;
        border-radius: 50%;
        position: absolute;
        z-index: 1;
        border: 3px solid #999

    }

    .fuhezi .line {
        display: block;
        border-right: 1px dashed #d2d2d2;

        position: absolute;
        z-index: 1;
    }

    .fuhezi:nth-last-of-type(odd) .line {
        bottom: -50px;
        left: 55px;
        height: 40px;
    }

    .fuhezi:nth-last-of-type(even) .line {
        top: -50px;
        left: 55px;
        height: 40px;
    }

    .Label > li:first-child {
        margin-top: 10px
    }

    .fuhezi:nth-last-of-type(even) .Label > li:first-child {
        margin-top: 0px
    }

    .fuhezi_left {
        width: 34px;
        background: #fff;
        height: 100%;
        position: absolute;
        left: 00px;
        z-index: 10;
    }

    .fuhezi_right {
        width: 22px;
        background: #fff;
        height: 100%;
        position: absolute;
        right: 0;
        z-index: 10;
    }
</style>
