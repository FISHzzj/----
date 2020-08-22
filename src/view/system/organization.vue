<template>
    <div>
        <Card>
            <Tree :data="data5" :render="renderContent" class="demo-tree-render"></Tree>
            <Modal
                v-model="modal1"
                :title="title"
                @on-ok="ok"
                @on-cancel="cancel">
                <p v-for="(item, index) in arrColumns" :key="index" style="margin-bottom: 10px;"> 
                    <Input v-model="item.valuetext">
                        <span slot="prepend">{{item.nametitle}}</span>
                    </Input>
                </p>
                <DatePicker type="datetime" placeholder="请选择日期时间" style="width: 100%"></DatePicker>
            </Modal>
        </Card>
        
    </div>
</template>
<script>
export default {
    data () {
        return {
            data5: [
                {
                    title: 'parent 1',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-folder-outline'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', data.title)
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    float: 'right',
                                    marginRight: '32px'
                                }
                            }, [
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-add',
                                        type: 'primary'
                                    }),
                                    style: {
                                        width: '32px',
                                        marginRight: '8px'
                                    },
                                    on: {
                                        click: () => { this.append(data) }
                                    }
                                }),
                                h('Button', {   
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-card-outline',
                                        type: 'primary'
                                    }),
                                    style: {
                                        width: '32px',
                                       
                                    },
                                    on: {
                                        click: () => { this.edit(data) }
                                    }
                                })
                            ])
                        ]);
                    },
                    children: [
       
                    ]
                }
            ],
            buttonProps: {
                type: 'default',
                size: 'small',
            },
            modal1:false,
            arrColumns: [{
                'nametitle': '组织名称',
                'valuetext': ''
            },{
                'nametitle': '组织类型',
                'valuetext': ''
            }],
            title:'新增组织'

        }
    },
    methods: {
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-add'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.append(data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-remove'
                        }),
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        },
        append (data) {
            console.log(data)
            this.modal1 = true
            // const children = data.children || [];
            // children.push({
            //     title: 'appended node',
            //     expand: true
            // });
            // this.$set(data, 'children', children);
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        edit (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        //新增row
        ok () {
            // this.$Message.info('Clicked ok');
            let arrlist = this.arrColumns
            let data = {}
            arrlist.forEach((item, index) => {
            if(item.valuetext == " ") {
                this.$Message.info(`${item.nametitle}不能为空`)
                return false
            }else {
                let title = item.key
                data[title] = item.valuetext
            }
            })
            if(Object.keys(data).length == arrlist.length){
            this.$emit('onAddRow', data)
            // let newValve = []
            this.arrColumns = arrlist
            }
            
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        async getData () {
            let res = await $ajax('orgGet', 'get', {
                f_page: this.pageNum,
                f_limit: this.pageSize
            })
            if(!res) return false
            console.log(res)
        }
    },
    mounted () {
        this.getData()  
    }
}
</script>
<style lang="less" scoped>
    .demo-tree-render .ivu-tree-title{
        width: 100%;
    }
</style>