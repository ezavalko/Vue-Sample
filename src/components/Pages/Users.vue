<template>
    <div class="user-wrap">
        <div class="user-wrap__content">
            <h1>Users list</h1>
            <div class="btn-wrap">
                <button @click="visible=!visible" class="new-user">{{ visible ? 'Cancel' : 'Create new user' }}</button>
            </div>
            <div class="edit-block" v-show="visible">
                <input type="text" v-model="userItem.firstName" placeholder="First name">
                <input type="text" v-model="userItem.secondName" placeholder="Second name">
                <input type="text" v-model="userItem.companyName" placeholder="Company name">
                <input type="text" v-model="userItem.cityName" placeholder="City name">
                <input type="text" v-model="userItem.phoneNumber" placeholder="Phone number">
                <button @click="newList">Create new user</button>
            </div>
            <table>
                <tbody>
                <tr class="head">
                    <td>Name</td>
                    <td>Company name</td>
                    <td>City name</td>
                    <td>Phone number</td>
                    <td>Edit</td>
                </tr>
                <tr :key="item.id" v-for="(item) of userArr">
                    <td>{{item.firstName}} {{item.secondName}}</td>
                    <td>{{item.companyName}}</td>
                    <td>{{item.cityName}}</td>
                    <td>{{item.phoneNumber}}</td>
                    <td class="edit-cell" @click="editHandler(item)"><span class="icon-note-interface-symbol"></span></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                visible: false,
                userItem: {
                    firstName: '',
                    secondName: '',
                    companyName: '',
                    cityName: '',
                    phoneNumber: ''
                },
                userArr:[],
                currentId: ''
            }
        },
        methods: {
            getUsers(){
                this.$http.get('http://localhost:3000/lists')
                    .then(resp => {
                        return resp.json()
                    })
                    .then((response) =>{
                        this.userArr = response
                    })
            },
            editHandler(obj){
                this.currentId = obj;
                this.$http.delete(`http://localhost:3000/lists/${this.currentId}`)
                    .then(resp => console.log(resp))
                    .catch(e => console.log(e))
            },
            newList(){
                this.$http.post('http://localhost:3000/lists', this.userItem)
                    .then(response => this.$http.get('http://localhost:3000/lists')
                        .then(resp => {
                            return resp.json()
                        })
                        .then((response) =>{
                            this.userArr = response
                        }))
            }
        },
        mounted(){
            this.getUsers()
        }
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');

    .user-wrap{
        background: #2a2c3b;
        flex-basis: 100%;

        &__content{
            .btn-wrap{
                text-align: right;
                padding-right: 20px;

                .new-user{
                    font-size: 16px;
                    padding:5px;
                    background: aquamarine;
                    border: none;
                    cursor: pointer;
                    font-family: 'Montserrat', sans-serif;
                    color: black;

                    &:focus{
                        outline: 0;
                    }
                }
            }

            .edit-block{
                margin-bottom: 30px;
            }

            h1{
                font-family: 'Montserrat', sans-serif;
                color: white;
                text-align: center;
            }

            table{
                margin: 0 auto;
                font-family: 'Montserrat', sans-serif;
                color: white;
                border: 1px solid white;
                border-collapse: collapse;

                .edit-cell{
                    text-align: center;
                    cursor: pointer;
                }

                .head{
                    color: aqua;
                    padding: 5px;
                }

                tr{
                    td{
                        padding: 5px;
                    }
                }

                th, td{
                    border: 1px solid white;
                }
            }
        }
    }
</style>