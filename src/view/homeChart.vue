<template>
    <div id="homeChart" :style="{height:cHeight + 'px'}">
        <div class="header">
            <P>金科服务-项目体验表</P>
        </div>
        <div class="chartBox">
            <div class="leftBox">
                <div class="ltBox">
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconL iconP">
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconR iconP">
                    <homePie class="echarts"></homePie>
                </div>
                <div class="lbBox">
                    <header>单位能效</header>
                    <div class="colorBox">
                        <div class="sCloor" v-for="item in colorList">
                            <span class="cBox" :style="{background:item.color}"></span>
                            <p class="txt">{{item.txt}}</p>
                        </div>
                    </div>
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconL iconP">
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconR iconP">
                    <homeBar class="echarts1" v-for="item in list" :listData="item"></homeBar>
                </div>
            </div>
            <div class="centerBox">
                <div class="ctBox">
                    <div class="sctBox">
                        <span class="lable">区域</span>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="sctBox">
                        <span class="lable">项目</span>
                        <el-select v-model="value2" placeholder="请选择">
                            <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="txtBox">
                        <span class="spTxt">{{num.txt}}</span>
                        <p style="color:#8f9ebe"><span style="color:red">{{num.n1}}</span>/{{num.n2}}</p>
                    </div>

                </div>
                <div class="ccBox">
                    <homeRadar class="echarts"></homeRadar>
                    <img class="ring" src="@/assets/ima/chart_radar.png" alt="">
                </div>
            </div>
            <div class="rightBox">
                <div class="rtBox">
                    <header>项目管理</header>
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconL iconP">
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconR iconP">
                    <homeLine class="echarts"></homeLine>
                </div>
                <div class="rtBox">
                    <header>项目成本分析</header>
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconL iconP">
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconR iconP">
                    <homeBarX class="echarts"></homeBarX>
                </div>

                <div class="rbBox">
                    <header>项目成本分析</header>
                    <p class="text">{{text}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import homePie from '../components/echarts/homeChart/homePie'
    import homeBar from '../components/echarts/homeChart/homeBar'
    import homeLine from '../components/echarts/homeChart/homeLine'
    import homeBarX from '../components/echarts/homeChart/homeBarX'
    import homeRadar from '../components/echarts/homeChart/homeRadar'
    export default {
        name: "homeChart",
        data() {
          return {
              cHeight:document.documentElement.clientHeight,
              list:[{
                  title:'人均营收（含外包）'
              },{
                  title:'方均营收'
              },{
                  title:'人均园区营收（含外包）'
              },{
                  title:'方均园区营收'
              },{
                  title:'人均利润（含外包）'
              },{
                  title:'方均利润'
              }],
              colorList:[{
                  color:'#00a0e9',
                  txt:'最大值'
              },{
                  color:'#fca751',
                  txt:'项目值'
              },{
                  color:'#5bc3d2',
                  txt:'平均值'
              }],
              text:'百度（纳斯达克：BIDU），全球最大的中文搜索引擎及最大的中文网站，全球领先的人工智能公司。百度愿景是：成为最懂用户，并能帮助人们成长的全球顶级高科技公司。“百度”二字，来自于八百年前南宋词人辛弃疾的一句词：众里寻他千百度。这...',
              options: [{
                  value: '1',
                  label: '重庆区域公司'
              }],
              value: '1',
              options2: [{
                  value: '1',
                  label: '金科十年城'
              }],
              value2: '1',
              num:{
                  txt:'成熟期',
                  n1:77,
                  n2:116
              }
          }
        },
        created() {
            window.console.log(this.cHeight)
        },
        components:{
            homePie,
            homeBar,
            homeLine,
            homeBarX,
            homeRadar
        },
    }
</script>

<style scoped>
    #homeChart{
        display: flex;
        flex-direction: column;
        min-width: 1366px;
        height: 100%;
        background: url("../assets/ima/Nbj.png");
        background-size: cover;
    }
    #homeChart .header{
        width: 100%;
        height: 56px;
        background: url("../assets/ima/header_bj.png");
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #homeChart .header p{
        color:#46CCF4;
        font-size: 24px;
    }
    #homeChart .chartBox{
        display: flex;
        justify-content: space-around;
        flex-grow: 1;
        width: 100%;
    }
    .leftBox{
        width: 29%;
        height: 100%;
    }
    .ltBox{
        position: relative;
        width: 100%;
        height: 40%;
        border:1px solid #2e447e;
        border-radius: 8px;
        margin-top: 8px;
    }
    .iconP{
        height: 100%;
        width: 1px;
        position: absolute;
        top: 0;
    }
    .iconP.iconR{
        right: 0;
    }
    .lbBox{
        margin-top: 8px;
        position: relative;
        width: 100%;
        height: 57%;
        border:1px solid #2e447e;
        border-radius: 8px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .centerBox{
        width: 39%;
        height: 100%;
        border:1px solid #1e8ccc;
    }
    .ccBox{
        position: relative;
        width: 100%;
        height: 430px;
    }
    .ring{
        position: absolute;
        bottom: 47px;
        left:50%;
        margin-left: -248px;
    }
    .rightBox{
        width: 29%;
        height: 100%;
    }
    .rtBox{
        position: relative;
        width: 100%;
        height: 40%;
        border:1px solid #2e447e;
        border-radius: 8px;
        margin-top: 8px;
    }
    .rbBox{
        margin-top: 8px;
        border:1px solid #2e447e;
        border-radius: 8px;
    }

    .colorBox{
        display: flex;
        justify-content: flex-end;
        width: 100%;
        margin-top: -37px;
        margin-right: 15px;
    }
    .sCloor{
        width: 60px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .txt{
        color:#c5d6f8;
        font-size: 12px;
        margin-top: -4px;
    }
    .cBox{
        width: 12px;
        height: 12px;
        display: block;
        margin-right: 5px;
    }

    .text{
        font-size: 12px;
        color:#c5d6f8;
        padding: 0 15px;
        line-height: 1.95;
    }
    .ctBox{
        display: flex;
        margin-top: 20px;
    }
    .lable{
        color:#fff;
        margin-right: 10px;
        margin-left: 30px;
    }
    .spTxt{
        color:#fff;
        font-size: 12px;
    }
    .txtBox{
        margin-left: 30px;
    }


    header{
        width: 100%;
        height: 46px;
        line-height: 46px;
        color:#fff;
        font-weight: 500;
        text-indent: 20px;
        background: url("../assets/ima/chart_headr.png");
        background-size: cover;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
</style>

<style>
    #homeChart .el-input__icon{
        line-height: 30px;
    }
    #homeChart .el-input__inner{
        height: 30px;
        background: transparent;
        border:1px solid #09477a;
        outline: none;
        color:#fff;
    }
    #homeChart .el-select{
        width: 150px;
    }
</style>