<template>
    <li class="list-group-item">
        <div class="project">
            {{item.project}}
        </div>
        <div class="project-description">{{item.client}} {{item.price}}$</div>
        <ul class="dots-holder" @click="popup=!popup">
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <div class="popup" v-if="popup">
            <p class="delete item" @click="testHandler(index)">Delete</p>
            <p class="top">Move to</p>
            <hr>
            <p class="item" @click="planningHanlder(item)">Planning</p>
            <p class="item" @click="designHanlder(item)">Design</p>
            <p class="item" @click="developmentHanlder(item)">Development</p>
            <p class="item" @click="testingHanlder(item)">Testing</p>
            <p class="item" @click="completedHandler(item)">Completed</p>
        </div>
    </li>
</template>

<script>
    export default {
        name: "Card-quened",
        props: ['item', 'index'],
        data () {
            return {
                popup: false
            }
        },
        methods: {
            testHandler(obj){
                this.$emit('current-item', obj);
            },
            planningHanlder(obj){
                this.$emit('current-planning', obj);
            },
            designHanlder(obj){
                this.$emit('current-design', obj);
            },
            developmentHanlder(obj){
                this.$emit('current-dev', obj);
            },
            testingHanlder(obj){
                this.$emit('current-test', obj);
            },
            completedHandler(obj){
                this.$emit('curr-completed', obj);
            }
        }
    }
</script>

<style scoped lang="scss">

    .project{
        color: white;
        margin-bottom: 5px;
    }

    .project-description{
        font-size: 14px;
        color: #9ea3b4;
    }

    .list-group {
        min-height: 100px;
        padding: 0;
        list-style-type: none;
        margin-right: 20px;
        width: 250px;
        position: relative;

        .popup{
            position: absolute;
            background: white;
            z-index: 1;
            right: 0;
            padding: 5px;
            border-radius: 2px;

            .item{
                cursor: pointer;
                padding: 0;
                margin: 0;
            }

            .top{
                margin: 0;
            }

            hr{
                margin: 3px 0;
            }

            .delete{
                color: red;
            }
        }

        &-item{
            cursor: move;
            margin-bottom: 20px;
            padding: 28px 23px;
            background: #3a3e52;
            border-radius: 5px;
            position: relative;

            .dots-holder{
                position: absolute;
                display: flex;
                flex-direction: column;
                margin: 0;
                padding: 0;
                cursor: pointer;
                list-style-type: none;
                right: 20px;
                bottom: 35px;

                li{
                    width: 5px;
                    height: 5px;
                    background: #9ea3b4;
                    border-color: #9ea3b4;
                    border-radius: 50%;

                    &:not(:last-child){
                        margin-bottom: 5px;
                    }
                }
            }

            i{
                cursor: pointer;
            }
        }
    }

</style>