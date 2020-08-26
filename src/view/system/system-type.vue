<template>
<div>
    <Card>
        <tables ref="tables" editable searchable stripe search-place="top" v-model="tableData" :border="border" :typeaddBtn="typeaddBtn" :searchCol="searchCol" :columns="columns" :title="title" :pageTotal="pageTotal" :pageNum="pageNum" :addListArr="addListArr" :arrsearch="arrsearch" :height="height" @on-delete="handleDelete" @onPageChage="onPageChage" @onPageSizeChage="onPageSizeChage" @onHandleSearch="onHandleSearch" @on-type-handle-from="onTypeHandleFrom" />
        <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
        <editTypeForm v-if="editfromshow" @on-handle-save="onHandleSave" @on-handle-close="onHandleClose" :getEditData="getEditData"></editTypeForm>
    </Card>
</div>
</template>

<script>
import Tables from "_c/tables";
import editTypeForm from "_c/tables/editTypeForm.vue";
// import { getTableData } from '@/api/data'
export default {
    name: "user_information",
    components: {
        Tables,
        editTypeForm,
    },
    data() {
        return {
            columns: [{
                    title: "编号",
                    key: "f_id",

                },
                {
                    title: "组织类型",
                    key: "f_name",

                },
                {
                    title: "操作",
                    key: "handle",
                    options: ["delete", "edit"],
                    button: [
                        (h, params, vm) => {
                            return h(
                                "Poptip", {
                                    props: {
                                        confirm: true,
                                        title: "你确定要删除吗?",
                                    },
                                    on: {
                                        "on-ok": () => {
                                            vm.$emit("on-delete", params);
                                            vm.$emit(
                                                "input",
                                                params.tableData.filter(
                                                    (item, index) => index !== params.row.initRowIndex
                                                )
                                            );
                                        },
                                    },
                                },
                                [
                                    h(
                                        "Button", {
                                            props: {
                                                type: "warning",
                                                size: "small",
                                                icon: "logo-tumblr",
                                            },
                                            style: {
                                                marginRight: "10px",
                                            },
                                        },
                                        "删除"
                                    ),
                                ]
                            );
                        },
                        (h, params, vm) => {
                            return h(
                                "Button", {
                                    props: {
                                        type: "error",
                                        size: "small",
                                        icon: "ios-build",
                                    },
                                    on: {
                                        click: () => {
                                            this.editshow(params);
                                        },
                                    },
                                },
                                "编辑"
                            );
                        },
                    ],
                    editable: true,
                },
            ],
            tableData: [],
            title: "用户信息添加",
            pageTotal: 10,
            pageNum: 1,
            pageSize: 10,
            typeaddBtn: true,
            searchCol: true,
            border: true,
            addListArr: [{
                    nametitle: "编号",
                    key: "f_id",
                    valuetext: "",
                },
                {
                    nametitle: "组织类型",
                    key: "f_name",
                    valuetext: "",
                },
            ],
            arrsearch: [{
                title: "组织类型",
                val: "",
                name: "f_name",
            }],
            height: 450,
            editfromshow: false,
            getEditData: {},
        };
    },
    methods: {
        // 新增 表单 确认btn
        async onTypeHandleFrom(arrData) {
            let res = await $ajax("systemtypeget", "post", arrData);
            if (!res) return;
            console.log(res);
            this.getdata();
        },
        async handleDelete(params) {
            console.log(params);
            //删除 row
            let res = await $ajax("systemtypeget", "delete", {
                f_id: params.row.f_id,
            });
            if (!res) return false;
            Toast("删除成功");
        },
        exportExcel() {
            this.$refs.tables.exportCsv({
                filename: `table-${new Date().valueOf()}.csv`,
            });
        },
        //获取页码
        onPageChage(pageNum) {
            console.log(pageNum);
            this.pageNum = pageNum;
            this.getdata();
        },
        //获取页数
        onPageSizeChage(pageSize) {
            console.log(pageSize);
            this.pageSize = pageSize;
            this.getdata();
        },
        //搜索
        onHandleSearch(...obj) {
            let data = obj[0];
            this.getSearchData(data);
        },
        async getdata() {
            let res = await $ajax("systemtypeget", "get", {
                f_page: this.pageNum,
                f_limit: this.pageSize,
            });
            if (!res) return false;
            console.log(res);
            this.pageTotal = res.f_data_json.f_count;
            this.pageNum = res.f_data_json.f_page;
            let tableJson = [];
            res.f_data_json.f_values.forEach((item, index) => {
                tableJson.push({
                    f_id: item.f_id,
                    f_name: item.f_name,
                    initRowIndex: index,
                });
            });
            this.tableData = tableJson;
        },
        //搜索
        async getSearchData(data) {
            let res = await $ajax("systemtypeget", "get", data);
            if (!res) return false;
            this.pageTotal = res.f_data_json.f_count;
            this.pageNum = res.f_data_json.f_page;
            let tableJson = [];
            res.f_data_json.f_values.forEach((item, index) => {
                tableJson.push({
                    f_id: item.f_id,
                    f_name: item.f_name,
                    initRowIndex: index,
                });
            });
            this.tableData = tableJson;
        },
        //编辑获取单条数据
        async getEditHandle(data) {
            let res = await $ajax("systemtypeget", "get", data);
            if (!res) return false;
            this.pageTotal = res.f_data_json.f_count;
            this.pageNum = res.f_data_json.f_page;
            let formdata = [];
            res.f_data_json.f_values.forEach((item, index) => {
                formdata.push({
                    f_id: item.f_id,
                    f_name: item.f_name,
                    initRowIndex: index,
                });
            });
            // console.log(formdata)
            this.getEditData = formdata[0];

            this.editfromshow = true;
        },
        //编辑显示
        editshow(params) {
            console.log(params);
            let data = {
                f_name: params.row.f_name,
            };
            this.getEditHandle(data);
            // console.log(res)
        },
        //编辑保存
        async onHandleSave(data) {
            console.log(data);
            let res = await $ajax("systemtypeget", "put", data);
            if (!res) return false;
            Toast("更新成功");
            this.editfromshow = false;
            this.getdata();
        },
        //编辑 取消
        onHandleClose() {
            this.editfromshow = false;
        },
    },
    mounted() {
        this.getdata();
    },
};
</script>

<style>
</style>
