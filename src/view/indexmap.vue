<template>

    <!-- 地图页面城市首页 -->
    <div>
        <div class="box" @click="hide">
            <div class="left">
                <div class="cover"></div>
                <div class="positionbox">
                    <h1>金科服务在中国</h1>
                    <div>
                        <div>
                            <h1 class="_text">省份</h1>
                            <div style="display:flex;padding-left:52px">
                               <h2 v-for="(item,index) in sf" :key="index" class="textstyle"> {{item}}</h2>
                            </div>
                        </div>
                        <div>
                            <h1 class="_text">地级市</h1>
                             <div style="display:flex;padding-left:52px">
                               <h2 v-for="(item,index) in djs" :key="index" class="textstyle"> {{item}}</h2>
                            </div>
                        </div>
                        <div>
                            <h1 class="_text">县级市</h1>
                             <div style="display:flex;padding-left:52px">
                               <h2 v-for="(item,index) in xjs" :key="index" class="textstyle"> {{item}}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <Chinamap class="echarts"></Chinamap>
            </div>
            <div class="btn" @click.stop="togglePanel">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="right" v-show="visible" ref="main">
                <div>
                    <h1>行业资料</h1>
                    <ul>
                        <li v-for="(item,index) in list" :key="index" class="list" v-if="index<8"
                            @click="btn(item.dataUrl)">
                            {{index+1}}.{{item.dataName}}
                        </li>
                    </ul>
                </div>

            </div>

        </div>

    </div>
</template>


<script>
    import Chinamap from '@/components/echarts/chinamap'


    export default {
        data() {
            return {
                list: [],
                msg: [],
                visible: false,
                sf:"",
                djs:"",
                xjs:""
            }
        },
        components: {
            Chinamap
        },
        mounted() {

            // 获取到右侧数据报表数据
            this.axios.get("/api/cityData09").then((res) => {
                // console.log(res.data.data)
                this.list = res.data.data

            })
            // 获取左侧服务展示数据
            this.axios.get("/api/cityData02").then((res) => {
          
                this.sf=(res.data.data[0].provinceCount+"").split("")
                this.djs=(res.data.data[0].prefectureCount+"").split("")
                this.xjs=(res.data.data[0].cityCount+"").split("")
                
            })

            document.addEventListener('click', () => {
                // console.log(document)
                if (this.visible == true) {
                    var togo = document.getElementsByClassName("right")[0]
                    this.visible = togo.contains(event.target)
                }
            })
        },
        methods: {
            btn(data) {
                window.open(data)
            },
            togglePanel() {
                this.visible = true
            },
            hide() {
                this.visible = false
            }
        },

    }
</script>


<style scoped>
    .cover {
        background: transparent;
        width: 20%;
        height: 100vh;
        position: absolute;
        left: 0;
        z-index: 10;
    }

    .box {
        height: 100%;
        width: 100%;
        background: url(../assets/ima/bj.png) no-repeat 0 0;
        background-size: 100% 100%;
        position: relative;
    }

    .left {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .positionbox {
        background: url("../assets/ima/data_bj.png") no-repeat 0 0;
        background-size: 100% 100%;
        width: 250px;height: 365px;
        position: absolute;
        right: 4%;
        top: 30%;
        z-index: 10;
        /* background: transparent; */
        text-align: center;

    }

    .positionbox > h1 {
        text-align: left;
        font-size: 20px;
        color: #fff;
        margin-bottom: 20px;
        font-weight: 500;
        text-align: center;
        margin: 35px 0;
    }

    .positionbox > div>div {
        

    }

    .right {
        width: 300px;
        padding: 12px;
        padding-left: 0;
        position: absolute;
        top: 20px;
        right: 10px;
        z-index: 10

    }

    .right > div {
        width: 100%;
        height: 90vh;
        border: 1px solid #e5e5e5;
        padding: 20px;
        box-sizing: border-box;
        background: #fff;
        overflow-y: auto;
        /* 当IE下溢出，仍然可以滚动*/
        -ms-overflow-style: none;
        /*火狐下隐藏滚动条*/
        overflow: -moz-scrollbars-none;

    }

    .right > div::-webkit-scrollbar {
        /* 隐藏滚动条 */
        display: none;
    }

    .btn {
        position: absolute;
        top: 50%;
        right: 0;
        background: #ffb400;
        width: 20px;
        height: 40px;
        text-align: center;
        cursor: pointer;
        transform: translate(0, -50%);
        color: #fff;
        z-index: 99
    }

    .right > div > ul {
        width: 100%;
        overflow-y: auto;
        /* 当IE下溢出，仍然可以滚动*/
        -ms-overflow-style: none;
        /*火狐下隐藏滚动条*/
        overflow: -moz-scrollbars-none;
        scrollbar-width: none
    }

    .right > div > ul::-webkit-scrollbar {
        display: none;
    }

    .right > div > h1 {
        font-size: 16px;
        color: #333;
        margin-bottom: 18px

    }

    .list {
        cursor: pointer;
        font-size: 16px;
        color: #666;
        line-height: 40px;
        text-decoration: underline;

    }
    ._text{
        font-size: 14px;
        color: #fff;
        text-align: left;
        text-indent: 52px;
    }


    .echarts {
        height: 100vh;
    }

    .el-icon-arrow-left {
        line-height: 40px
    }
    .textstyle{
        height:42px ;
        width: 40px;
        font-size: 36px;
        color: #2ab1ea;
        background: #354474;
        border-radius: 5px;
        margin-bottom: 20px;
        margin-top: 6px;
    }
    .positionbox>div>div>div>h2:nth-of-type(2){
        margin: 6px 8px 0 8px;
    }
</style>