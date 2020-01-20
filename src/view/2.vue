<template>
    <div>
        <div class="nav">
            <i class="el-icon-d-arrow-left leftbtn" @click="leftbtn"></i>
            <div class="tab" ref="tabs">
                <router-link to="/2/listedcompany">上市公司首页查询</router-link>
                <router-link :to="{path:'/2/companylist',query:{id:item.id}}" exact v-for="(item,index) in list"
                             :key="index">{{item.companyName}}
                </router-link>
            </div>
            <i class="el-icon-d-arrow-right rightbtn" @click="rightbtn"></i>
        </div>


        <div>
            <router-view></router-view>

        </div>
    </div>

</template>

<script>

    export default {
        components: {
            // Listedcompany,Companylist
        },
        data() {
            return {
                //    show:true,
                //    isshow:false,
                num: 0,
                list: [],  //公司列表数据
                index:
                    {
                        id: 0,
                        companyName: "上市公司数据查询"
                    },
                nameid: "",
                btnindex: null,
                number: 0
            }
        },
        methods: {


            leftbtn() {
                this.number = 0
                this.$refs.tabs.style.left = 12 + "px"
            },
            rightbtn() {
                this.number--
                if (this.number >= -12) {
                    this.$refs.tabs.style.left = (this.number * 100) + "px"
                } else {
                    this.number = -12
                }
            },

        },
        mounted() {

            // 获取所有公司名称 并压入上市公司数据数据到第一条
            this.axios.get("/api/listedCompany01").then((res) => {
                this.list = res.data.data
            })
        },
    }
</script>

<style scoped>
    .title {
        font-size: 26px;
        display: flex;

    }

    .tab {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        position: absolute;
        left: 12px;
        transition: all 1s
    }

    .tab > li {
        line-height: 42px;
        font-size: 14px;
        cursor: pointer;
        margin-right: 16px;
        white-space: nowrap;
        text-align: center;
    }

    .nav {
        height: 44px;
        overflow: hidden;
        padding: 0 30px;
        position: relative;
        border-bottom: 1px solid #ccc;
    }

    .leftbtn {
        position: absolute;
        top: 0;
        left: -30px;
        line-height: 42px;
        text-align: center;
        cursor: pointer;
        background: #eee;
        width: 30px;
        height: 100%;
        z-index: 2;
        transition: all 0.8s
    }

    .rightbtn {
        position: absolute;
        top: 0;
        right: -30px;
        line-height: 42px;
        text-align: center;
        cursor: pointer;
        z-index: 2;
        background: #eee;
        width: 30px;
        height: 100%;
        transition: all 0.8s

    }

    .nav:hover .leftbtn {
        left: 0;
    }

    .nav:hover .rightbtn {
        right: 0;
    }

    .tab > a {
        line-height: 42px;
        font-size: 14px;
        cursor: pointer;
        margin-right: 16px;
        white-space: nowrap;
        text-align: center;
        color: #666;
        text-decoration: none
    }
</style>

<style>
    /* .active{
    color: #49a4d9;
    border-bottom: 2px solid #49a4d9;
    }   */
    .router-link-active {
        color: #49a4d9;
        border-bottom: 2px solid #49a4d9;
    }
</style>