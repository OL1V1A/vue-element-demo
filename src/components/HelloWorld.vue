<template>

  <div class="hello">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        
          awesome-vue
          <el-button @click="getUser">获取用户</el-button>
        
      </li>
      <li>
        当前用户：{{user}}
        <el-button @click="logout">退出登录</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      user: localStorage.getItem('user'),
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
      getUser(){
          this.$http.post("/user/getRedis",{},response => {
              console.log("1111");
              console.log(response.data)
          });
      },
      logout() {
        this.$confirm('是否退出登录？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$options.methods.lout();
          this.lout();
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          // localStorage.removeItem('user');
          // localStorage.removeItem('token');
          // setTimeout(() => {
          //    this.$router.push({path: '/login'});
          //  }, 1000);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          });
        });


        // this.$http.post('/logout',{},response => {
        //     if(response.status === 200){
        //       localStorage.removeItem('user');
        //       localStorage.removeItem('token');
        //     }
        // })
      },

      lout() {
        this.$http.post('/logout',{},response => {
            if(response.status === 200){
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              
              setTimeout(() => {
                this.$router.push({path: '/login'});
              }, 400);
              
            }
        })
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
