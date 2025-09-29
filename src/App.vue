<script setup lang="ts">
import {useRouter} from "vue-router";
import {onServerPrefetch} from "vue";
import {useDataStore} from "./store/store.ts";

const router = useRouter();
const store = useDataStore();


function toHome() {
  router.push("/");
}

function addItem() {
  store.addItem();
}

onServerPrefetch(async () => {
  await store.getData();
});
</script>

<template>
  <div class="box">
    <div class="content">
      <nav>
        <button @click="toHome">主页HOME</button>
        <router-link to="/user">用户USER</router-link>
        <router-link to="/info">信息INFO</router-link>
        <button @click="addItem">新增数据</button>
      </nav>
      <router-view></router-view>
      <div class="data-list">
        <template v-for="item of store.dataList">
          <div>
            {{ item.username }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-list {
  display: flex;
  flex-direction: column;
  height: 0;
  flex: 1;
  overflow: auto;
}

nav {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
}

.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
