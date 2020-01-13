<template>
    <div id="homeChart">
        <div class="header">
            <P>金科服务-项目体验表</P>
        </div>
        <div class="chartBox">
            <div class="leftBox">
                <div class="ltBox">
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconL iconP">
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconR iconP">
                    <homePie class="echarts" :pieData="pieData"></homePie>
                </div>
                <div class="lbBox">
                    <header>单位能效</header>
                    <div class="colorBox">
                        <div class="sCloor" v-for="(item,index) in colorList" :key="index">
                            <span class="cBox" :style="{background:item.color}"></span>
                            <p class="txt">{{item.txt}}</p>
                        </div>
                    </div>
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconL iconP">
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconR iconP">
                    <homeBar class="echarts1" v-for="(item,index) in list" :listData="item" :key="index"></homeBar>
                </div>
            </div>
            <div class="centerBox">
                <div class="ctBox">
                    <div class="sctBox">
                        <span class="lable">区域</span>
                        <el-select v-model="value" placeholder="请选择" @change="inp1Change">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.companyName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="sctBox">
                        <span class="lable">项目</span>
                        <el-select v-model="value2" placeholder="请选择" @change="inp2Change">
                            <el-option
                                    v-for="item in options2"
                                    :key="item.projectId"
                                    :label="item.projectName"
                                    :value="item.projectId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="txtBox">
                        <span class="spTxt">{{projectType}}</span>
                        <p style="color:#8f9ebe"><span style="color:red">{{nodeCompleted}}</span>/{{nodeNumber}}</p>
                    </div>

                </div>
                <div class="ccBox">
                    <homeRadar class="echarts" :radarData="radarData"></homeRadar>
                    <img class="ring" src="@/assets/ima/chart_radar.png" alt="">
                </div>
                <div class="cbBox">
                    <ul class="iconWrap">
                        <li class="iconBook">
                            <div class="iconBox">
                                <span class="iconfont  iconshouru "></span>
                            </div>
                            <div class="iTxtBox">
                                <span>收入</span>
                                <p>{{num1}}<span class="sml">万元</span></p>
                            </div>
                        </li>
                        <li class="iconBook">
                            <div class="iconBox" style="background: #88acff">
                                <span class="iconfont  iconlirun "></span>
                            </div>
                            <div class="iTxtBox">
                                <span>利润</span>
                                <p>{{num2}}<span class="sml">万元</span></p>
                            </div>
                        </li>
                        <li class="iconBook">
                            <div class="iconBox" style="background: #5bc3d2">
                                <span class="iconfont  iconyuanqu "></span>
                            </div>
                            <div class="iTxtBox">
                                <span>园区</span>
                                <p>{{num3}}<span class="sml">万元</span></p>
                            </div>
                        </li>
                        <li class="iconBook">
                            <div class="iconBox" style="background: #00b7ee">
                                <span class="iconfont  iconshoufeishuai "></span>
                            </div>
                            <div class="iTxtBox">
                                <span>收费率</span>
                                <p>{{num4}}<span class="sml">%</span></p>
                            </div>
                        </li>
                        <li class="iconBook">
                            <div class="iconBox" style="background: #fca751">
                                <span class="iconfont  iconmubiaoshu "></span>
                            </div>
                            <div class="iTxtBox">
                                <span>目标书得分</span>
                                <p>{{num5}}<span class="sml"></span></p>
                            </div>
                        </li>
                        <li class="iconBook">
                            <div class="iconBox" style="background: #c490bf">
                                <span class="iconfont  iconzonghe "></span>
                            </div>
                            <div class="iTxtBox">
                                <span>综合得分</span>
                                <p>{{num6}}<span class="sml"></span></p>
                            </div>
                        </li>
                    </ul>
                    <p class="tip">备注：此得分只做为经营管理参考用，不作为考核使用</p>
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconL iconP">
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconR iconP">
                </div>
            </div>
            <div class="rightBox">
                <div class="rtBox">
                    <header>项目管理</header>
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconL iconP">
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconR iconP">
                    <homeLine class="echarts" :lineData="lineData"></homeLine>
                </div>
                <div class="rtBox">
                    <header>项目成本分析</header>
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconL iconP">
                    <img src="@/assets/ima/chart_chat.png" alt="" class="iconR iconP">
                    <homeBarX class="echarts" :barXData="barXData"></homeBarX>
                </div>
                <div class="rbBox">
                    <header>说明内容</header>
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
              list:[],
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
              options: [],
              value: '1',
              options2: [{
                  value: '1',
                  label: '金科十年城'
              }],
              value2: '1',
              num1:'1301',
              num2:'1301',
              num3:'1301',
              num4:'1301',
              num5:'1301',
              num6:'1301',
              pieData:[],
              barData:[],
              lineData:[],
              barXData:[],
              radarData:[],
              nodeNumber:"",
              projectType:"",
              nodeCompleted:''
          }
        },
        created() {
            // window.console.log(this.$route.query.projectId)
            this.getRegion();
        },
        methods:{
            //获取区域
            getRegion(){
                this.axios.get("/api/projectCompanyList").then((res)=>{
                    // this.list=res.data.data
                    this.options = res.data.data;
                    this.value = res.data.data[0].id;
                    this.getProject();
                });
            },
            //获取项目
            getProject(){
                this.axios.get("/api/projectBycId?companyId=" + this.value).then((res)=>{
                    // this.list=res.data.data
                    this.options2 = res.data.data;
                    this.value2 = res.data.data[0].projectId;
                    this.setProfit(this.value2);
                    this.setEfficiency(this.value2);
                    this.setManage(this.value2);
                    this.setCost(this.value2);
                    this.setOctagon(this.value2)
                })
            },
            //区域改变
            inp1Change(){
                this.getProject()
            },
            //项目改变
            inp2Change(){
                this.setProfit(this.value2);
                this.setEfficiency(this.value2);
                this.setManage(this.value2);
                this.setCost(this.value2);
                this.setOctagon(this.value2)
            },
            //收入赋值
            setProfit(val){
                this.axios.get("/api/tj005?projectId=" + val).then((res)=>{
                    // console.log(res)
                    this.pieData = res;
                })
            },
            //能效赋值
            setEfficiency(val){
                this.axios.get("/api/tj002?projectId=" + val).then((res)=>{
                    this.barData = res.data.data;
                    // window.console.log( res.data.data)
                    // 'PeopleRevenue', //人均营收
                    // 'tubeAreaRevenue', //方均营收
                    // 'GardenPeopleRevenue', //园区人均营收
                    // 'GardentubeAreaRevenue', //园区方均营收
                    // 'ProfitPeopleRevenue', //人均利润
                    // 'ProfittubeAreaRevenue' //方均利润
                    let list = [{
                        title: '人均营收（含外包）',
                        arr:[this.barData[2].PeopleRevenue,this.barData[0].PeopleRevenue,this.barData[1].PeopleRevenue]
                    },{
                        title: '方均营收',
                        arr:[this.barData[2].tubeAreaRevenue,this.barData[0].tubeAreaRevenue,this.barData[1].tubeAreaRevenue]
                    },{
                        title: '人均园区营收（含外包）',
                        arr:[this.barData[2].GardenPeopleRevenue,this.barData[0].GardenPeopleRevenue,this.barData[1].GardenPeopleRevenue]
                    },{
                        title: '方均园区营收',
                        arr:[this.barData[2].GardentubeAreaRevenue,this.barData[0].GardentubeAreaRevenue,this.barData[1].GardentubeAreaRevenue]
                    },{
                        title: '人均利润（含外包）',
                        arr:[this.barData[2].ProfitPeopleRevenue,this.barData[0].ProfitPeopleRevenue,this.barData[1].ProfitPeopleRevenue]
                    },{
                        title: '方均利润',
                        arr:[this.barData[2].ProfittubeAreaRevenue,this.barData[0].ProfittubeAreaRevenue,this.barData[1].ProfittubeAreaRevenue]
                    }];

                    this.list = list;

                })
            },
            //管理赋值
            setManage(val){
                this.axios.get("/api/tj003?projectId=" + val).then((res)=>{
                    let data = res.data.data;
                    let list = {
                        list1:[
                            data[0].m01,
                            data[0].m02,
                            data[0].m03,
                            data[0].m04,
                            data[0].m05,
                            data[0].m06,
                            data[0].m07,
                            data[0].m08,
                            data[0].m09,
                             data[0].m10,
                             data[0].m11,
                            data[0].m12,
                        ],
                        list2:[
                            data[1].m01,
                            data[1].m02,
                            data[1].m03,
                            data[1].m04,
                            data[1].m05,
                            data[1].m06,
                            data[1].m07,
                            data[1].m08,
                            data[1].m09,
                            data[1].m10,
                            data[1].m11,
                            data[1].m12,
                        ],
                        list3:[
                            data[2].m01,
                            data[2].m02,
                            data[2].m03,
                            data[2].m04,
                            data[2].m05,
                            data[2].m06,
                            data[2].m07,
                            data[2].m08,
                            data[2].m09,
                            data[2].m10,
                            data[2].m11,
                            data[2].m12,
                        ]
                    };
                    this.lineData = list;
                })
            },
            //成本分析
            setCost(val){
                this.axios.get("/api/tj004?projectId=" + val).then((res)=>{
                    let data = res.data.data;
                    let obj = {
                        list1:[],
                        list2:[]
                    };
                    data.forEach(e => {
                        obj.list1.push(e.type);
                        obj.list2.push(e.number);
                    });
                    this.barXData = obj;
                })
            },
            //八边型
            setOctagon(val){
                this.axios.get("/api/tj001?projectId=" + val).then((res)=>{
                    // this.pieData = res;
                    this.nodeNumber=res.data.data[0].nodeNumber
                    this.projectType=res.data.data[0].projectType
                    this.nodeCompleted=res.data.data[0].nodeCompleted
                    
                    this.text = res.data.data[0].commentExplain;
                    this.num1 = res.data.data[0].projectRevenue;
                    this.num2 = res.data.data[0].projectProfit;
                    this.num3 = res.data.data[0].projectGarden;
                    this.num4 = res.data.data[0].projectToll;
                    this.num5 = res.data.data[0].targetScore;
                    this.num6 = res.data.data[0].synthesizeScore;
                    //园区 利润 营收 年度目标 人均效能 人员管理 收费 客服
                    let list = [
                        res.data.data[0].gardenScore,
                        res.data.data[0].profitScore,
                        res.data.data[0].revenueScore,
                        res.data.data[0].annualGoalScore,
                        res.data.data[0].perCapitaEfficiencyScore,
                        res.data.data[0].peopleManagementScore,
                        res.data.data[0].tollScore,
                        res.data.data[0].customerServiceScore
                    ]
                    // console.log(list)
                    this.radarData = list;
                })
            }
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
        min-height: 56px;
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
        min-height: 350px;
        height: 40%;
        border:1px solid #2e447e;
        border-radius: 8px;
        margin-top: 8px;
    }
    .cbBox{
        position: relative;
        width: 100%;
        height: 33%;
        border:1px solid #2e447e;
        border-radius: 8px;
        margin-top: 1px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .iconP{
        height: 100%;
        width: 1px;
        position: absolute;
        top: 0;
        left: 0;
    }
    .iconP.iconR{
        right: 0;
    }
    .lbBox{
        margin-top:6px;
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
    }
    .ccBox{
        position: relative;
        width: 100%;
        height: 430px;
        margin-top: 65px;
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
        min-height: 352px;
        height: 40%;
        border:1px solid #2e447e;
        border-radius: 8px;
        margin-top: 6px;
    }
    .rbBox{
        margin-top: 5px;
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
        height: 93px;
        font-size: 12px;
        color:#c5d6f8;
        padding: 0 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-height: 2.6;
        -webkit-box-orient: vertical;
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
    .iconBook{
        display: flex;
        width: 30%;
        height: 85px;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(#0a2341, #02324e);
        border:1px solid #1e3359;
        list-style: none;
        margin-bottom: 10px;
    }
    .iconBox{
        width: 38px;
        height: 38px;
        background: #ff7899;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
    }
    .iconBox > span{
        color:#fff;
        font-size: 22px;
    }
    .iTxtBox{
        margin-left: 10px;
    }
    .iTxtBox > p{
        color:#fff;
        margin-top: 5px;
    }
    .iTxtBox > span{
        color:#c0d1f3;
        font-size: 12px;
    }
    .iTxtBox .sml{
        font-size: 12px;
    }
    .iconWrap{
        width: 90%;
        min-width: 525px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin:30px 0 20px;
    }
    .tip{
        font-size: 16px;
        color:#c0d1f3;
        width: 88%;
        min-width: 525px;
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
    .echarts{
        height: 300px;
    }
    .echarts1{
        width: 50%;

    }
</style>

<style>
    #homeChart .el-input__icon{
        line-height: 30px;
    }
    #homeChart .el-input__inner{
        height: 30px;
        line-height: 30px;
        background: transparent;
        border:1px solid #09477a;
        outline: none;
        color:#fff;
        font-size: 12px;
    }
    #homeChart .el-select{
        width: 150px;
    }
</style>