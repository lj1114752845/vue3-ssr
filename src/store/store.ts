/*
* 作者：李健
* 邮箱：lj2690@163.com
* */
import {defineStore} from "pinia";

interface Data {
    dataList: Record<string, any>[]
}

const useDataStore = defineStore('data', {
    state: (): Data => {
        return {dataList: []}
    },
    actions: {
        async getData() {
            const res = await fetch("http://jsonplaceholder.typicode.com/users");
            this.dataList.length = 0;
            this.dataList = await res.json();
        },
        addItem() {
            this.dataList.unshift({
                username: `测试用户${(Math.random() * 100).toFixed(0)}`
            });
        }
    }
});

export {
    useDataStore
}