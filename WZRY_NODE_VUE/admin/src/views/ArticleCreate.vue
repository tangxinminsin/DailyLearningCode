<template>
  <div>
    <h1>{{ id ? "编辑" : "创建" }}文章</h1>
    <el-form :model="model" label-width="120px" @submit.native.prevent="save">
      <el-form-item label="分类">
        <el-select v-model="model.categories" placeholder="请选择" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="model.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <vue-editor
          v-model="model.content"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        title: "",
        content: ""
      },
      categories: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`universal/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("universal/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async getSingleInfo() {
      const res = await this.$http.get(`universal/articles/${this.id}`);
      this.model = res.data;
    },
    async getCategories() {
      const res = await this.$http.get(`universal/categories`);
      this.categories = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post(`/upload`, formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  },
  created() {
    this.id && this.getSingleInfo();
    this.getCategories();
  }
};
</script>

<style>
</style>