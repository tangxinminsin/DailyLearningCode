<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="dataList">
      <el-table-column prop="_id" label="ID"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/admin_user/edit/${scope.row._id}`)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    async getDataList() {
      const res = await this.$http.get("universal/admin_user");
      this.dataList = res.data;
    },
    async remove(row) {
      this.$confirm(`是否删除分类——${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`universal/admin_user/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getDataList();
      });
    }
  },
  created() {
    this.getDataList();
  }
};
</script>

<style>
</style>