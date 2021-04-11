<template>
  <div>
    <h1>{{ id ? "编辑" : "创建" }}分类</h1>
    <el-form :model="model" label-width="120px" @submit.native.prevent="save">
      <el-form-item label="父级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="model.name" placeholder="请输入分类名称"></el-input>
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
        name: ""
      },
      parents: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`universal/categories/${this.id}`, this.model);
      } else {
        await this.$http.post("universal/categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async getSingleInfo() {
      const res = await this.$http.get(`universal/categories/${this.id}`);
      this.model = res.data;
    },
    async getParents() {
      const res = await this.$http.get(`universal/categories`);
      this.parents = res.data;
    }
  },
  created() {
    this.id && this.getSingleInfo();
    this.getParents();
  }
};
</script>

<style>
</style>