<template>
  <div>
    <Head></Head>
    <div id="home">
      <!-- 轮播图 begin -->
      <el-carousel
        indicator-position="outside"
        class="el-carousel"
        height="60vh"
      >
        <el-carousel-item v-for="item in images" :key="item">
          <el-image :src="item" fit="fill"></el-image>
        </el-carousel-item>
      </el-carousel>
      <!-- 轮播图 end -->
      <div class="sales-entrys-container">
        <div class="sales-entrys-div">
          <div class="sales-entrys-title">自由行</div>
          <div>旅游就要freestyle</div>
        </div>
        <div class="sales-entrys-div">
          <div class="sales-entrys-title">跟团游</div>
          <div>省心省力 行程透明</div>
        </div>
        <div class="sales-entrys-div">
          <div class="sales-entrys-title">当地游</div>
          <div>最地道的玩法体验</div>
        </div>
        <div class="sales-entrys-div">
          <div class="sales-entrys-title">机票</div>
          <div>特惠一折起</div>
        </div>
        <div class="sales-entrys-div">
          <div class="sales-entrys-title">签证</div>
          <div>服务优质 出签率高</div>
        </div>
        <div class="sales-entrys-div">
          <div class="sales-entrys-title">邮轮</div>
          <div>移动的海上城堡</div>
        </div>
      </div>

      <div class="sales-entrys-input">
        <div class="child"></div>
        <div class="child chang_input">发布游记</div>
        <div class="child">发布攻略</div>
        <div class="child">
          <el-button @click="add" class="add" type="warning">发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/headView.vue";
export default {
  data() {
    return {
      images: [
        "http://localhost:8081/image/home/1.jpg",
        "http://localhost:8081/image/home/2.jpg",
        "http://localhost:8081/image/home/3.jpg",
        "http://localhost:8081/image/home/4.jpg",
      ],
    };
  },
  components: {
    //注册组件
    Head: Head,
  },
  methods:{
    add(){
        this.$router.push('/pushDiary');
    }
  },
};
</script>

<style lang="scss">
#home {
  width: 100vw;
  .el-carousel {
    width: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .el-carousel-item {
    width: 100%;
  }
  .sales-entrys-container {
    width: 70vw;
    height: 80px;
    margin: 0px auto;
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    align-content: center;
    .sales-entrys-div {
      width: 16.6%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 10px;
      align-items: flex-start;
      font-size: 12px;
      margin-right: 5px;
    }
    .sales-entrys-title {
      font-size: 18px;
      font-weight: bold;
    }
    .sales-entrys-div:nth-child(1) {
      background-image: url("https://n2-q.mafengwo.net/s13/M00/E5/F2/wKgEaVy1QCCAei5UAAAO1FUM6kc797.png");
      background-size: cover;
      color: #d16984;
    }
    .sales-entrys-div:nth-child(2) {
      background-image: url("https://p1-q.mafengwo.net/s13/M00/E4/D1/wKgEaVy1P--AVjJFAAAQMS0_1iU358.png");
      background-size: cover;
      color: #83449f;
    }
    .sales-entrys-div:nth-child(3) {
      background-image: url("https://b3-q.mafengwo.net/s13/M00/E4/10/wKgEaVy1P9GAUbowAAAK_IDLPbA968.png");
      background-size: cover;
      color: #a6513c;
    }
    .sales-entrys-div:nth-child(4) {
      background-image: url("https://b1-q.mafengwo.net/s13/M00/E5/08/wKgEaVy1P_iAfYzkAAAdot1Y3HY493.png");
      background-size: cover;
      color: #4e5dc0;
    }
    .sales-entrys-div:nth-child(5) {
      background-image: url("https://n1-q.mafengwo.net/s13/M00/E5/72/wKgEaVy1QAmAO9dkAAAez69iAn0483.png");
      background-size: cover;
      color: #698c60;
    }
    .sales-entrys-div:nth-child(6) {
      background-image: url("https://b3-q.mafengwo.net/s13/M00/E5/A3/wKgEaVy1QBOAKQIjAAAjohve-bM990.png");
      background-size: cover;
      color: #4e5dc0;
    }
  }

  .sales-entrys-input {
    width: 70vw;
    height: 60px;
    margin: 0px auto;
    margin-top: 30px;
    display: flex;
    align-items: center !important;
    align-content: center;
    justify-content: space-around;
    border-bottom: 1px solid #dfdfdf;
    .child {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      cursor: pointer;
      .add {
        background-color: #ff9d00;
      }
    }
    .child:nth-child(1) {
      background-image: url("http://images.mafengwo.net/images/safety-prevention/index-link.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position-y: 15px;
    }
    .child:nth-child(4) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .chang_input {
      color: #ff9d00;
      box-shadow: 0px 1px 0px #ff9d00;
    }
  }
}
</style>