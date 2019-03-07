<template>
    <div class="form-wrap">
        <p>Login</p>
        <form>
            <input type="email" placeholder="Email" :class="{'invalid': $v.email.$error}" @blur="$v.email.$touch()" v-model="email">
            <input type="password" placeholder="Password" :class="{'invalid': $v.password.$error}" @blur="$v.password.$touch()" v-model="password">
        </form>
        <button :disabled="$v.$invalid" @click.prevent="loginUser">Login</button>
        <div class="message-block">
            <div v-show="visible" class="account-message">Account doe'snt exist</div>
            <p class="redirect">if you do not have an account, <span @click="$router.push('/registration')">Register</span></p>
        </div>
    </div>
</template>

<script>
    import { required, email, minLength} from 'vuelidate/lib/validators'
    export default {
        data(){
            return {
                email: '',
                password: '',
                visible: false,
                userData: []
            }
        },
        validations: {
            email: {
                required,
                email
            },
            password: {
                minLength: minLength(6),
                required
            }
        },
        methods:{
            loginUser(){
                this.$http.get('http://localhost:3000/users')
                    .then(resp => {
                        return resp.json()
                    })
                    .then(resp => resp.filter(item => item.email === this.email && item.password === this.password))
                    .then(res => res.length > 0 ? (this.$store.commit('logUser'), this.$router.push('/')) : this.visible = true);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');

    .form-wrap{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex-basis: 100%;
        background: #2A2C3B;
        font-family: 'Montserrat', sans-serif;

        .message-block{
            position: relative;

            .account-message{
                position: absolute;
                width: 100%;
                text-align: center;
                top: -5px;
            }

            .redirect{
                font-size: 16px;
                padding-top: 24px;
                margin-top: 0;

                span{
                    color: red;
                    cursor: pointer;
                    text-transform: uppercase;
                }
            }
        }

        p{
            color: white;
            font-weight: bold;
            font-size: 19px;
        }

        input{
            border: 1px solid rgba(156, 161, 178, 0.3);
            background-color: #404359;
            border-radius: 10px;
            color: #9ca1b2;
            letter-spacing: 0.32px;
            font-size: 16px;
            padding: 8px 18px;
            margin-bottom: 10px;
        }
    }

    .account-message{
        margin-top: 10px;
        color: red;
    }

    .form-wrap button{
        cursor: pointer;
        background: aliceblue;
        border: none;
        padding: 5px 20px;
        border-radius: 5px;
        color: black;
    }

    .form-wrap button:focus{
        outline: 0;
    }

    .form-wrap form{
        display: flex;
        flex-direction: column;
    }

    .form-wrap form input:focus{
        outline: 0;
    }

</style>