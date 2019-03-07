<template>
    <div class="progress">
        <div class="nav">
            <div class="left">
                <p class="projects-count">All projects {{status.length}}</p>
                <p>Workflow</p>
            </div>
            <div class="select-block">
                <span>Show projects:</span>
                <form>
                    <select class="select" @change="filterStatus" v-model="selectedFilter">
                        <option v-bind:key="item" v-for="item in selectFilter">{{item}}</option>
                    </select>
                </form>
            </div>
        </div>
        <ul class="top-bar">
            <li class="project-title">Project title</li>
            <li class="value">Value</li>
            <li class="time">Time spent</li>
            <li class="progress-item">Progress</li>
            <li class="development">Status</li>
            <li class="asigned">Assigned to</li>
        </ul>
        <draggable element="span" v-model="status" :options="dragOptions" :move="onMove">
            <transition-group name="list-complete" :name="'flip-list'">
                <div class="card-item" v-for="item in status" :key="item.id" :style="{borderLeftColor: item.progress===0 ? 'grey' : item.progress < 100 ? 'blue' : 'green'}">
                    <div class="project-title">
                        <p>{{item.projectName}}</p>
                        <span>{{item.company}}</span>
                    </div>
                    <div class="value">
                        <p>${{item.value}}</p>
                    </div>
                    <div class="time">
                        <p>{{item.spentHours}} hours</p>
                    </div>
                    <div class="progress-item">
                        <span>{{item.progress}}%</span>
                        <div class="progress-bar">
                            <div class="progress-bar-inner" :style="{borderLeftColor: item.progress===0 ? 'grey' : item.progress < 100 ? 'blue' : 'green', background: item.progress===0 ? 'grey' : item.progress < 100 ? 'blue' : 'green', width: `${item.progress}%`}"></div>
                        </div>
                    </div>
                    <div class="development">
                        <p>{{item.status}}</p>
                    </div>
                    <div class="asigned">
                        <p>{{item.assignedName}}</p>
                        <span>{{item.assignedPosition}}</span>
                    </div>
                </div>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        name: "Status",
        components: {
            draggable
        },
        data(){
            return{
                width: 0,
                status: [],
                editable:true,
                isDragging: false,
                delayedDragging:false,
                selectFilter: ['All', 'Development', 'Planning', 'Design', 'Quened', 'Completed'],
                selectedFilter: 'All'
            }
        },
        computed: {
            dragOptions () {
                return  {
                    animation: 0,
                    group: 'description',
                    disabled: !this.editable,
                    ghostClass: 'ghost'
                };
            },
            statusString(){
                return JSON.stringify(this.status, null, 2);
            },
            status2String(){
                return JSON.stringify(this.status2, null, 2);
            }
        },
        methods:{
            filterStatus(){
                let selected = this.selectedFilter;

                if (selected === 'Development'){
                    this.devFilter();
                } else if (selected === 'Planning') {
                    this.planFilter();
                } else if (selected === 'Design') {
                    this.destFilter();
                } else if (selected === 'Quened') {
                    this.quenedFilter();
                } else if (selected === 'Completed') {
                    this.completedFilter();
                } else if (selected === 'All') {
                    this.getStatus()
                }
            },
            devFilter(){
                this.status = this.$store.state.statusArr.filter(item => item.status === 'Development')
            },
            planFilter(){
                this.status = this.$store.state.statusArr.filter(item => item.status === 'Planning')
            },
            destFilter(){
                this.status = this.$store.state.statusArr.filter(item => item.status === 'Design')
            },
            quenedFilter(){
                this.status = this.$store.state.statusArr.filter(item => item.status === 'Quened')
            },
            completedFilter(){
                this.status = this.$store.state.statusArr.filter(item => item.status === 'Completed')
            },
            getStatus(){
                this.status = this.$store.state.statusArr
            },
            orderstatus () {
                this.status = this.status.sort((one,two) =>{return one.order-two.order; })
            },
            onMove ({relatedContext, draggedContext}) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            },
            dynamicWidth(item){
                return item.progress
            }
        },
        watch: {
            isDragging (newValue) {
                if (newValue){
                    this.delayedDragging= true;
                    return
                }
                this.$nextTick( () =>{
                    this.delayedDragging =false
                })
            }
        },
        mounted(){
            this.getStatus()
        }
    }
</script>

<style scoped lang="scss">
    .progress{
        flex-basis: 100%;
        padding: 60px 20px 0 35px;
        background: #292b3a;
        min-height: 100vh;
        font-family: 'Montserrat', sans-serif;
        position: relative;
        overflow: hidden;

        .nav{
            background: #237cc7;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            width: 100%;
            font-size: 18px;
            font-family: 'Montserrat', sans-serif;
            padding: 20px 20px 20px 35px;

            .select-block{
                padding-right: 100px;
                display: flex;
                color: #fff;
                align-items: center;

                .select{
                    width: 120px;
                    border-radius: 10px;
                    font-size: 14px;
                    border: 1px solid #ffff;
                    background: #237cc7;
                    color: #ffff;
                    padding: 3px 8px;
                    margin-left: 25px;
                }
            }

            .left{
                display: flex;

                p{
                    margin: 0;
                    color: #fff;

                    &:nth-child(2){
                        color: #2a2c3b;
                        margin-left: 40px;
                    }
                }
            }
        }

        .top-bar{
            list-style-type: none;
            display: flex;
            padding-left: 40px;
            justify-content: space-between;
            padding-right: 15px;
            color: #9ea3b4;
            margin-bottom: 24px;
            margin-top: 60px;

            .project-title{
                max-width: 160px;
                width: 100%;
            }

            .value{
                max-width: 80px;
                width: 100%;
            }

            .time{
                max-width: 75px;
                width: 100%;
                white-space: nowrap;
            }

            .progress-item{
                max-width: 285px;
                width: 100%;
            }

            .development{
                max-width: 115px;
                width: 100%;
            }

            .asigned{
                max-width: 140px;
                width: 100%;
            }
        }

        .card-item{
            padding: 20px 15px 20px 40px;
            background: #3a3e52;
            margin-bottom: 23px;
            border-radius: 2px;
            cursor: move;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-left: 3px solid;

            .project-title, .asigned{
                p{
                    margin-top: 0;
                    color: #ffff;
                    margin-bottom: 5px;
                }

                span{
                    font-size: 14px;
                    color: #9ea3b4;
                }
            }

            .asigned{
                max-width: 140px;
                width: 100%;
            }

            .project-title{
                max-width: 160px;
                width: 100%;
            }

            .value, .time, .development{
                p{
                    color: #ffff;
                }
            }

            .development{
                max-width: 115px;
                width: 100%;
            }

            .value{
                max-width: 80px;
                width: 100%;
            }

            .time{
                max-width: 75px;
                width: 100%;
            }

            .progress-item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                max-width: 285px;
                width: 100%;

                span{
                    color: #ffff;
                }

                .progress-bar{
                    position: relative;
                    max-width: 235px;
                    width: 100%;
                    border-radius: 2px;
                    height: 7px;
                    background: #585c70;

                    .progress-bar-inner{
                        position: absolute;
                        left: 0;
                        height: 100%;
                        background: #2196f3;
                        border-radius: 2px;
                        width: 80%;
                    }
                }
            }
        }
    }

    .flip-list-move {
        transition: transform 0.5s;
    }

    .no-move {
        transition: transform 0s;
    }

    .ghost {
        opacity: .5;
        background: #C8EBFB;
    }

    .list-group {
        min-height: 20px;
    }

    .list-group-item {
        cursor: move;
    }

    .list-group-item i{
        cursor: pointer;
    }
</style>