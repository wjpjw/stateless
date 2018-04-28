<template>
  <div class="app-container calendar-list-container">

    <el-table :data="data" v-loading.body="isLoading" highlight-current-row border fit style="width: 99.6%">

      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名" min-width="120px">
        <template slot-scope="scope">
          <el-input v-model="scope.row.username"></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" label="权限" min-width="200px">
        <template slot-scope="scope">
          <el-select class="edit-input" v-model="scope.row.usertype">
            <el-option v-for="item in options" :key="item" :value="item" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="center" label="容器列表" min-width="120px">
        <template slot-scope="scope">
          <el-select class="edit-input" v-model="scope.row.containers" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in options2" :key="item" :value="item">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="center" label="数据库操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" @click="push(scope.row)" size="mini" icon="el-icon-upload2">发布</el-button>
          <el-button type="danger" @click="del(scope.row)" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  props:["dataw","meta"],  //todo: 以后再把它做成无状态的。
  data(){
    return {
      options: ['普通用户', '管理员'],
      options2: ['alpha', 'beta', 'theta', 'gamma', 'kappa', 'zeta', 'delta', 'mu', 'pi', 'eta', 'lambda'],
      data: null,
      isLoading: true
    }
  },
  created(){
    this.queryData()
  },
  methods: {
    queryData() {
        this.isLoading = true
        //从数据库读取
        this.data=[
            {
                id: '1',
                username: 'wjp',
                usertype: '管理员',
                containers: []
            },
            {
                id: '2',
                timestamp: Date.now(),
                username: 'lot',
                usertype: '管理员',
                containers: ['kappa', 'zeta', 'delta']
            },
            {
                id: '3',
                timestamp: Date.now(),
                username: 'wjp',
                usertype: '普通用户',
                containers: ['eta', 'lambda']
            },
            {
                id: '3',
                timestamp: Date.now(),
                username: 'wjp',
                usertype: '普通用户',
                containers: ['eta', 'lambda']
            },
            {
                id: '3',
                timestamp: Date.now(),
                username: 'wjp',
                usertype: '普通用户',
                containers: ['eta', 'lambda']
            },
            {
                id: '3',
                timestamp: Date.now(),
                username: 'wjp',
                usertype: '普通用户',
                containers: ['eta', 'lambda']
            },
            {
                id: '3',
                timestamp: Date.now(),
                username: 'wjp',
                usertype: '普通用户',
                containers: ['eta', 'lambda']
            },
            {
                id: '3',
                timestamp: Date.now(),
                username: 'wjp',
                usertype: '普通用户',
                containers: ['eta', 'lambda']
            },
            {
                id: '3',
                timestamp: Date.now(),
                username: 'wjp',
                usertype: '普通用户',
                containers: ['eta', 'lambda']
            },
            {
                id: '3',
                timestamp: Date.now(),
                username: 'wjp',
                usertype: '普通用户',
                containers: ['eta', 'lambda']
            },
            {
                id: '3',
                timestamp: Date.now(),
                username: 'wjp',
                usertype: '普通用户',
                containers: ['eta', 'lambda']
            },
            {
                id: '3',
                timestamp: Date.now(),
                username: 'wjp',
                usertype: '普通用户',
                containers: ['eta', 'lambda']
            }
        ]
        this.isLoading = false
    },
    push(row){

    },
    del(row){

    }
  }
}
</script>

<style scoped>
.edit-input {
    right: 0;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100%;
}
.cancel-btn {
  position: absolute;
  top: 18.4px;
  right: 3.4px;
  padding: 5px 5px;
}
.confirm-btn{
  position: absolute;
  top: 18.4px;
  right: 30px;
  padding: 5px 5px;
}
</style>
