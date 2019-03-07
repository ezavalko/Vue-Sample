<template>
    <div class="graph-wrap">
        <div class="top-block">
            <line-chart></line-chart>
        </div>
        <div class="table-block">
            <table>
                <thead>
                <tr class="header">
                    <th v-for="(sortType, index) in sortingTypes" @click="sort(sortType, index)" class="initial" :class="{active: index === activeIndex}" :key="sortType">{{sortType.charAt(0).toUpperCase()+ sortType.slice(1)}}<span class="icon-down-arrow"></span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in sortedCats" :key="item.id">
                    <td>{{item.name}}</td>
                    <td>{{item.time}}</td>
                    <td>{{item.views}}</td>
                    <td>{{item.visitors}}</td>
                    <td>{{item.ctr}}</td>
                    <td>{{item.cpc}}</td>
                    <td>{{item.cpv}}</td>
                    <td>{{item.cpm}}</td>
                    <td :style="{color: item.status === 'Active' ? 'green' : 'red'}">{{item.status}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Graph",
        data(){
            return{
                data: [],
                currentSort:'campaign',
                currentSortDir:'asc',
                isActive: false,
                sortingTypes: ['campaign', 'time', 'views', 'visitors', 'ctr', 'cpc', 'cpv', 'cpm', 'status'],
                activeIndex: null
            }
        },
        methods:{
            getData(){
                this.data = this.$store.state.graphArr
            },
            sort(s, index) {
                this.activeIndex = index;
                if(s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';}
                this.currentSort = s;
            }
        },
        computed:{
            sortedCats() {
                return this.data.sort((a,b) => {
                    let modifier = 1;
                    if(this.currentSortDir === 'desc') modifier = -1;
                    if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                    if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                    return 0;
                });
            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');

    .graph-wrap{
        flex-basis: 100%;
        background: #2b2d3c;

        .top-block{
            padding-top: 50px;
        }
    }

    .table-block{
        border-collapse: collapse;
        font-family: 'Montserrat', sans-serif;

        table{
            border-collapse: collapse;
            width: 100%;

            .icon-down-arrow{
                position: relative;
                top: 3px;
                left: 5px;
                transition: .4s;
                display: inline-block;
            }

            .active{
                color: white;

                .icon-down-arrow{
                    transform: rotateZ(180deg);
                    transition: .4s;
                }
            }
        }

        td{
            padding: 25px 0;

            &:first-child{
                padding-left: 15px;
            }
        }

        th {
            cursor:pointer;
            color: #9ca1b2;
            padding: 20px 0;
            text-align: left;

            &:first-child{
                text-align: left;
                padding-left: 15px;
            }
        }

        td{
            border-bottom: 1px solid #4d5060;
            color: #fff;
        }

        .header{
            background: #3a3e52;
            border-collapse: collapse;
        }
    }
</style>