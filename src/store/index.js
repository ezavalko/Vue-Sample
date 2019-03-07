import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: [20, 50, 20, 41, 26, 15, 20, 10, 29, 5, 33, 55],
        userLogged: false,
        quenedStore: [
            {
                project: 'AI development',
                client: 'Tesla',
                fixed: false,
                price: 5000,
                id: 1
            },
            {
                project: 'Blockchain integration',
                client: 'Tesla',
                fixed: false,
                price: 2500,
                id: 112
            },
            {
                project: 'Chatbot',
                client: 'Google',
                fixed: false,
                price: 6500,
                id: 13
            }
        ],
        planningStore : [
            {
                project: 'Landing page',
                client: 'Amazon',
                fixed: false,
                price: 1000,
                id: 14
            },
            {
                project: 'Website',
                client: 'Google',
                fixed: false,
                price: 2000,
                id: 100
            },
            {
                project: 'Website',
                client: 'Google',
                fixed: false,
                price: 500,
                id: 1121
            }
        ],
        designStore: [
            {
                project: 'Logo design',
                client: 'Symu.com',
                fixed: false,
                price: 2000,
                id: 19
            }
        ],
        developmentStore: [
            {
                project: 'Mobile App',
                client: 'Symu.com',
                fixed: false,
                price: 1500,
                id: 111
            },
            {
                project: 'Dashboard',
                client: 'Tesla',
                fixed: false,
                price: 5500,
                id: 1114
            }
        ],
        testingStore: [
            {
                project: 'Landing page',
                client: 'Symu.com',
                fixed: false,
                price: 1500,
                id: 874
            }
        ],
        completedStore: [
            {
                project: 'Landing page',
                client: 'Symu.com',
                fixed: false,
                price: 1800,
                id: 84
            },
            {
                project: 'New website',
                client: 'Amazon',
                fixed: false,
                price: 3500,
                id: 8421
            },
            {
                project: 'Dashboard',
                client: 'Amazon',
                fixed: false,
                price: 3500,
                id: 821
            }
        ],
        statusArr: [
            {
                projectName: 'New website',
                company: 'Microsoft',
                value: 2300,
                spentHours: 40,
                progress: 70,
                status: 'Development',
                assignedName: 'Dominic Lynton',
                assignedPosition: 'Front End Dev',
                id: 1
            },
            {
                projectName: 'Landing page',
                company: 'Google',
                value: 1250,
                spentHours: 7,
                progress: 15,
                status: 'Planning',
                assignedName: 'Lyan Roach',
                assignedPosition: 'UX/UI Designer',
                id: 2
            },
            {
                projectName: 'New dashboard',
                company: 'Symu.co',
                value: 5100,
                spentHours: 56,
                progress: 100,
                status: 'Design',
                assignedName: 'Michelle Stewart',
                assignedPosition: 'Account',
                id: 3
            },
            {
                projectName: 'New logo',
                company: 'JCD.pl',
                value: 900,
                spentHours: 10,
                progress: 40,
                status: 'Design',
                assignedName: 'Lyan Roach',
                assignedPosition: 'UX/UI Designer',
                id: 4
            },
            {
                projectName: 'Landing page',
                company: 'Symu.co',
                value: 1500,
                spentHours: 0,
                progress: 0,
                status: 'Quened',
                assignedName: 'Michelle Stewart',
                assignedPosition: 'Account',
                id: 5
            },
            {
                projectName: 'Wordpress theme',
                company: 'Themeforest',
                value: 1300,
                spentHours: 30,
                progress: 100,
                status: 'Completed',
                assignedName: 'Michelle Stewart',
                assignedPosition: 'Account',
                id: 8
            },
            {
                projectName: 'Landing page',
                company: 'Symu.co',
                value: 1500,
                spentHours: 0,
                progress: 0,
                status: 'Quened',
                assignedName: 'Michelle Stewart',
                assignedPosition: 'Account',
                id: 6
            },
            {
                projectName: 'Mobile app',
                company: 'Facebook',
                value: 4300,
                spentHours: 59,
                progress: 100,
                status: 'Completed',
                assignedName: 'Michelle Stewart',
                assignedPosition: 'Account',
                id: 7
            }
        ],
        graphArr: [
            {
                id:1,
                name: 'Lorem ipsum dolor sit amet tetur adipisicing elit',
                time: 6,
                views: 358000,
                visitors: 58200,
                ctr: 25,
                cpc: 3.02,
                cpv: 2.51,
                cpm: 28.35,
                status: 'Active'
            },
            {
                id:2,
                name: 'Sed do eiusmod tempor incididunt ut labo',
                time: 7,
                views: 1200,
                visitors: 800,
                ctr: 10,
                cpc: 8.45,
                cpv: 6.15,
                cpm: 45.22,
                status: 'Disable'
            },
            {
                id:3,
                name: 'Consectetur adipisicing elit sed do eiusmod tempor',
                time: 3,
                views: 69000,
                visitors: 7300,
                ctr: 19,
                cpc: 6.22,
                cpv: 3.90,
                cpm: 37.80,
                status: 'Active'
            }
        ],
        usersChat: [
            {
                avatar: '',
                name: 'Lyall Roach',
                position: 'UX/UI Designer',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                email: 'lyallroach@gmail.com',
                phone: +48500400300,
                adress: '65 Lorem St, Warsaw, PL',
                organisation: 'Symu.co',
                id: 1,
                unread: false,
                lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.',
                messages:[
                    {
                        message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
                        time: '6 PM',
                        date: '4 april',
                        id: 12
                    },
                    {
                        message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
                        time: '7 PM',
                        date: '4 april',
                        id: 12313
                    },
                    {
                        message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ulla pariatur. est laborum.',
                        time: '7 PM',
                        date: '4 april',
                        id: 13
                    },
                    {
                        message: 'Ut enim ad minim veniam,ex ea commo!',
                        time: '7 PM',
                        date: '4 april',
                        id: 13333
                    },
                    {
                        message: 'Ut enim ad minim',
                        time: '7 PM',
                        date: '4 april',
                        id: 1123
                    }
                ]
            },
            {
                avatar: '',
                name: 'Alex Bower',
                position: 'Frontend Developer',
                description: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Curabitur ullamcorper ultricies nisi.',
                email: 'dev@gmail.com',
                phone: +18124433743,
                adress: 'Des Plaines, IL 60016',
                organisation: 'Amazon.com',
                id: 2,
                unread: true,
                lastMessage: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
                messages: [
                    {
                        message: 'Morbi rutrum, nisi ac consectetur molestie',
                        time: '7 PM',
                        date: '4 april',
                        id: 8756
                    },
                    {
                        message: 'Donec eget leo lectus. Aliquam convallis vulputate nisl vel sodales.',
                        time: '7 PM',
                        date: '4 april',
                        id: 87222
                    },
                    {
                        message: 'Aenean gravida scelerisque sagittis',
                        time: '7 PM',
                        date: '4 april',
                        id: 222
                    },
                    {
                        message: 'Maecenas sodales volutpat sem, nec mollis diam ullamcorper et.',
                        time: '7 PM',
                        date: '4 april',
                        id: 1211
                    },
                    {
                        message: 'Sed imperdiet dolor nibh, a sollicitudin nibh tristique a',
                        time: '7 PM',
                        date: '4 april',
                        id: 54234
                    },
                    {
                        message: 'Curabitur congue rutrum porttitor',
                        time: '7 PM',
                        date: '4 april',
                        id: 444
                    },
                    {
                        message: 'Vivamus porta, nunc sed tempor malesuada',
                        time: '7 PM',
                        date: '4 april',
                        id: 232323
                    }
                ]
            },
            {
                avatar: '',
                name: 'Francis Jonson',
                position: 'Backend Developer',
                description: 'Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.',
                email: 'franc@gmail.com',
                phone: +3328935487,
                adress: 'Kennesaw, GA 30144',
                organisation: 'Tesk.org',
                id: 3,
                unread: false,
                lastMessage: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                //messages: [, , , ]
                messages: [
                    {
                        message: 'Nunc ut iaculis diam, quis porta eros.',
                        time: '7 PM',
                        date: '4 april',
                        id: 45324
                    },
                    {
                        message: 'In tempor leo eleifend, congue sapien eget, feugiat quam.',
                        time: '7 PM',
                        date: '4 april',
                        id: 412124
                    },
                    {
                        message: 'Donec imperdiet, urna sed molestie accumsan, purus tortor ornare ex',
                        time: '7 PM',
                        date: '4 april',
                        id: 44123123
                    },
                    {
                        message: 'Etiam et arcu id est congue mattis sed sit amet lectus',
                        time: '7 PM',
                        date: '4 april',
                        id: 44555
                    },
                    {
                        message: 'Donec dapibus sem malesuada orci semper placerat',
                        time: '7 PM',
                        date: '4 april',
                        id: 4498729
                    }
                ]
            },
            {
                avatar: '',
                name: 'Bradley Stevenson',
                position: 'Full Stack Developer',
                description: 'Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.',
                email: 'atic@gmail.com',
                phone: +9558612954,
                adress: 'Rockville Centre, NY 11570',
                organisation: 'Tesk.org',
                id: 4,
                unread: true,
                lastMessage: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
                //messages: [, , , , ],
                messages:[
                    {
                        message: 'Maecenas sodales volutpat sem, nec mollis diam ullamcorper et.',
                        time: '7 PM',
                        date: '4 april',
                        id: 2
                    },
                    {
                        message: 'Cras ipsum tellus, vulputate at dui eget, sodales consectetur sapien',
                        time: '7 PM',
                        date: '4 april',
                        id: 121
                    },
                    {
                        message: 'Morbi rutrum, nisi ac consectetur molestie, libero leo dictum nulla, ac congue est leo et nisl.',
                        time: '7 PM',
                        date: '4 april',
                        id: 335
                    },
                    {
                        message: 'Aliquam ex massa, scelerisque id ligula quis, porta sodales diam.',
                        time: '7 PM',
                        date: '4 april',
                        id: 1233
                    },
                    {
                        message: 'Pellentesque convallis laoreet elit nec blandit.',
                        time: '7 PM',
                        date: '4 april',
                        id: 89672
                    }
                ]
            }
        ]
    },
    mutations: {
        changeChart (state){
            state.data = [10, 30, 34, 23, 11, 15, 55, 30, 19, 35, 43, 21]
        },
        logUser(state){
            state.userLogged = true
        },
        unLogUser(state){
            state.userLogged = false
        }
    },
    getters: {
        getUser (state) {
            return state.userLogged
        }
    }
})