项目4.0报表    






//  完成项目


// --重要提醒
// http://222.180.200.126:9045/api/importantReminder02?topcount=10&projectId=1132     右侧上重要提醒  系统公告   tab切换

// http://222.180.200.126:9045/api/projectNotice?topcount=2                系统公告


// --其他系统
// http://222.180.200.126:9045/api/systemDocking01                 不变

// 常用报表
// http://222.180.200.126:9045/api/commonReport                            不变     


// --项目信息查询
// http://222.180.200.126:9045/api/projectInfoById?projectId=1027        title内容    达成率。。。。。。。。。


// http://222.180.200.126:9045/api/projectWaterrentM?projectId=1085                年度用水            
http://222.180.200.126:9045/api/projectElectricityM?projectId=1085                  年度用电

--项目重大事件记录或者项目全生命周期
// http://222.180.200.126:9045/api/projectEvent01?projectid=10                         横向时间轴     只显示圆点和线条， 鼠标移入显示当前的详细信息



//-----------------------------------------------------------------------------------------------------------------------------------------未完成


--项目年度每月用电走势图
http://222.180.200.126:9045/api/projectElectMType?projectId=1085&topcount=2            月度
--项目年度每月用水走势图
http://222.180.200.126:9045/api/projectWaterMType?projectId=1085&topcount=2            月度


--项目报事完结率
#项目全年每月达成率
http://222.180.200.126:9045/api/projectMNewPYear?projectId=1062        横向柱状图
项目当年报事完结率 大中小   
http://222.180.200.126:9045/api/projectRateMaxMinVm             竖向树状图


    项目全年报事完结率统计
http://222.180.200.126:9045/api/projectTotalRate?projectId=1062                 title
项目当年各类型报事完结率对比
http://222.180.200.126:9045/api/projectTypeRate?projectId=1021                    自信息  



2019年11月16日21:29:36