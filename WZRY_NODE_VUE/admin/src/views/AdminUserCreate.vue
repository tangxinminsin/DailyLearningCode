<template>
  <div>
    <h1>{{ id ? "编辑" : "创建" }}管理员</h1>
    <el-form :model="model" label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input
          v-model="model.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="model.password"
          placeholder="请输入密码"
        ></el-input>
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`universal/admin_user/${this.id}`, this.model);
      } else {
        await this.$http.post("universal/admin_user", this.model);
      }
      this.$router.push("/admin_user/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async getSingleInfo() {
      const res = await this.$http.get(`universal/admin_user/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.getSingleInfo();
  }
};
</script>

<style>
</style>