<template>
    <div>
        人脸数据管理
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        async getdata(data) {
            let res = await $ajax('faceinfo', 'get', data)
            if(!res) return false
            console.log(res)
        },
    },
    mounted() {
        this.getdata()
    },
}
</script>
<style lang="less" scoped>

</style>