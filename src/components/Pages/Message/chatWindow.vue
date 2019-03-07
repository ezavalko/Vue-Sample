<template>
    <div class="window-item">
        <ul class="chat-holder" v-chat-scroll>
            <li v-for="item in object.messages" :key="item.id">
                <p class="message">{{item.message}}</p>
                <p class="time">{{item.date}}{{item.time}}</p>
            </li>
        </ul>
        <input type="text" class="input-target" v-model="inputVal" @keyup.enter="getInput" placeholder="Write a message">
    </div>
</template>

<script>
    export default {
        name: "chatWindow",
        data(){
          return{
              inputVal: '',
              respond: ['Proin hendrerit libero eu augue tempus porta.', 'Integer scelerisque pharetra nisi ac molestie.', 'Etiam placerat augue ac enim feugiat, et consectetur tellus cursus. Morbi nisi tortor, hendrerit auctor ex fermentum, commodo tempor lacus.', 'Quisque nec orci ac magna finibus porttitor ut id nulla.', 'Pellentesque luctus felis in mi iaculis efficitur.', 'Fusce malesuada molestie erat eu condimentum.', 'Aenean ullamcorper risus volutpat, euismod ipsum eu, luctus augue.', 'Suspendisse elementum metus est.', 'Maecenas feugiat, turpis vitae consectetur ultricies, diam ligula pulvinar augue, at ullamcorper magna felis id justo.', 'Duis maximus id tellus sit amet tempor', 'Nam vitae lorem ullamcorper, auctor nisl at, tempor dolor.']
          }
        },
        methods: {
            getInput(){
                let random = Math.floor(Math.random() * (11 - 1)) + 1;
                let randomID = Math.random();
                let currentDate = new Date();
                let data = new Date().toLocaleTimeString();
                let string = 'Today';
                let message = {
                  message : this.inputVal,
                  //time: `${hour} ${minute}`,
                  time: `${string} ${data}`,
                  id: randomID
                };
                if(this.inputVal !== '' ) {
                    this.object.messages.push(message);
                    let autoID = Math.random();
                    this.inputVal = '';
                    let randomRespond = this.respond[random];
                    let randomMessage = {
                        message: randomRespond,
                        //time: `${hour} ${minute}`,
                        time: `${string} ${data}`,
                        id: autoID
                    };
                    setTimeout(() => {
                        this.object.messages.push(randomMessage);
                    }, 3000)
                }
            }
        },
        props: ['object']
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');

    .window-item{
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;

        .input-target{
            border: 1px solid rgba(156, 161, 178, 0.3);
            background-color: #404359;
            border-radius: 10px;
            color: #9ca1b2;
            letter-spacing: 0.32px;
            font-size: 16px;
            padding: 12px 18px;

            &:focus{
                outline: 0;
            }
        }

        .chat-holder{
            list-style-type: none;
            margin: 0;
            height: 100%;
            overflow-y: scroll;
            padding-right: 10px;
            padding-left: 10px;
            width: 100%;

            li{
                .message{
                    background: #404359;
                    max-width: 400px;
                    border-top-left-radius: 15px;
                    border-top-right-radius: 15px;
                    border-bottom-right-radius: 15px;
                    padding: 20px;
                    display: inline-block;
                }

                &:nth-child(2n){
                    text-align: right;

                    .message{
                        max-width: 400px;
                        padding: 20px;
                        border-top-left-radius: 15px;
                        border-top-right-radius: 15px;
                        border-bottom-left-radius: 15px;
                        border-bottom-right-radius: 0;
                        background: #2196f3;
                        margin-left: auto;
                        margin-right: 0;
                        display: inline-block;
                    }
                }

                .time{
                    color: #9095a7;
                    margin-top: -5px;
                }
            }

            p{
                color: white;
            }
        }
    }
</style>