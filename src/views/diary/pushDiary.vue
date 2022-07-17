<template>
  <div id="push">
    <el-form :rules="rules" :model="diary" ref="formName"
      ><!-- :rules="rules" 校验规则 -->
      <el-form-item prop="title">
        <el-input
          v-model="diary.title"
          placeholder="请输入标题"
          role=""
        ></el-input>
      </el-form-item>
      <!-- 上传封面 -->
      <div class="img_ipload">
        <!-- 未上传 -->
        <el-upload
          action="/uploadImage"
          :data="{ folder: folder }"
          :on-success="uploadImageScuccess"
          :show-file-list="false"
        >
          <li class="el-icon-plus" v-if="!showImg">上传图片</li>
        </el-upload>
        <!-- 上传后效果 -->
        <el-image
          @click="previewImg(imgUrl)"
          :src="imgUrl"
          class="img"
          v-if="showImg"
        ></el-image>
        <!-- 清除图片 -->
        <i
          class="deleteImg el-icon-delete"
          v-if="showImg"
          @click="deleteImg"
        ></i>
      </div>
      <!-- 简介 -->
      <el-form-item prop="abs">
        <el-input v-model="diary.abs" placeholder="请输入简介"></el-input>
      </el-form-item>
      <div class="other">
        <!-- 地理位置 -->
        <el-form-item prop="place">
          <el-select v-model="diary.place" placeholder="请选择地理位置">
            <el-option label="广州" value="广州"></el-option>
            <el-option label="深圳" value="深圳"></el-option>
            <el-option label="揭阳" value="揭阳"></el-option>
            <el-option label="汕头" value="汕头"></el-option>
          </el-select>
        </el-form-item>
        <!-- 出发时间 -->
        <el-form-item prop="goTime">
          <el-date-picker
            v-model="diary.goTime"
            type="date"
            placeholder="出发时间"
          ></el-date-picker>
        </el-form-item>
        <!-- 分类 -->
        <el-form-item prop="classify">
          <el-select v-model="diary.classify" placeholder="分类">
            <el-option label="星空" value="星空"></el-option>
            <el-option label="大海" value="大海"></el-option>
            <el-option label="草原" value="草原"></el-option>
            <el-option label="峡谷" value="峡谷"></el-option>
          </el-select>
        </el-form-item>
        <!-- 随同人员 -->
        <el-form-item prop="accompany">
          <el-select v-model="diary.accompany" placeholder="随同人员">
            <el-option label="情侣" value="情侣"></el-option>
            <el-option label="朋友" value="朋友"></el-option>
            <el-option label="父母" value="父母"></el-option>
            <el-option label="单人" value="单人"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- 所需天数 -->
      <el-form-item prop="day">
        <el-input
          v-model.number="diary.day"
          placeholder="请输入所需天数"
        ></el-input>
      </el-form-item>
      <!-- 所需金额 -->
      <el-form-item prop="money">
        <el-input
          v-model.number="diary.money"
          placeholder="请输入所需金额"
        ></el-input>
      </el-form-item>
      <!-- 富文本编辑器 -->
      <div id="editor">
        <umeditor v-model="content" @receiveUM="receiveUM" />
      </div>
      <!-- 提交按钮 -->
      <el-form-item class="sumbit">
        <el-button @click="sumbit" type="primary" plain>发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { watch } from "vue";

export default {
  data() {
    return {
      /* 校验规则 */
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        abs: [{ required: true, message: "请输入简介", trigger: "blur" }],
        place: [{ required: true, message: "请选择地理区域", trigger: "blur" }],
        goTime: [
          { required: true, message: "请选择出发时间", trigger: "blur" },
        ],
        classify: [{ required: true, message: "请选择分类", trigger: "blur" }],
        accompany: [
          { required: true, message: "请选择随同人员", trigger: "blur" },
        ],
        day: [
          { required: true, message: "请输入所需天数", trigger: "blur" },
          { type: "number", message: "所需天数必须为数字值" },
        ],
        money: [
          { required: true, message: "请输入所需金额", trigger: "blur" },
          { type: "number", message: "所需金额必须为数字" },
        ],
      },
      imgUrl: "",
      showImg: false,
      folder: "" /* 文件夹名 */,
      editor: "",
      content: "<p>everything you like</p>",
      //进行数据绑定
      diary: {
        id: "",
        title: "",
        abs: "",
        place: "",
        cover: "",
        content: "",
        watch: 0,
        classify: "",
        uid: "",
        goTime: "",
        day: "",
        money: "",
        accompany: "",
        writeTime: "",
        folder:"",
      },
    };
  },
  mounted() {
    let time = new Date().getTime(); //获取时间戳
    let random = Math.ceil(Math.random() * 10); //随时数 向上取整 以防取到0
    let name = time * random; //创建文件名
    //  alert(name);
    this.folder = "diary/" + name + "/"; //获取文件名
  },
  methods: {
    /* 预览图片 */
    previewImg(url) {
      this.$hevueImgPreview(url);
    },
    uploadImageScuccess(success) {
      this.imgUrl = success.data; //将http://localhost/diary/文件夹/图片 赋值欸imgUrl
      this.showImg = true;
    },
    receiveUM(editor) {
      /* 初始化富文本编辑器 */
      this.editor = editor;
    },
    /* 删除封面图片*/
    deleteImg() {
      //准备参数
      let params = "path=" + this.imgUrl;
      this.postRequest("/deleteCover?" + params)
        .then((success) => {
          /* showImg改为false */
          this.showImg = false;
          /* 将imgUrl清空 */
          this.imgUrl = "";
        })
        .catch((error) => {});
    },
    /* 提交发布 */
    sumbit() {
      //校验
      this.$refs["formName"].validate((valid) => {
        if (valid) {
          //校验成功
          //校验是否有封面
          if (
            this.imgUrl == null ||
            this.imgUrl == "" ||
            this.imgUrl == undefined
          ) {
            this.$message.error("封面必须上传");
            return false;
          } else if (
            this.content == null ||
            this.content == "" ||
            this.content == undefined
          ) {
            //校验内容
            this.$message.error("富文本必须编写内容");
            return false;
          } else {
            this.uploadEditorImage();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //上传富文本编辑器的图片
    uploadEditorImage() {
      //将富文本编辑器的预览图片替换成本地存储
      const images = this.editor.getFileFormData();
      const formData = new FormData();
      if (images != null) {
        images.forEach((element) => {
          formData.append("upfile[]", element);
        });
        //发送post请求
        this.postRequest("/uploadEditorImage?folder=" + this.folder, formData)
          .then((res) => {
            console.log("测试数据");
            console.log(res.data);
            //返回网络路径<数组> 重新替换掉文本编辑器的图片路径
            this.editor.replaceImageUrl(res.data);
          })
          .catch((error) => {});
      }
      //设置定时器 500毫秒后再插入
      setTimeout(() => {
        this.insert();
      }, 500);
    },
    /* 插入数据 */
    insert() {
      //1、准备数据
      this.diary.cover = this.imgUrl;
      this.diary.content = this.content;
      this.diary.uid = JSON.parse(sessionStorage.getItem("user")).id;
      this.diary.folder = this.folder;//更新文件夹名
      //发送插入游记的请求
      this.postRequest("/insertDiary", this.diary)
        .then((success) => {
          //判断一下 新增成功跳转到游记页面
          if (success.code == 200) {
            this.$router.replace("/diary");
          }
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss">
#push {
  width: 80vw;
  // height: 600px;
  margin: 0px auto;
  padding-top: 50px;
  //   box-shadow: 0px 4px 10px 10px   #eee;
  .other {
    // width: 80vw;
    height: 60px;
    // margin-top: 10px;
    // margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .img_ipload:hover {
    // filter: blur(0px);/* 模糊4px */
    opacity: 1;
  }
  .img_ipload {
    width: 80vw;
    height: 260px;
    background-color: #efefef;
    margin-bottom: 20px;
    font-size: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer; /* 光标变化 ：手指*/
    // filter: blur(1px);/* 模糊1px */
    opacity: 0.8;
    overflow: hidden;
    position: relative;
  }
  .img_ipload .img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    // object-fit: cover;
  }
  .img_ipload .deleteImg {
    position: absolute;
    right: 4px;
    top: 4px;
  }
  .sumbit {
    margin: 20px auto;
    text-align: left;
  }
}
</style>