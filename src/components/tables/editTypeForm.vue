<template>
<div class="formModel">
    <div class="mdClose" @click="onHandleClose">
        <Icon type="md-close" size="24" />
    </div>
    <Form ref="formValidate" inline :model="formValidate" :rules="ruleValidate" :label-width="100" :hide-required-mark="hideRequiredMark" class="formItem">
        <FormItem label="组织类型" prop="f_name">
            <Input v-model="formValidate.f_name" placeholder="请输入组织类型"></Input>
        </FormItem>

        <FormItem class="savebtn">
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
        </FormItem>

    </Form>
</div>
</template>

<script>
export default {
    props: ['getEditData'],
    data() {
        return {
            formValidate: {
                f_name: '',

            },
            ruleValidate: {
                f_name: [{
                    required: true,
                    message: '组织类型不能为空',
                    trigger: 'blur'
                }],

            },
            hideRequiredMark: true,
            frontImg: '',

        }
    },
    mounted() {
        this.$set(this.getEditData)
    },
    methods: {

        handleSubmit(username) {
            //整个表单进行校验
            this.$refs[username].validate((valid) => {

                if (valid) {
                    console.log(this.formValidate)
                    // this.$Message.success('Success!');
                    this.$emit('on-handle-save', this.formValidate)

                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset(username) {
            this.$refs[username].resetFields();
        },
        onHandleClose() {
            this.$emit('on-handle-close', '关闭')
        }
    },
    watch: { // 使用监听的方式，监听数据的变化
        getEditData(val) {
            console.log(val)
            this.formValidate = val;
        }
    }
}
</script>

<style lang="less" scoped>
.formModel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border: 1px solid #DCDEE2;
    border-radius: 10px;
    padding: 20px;
    width: 45%;
    height: 60%;
    z-index: 999999;

}

.upLoadIDCard {
    height: 7rem;
    width: 10rem;
    border: 1px solid #ccc;
    margin: 0;
    box-sizing: border-box;
    background-size: 100% 100%;

    >span {
        display: inline-block;
        width: calc(100% - 2px);
        text-align: center;
        position: absolute;
        height: 2rem;
        line-height: 2rem;
        bottom: 1px;
        background-color: #eee;
    }
}

.plus::after {
    content: '+';
    position: absolute;
    font-size: 150px;
    height: 150px;
    width: 150px;
    font-weight: 100;
    text-align: center;
    line-height: 3rem;
    color: #ccc;
    left: 0;
    top: 20px;
}

.mdClose {
    text-align: right;
    margin-bottom: 10px;
}

.formItem {}
</style>
