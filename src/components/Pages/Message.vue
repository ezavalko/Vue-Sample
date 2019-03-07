<template>
    <div class="chat-wrap">
        <div class="users-list">
            <ul class="users-holder">
                <li class="users-holder-item" v-for="item in usersArr" :key="item.id" @click="getObject(item)">
                    <div class="top-part"><span class="name">{{item.name}}</span></div>
                    <div class="bottom-part">{{item.lastMessage}}</div>
                </li>
            </ul>
        </div>
        <div class="chat-window">
            <chatWindow :object="currentObj"></chatWindow>
        </div>
        <div class="user-info">
            <userItem :object="currentObj"></userItem>
        </div>
    </div>
</template>

<script>
    import userItem from './Message/messageTarget'
    import chatWindow from './Message/chatWindow'

    export default {
        data () {
            return {
                usersArr: [],
                currentObj: {}
            }
        },
        components:{
            userItem,
            chatWindow
        },
        methods:{
            getUsers(){
                this.usersArr = this.$store.state.usersChat;
            },
            getObject(obj){
                this.currentObj = obj;
            }
        },
        created(){
            this.getUsers();
        },
        mounted(){
            this.currentObj = this.usersArr[2];
        }
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');

    .chat-wrap{
        font-family: 'Montserrat', sans-serif;
        flex-basis: 100%;
        display: flex;
        justify-content: space-between;
        background: #2a2d3c;

        .users-list{
            flex-basis: 30%;
            box-shadow: 0 3px 80px rgba(23, 24, 32, 0.3);
            box-sizing: border-box;

            .users-holder{
                list-style-type: none;
                padding: 0;
                margin: 0;

                &-item{
                    border-bottom: 1px solid #505464;
                    padding: 30px 10px;
                    cursor: pointer;
                }
            }

            .name{
                font-size: 22px;
                color: white;
                font-weight: bold;
            }

            .bottom-part{
                color: #9ca1b2;
            }
        }

        .chat-window{
            flex-basis: 50%;
            box-shadow: 0 3px 80px rgba(23, 24, 32, 0.3);
        }

        .user-info{
            flex-basis: 20%;
            box-shadow: 0 3px 80px rgba(23, 24, 32, 0.3);
            padding: 0 10px;
        }
    }
</style>