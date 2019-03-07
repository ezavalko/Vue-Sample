<template>
    <div class="home-wrap">
        <div class="top-block">
            <div class="left-block">
                <line-chart></line-chart>
            </div>
            <div class="right-block">
                <div class="projects-card">
                    <p class="top-text">Your projects</p>
                    <ul>
                        <li :key="item.id" v-for="item in projectsArr">
                            <div class="project-type">{{item.project}}</div>
                            <div class="project-description">
                                <span>{{item.company}}</span>
                                <span>{{item.projectPrice}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bottom-block">
            <div class="graph">
                <form>
                    <select class="select" @change="changeHandler" v-model="selected">
                        <option v-bind:key="item" v-for="item in selectArr">{{item}}</option>
                    </select>
                </form>
                <bar-chart :data="dataChart" :options="{responsive: true, legend: false, maintainAspectRatio: false}"></bar-chart>
            </div>
            <div class="inbox">
                <header>
                    <p v-if="!message">Inbox (<span>{{unreadMessages}}</span>)</p>
                    <p v-if="message">There are no new messages</p>
                </header>
                <ul class="inbox-holder">
                    <li v-bind:key="item.id" v-for="item in messageArr" @click="removeMessages(item)" :class="{'unread': item.unread}">
                        <div class="head">
                            <span class="name">{{item.name}}</span>
                            <span class="time">{{item.time}}</span>
                        </div>
                        <p class="message">{{item.message}}</p>
                    </li>
                </ul>
            </div>
            <div class="calendar">
                <v-calendar :attributes='attributes' :theme-styles='themeStyles' is-expanded></v-calendar>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                unreadMessages: 2,
                message: false,
                messageArr: [
                    {
                        imageUrl: '../../assets/income-1.png',
                        name: 'Michelle Stewart',
                        time: 'Today, 5:32 PM',
                        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.',
                        id: 1,
                        unread: true
                    },
                    {
                        imageUrl: '../../assets/income-2.png',
                        name: 'Jolene Slater',
                        time: 'Tomorrow, 5:32 PM',
                        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.',
                        id: 2,
                        unread: true
                    },
                    {
                        imageUrl: '../../assets/income-3.png',
                        name: 'Lyall Roach',
                        time: 'Today, 1:02 AM',
                        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.',
                        id: 3,
                        unread: false
                    }
                ],
                projectsArr: [
                    {
                        project: 'Mobile App',
                        company: 'Symu.co',
                        projectPrice: '$1500',
                        id: 1
                    },
                    {
                        project: 'New dashboard',
                        company: 'Amazon.com',
                        projectPrice: '$5500',
                        id: 2
                    },
                    {
                        project: 'Mobile App',
                        company: 'Invest.ua',
                        projectPrice: '$2000',
                        id: 3
                    },
                    {
                        project: 'Chatbot',
                        company: 'Walmart.com',
                        projectPrice: '$6000',
                        id: 4
                    },
                ],
                dataChart: [44, 49, 48, 49, 55, 47, 43, 55, 53, 43, 44, 51],
                selected: 'Year',
                selectArr: ['Year', 'Month', 'Week'],
                attributes: [
                    {
                        key: 'today',
                        highlight: {
                            backgroundColor: '#2196f3',
                            borderRadius: '50%'
                        },
                        dates: new Date()
                    }
                ],
                themeStyles: {
                    wrapper: {
                        background: '#2f3242',
                        color: '#fafafa'
                    },
                    responsive:true,
                    header: {
                        padding: `20px`,
                        background: '#3a3e52'
                    },
                    weekdays: {
                        paddingTop: `25px`,
                    }
                }
            }
        },
        methods:{
            changeHandler(){
                let selected = this.selected;

                if (selected === 'Month'){
                    this.dataChart = [2, 12, 8, 22, 31, 6, 10, 32, 5, 36, 21, 21];
                } else if (selected === 'Week') {
                    this.dataChart = [8, 2, 18, 3, 13, 32, 10, 8, 12, 34, 21, 12];
                } else if (selected === 'Year') {
                    this.dataChart = [44, 49, 48, 49, 55, 47, 43, 55, 53, 43, 44, 51];
                }
            },
            removeMessages(item){
                item.unread=false;
                this.unreadMessages --;
                if (this.unreadMessages <1) {
                    this.message=true
                }
            }
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');

    .projects-card{
       .top-text{
           text-align: center;
           font-family: 'Montserrat', sans-serif;
           font-size: 20px;
           margin: 0;
           padding: 20px 0;
           color: white;
           background: #3a3e52;
       }

        ul{
            list-style-type: none;
            padding: 0;
            margin: 0;
            background: #2f3242;

            li{
                height: 90px;
                border-bottom: 1px solid #505464;
                padding-left: 50px;
                display: flex;
                justify-content: center;
                flex-direction: column;

                .project-type{
                    color: white;
                    margin-bottom: 5px;
                }

                .project-description{
                    color: #858a9a;

                    span{
                        padding-right: 5px;
                    }
                }
            }
        }
    }

    .inbox-holder{
        margin: 0;
        padding: 0;
        list-style-type: none;

        .head{
            font-family: 'Montserrat', sans-serif;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .name{
                font-size: 16px;
                color: #fff;
                font-weight: bold;

                @media (max-width: 1368px) {
                    font-size: 14px;
                }
            }

            .time{
                font-size: 14px;
                color: #2196f3;

                @media (max-width: 1368px) {
                    font-size: 10px;
                }
            }
        }

        .message{
            color: #8b8fa0;
            margin: 0;
        }

        li{
            height: 100px;
            border-bottom: 1px solid #505464;
            background: #2f3242;
            position: relative;
            padding: 15px 15px 15px 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            @media (max-width: 1368px) {
                padding-left: 65px;
            }

            &.unread{
                position: relative;
                background: rgba(0, 0, 0, 0.9);
            }
        }
    }

    .click{
        cursor: pointer;
    }

    .home-wrap{
        padding: 30px;
        flex-basis: 100%;
        background: #2a2c3b;

        .top-block{
            display: flex;
            justify-content: space-between;

            .left-block{
                flex-basis: 71%;
                background: #2f3242;
            }

            .right-block{
                flex-basis: 25%;
                background: #2f3242;
            }
        }

        .bottom-block{
            display: flex;
            justify-content: space-between;
            margin-top: 30px;

            .graph{
                flex-basis: 42%;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                background: #2f3242;
                padding: 15px;

                .select{
                    width: 120px;
                    border-radius: 10px;
                    font-size: 14px;
                    border: 1px solid #ffff;
                    background: #2f3242;
                    color: #ffff;
                    padding: 3px 8px;

                    &:focus{
                        outline: 0;
                    }
                }
            }

            .inbox{
                width: 100%;
                height: 100%;

                header{
                    background: #3a3e52;
                    padding: 10px 0;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 20px;
                    text-align: center;
                    font-weight: normal;
                    color: #ffff;

                    span{
                        color: #2196f3;
                    }
                }
            }

            .inbox, .calendar{
                flex-basis: 25%;
            }
        }
    }
</style>