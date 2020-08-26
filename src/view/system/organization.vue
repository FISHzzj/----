<template>
<div class="demo-split">
    <Split v-model="split1">
        <div slot="left" class="demo-split-pane">
            <Card>
                <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" :title="title" :pageTotal="pageTotal" :pageNum="pageNum" :arrsearch="arrsearch" @onPageChage="onPageChage" @onPageSizeChage="onPageSizeChage" @onHandleSearch="onHandleSearch" @on-row-dblclick="onRowDblclick" />
            </Card>
        </div>
        <div slot="right" class="demo-split-pane">
            <Button type="primary" @click="addorg" v-if="addorgshow">添加组织名称</Button>
            <Modal v-model="modal1" title="添加组织名称" @on-ok="ok" @on-cancel="cancel">
                <div>
                    <Input v-model="value11">
                    <span slot="prepend">组织名称</span>
                    </Input>
                </div>
            </Modal>
            <Card shadow style="height: 100%;width: 100%;overflow:hidden">

                <div class="department-outer">
                    <div class="zoom-box">
                        <zoom-controller v-model="zoom" :min="20" :max="200"></zoom-controller>
                    </div>
                    <div class="view-box">
                        <org-view v-if="data" :data="data" :zoom-handled="zoomHandled" @on-menu-click="handleMenuClick"></org-view>
                    </div>
                </div>
            </Card>
        </div>
    </Split>
</div>
</template>

<script>
import Tables from "_c/tables";
import {
    formatTreeData,
    formatTreeDataEx,
    formatTreePremsToString,
} from "../../func/perms-pub.js";
import {
    Uniq
} from "../../func/uniq.js";
import OrgView from "./components/org-view.vue";
import ZoomController from "./components/zoom-controller.vue";
import "./index.less";
const menuDic = {
    edit: "编辑组织",
    detail: "查看组织",
    new: "新增子组织",
    delete: "删除组织",
};
export default {
    name: "organization",
    components: {
        Tables,
        OrgView,
        ZoomController,
    },
    data() {
        return {
            split1: 0.35,
            columns: [{
                    title: "编号",
                    key: "f_id",
                },
                {
                    title: "组织类型",
                    key: "f_name",
                },
            ],
            arrsearch: [{
                title: "组织类型",
                val: "",
                name: "f_name",
            }, ],
            tableData: [],
            title: "分组名称添加",
            pageTotal: 10,
            pageNum: 1,
            pageSize: 10,
            f_id: "",
            data: {
                children: [{
                        children: [{
                                id: 5,
                                label: "研发-前端",
                            },
                            {
                                id: 6,
                                label: "研发-后端",
                            },
                            {
                                id: 9,
                                label: "UI设计",
                            },
                            {
                                id: 10,
                                label: "产品经理",
                            },
                        ],
                        id: 2,
                        label: "产品研发部",
                    },
                    {
                        children: [{
                                id: 7,
                                label: "销售一部",
                            },
                            {
                                id: 8,
                                label: "销售二部",
                            },
                        ],
                        id: 3,
                        label: "销售部",
                    },
                ],
                id: 0,
                label: "XXX科技有限公司",
            },
            zoom: 100,
            modal1: false,
            value11: "",
            addorgshow: false,
            f_Organization_id: '', //父级id
        };
    },
    computed: {
        zoomHandled() {
            return this.zoom / 100;
        },
    },
    methods: {
        //新增 组织名称
        async ok() {
            if (!this.f_id) return false
            if (!this.value11) return false
            let data = {}
            data['f_name'] = this.value11
            data['f_OrgType_id'] = this.f_id
            if (this.f_Organization_id) {
                data['f_Organization_id'] = this.f_Organization_id
            }
            let res = await $ajax("organization", "post", data);
            if (!res) return false;
            console.log(res);
            if (res.f_data_json.f_values.length > 0) {

                let f_perms_groups = res.f_data_json.f_values[0].f_perms_groups;
                this.targetKeys1 = f_perms_groups;
            }
        },
        cancel() {
            this.$Message.info("Clicked cancel");
        },
        //添加组织架构顶级
        addorg() {
            this.modal1 = true;
        },
        setDepartmentData(data) {
            data.isRoot = true;
            return data;
        },
        handleMenuClick({
            data,
            key
        }) {
            console.log(data, key)
            if (key == 'new') {
                this.modal1 = true;
                this.f_Organization_id = data.id
            } else if (key == 'edit') {

            } else if (key == 'delete') {

            }
        },
        getDepartmentData() {
            getOrgData().then((res) => {
                const {
                    data
                } = res;
                this.data = data;
            });
        },
        //双击行
        onRowDblclick(row, index) {
            console.log(row, index);
            let data = {};
            data["f_id"] = row.f_id;
            this.f_id = row.f_id;
            this.getorganization(data);
        },
        //获取页码
        onPageChage(pageNum) {
            console.log(pageNum);
            let data = {};
            data["f_page"] = pageNum;
            this.pageNum = pageNum;
            this.getdata(data);
        },
        //获取页数
        onPageSizeChage(pageSize) {
            console.log(pageSize);
            let data = {};
            data["f_limit"] = pageSize;
            this.pageSize = pageSize;
            this.getdata(data);
        },
        //搜索
        onHandleSearch(data) {
            console.log(data);
            this.getSearchData(data);
        },
        async getdata(data) {
            let res = await $ajax("systemtypeget", "get", data);
            if (!res) return false;
            console.log(res);
            this.pageTotal = res.f_data_json.f_count;
            this.pageNum = res.f_data_json.f_page;
            this.f_id = res.f_data_json.f_values[0].f_id
            let data_f_id = {}
            let tableJson = [];
            res.f_data_json.f_values.forEach((item, index) => {
                tableJson.push({
                    f_id: item.f_id,
                    f_name: item.f_name,
                    initRowIndex: index,
                });
            });
            this.tableData = tableJson;
            data_f_id['f_id'] = this.f_id
            this.getorganization(data_f_id)
        },
        //获取组织类型=》组织架构的关系
        async getorganization(data) {
            let res = await $ajax("organization", "get", data);
            if (!res) return false;
            console.log(res);
            if (res.f_data_json.f_values.length > 0) {

                let f_perms_groups = res.f_data_json.f_values;
                console.log(f_perms_groups)
            } else {
                this.addorgshow = true
            }
        },
        //搜索
        async getSearchData(data) {
            let res = await $ajax("systemtypeget", "get", data);
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
    },
    mounted() {
        this.getdata();;
    },
};
</script>

<style lang="less" scoped>
.demo-split {
    height: 100%;
    border: 1px solid #dcdee2;
}

.demo-split-pane {
    padding: 10px;
    height: 100%;
}
</style>
