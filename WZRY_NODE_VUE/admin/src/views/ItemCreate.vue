<template>
  <div>
    <h1>{{ id ? "编辑" : "创建" }}物品</h1>
    <el-form :model="model" label-width="120px" @submit.native.prevent="save">
      <el-form-item label="物品名称">
        <el-input v-model="model.name" placeholder="请输入物品名称"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthorization()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        icon: ""
      }
    };
  },
  methods: {
    async afterUpload(res) {
      // this.$set(this.model, "icon", res.url);
      this.model.icon = res.url;
    },
    async save() {
      if (this.id) {
        await this.$http.put(`universal/items/${this.id}`, this.model);
      } else {
        await this.$http.post("universal/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async getSingleInfo() {
      const res = await this.$http.get(`universal/items/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.getSingleInfo();
  }
};
</script>

<style >
</style>