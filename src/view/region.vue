<template>
  <!-- 区域公司项目页面 4.0 -->
  <div>
    <div class="container">
      <div class="Left">
        <div class="Downmenu">
          <div class="select">
            <el-select
              v-model="value"
              placeholder="请选择"
              class="selects"
              style="width:200px;border:0"
              @change="selectchange(value)"
            >
              <el-option
                v-for="item in getProjectList"
                :key="item.value"
                :label="item.companyName"
                :value="item.id"
              ></el-option>
            </el-select>

            <el-select
              v-model="value1"
              placeholder="请选择项目"
              class="selects"
              style="width:200px;border:0"
              @change="selectchange1(value1)"
              filterable
            >
              <el-option
                v-for="item in getregionList"
                :key="item.projectName"
                :label="item.projectName"
                :value="item.projectId"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Title">
          <ul>
            <li>
              <img src="../assets/ima/home_node.png" alt />
            </li>
            <li>
              <h1>{{list1[0]}}</h1>
              <span v-for="(item,index) in titlename" :key="index">{{item.nodeAchievingRate}}%</span>
            </li>
            <li>
              <h1>{{list1[1]}}</h1>
              <span v-for="(item,index) in titlename " :key="index">{{item.nodeCategory1Overdue}}个</span>
            </li>
          </ul>
          <ul>
            <li @click="tozsr" style="color:#49a4d9">
              <h1 >{{list2[0]}}</h1>
              <h2 v-for="(item,index) in titlename" :key="index">
                {{item.totalIncome}}
                <span>万元</span>
              </h2>
            </li>
            <li>
              <h1>{{list2[1]}}</h1>
              <h2 v-for="(item,index) in titlename" :key="index">
                {{item.totalprofit}}
                <span>万元</span>
              </h2>
            </li>
          </ul>
        </div>
        <!-- 时间轴 -->
        <Timeaxis :xmid="xmid"></Timeaxis>
      <!-- 关键指标图表 -->
        <div class="Chart">
          <div>
            <h1>关键指标</h1>
            <!-- <h2>更多<span class="iconfont iconpub_right"></span></h2> -->
          </div>
          <div>
            <!-- 关键指标图表1 -->
            <div>
              <h1 v-for="(item,index) in zhsfltitle" :key="index" style="marginRight:10%;cursor: pointer; color:#49a4d9" @click="zhsfl">
                
                    综合收缴率
                <span :class="item.state==1? 'Green':'Red'">
                  <i :class="item.state==1? 'Greensj':'Redsj'"></i>{{item.changeRate.toFixed(2)}}%
                </span>
              </h1>
              <h2 v-for="(item,index) in bstitle" :key="index+1">
                {{item.newRate.toFixed(2)}}<span>%</span>
              </h2>
              <div>
                <div style="width:100%">
                  <xmzhsflsxzzt :zhsflsxzzt="zhsflsxzzt" :xsyf="xsyf" style="width:100%"></xmzhsflsxzzt>
                </div>
                <div style="width:100%">
                  <xmzhsflhxzzt :zhsflhxzzt="zhsflhxzzt" style="width:80%"></xmzhsflhxzzt>
                </div>
              </div>
              <div class="yq">
                <ul v-for="(item,index) in zhsflmsg" :key="index">
                  <li style="width:30%">当期收缴率</li>
                  <li style="width:30%">{{item.newRate.toFixed(0)}}%</li>
                  <li style="width:30%">
                    <span :class="item.state==1? 'Green':'Red'">
                      <i :class="item.state==1? 'Greensj':'Redsj'"></i>
                      {{item.changeRate.toFixed(0)}}%
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 关键指标图表2 -->
            <div>
              <h1 v-for="(item,index) in bstitle" :key="index" style="marginRight:10%; cursor:pointer" @click="bswjl">
                报事完结率
                <span :class="item.state==1? 'Green':'Red'">
                  <i :class="item.state==1? 'Greensj':'Redsj'"></i>
                  {{item.changeRate.toFixed(2)}}%</span>
              </h1>
              <h2 v-for="(item,index) in bstitle" :key="index+1">
                {{item.newRate.toFixed(2)}}<span>%</span>
              </h2>
              <div>
                <div style="width:100%">
                  <xmbssxzzt :bssxzzt="bssxzzt" :xsyf="xsyf" style="width:100%"></xmbssxzzt>
                </div>
                <div style="width:100%">
                  <xmbshxzzt :bshxzzt="bshxzzt" style="width:80%"></xmbshxzzt>
                </div>
              </div>
              <div class="yq">
                <ul v-for="(item,index) in bsmsg" :key="index">
                  <li style="width:20%">{{item.newspapersCateType}}</li>
                  <li style="width:30%">{{item.newRate.toFixed(0)}}%</li>
                  <li style="width:30%">
                    <span :class="item.state==1? 'Green':'Red'">
                      <i :class="item.state==1? 'Greensj':'Redsj'"></i>
                      {{item.changRate.toFixed(0)}}%
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 关键指标图表3 -->

            <div>
            
              <h1 v-for="(item,index) in xcpztitle" :key="index" style="marginRight:10%;">
                现场品质
                <span :class="item.state==1? 'Green':'Red'">
                  <i :class="item.state==1? 'Greensj':'Redsj'"></i>
                  {{item.changeRate.toFixed(2)}}%
                </span>
              </h1>
              <h2 v-for="(item,index) in xcpztitle" :key="index+1">
                {{item.newScore || 0}}
            
              </h2>
              <div>
                <div style="width:100%">
                  <xcpzsxzzt :xcpzsxzzt="xcpzsxzzt" :xsyf="xsyf" style="width:100%"></xcpzsxzzt>
                </div>
                <div style="width:100%">
                  <xcpzhxzzt :xcpzhxzzt="xcpzhxzzt" style="width:80%"></xcpzhxzzt>
                </div>
              </div>
              <div class="yq">
                <ul v-for="(item,index) in xcpzmsg" :key="index">
                  <li style="width:30%">{{item.subjects}}</li>
                  <li style="width:30%">{{item.newCount.toFixed(2)}}%</li>
                  <li style="width:30%">
                    <span :class="item.state==1? 'Green':'Red'">
                      <i :class="item.state==1? 'Greensj':'Redsj'"></i>
                      {{((item.changRate)*100).toFixed(2)}}%
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="Chart1">
            <div>
              <div>
                <h1>园区经营指标</h1>
                <!-- <h2>
                  更多
                  <span class="iconfont iconpub_right"></span>
                </h2> -->
              </div>

              <!-- 雷达图 -->
              <radar :xmid="xmid" :radarmsg="radarmsg" style="min-width:298px"></radar>
            </div>
            <div>
              <div>
                <h1>项目能耗指标</h1>
                <!-- <h2>
                  更多
                  <span class="iconfont iconpub_right"></span>
                </h2> -->
                <div class="xmnhxq">
                  <!-- <h2 @click="dyys">当月用水详情</h2>
                  <h2 @click="dyyd">当月用电详情</h2> -->
                  <h2 @click="toxmnhzb">更多 <span class="iconfont iconpub_right"></span></h2>
                </div>
              </div>
              <div class="xmnh">
                <div class="xmys">
                  <ul>
                    <li
                      @click="btn(index)"
                      :class="{active:index == num}"
                      v-for="(item,index) in list3"
                      :key="index"
                    >{{item}}</li>
                  </ul>
                  <div >
                        <xmnhysqn :xmnhysqn="xmnhysqn" v-show="show"></xmnhysqn>
                        <xmnhdyys :xmnhdyys="xmnhdyys" :xmnhdyysname="xmnhdyysname" v-show="show1"></xmnhdyys>
                  </div>
                 
                </div>
                <div class="xmyd">
                  <div class="xmyd">
                    <ul>
                      <li
                        @click="btn1(index)"
                        :class="{active:index == num1}"
                        v-for="(item,index) in list4"
                        :key="index"
                      >{{item}}</li>
                    </ul>
                     <div >
                        <xmnhydqn :xmnhysqn="xmnhydqn" v-show="show2" ></xmnhydqn>
                        <xmnhdyyd v-show="show3" :xmnhyddyname="xmnhyddyname" :xmnhyddy="xmnhyddy"></xmnhdyyd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="Right">
        <!-- 重要提醒tab组件 -->
        <div class="table1">
          <tab :xmid="xmid"></tab>
        </div>
        <div class="table1 table2">
          <h1>常用报表</h1>
          <ul>
            <li v-for="(item,index) in Commonreports" :key="index">
              <h2 :title="item.title">{{item.title}}</h2>
              <h2>{{item.updatedate}}</h2>
            </li>
          </ul>
        </div>
        <div class="table1 table3">
          <div class="table3_header">
            <h1>登录其他系统</h1>
          </div>
          <div class="table3_footer">
            <ul>
              <li v-for="(item,index) in loginxt" :key="index" @click="todlqtxt(item.href)">
                <img :src="item.imagehref" />
                <h2>{{item.name}}</h2>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入时间轴组建
import Timeaxis from "@/components/timeaxis";
// 重要提醒tab组件
import tab from "@/components/tab";
// 用水全年图表
import xmnhysqn from "@/components/echarts/xmnhysqn";
//用水当月图表
import xmnhdyys from "@/components/echarts/xmnhdyys"
// 用电全年图表
import xmnhydqn from "@/components/echarts/xmnhydqn";
// 用电当月图表
import xmnhdyyd from "@/components/echarts/xmnhdyyd"
//项目报事完结率横向柱状图
import xmbshxzzt from "@/components/echarts/xmbshxzzt";
//项目报事完结率竖向柱状图
import xmbssxzzt from "@/components/echarts/xmbssxzzt";
// 项目综合收费率横向柱状图
import xmzhsflhxzzt from "../components/echarts/xmzhsflhxzzt";
//项目综合收费率竖向柱状图
import xmzhsflsxzzt from "../components/echarts/xmzhsflsxzzt";
// 引入雷达图
import radar from "@/components/echarts/radar";
// 引入现场品质竖向柱状图
import xcpzsxzzt from "@/components/echarts/xcpzsxzzt";
// 现场品质横线柱状图
import xcpzhxzzt from "@/components/echarts/xcpzhxzzt";

export default {
  components: {
    Timeaxis,
    xmnhysqn,
    xmnhydqn,
    tab,
    xmbshxzzt, //横向
    xmbssxzzt, //竖向
    xmzhsflhxzzt, //横向
    xmzhsflsxzzt, //竖向
    xcpzsxzzt, //竖向
    xcpzhxzzt, //横向
    radar,
    xmnhdyys,  
    xmnhdyyd
  },
  data() {
    return {
      date: null, //默认的月份
      num: 0,
      num1: 0,
     show:true,
     show1:false,
     show2:true,
     show3:false,
      getProjectList: [], //------------------------区域公司列表
      getregionList: [], //-------------------------项目列表
      qyid: null, //---------------------------------区域id
      xmid: null, //----------------------------------项目id
      list1: ["节点达成率", "重大节点逾期"], //---------列表1
      list2: ["总收入", "总利润"], //------------------列表2
      Commonreports: [], //--------------------------常用报表
      titlename: [], //------------------------------项目详情
      value: "", //----------------------------------区域下拉默认信息
      value1: "", //---------------------------------项目下拉默认信息
      msg: null, // ---------------------------------区域公司切换后的第一个项目id, 用做数据的切换
      loginxt: [], //--------------------------------登录其他系统数据
      xmnhysqn: [], //-------------------------------项目能耗用水全年数据
      xmnhdyys:[],  //-------------------------------项目能耗用水当月
      xmnhdyysname:[],  //-------------------------------项目能耗用水当月name
      xmnhydqn: [], //-------------------------------项目能耗用电全年数据
      xmnhyddy:[],  //-------------------------------项目能耗用电当月
      xmnhyddyname:[],  //-------------------------------项目能耗用电当月name
      list3: ["全年用水", "当月用水"],
      list4: ["全年用电", "当月用电"],
      bshxzzt: [], //--------------------------------报事  横向柱状图
      bssxzzt: [], //--------------------------------报事  竖向柱状图
      bstitle: [], //--------------------------------报事title信息
      bsmsg: [], //----------------------------------报事提示信息
      xsyf: null, //---------------------------------显示月份

      zhsflhxzzt: [], //-----------------------------综合收费率横向柱状图
      zhsflsxzzt: [], //-----------------------------综合收费率竖向柱状图
      zhsfltitle: [], //-----------------------------报事title信息
      zhsflmsg: [], //-------------------------------综合收费lv提示信息
      radarmsg: [], //-------------------------------品质服务信息
      xcpzhxzzt: [], //------------------------------现场品质横向柱状图
      xcpzsxzzt: [], //------------------------------现场品质竖向柱状图
      xcpztitle: [], //------------------------------现场品质title信息
      xcpzmsg: [] //---------------------------------现场品质提示信息
    };
  },
  methods: {
    // 项目能耗指标
    toxmnhzb(){
      this.$router.push("/xmnhzb?xmid="+this.xmid)
    },
    // 跳转到项目总收入页面
    tozsr(){
       this.$router.push('/xmzhsfl?xmid='+this.xmid)
    },
    // 项目综合收费率跳转
    zhsfl(){
      this.$router.push("zhsjl?xmid="+this.xmid)

    },
    bswjl(){
      this.$router.push("bswjl?xmid="+this.xmid)
    },
    // // 当月用水详情跳转
    // dyys(){
    //   // console.log(this.xmid)
    //   this.$router.push('/dyys?xmid='+this.xmid)

    // },
    // // 当月用电详情跳转
    // dyyd(){
    //   // console.log(this.xmid)
    //   this.$router.push('/dyyd?xmid='+this.xmid)
    // },
  todlqtxt(href){
    // console.log(href)
     window.open(href,"_blank")
  },
    selectchange(value) {
      // console.log(value)
      //区域公司级下拉菜单选中监听
      this.value = value;
      this.axios.get("api/projectBycId?companyId=" + value).then(res => {
        // this.msg = res.data.data[0].projectId; //切换后使用新id来进行数据的切换
        this.getregionList = res.data.data; //区域下拉菜单切换后赋值给项目下来菜单
        this.value1 = res.data.data[0].projectName;
       this.xmid=res.data.data[0].projectId     //切换后使用新id来进行数据的切换
        // 获取项目详情数据（根据路由携带的项目id查询数据）
        this.axios
          .get("api/projectInfoById?projectId=" + this.xmid)
          .then(res => {
            // console.log(res.data.data)
            this.titlename = res.data.data;
          });
        // 获取项目能耗用水数据
        this.axios
          .get("api/projectWaterrentM?projectId=" + this.xmid)
          .then(res => {
            // console.log(res.data.data[0])
            this.xmnhysqn = [];
            this.xmnhysqn.push(
              res.data.data[0].m1,res.data.data[0].m2,res.data.data[0].m3,res.data.data[0].m4,res.data.data[0].m5,res.data.data[0].m6,res.data.data[0].m7,res.data.data[0].m8,res.data.data[0].m9,res.data.data[0].m10,res.data.data[0].m11,res.data.data[0].m12
            );
            // console.log(this.xunhysqn)
          });
        //项目能耗用水数据月度
            this.axios.get("/api/projectWaterMType?projectId="+this.xmid+"&topcount=2").then((res)=>{
                // console.log(res.data.data)
                let arr=res.data.data
                this.xmnhdyys=[]
                this.xmnhdyysname=[]
                arr.forEach(element=>{
                    this.xmnhdyysname.push(element.itemName)
                    this.xmnhdyys.push(element.dosage)
                })
            })


        // 获取项目能耗用电数据
        this.axios
          .get("api/projectElectricityM?projectId=" + this.xmid)
          .then(res => {
            // console.log(res.data.data)
            this.xmnhydqn = [];
            this.xmnhydqn.push(
              res.data.data[0].m1,
              res.data.data[0].m2,
              res.data.data[0].m3,
              res.data.data[0].m4,
              res.data.data[0].m5,
              res.data.data[0].m6,
              res.data.data[0].m7,
              res.data.data[0].m8,
              res.data.data[0].m9,
              res.data.data[0].m10,
              res.data.data[0].m11,
              res.data.data[0].m12
            );
          });
              this.axios.get("/api/projectElectMType?projectId="+this.xmid+"&topcount=2").then((res)=>{
        // console.log(res.data.data)
        let arr=res.data.data
        this.xmnhyddy=[]
        this.xmnhyddyname=[]
        arr.forEach(element=>{
             this.xmnhyddyname.push(element.itemName)
             this.xmnhyddy.push(element.dosage)
        })
    })

        // 获取关键指标报事完成率数据 竖向柱状图数据
        this.axios
          .get("/api/projectMNewPYear?projectId=" + this.xmid)
          .then(res => {
            this.bssxzzt=[]
            // console.log(res.data.data[0])
            // 通过当前月份进行判断，大于7就取7到12月数据。   小于就取1到6月数据
            if (this.date >= 7) {
              this.bssxzzt.push(
                res.data.data[0].m7 ,
                res.data.data[0].m8 ,
                res.data.data[0].m9 ,
                res.data.data[0].m10 ,
                res.data.data[0].m11,
                res.data.data[0].m12
              );

              this.xsyf = 1;
            } else {
              this.bssxzzt.push(
                res.data.data[0].m1 ,
                res.data.data[0].m2 ,
                res.data.data[0].m3 ,
                res.data.data[0].m4 ,
                res.data.data[0].m5 ,
                res.data.data[0].m6 
              );
             
              this.xsyf = 0;
            }
          });

        // 获取关键指标报事完成率     横向柱状图数据
        this.axios.get("api/projectRateMaxMinVm").then(res => {
          // console.log(res.data.data)
          let arr = res.data.data;
          this.bshxzzt = [];
          arr.forEach(element => {
            this.bshxzzt.push(element.rate.toFixed(2));
          });
        });

        //获取报事完结率   title数据
        this.axios
          .get("/api/projectTotalRate?projectId=" + this.xmid)
          .then(res => {

            this.bstitle = res.data.data;
          });
        // 获取报事完结率   提示信息
        this.axios
          .get("/api/projectTypeRate?projectId=" + this.xmid)
          .then(res => {
 
            this.bsmsg = res.data.data;
          });

        // 获取综合收费率  竖向柱状图数据           数据替换
        this.axios.get("/api/projectYMRs?projectId=" + this.xmid).then(res => {

          if (this.date >= 7) {
            this.zhsflsxzzt.push(
              res.data.data[0].Rate7.toFixed(1),
              res.data.data[0].Rate8.toFixed(1),
              res.data.data[0].Rate9.toFixed(1),
              res.data.data[0].Rate10.toFixed(1),
              res.data.data[0].Rate11.toFixed(1),
              res.data.data[0].Rate12.toFixed(1)
            );
   
            this.xsyf = 1;
          } else {
            this.zhsflsxzzt.push(
              res.data.data[0].Rate1.toFixed(1),
              res.data.data[0].Rate2.toFixed(1),
              res.data.data[0].Rate3.toFixed(1),
              res.data.data[0].Rate4.toFixed(1),
              res.data.data[0].Rate5.toFixed(1),
              res.data.data[0].Rate6.toFixed(1)
            );
            this.xsyf = 0;
          }
        });
        // 获取综合收费率  横向柱状图数据
        this.axios.get("/api/companyRateMaxMinVm").then(res => {
          // console.log(res.data.data)
          let arr = res.data.data;
          this.zhsflhxzzt = [];
          arr.forEach(element => {
            this.zhsflhxzzt.push(element.rate.toFixed(2));
          });
        });

        // 获取综合收费率 title
        this.axios
          .get("/api/projectTotalRate2?projectId=" + this.xmid)
          .then(res => {
            
            this.zhsfltitle = res.data.data;
          });
        // 获取综合收费率的提示信息
        this.axios
          .get("/api/projectCuMRate?projectId=" + this.xmid)
          .then(res => {
            this.zhsflmsg = res.data.data;
          });

        // 获取品质服务信息数据  雷达图
        this.axios.get("/api/ProjectYuqu?projectId=" + this.xmid).then(res => {
          this.radarmsg = [];
          var obj = res.data.data[0];
          for (var i in obj) {
            this.radarmsg.push(obj[i].toFixed(1));
          }
        });

        // 现场品质竖向柱状图
        this.axios.get("/api/projectPZYM?projectId=" + this.xmid).then(res => {
          this.xcpzsxzzt = [];
          if (this.date >= 7) {
            this.xcpzsxzzt.push(
              res.data.data[0].m7.toFixed(1),
              res.data.data[0].m8.toFixed(1),
              res.data.data[0].m9.toFixed(1),
              res.data.data[0].m10.toFixed(1),
              res.data.data[0].m11.toFixed(1),
              res.data.data[0].m12.toFixed(1)
            );
            this.xsyf = 1;
          } else {
            this.xcpzsxzzt.push(
              res.data.data[0].m1.toFixed(1),
              res.data.data[0].m2.toFixed(1),
              res.data.data[0].m3.toFixed(1),
              res.data.data[0].m4.toFixed(1),
              res.data.data[0].m5.toFixed(1),
              res.data.data[0].m6.toFixed(1)
            );
            this.xsyf = 0;
          }
        });
        //现场品质横向柱状图
        this.axios.get("/api/projectXYPZMM").then(res => {
          let arr = res.data.data;
          this.xcpzhxzzt = [];
          arr.forEach(element => {
            this.xcpzhxzzt.push(element.projectscore.toFixed(2));
          });
        });

        //现场品质title信息
        this.axios.get("api/projectXCPZhj?projectId=" + this.xmid).then(res => {
          this.xcpztitle = res.data.data;
        });
        //现场品质提示信息
        this.axios.get("/api/projectXCPZtype?projectId=" +this.xmid).then(res => {
            this.xcpzmsg = res.data.data;
          });
      });
    },





    selectchange1(value) {
      //项目公司下拉菜单监听
      this.xmid = value;

      // 获取项目详情数据（根据路由携带的项目id查询数据）
      this.axios.get("api/projectInfoById?projectId=" + value).then(res => {
        this.titlename = res.data.data;
      });
      // 获取项目能耗用水数据   年度
      this.axios.get("api/projectWaterrentM?projectId=" + value).then(res => {
        this.xmnhysqn = [];
        this.xmnhysqn.push(
          res.data.data[0].m1,
          res.data.data[0].m2,
          res.data.data[0].m3,
          res.data.data[0].m4,
          res.data.data[0].m5,
          res.data.data[0].m6,
          res.data.data[0].m7,
          res.data.data[0].m8,
          res.data.data[0].m9,
          res.data.data[0].m10,
          res.data.data[0].m11,
          res.data.data[0].m12
        );
      });
        //项目能耗用水数据月度
        this.axios.get("/api/projectWaterMType?projectId="+value+"&topcount=2").then((res)=>{
            let arr=res.data.data
            this.xmnhdyys=[]
            this.xmnhdyysname=[]
            arr.forEach(element=>{
                this.xmnhdyysname.push(element.itemName)
                this.xmnhdyys.push(element.dosage)
            })
        })
      // 获取项目能耗用电数据
      this.axios.get("api/projectElectricityM?projectId=" + value).then(res => {
        this.xmnhydqn = [];
        this.xmnhydqn.push(
          res.data.data[0].m1,
          res.data.data[0].m2,
          res.data.data[0].m3,
          res.data.data[0].m4,
          res.data.data[0].m5,
          res.data.data[0].m6,
          res.data.data[0].m7,
          res.data.data[0].m8,
          res.data.data[0].m9,
          res.data.data[0].m10,
          res.data.data[0].m11,
          res.data.data[0].m12
        );
      });

          // 获取项目能耗用电数据   月度
    this.axios.get("/api/projectElectMType?projectId="+value+"&topcount=2").then((res)=>{
        let arr=res.data.data
        this.xmnhyddy=[]
        this.xmnhyddyname=[]
        arr.forEach(element=>{
             this.xmnhyddyname.push(element.itemName)
             this.xmnhyddy.push(element.dosage)
        })
    })

      // 获取关键指标报事完成率数据 竖向柱状图数据
      this.axios.get("/api/projectMNewPYear?projectId=" + value).then(res => {
        // console.log(res.data.data)
        // console.log(this.date)
        this.bssxzzt=[]
        // 通过当前月份进行判断，大于7就取7到12月数据。   小于就取1到6月数据
        if (this.date >= 7) {
          this.bssxzzt.push(
            res.data.data[0].m7 ,
           res.data.data[0].m8 ,
            res.data.data[0].m9 ,
            res.data.data[0].m10 ,
            res.data.data[0].m11,
            res.data.data[0].m12
          );
          this.xsyf = 1;
        } else {
          this.bssxzzt.push(
            res.data.data[0].m1,
            res.data.data[0].m2,
            res.data.data[0].m3,
            res.data.data[0].m4,
            res.data.data[0].m5,
            res.data.data[0].m6
          );
          // console.log(this.bshxzzt)
          this.xsyf = 0;
        }
      // console.log(this.bssxzzt)

      });

      // 获取关键指标报事完成率     横向柱状图数据
      this.axios.get("api/projectRateMaxMinVm").then(res => {
        // console.log(res.data.data)
        let arr = res.data.data;
        this.bshxzzt = [];
        arr.forEach(element => {
          this.bshxzzt.push(element.rate.toFixed(2));
        });
      });

      //获取报事完结率   title数据
      this.axios.get("/api/projectTotalRate?projectId=" + value).then(res => {
        // console.log(res.data.data)
        this.bstitle = res.data.data;
      });
      // 获取报事完结率   提示信息
      this.axios.get("/api/projectTypeRate?projectId=" + value).then(res => {
        // console.log(res.data.data)
        this.bsmsg = res.data.data;
      });

      // 获取综合收费率  竖向柱状图数据           数据替换
      this.axios.get("/api/projectYMRs?projectId=" + value).then(res => {
        // console.log(res.data.data[0])
        if (this.date >= 7) {
          this.zhsflsxzzt.push(
            res.data.data[0].Rate7.toFixed(1),
            res.data.data[0].Rate8.toFixed(1),
            res.data.data[0].Rate9.toFixed(1),
            res.data.data[0].Rate10.toFixed(1),
            res.data.data[0].Rate11.toFixed(1),
            res.data.data[0].Rate12.toFixed(1)
          );
          // console.log(this.bshxzzt)
          this.xsyf = 1;
        } else {
          this.zhsflsxzzt.push(
            res.data.data[0].Rate1.toFixed(1),
            res.data.data[0].Rate2.toFixed(1),
            res.data.data[0].Rate3.toFixed(1),
            res.data.data[0].Rate4.toFixed(1),
            res.data.data[0].Rate5.toFixed(1),
            res.data.data[0].Rate6.toFixed(1)
          );
          // console.log(this.bshxzzt)
          this.xsyf = 0;
        }
      });
      // 获取综合收费率  横向柱状图数据
      this.axios.get("/api/companyRateMaxMinVm").then(res => {
        // console.log(res.data.data)
        let arr = res.data.data;
        this.zhsflhxzzt = [];
        arr.forEach(element => {
          this.zhsflhxzzt.push(element.rate.toFixed(2));
        });
      });

      // 获取综合收费率 title
      this.axios.get("/api/projectTotalRate2?projectId=" + value).then(res => {
        // console.log(res.data.data)
        this.zhsfltitle = res.data.data;
      });
      // 获取综合收费率的提示信息
      this.axios.get("/api/projectCuMRate?projectId=" + value).then(res => {
        // console.log(res.data.data)
        this.zhsflmsg = res.data.data;
      });

      // // 获取品质服务信息数据了  雷达图
      this.axios.get("/api/ProjectYuqu?projectId=" + value).then(res => {
        this.radarmsg = [];
        var obj = res.data.data[0];
        for (var i in obj) {
          this.radarmsg.push(obj[i].toFixed(1));
        }
      });

      // 现场品质竖向柱状图
      this.axios.get("/api/projectPZYM?projectId=" + value).then(res => {
        // console.log(res.data.data)
        this.xcpzsxzzt = [];
        if (this.date >= 7) {
          this.xcpzsxzzt.push(
            res.data.data[0].m7.toFixed(1),
            res.data.data[0].m8.toFixed(1),
            res.data.data[0].m9.toFixed(1),
            res.data.data[0].m10.toFixed(1),
            res.data.data[0].m11.toFixed(1),
            res.data.data[0].m12.toFixed(1)
          );
          // console.log(this.bshxzzt)
          this.xsyf = 1;
        } else {
          this.xcpzsxzzt.push(
            res.data.data[0].m1.toFixed(1),
            res.data.data[0].m2.toFixed(1),
            res.data.data[0].m3.toFixed(1),
            res.data.data[0].m4.toFixed(1),
            res.data.data[0].m5.toFixed(1),
            res.data.data[0].m6.toFixed(1)
          );
          // console.log(this.bshxzzt)
          this.xsyf = 0;
        }
      });
      //现场品质横向柱状图
      this.axios.get("/api/projectXYPZMM").then(res => {
        // console.log(res.data.data)
        let arr = res.data.data;
        this.xcpzhxzzt = [];
        arr.forEach(element => {
          this.xcpzhxzzt.push(element.projectscore.toFixed(2));
        });
      });

      //现场品质title信息
      this.axios.get("api/projectXCPZhj?projectId=" + value).then(res => {
        // console.log(res.data.data)
        this.xcpztitle = res.data.data;
      });
      //现场品质提示信息
      this.axios
        .get(
          "http://222.180.200.126:9045/api/projectXCPZtype?projectId=" + value
        )
        .then(res => {
          // console.log(res.data.data)
          this.xcpzmsg = res.data.data;
        });

    },
    btn(index) {
      this.num = index;
      if (index == 1) {
            this.show = false;
            this.show1=true
      } else {
            this.show = true;
            this.show1=false
      }
    },
    btn1(index) {
      this.num1 = index;
      if (index == 1) {
        this.show2 = false;
        this.show3=true
      } else {
        this.show2 = true;
        this.show3=false
      }
    }
  },
  mounted() {
    var date = new Date();
    this.date = date.getMonth()+ 1; //获取到当前的月份信息
    // 通过获取的区域公司id和项目id来显示默认数据
    this.quid = this.$route.query.quid; //区域公司id
    this.xmid = this.$route.query.xmid; //项目id
  // console.log(this.$route.query)

  // 通过项目id来获取到默认显示的项目的名称
  this.axios.get("/api/projectInfoName?projectIdName="+this.xmid).then((res)=>{
    // console.log(res.data.data[0].projectName)
    this.value1=res.data.data[0].projectName
  })


  // 通过路由的区域id获取到默认显示的区域
    this.axios
      .get("api/companIdOrName?companIdOrName=" + this.quid)
      .then(res => {

        // console.log(res.data.data[0].companyName)
        this.value = res.data.data[0].companyName;
        this.axios
          .get("api/projectBycId?companyId=" + res.data.data[0].companyId)
          .then(res => {
            this.getregionList = res.data.data;
            // this.value1 = res.data.data[0].projectName;
          });
      });
    // 获取区域公司列表
    this.axios.get("/api/projectCompanyList").then(res => {
      // console.log(res.data.data)
      this.getProjectList = res.data.data;
    });
    //获取登录其它系统的数据
    this.axios.get("/api/systemDocking01").then(res => {
      this.loginxt = res.data.data;
    });
    //获取常用报表数据
    this.axios.get("/api/commonReport").then(res => {
      this.Commonreports = res.data.data;
    });
    // // 获取项目详情数据（根据路由携带的项目id查询数据）                      需变更数据
    this.axios.get("api/projectInfoById?projectId=" + this.xmid).then(res => {
      // console.log(res.data.data)
      this.titlename = res.data.data;
    });
    // 获取项目能耗用水数据 年度                                              需变更数据
    this.axios.get("api/projectWaterrentM?projectId="+ this.xmid).then(res => {
      // console.log(res)
      this.xmnhysqn = [];
      this.xmnhysqn.push(
        res.data.data[0].m1,
        res.data.data[0].m2,
        res.data.data[0].m3,
        res.data.data[0].m4,
        res.data.data[0].m5,
        res.data.data[0].m6,
        res.data.data[0].m7,
        res.data.data[0].m8,
        res.data.data[0].m9,
        res.data.data[0].m10,
        res.data.data[0].m11,
        res.data.data[0].m12
      );
    });
    //项目能耗用水数据月度
    this.axios.get("/api/projectWaterMType?projectId="+this.xmid+"&topcount=2").then((res)=>{
        // console.log(res.data.data)
        let arr=res.data.data
        this.xmnhdyys=[]
        this.xmnhdyysname=[]
        arr.forEach(element=>{
             this.xmnhdyysname.push(element.itemName)
             this.xmnhdyys.push(element.dosage)
        })
    })

    // 获取项目能耗用电数据      年度                                          需变更数据
    this.axios
      .get("api/projectElectricityM?projectId=" + this.xmid)
      .then(res => {
        // console.log(res.data.data)
        this.xmnhydqn = [];
        this.xmnhydqn.push(
          res.data.data[0].m1,
          res.data.data[0].m2,
          res.data.data[0].m3,
          res.data.data[0].m4,
          res.data.data[0].m5,
          res.data.data[0].m6,
          res.data.data[0].m7,
          res.data.data[0].m8,
          res.data.data[0].m9,
          res.data.data[0].m10,
          res.data.data[0].m11,
          res.data.data[0].m12
        );
      });
    // 获取项目能耗用电数据   月度
    this.axios.get("/api/projectElectMType?projectId="+this.xmid+"&topcount=2").then((res)=>{
        // console.log(res.data.data)
        let arr=res.data.data
        this.xmnhyddy=[]
        this.xmnhyddyname=[]
        arr.forEach(element=>{
             this.xmnhyddyname.push(element.itemName)
             this.xmnhyddy.push(element.dosage)
        })
    })




    // 获取报事完成率数据 竖向柱状图数据            需变更数据
    this.axios.get("/api/projectMNewPYear?projectId=" + this.xmid).then(res => {
      // console.log(res.data.data)
      // console.log(this.date)
      // 通过当前月份进行判断，大于7就取7到12月数据。   小于就取1到6月数据
      this.bssxzzt=[]
      if (this.date >= 7) {
        this.bssxzzt.push(
          res.data.data[0].m7 ,
          res.data.data[0].m8,
          res.data.data[0].m9 ,
          res.data.data[0].m10 ,
          res.data.data[0].m11,
         res.data.data[0].m12
        );
        // console.log(this.bshxzzt)
        this.xsyf = 1;
      } else {
        this.bssxzzt.push(
          res.data.data[0].m1,
          res.data.data[0].m2,
          res.data.data[0].m3,
         res.data.data[0].m4,
          res.data.data[0].m5,
          res.data.data[0].m6 
        );
        // console.log(this.bshxzzt)
        this.xsyf = 0;
      }
      // console.log(this.bssxzzt)
    });

    // 获取报事完成率     横向柱状图数据            需变更数据
    this.axios.get("api/projectRateMaxMinVm").then(res => {
      // console.log(res.data.data)
      let arr = res.data.data;
      this.bshxzzt = [];
      arr.forEach(element => {
        this.bshxzzt.push(element.rate.toFixed(2));
      });
    });

    //获取报事完结率   title数据                                 需变更数据
    this.axios.get("/api/projectTotalRate?projectId=" + this.xmid).then(res => {
      // console.log(res.data.data)
      this.bstitle = res.data.data;
    });
    // 获取报事完结率   提示信息                                需变更数据
    this.axios.get("/api/projectTypeRate?projectId=" + this.xmid).then(res => {
      // console.log(res.data.data)
      this.bsmsg = res.data.data;
    });

    // 获取综合收费率  竖向柱状图数据           数据替换
    this.axios.get("/api/projectYMRs?projectId=" + this.xmid).then(res => {
      // console.log(res.data.data[0])
      if (this.date >= 7) {
        this.zhsflsxzzt.push(
          res.data.data[0].Rate7.toFixed(1),
          res.data.data[0].Rate8.toFixed(1),
          res.data.data[0].Rate9.toFixed(1),
          res.data.data[0].Rate10.toFixed(1),
          res.data.data[0].Rate11.toFixed(1),
          res.data.data[0].Rate12.toFixed(1)
        );
        // console.log(this.bshxzzt)
        this.xsyf = 1;
      } else {
        this.zhsflsxzzt.push(
          res.data.data[0].Rate1.toFixed(1),
          res.data.data[0].Rate2.toFixed(1),
          res.data.data[0].Rate3.toFixed(1),
          res.data.data[0].Rate4.toFixed(1),
          res.data.data[0].Rate5.toFixed(1),
          res.data.data[0].Rate6.toFixed(1)
        );
        // console.log(this.bshxzzt)
        this.xsyf = 0;
      }
    });
    // 获取综合收费率  横向柱状图数据           数据替换
    this.axios.get("/api/companyRateMaxMinVm").then(res => {
      // console.log(res.data.data)
      let arr = res.data.data;
      this.zhsflhxzzt = [];
      arr.forEach(element => {
        this.zhsflhxzzt.push(element.rate.toFixed(2));
      });
    });

    // 获取综合收费率 title                      数据替换
    this.axios
      .get("/api/projectTotalRate2?projectId=" + this.xmid)
      .then(res => {
        // console.log(res.data.data)
        this.zhsfltitle = res.data.data;
      });
    // 获取综合收费率的提示信息
    this.axios.get("/api/projectCuMRate?projectId=" + this.xmid).then(res => {
      // console.log(res.data.data)
      this.zhsflmsg = res.data.data;
    });

    // // 获取品质服务信息数据了  雷达图   切换数据
    this.axios.get("/api/ProjectYuqu?projectId=" + this.xmid).then(res => {
      // console.log(res.data.data)
      this.radarmsg = [];
      var obj = res.data.data[0];
      for (var i in obj) {
        this.radarmsg.push(obj[i].toFixed(1));
      }
    });

    // 现场品质竖向柱状图            数据替换
    this.axios.get("/api/projectPZYM?projectId=" + this.xmid).then(res => {
      // console.log(res.data.data)
      this.xcpzsxzzt = [];
      if (this.date >= 7) {
        this.xcpzsxzzt.push(
          res.data.data[0].m7.toFixed(1),
          res.data.data[0].m8.toFixed(1),
          res.data.data[0].m9.toFixed(1),
          res.data.data[0].m10.toFixed(1),
          res.data.data[0].m11.toFixed(1),
          res.data.data[0].m12.toFixed(1)
        );
        // console.log(this.bshxzzt)
        this.xsyf = 1;
      } else {
        this.xcpzsxzzt.push(
          res.data.data[0].m1.toFixed(1),
          res.data.data[0].m2.toFixed(1),
          res.data.data[0].m3.toFixed(1),
          res.data.data[0].m4.toFixed(1),
          res.data.data[0].m5.toFixed(1),
          res.data.data[0].m6.toFixed(1)
        );
        // console.log(this.bshxzzt)
        this.xsyf = 0;
      }
    });
    //现场品质横向柱状图         数据替换
    this.axios.get("/api/projectXYPZMM").then(res => {
      // console.log(res.data.data)
      let arr = res.data.data;
      this.xcpzhxzzt = [];
      arr.forEach(element => {
        this.xcpzhxzzt.push(element.projectscore.toFixed(2));
      });
    });

    //现场品质title信息              数据替换
    this.axios.get("api/projectXCPZhj?projectId=" + this.xmid).then(res => {
      // console.log(res.data.data)
      this.xcpztitle = res.data.data;
    });
    //现场品质提示信息          数据替换
    this.axios.get("/api/projectXCPZtype?projectId=" + this.xmid).then(res => {
      // console.log(res.data.data)
      this.xcpzmsg = res.data.data;
    });
  }
};
</script>


<style scoped>
.xmnh {
  padding: 18px 7px 0 14px;
}
.xmnh > div {
  height: 148px;
  width: 100%;
}
.xmys {
  position: relative;
}
.xmys > ul {
  position: absolute;
  display: flex;
  right: 20px;
  z-index: 10;
  font-size: 12px;
  font-weight: 600
}
.xmys > ul > li {
  cursor: pointer;
}
.xmys > ul > li:nth-of-type(2) {
  margin-left: 20px;
}
.xmyd {
  margin-top: 32px;
  position: relative;
}
.xmyd > ul {
  position: absolute;
  display: flex;
  right: 20px;
  z-index: 10;
  font-size: 12px;
  font-weight: 600

}
.xmyd > ul > li:nth-of-type(2) {
  margin-left: 20px;
}
.active {
  color: #49a4d9 !important ;
  border-bottom: 2px solid #49a4d9;
}
.yq {
  margin-left: 7px;
}
.yq > ul {
  display: flex;
  margin-top: 26px;
  justify-content: space-around;
}
.yq > ul > li {
  line-height: 12px;
  font-size: 12px;
  color: #666;
  overflow: hidden;
  min-width: 44px;
}
.yq > ul > li > span {
  font-size: 12px;
}

.container {
  background: #eeeeee;
  padding: 0.75rem;
  display: flex;
  /* justify-content: space-between; */
}

.Left {
  border: 1px solid #e0dfe8;
  width: 70%;
  background: #fff;
  /* height :1150px; */
  flex-grow: 1;
}
.Right {
  /* width: 30%; */
  margin: 0 0 0 12px;
  background: #eee;
  width: 292px;
}

.ModalFrame > ul {
  z-index: 10;
  width: 17.875rem;
  height: 17.5rem;
  overflow: auto;
  position: absolute;
  top: 36px;
  left: 62px;
  background: #fff;
  border: 1px solid #dfdfdf;
}
.Downmenu {
  border-bottom: 1px solid #e0dfe8;
  position: relative;
  height: 55px;
}
.select {
  line-height: 54px;
}

.Downmenu > h1 {
  font-size: 16px;
  line-height: 50px;
  margin: 0 0 20px 18px;
  font-weight: 100;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.Downmenu > h1 > span {
  font-size: 0.375rem;
  color: #a0a0a0;
}
.Title {
  padding: 16px 0;
  width: 100%;
  display: flex;
  border-bottom: 1px dashed #e0dfe8;
}
.Title > ul:nth-of-type(1) {
  width: 30%;
}
.Title > ul:nth-of-type(1) {
  display: flex;
  width: 40%;
  border-right: 1px dashed #e0dfe8;
}
.Title > ul:nth-of-type(1) > li {
  width: 30%;
  position: relative;
  white-space: nowrap;
}
.Title > ul:nth-of-type(1) > li:nth-of-type(3) {
  margin-left: 28px;
  margin-right: 40px;
}
.Title > ul:nth-of-type(1) > li > h1 {
  font-size: 12px;
  color: #666;
  line-height: 1;
  font-weight: 500;
  margin-top: 14px;
  white-space: nowrap;
}
.Title > ul:nth-of-type(1) > li:nth-of-type(1) {
  margin: 8px 17px 0.5rem 24px;
}

.Title > ul:nth-of-type(1) > li > span {
  position: absolute;
  top: 36px;
  left: 0;
  line-height: 1;
  font-size: 20px;
  white-space: nowrap;
}

.Title > ul:nth-of-type(2) {
  width: 70%;
  display: flex;
  padding-top: 14px;
}
.Title > ul:nth-of-type(2) > li:nth-of-type(1) {
  margin-left: 3.125rem;
  cursor: pointer;
}
.Title > ul:nth-of-type(2) > li:nth-of-type(2) {
  margin-left: 4.625rem;
}
.Title > ul:nth-of-type(2) > li > h1 {
  font-size: 12px;
  font-weight: 100;
  line-height: 1;
  white-space: nowrap;
}
.Title > ul:nth-of-type(2) > li > h2 {
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  margin-top: 9px;
  white-space: nowrap;
}
.Title > ul:nth-of-type(2) > li > h2 > span {
  font-size: 12px;
}
.Chart > div:nth-of-type(1) {
  display: flex;
  justify-content: space-between;
  padding: 0 1.375rem;
  height: 40px;
}
.Chart > div:nth-of-type(1) > h1 {
  font-size: 16px;
  line-height: 1;
  color: #333;
  font-weight: 500
}
.Chart > div:nth-of-type(1) > h2 {
  font-size: 0.75rem;
  line-height: 1;
  color: #666;
  font-weight: 100;
  cursor: pointer;
}
.Chart > div:nth-of-type(1) > h2 > span {
  color: #a7a7a7;
  font-size: 0.625rem;
  font-weight: 100;
}
.Chart > div:nth-of-type(2) {
  display: flex;
  justify-content: space-around;
}
.Chart > div:nth-of-type(2) > div {
  width: 30%;
  height: 340px;
  background: #f0eded;
}
.Chart > div:nth-of-type(2) > div > h1 {
  font-size: 14px;
  color: #666;
  margin: 16px 0 8px 33px;
  line-height: 1;
  font-weight: 100;
}
.Chart > div:nth-of-type(2) > div > h1 > span {
  line-height: 1;
  font-size: 14px;
  font-weight: 600;
  margin-left: 1.4375rem;
  position: relative;
}
.Chart > div:nth-of-type(2) > div > h2 {
  font-weight: 600;
  color: #333333;
  margin-left: 33px;
  margin-bottom: 54px;
  font-size: 24px;
  font-weight: 500
}
.Chart > div:nth-of-type(2) > div > div:nth-of-type(1) {
  display: flex;
  justify-content: space-between;
  padding: 0 6px;
  height: 94px;
  /* width:100% */
}
.Chart > div:nth-of-type(2) > div > div > div {
  flex: 1;
}

.table1 {
  background: #fff;
  border: 1px solid #e0dfe8;
  height: 365px;
}
.table1 > h1 {
  font-size: 16px;
  display: flex;
  height: 50px;
  /* justify-content: space-around; */
  border-bottom: 1px solid #f0f0f0;
  font-weight: 500;
  line-height: 50px;
  padding-left: 20px;
}
.table1 > ul {
  height: 310px;
  /*  当IE下溢出，仍然可以滚动*/
  -ms-overflow-style: none;
  /*火狐下隐藏滚动条*/
  overflow: -moz-scrollbars-none;
}
/* 谷歌浏览器溢出滚动 */
.table1 > ul::-webkit-scrollbar {
  display: none;
}
.table1 > ul > li {
  font-size: 14px;
  max-width: 280px;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  cursor: pointer;
  margin-top: 20px;
}
.table2 {
  margin-top: 11px;
  height: 274px;
}
.table2 > ul {
  height: 220px;
  overflow: hidden;
  overflow-y: auto;
  /*  当IE下溢出，仍然可以滚动*/
  -ms-overflow-style: none;
  /*火狐下隐藏滚动条*/
  overflow: -moz-scrollbars-none;
}
/* 谷歌浏览器溢出滚动 */
.table2 > ul::-webkit-scrollbar {
  display: none;
}
.table3 {
  height: 210px;
  margin-top: 12px;
}
.table2 > ul > li > h2 {
  color: #666;
  font-size: 14px;
  text-decoration: underline;
  min-width: 170px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
.table3_header {
  display: flex;
  justify-content: space-between;
  padding: 23px 16px 23px 20px;
}
.table3_header > h1 {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}
/* .table3_header > h2 {
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: #666;
} */
/* .table3_header > h2 > span {
  font-size: 12px;
  font-weight: 500;
  color: #a0a0a0;
} */
.table3_footer > ul {
  display: flex;
  justify-content: space-around;
}
.table3_footer > ul > li {
  width: 64px;
  cursor: pointer;
  text-align: center
}
.table3_footer > ul > li > img {
  width: 45px;
  height: 45px;
}
.table3_footer > ul > li > h2 {
  font-size: 12px;
  color: #666;
  line-height: 1;
  margin-top: 8px;
}

.Chart1 {
  display: flex;
  justify-content: space-between;
  padding: 0 1.375rem;
  margin-top: 20px;
  /* height:446px; */
  margin-bottom: 24px;
}
.Chart1 > div {
  border: 1px solid #e0dfe8;
}
.Chart1 > div:nth-of-type(1) {
  width: 45%;
  /* min-width: 350px; */
  height: 417px;
}
.Chart1 > div:nth-of-type(1) > div:nth-of-type(1) {
  display: flex;
  justify-content: space-between;
  padding: 22px 18px 18px 18px;
  background: #fff;
  border-bottom: 1px solid #e0dfe8;
}

.Chart1 > div:nth-of-type(1) > div > h1 {
  font-size: 16px;
  color: #333;
  line-height: 1;
  font-weight:500;
}
.Chart1 > div:nth-of-type(1) > div > h2 {
  font-size: 12px;
  color: #666;
  line-height: 1;
  cursor: pointer;
}
.Chart1 > div:nth-of-type(1) > div > h2 > span {
  font-size: 10px;
  color: #a0a0a0;
  line-height: 1;
  font-weight: 100;
}

.Chart1 > div:nth-of-type(2) {
  width: 55%;
  margin-left: 16px;
  /* min-width: 396px; */
  height: 417px;
}
.Chart1 > div:nth-of-type(2) > div:nth-of-type(1) {
  display: flex;
  justify-content: space-between;
  padding: 22px 18px 18px 18px;
  border-bottom: 1px solid #e0dfe8;
}

.Chart1 > div:nth-of-type(2) > div > h1 {
  font-size: 16px;
  color: #333;
  line-height: 1;
  font-weight: 500;
}
.Chart1 > div:nth-of-type(2) > div > h2 {
  font-size: 12px;
  color: #666;
  line-height: 1;
  cursor: pointer;
}
.Chart1 > div:nth-of-type(2) > div > h2 > span {
  font-size: 10px;
  color: #a0a0a0;
  line-height: 1;
  font-weight: 100;
}

.Red {
  color: #fc6077;
}
.Green {
  color: #00c05a;
}
/* 绿色三角形 */
.Greensj {
  width: 0;
  height: 0;
  display: inline-block;
  border: 6px solid;
  border-color: transparent transparent #80d8a8;
  position: relative;
  top: -1px;
  left: 3px;
}
.Redsj {
  width: 0;
  height: 0;
  border: 6px solid;
  border-color: #fd566f transparent transparent;
  position: relative;
  top: 5px;
  left: 0;
  display: inline-block;
}
.xmnhxq{
  display: flex;

}
.xmnhxq>h2{
  /* transform: scale(0.8); */
  font-size: 14px;
  font-weight: 600;
  color: #49a4d9 ;
  cursor: pointer;

}
.xmnhxq>h2>span{
  font-size: 14px;
  font-weight: 500;
}
.xmnhxq>h2:nth-of-type(2){
  margin-left: 8px
}
.yq>ul>li{
  white-space: nowrap
}
</style>

<style>
/* 自己添加一个父类div来操作下面的需要修改的class样式 */
.selects > div > .el-input__inner {
  border: 0;
}
.selects .el-input__icon {
  width: 56px;
}
</style>