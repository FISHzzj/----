<template>
    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                <Tree 
                    :data="data1" 
                    @on-select-change="onSelectChange"
                ></Tree>
            </div>
            <div slot="right" class="demo-split-pane">
                <Transfer
                    :data="data2"
                    :target-keys="targetKeys1"
                    :render-format="render1"
                    @on-change="handleChange1"></Transfer>
            </div>
        </Split>
    </div>
</template>
<script>
export default {
    data () {
        return {
            split1: 0.3,
            data1: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1'
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
            data2: this.getMockData(),
            targetKeys1: this.getTargetKeys()
        }
    },
    methods:{
        onSelectChange(domNode, index) {
            console.log(domNode, index)
        },
        getMockData () {
            let mockData = [];
            for (let i = 1; i <= 20; i++) {
                mockData.push({
                    key: i.toString(),
                    label: 'Content ' + i,
                    description: 'The desc of content  ' + i,
                    disabled: Math.random() * 3 < 1
                });
            }
            return mockData;
        },
        getTargetKeys () {
            return this.getMockData()
                    .filter(() => Math.random() * 2 > 1)
                    .map(item => item.key);
        },
        render1 (item) {
            return item.label;
        },
        handleChange1 (newTargetKeys, direction, moveKeys) {
            console.log(newTargetKeys);
            console.log(direction);
            console.log(moveKeys);
            this.targetKeys1 = newTargetKeys;
        }
    }
}
</script>
<style lang="less" scoped>
.demo-split{
    height: calc(100% - 10px);
    border: 1px solid #dcdee2;
}
.demo-split-pane{
    padding: 10px;
}
</style>




