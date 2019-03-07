<template>
    <div class="trello-wrap">
        <div class="top-part-page">
            <div>All projects ({{this.projTotal}}) <span>Workflow</span></div>
            <div class="select-block">
                <span>Show projects:</span>
                <form>
                    <select class="select" @change="filterHandler" v-model="selectedFilter">
                        <option v-bind:key="item" v-for="item in selectFilter">{{item}}</option>
                    </select>
                </form>
            </div>
        </div>
        <div class="list-holder">
            <div class="wrapper-list">
                <div class="top-part">
                    <div class="top-part__name">
                        <h4>Quened</h4>
                    </div>
                    <div class="top-part__description">
                        <div class="project-count">{{quenedTot}} {{quenedTot > 1 ? 'projects' : 'project'}}</div>
                        <div class="total-price">${{totalQuen}}</div>
                    </div>
                </div>
                <draggable class="list-group" element="ul" v-model="quened" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                        <cardQuened
                                @current-test="testMove($event)"
                                @current-item="indexHandler($event)"
                                @current-dev="devMove($event)"
                                @current-design="designMove($event)"
                                @current-planning="indexPlanning($event)"
                                @curr-completed="completedMove($event)"
                                :item="element"
                                :index="index"
                                v-for="(element, index) in quened"
                                :key="element.id"></cardQuened>
                    </transition-group>
                </draggable>
            </div>

            <div class="wrapper-list">
                <div class="top-part">
                    <div class="top-part__name">
                        <h4>Planning</h4>
                    </div>
                    <div class="top-part__description">
                        <div class="project-count">{{planningArrLength}} {{planningArrLength > 1 ? 'projects' : 'project'}}</div>
                        <div class="total-price">${{planningTot}}</div>
                    </div>
                </div>
                <draggable element="span" v-model="planningArr" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group name="no" class="list-group" tag="ul" :name="'flip-list'">
                        <cardPlanning
                                :item="element"
                                v-for="(element, index) in planningArr"
                                :index="index"
                                :key="element.id"
                                @compl-move="complMove($event)"
                                @dev-test="testingMove($event)"
                                @development-move="moveDev($event)"
                                @cur-quened="moveQue($event)"
                                @cur-des="moveDesign($event)"
                                @current-item="deletePlanning($event)">
                        </cardPlanning>
                    </transition-group>
                </draggable>
            </div>

            <div class="wrapper-list">
                <div class="top-part">
                    <div class="top-part__name">
                        <h4>Design</h4>
                    </div>
                    <div class="top-part__description">
                        <div class="project-count">{{designObj}} {{designObj > 1 ? 'projects' : 'project'}}</div>
                        <div class="total-price">${{designTot}}</div>
                    </div>
                </div>
                <draggable element="span" v-model="designArr" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group name="no" class="list-group" tag="ul" :name="'flip-list'">
                        <cardDesign
                                :item="element"
                                :index="index"
                                v-for="(element, index) in designArr"
                                :key="element.id"
                                @compl-shift="completedShift($event)"
                                @test-move="testShift($event)"
                                @move-develop="developMove($event)"
                                @move-plan="planMove($event)"
                                @move-quened="quenedMove($event)"
                                @delete-item="deleteDesign($event)"
                        >
                        </cardDesign>
                    </transition-group>
                </draggable>
            </div>

            <div class="wrapper-list">
                <div class="top-part">
                    <div class="top-part__name">
                        <h4>Development</h4>
                    </div>
                    <div class="top-part__description">
                        <div class="project-count">{{developObj}} {{developObj > 1 ? 'projects' : 'project'}}</div>
                        <div class="total-price">${{developTot}}</div>
                    </div>
                </div>
                <draggable element="span" v-model="developmentArr" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group name="no" class="list-group" tag="ul" :name="'flip-list'">
                        <cardDevelopment
                                :item="element"
                                :index="index"
                                v-for="(element, index) in developmentArr"
                                :key="element.id"
                                @compl-move="toCompleted($event)"
                                @test-move="toTest($event)"
                                @move-design="toDesign($event)"
                                @move-planning="toPlan($event)"
                                @delete-dev="deleteDev($event)"
                                @moveto-quened="quenedTo($event)"
                        ></cardDevelopment>
                    </transition-group>
                </draggable>
            </div>

            <div class="wrapper-list">
                <div class="top-part">
                    <div class="top-part__name">
                        <h4>Testing</h4>
                    </div>
                    <div class="top-part__description">
                        <div class="project-count">{{testingObj}} {{testingObj > 1 ? 'projects' : 'project'}}</div>
                        <div class="total-price">${{testingTot}}</div>
                    </div>
                </div>
                <draggable element="span" v-model="testingArr" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group name="no" class="list-group" tag="ul" :name="'flip-list'">
                        <cardTesting
                                :item="element"
                                v-for="(element, index) in testingArr"
                                :key="element.id"
                                :index="index"
                                @to-completed="complShift($event)"
                                @to-dev="devShift($event)"
                                @to-design="designShift($event)"
                                @to-plan="planShift($event)"
                                @toenque="enqueHandler($event)"
                                @delete-test="deleteTest($event)"
                        ></cardTesting>
                    </transition-group>
                </draggable>
            </div>

            <div class="wrapper-list">
                <div class="top-part">
                    <div class="top-part__name">
                        <h4>Completed</h4>
                    </div>
                    <div class="top-part__description">
                        <div class="project-count">{{completedObj}} {{completedObj > 1 ? 'projects' : 'project'}}</div>
                        <div class="total-price">${{completedTot}}</div>
                    </div>
                </div>
                <draggable element="span" v-model="completedArr" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group name="no" class="list-group" tag="ul" :name="'flip-list'">
                        <cardCompleted
                                :item="element"
                                v-for="(element, index) in completedArr"
                                :index="index"
                                :key="element.id"
                                @test-shift="toTestShift($event)"
                                @development-shift="toDevShift($event)"
                                @design-shift="toDesignShift($event)"
                                @planningShift="toPlanning($event)"
                                @quenedShift="toQuened($event)"
                                @delete-compl="completedDelete($event)"
                        ></cardCompleted>
                    </transition-group>
                </draggable>
            </div>

        </div>
    </div>
</template>

<script>

    import draggable from 'vuedraggable'
    import cardQuened from '../Trello/Card-quened'
    import cardPlanning from '../Trello/Card-planning'
    import cardDesign from '../Trello/Card-design'
    import cardDevelopment from '../Trello/Card-development'
    import cardTesting from '../Trello/Card-testing'
    import cardCompleted from '../Trello/Card-completed'

    export default {
        name: "Trello",
        components: {
            draggable,
            cardQuened,
            cardPlanning,
            cardDesign,
            cardDevelopment,
            cardTesting,
            cardCompleted
        },
        data () {
            return {
                popup: false,
                projTotal: 0,
                selectFilter: ['All', 'Symu', 'Google', 'Tesla', 'Amazon'],
                selectedFilter: 'All',
                quened: [],
                planningArr : [],
                designArr: [],
                developmentArr: [],
                testingArr: [],
                completedArr: [],
                planningTot: 0,
                totalQuen: 0,
                editable:true,
                isDragging: false,
                delayedDragging:false,
                planningArrLength: 0,
                quenedTot: 0,
                designTot: 0,
                designObj: 0,
                developTot: 0,
                developObj: 0,
                testingTot: 0,
                testingObj: 0,
                completedTot: 0,
                completedObj: 0
            }
        },
        methods:{
            popupToggle(e){
                console.log(e.target);
            },
            orderList () {
                this.list = this.list.sort((one,two) =>{return one.order-two.order; })
            },
            filterHandler(){
                let selected = this.selectedFilter;

                if (selected === 'Symu'){
                    this.symuFilter();
                } else if (selected === 'Google') {
                    this.filterGoogle();
                } else if (selected === 'Tesla') {
                    this.filterTesla();
                } else if (selected === 'Amazon') {
                    this.filterAmazon();
                } else if (selected === 'All') {
                    this.getStore();
                }
            },
            getStore(){
                this.quened = this.$store.state.quenedStore;
                this.planningArr = this.$store.state.planningStore;
                this.designArr = this.$store.state.designStore;
                this.developmentArr = this.$store.state.developmentStore;
                this.testingArr = this.$store.state.testingStore;
                this.completedArr = this.$store.state.completedStore;
                this.pricesSum(); // planning $
                this.cardsCount(); // planning count
                this.pricesTotal(); //quened $
                this.quenedCount(); // quened tot
                this.designCount(); // design count
                this.designPriceCount(); // design price
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
                this.arrayTotal();
             },
            symuFilter(){
                this.quened = this.$store.state.quenedStore.filter(item => item.client === 'Symu.com');
                this.planningArr = this.$store.state.planningStore.filter(item => item.client === 'Symu.com');
                this.designArr = this.$store.state.designStore.filter(item => item.client === 'Symu.com');
                this.developmentArr = this.$store.state.developmentStore.filter(item => item.client === 'Symu.com');
                this.testingArr = this.$store.state.testingStore.filter(item => item.client === 'Symu.com');
                this.completedArr = this.$store.state.completedStore.filter(item => item.client === 'Symu.com');
                this.arrayTotal();
                this.pricesSum(); // planning $
                this.cardsCount(); // planning count
                this.pricesTotal(); //quened $
                this.quenedCount(); // quened tot
                this.designCount(); // design count
                this.designPriceCount(); // design price
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
            },
            filterGoogle(){
                this.quened = this.$store.state.quenedStore.filter(item => item.client === 'Google');
                this.planningArr = this.$store.state.planningStore.filter(item => item.client === 'Google');
                this.designArr = this.$store.state.designStore.filter(item => item.client === 'Google');
                this.developmentArr = this.$store.state.developmentStore.filter(item => item.client === 'Google');
                this.testingArr = this.$store.state.testingStore.filter(item => item.client === 'Google');
                this.completedArr = this.$store.state.completedStore.filter(item => item.client === 'Google');
                this.arrayTotal();
                this.pricesSum(); // planning $
                this.cardsCount(); // planning count
                this.pricesTotal(); //quened $
                this.quenedCount(); // quened tot
                this.designCount(); // design count
                this.designPriceCount(); // design price
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
            },
            filterTesla(){
                this.quened = this.$store.state.quenedStore.filter(item => item.client === 'Tesla');
                this.planningArr = this.$store.state.planningStore.filter(item => item.client === 'Tesla');
                this.designArr = this.$store.state.designStore.filter(item => item.client === 'Tesla');
                this.developmentArr = this.$store.state.developmentStore.filter(item => item.client === 'Tesla');
                this.testingArr = this.$store.state.testingStore.filter(item => item.client === 'Tesla');
                this.completedArr = this.$store.state.completedStore.filter(item => item.client === 'Tesla');
                this.arrayTotal();
                this.pricesSum(); // planning $
                this.cardsCount(); // planning count
                this.pricesTotal(); //quened $
                this.quenedCount(); // quened tot
                this.designCount(); // design count
                this.designPriceCount(); // design price
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
            },
            filterAmazon(){
                this.quened = this.$store.state.quenedStore.filter(item => item.client === 'Amazon');
                this.planningArr = this.$store.state.planningStore.filter(item => item.client === 'Amazon');
                this.designArr = this.$store.state.designStore.filter(item => item.client === 'Amazon');
                this.developmentArr = this.$store.state.developmentStore.filter(item => item.client === 'Amazon');
                this.testingArr = this.$store.state.testingStore.filter(item => item.client === 'Amazon');
                this.completedArr = this.$store.state.completedStore.filter(item => item.client === 'Amazon');
                this.arrayTotal();
                this.pricesSum(); // planning $
                this.cardsCount(); // planning count
                this.pricesTotal(); //quened $
                this.quenedCount(); // quened tot
                this.designCount(); // design count
                this.designPriceCount(); // design price
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
            },
            arrayTotal(){
                let quenedArr = this.quened.length;
                let planningTot = this.planningArr.length;
                let designTot = this.designArr.length;
                let developmentTot = this.developmentArr.length;
                let testingTot = this.testingArr.length;
                let completedTot = this.completedArr.length;
                this.projTotal = quenedArr + planningTot + designTot + developmentTot + testingTot + completedTot;
            },
            toTestShift(item){
                this.completedArr.splice(this.completedArr.indexOf(item), 1);
                this.testingArr.push(item);
                this.completedCheck(); // compl
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
            },
            toDevShift(item){
                this.completedArr.splice(this.completedArr.indexOf(item), 1);
                this.developmentArr.push(item);
                this.completedCheck(); // compl
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
            },
            toDesignShift(item){
                this.completedArr.splice(this.completedArr.indexOf(item), 1);
                this.designArr.push(item);
                this.completedCheck(); // compl
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
                this.designCount(); // design count
                this.designPriceCount(); // design price
            },
            toPlanning(item){
                this.completedArr.splice(this.completedArr.indexOf(item), 1);
                this.planningArr.push(item);
                this.completedCheck(); // compl
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
                this.pricesSum(); // planning $
                this.cardsCount(); // planning count
            },
            toQuened(item){
                this.completedArr.splice(this.completedArr.indexOf(item), 1);
                this.quened.push(item);
                this.completedCheck(); // compl
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
                this.pricesTotal(); //quened $
                this.quenedCount(); // quened tot
            },
            completedDelete(item){
                this.completedArr.splice(item, 1);
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
                this.completedCheck();
                this.arrayTotal()
            },
            complShift(item){
                this.testingArr.splice(this.testingArr.indexOf(item), 1);
                this.completedArr.push(item);
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
                this.testCheck(); // test
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
            },
            devShift(item){
                this.testingArr.splice(this.testingArr.indexOf(item), 1);
                this.developmentArr.push(item);
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
                this.testCheck(); // test
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
            },
            designShift(item){
                this.testingArr.splice(this.testingArr.indexOf(item), 1);
                this.designArr.push(item);
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
                this.testCheck(); // test
                this.designCount(); // design count
                this.designPriceCount(); // design price
            },
            planShift(item){
                this.testingArr.splice(this.testingArr.indexOf(item), 1);
                this.planningArr.push(item);
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
                this.testCheck(); // test
                this.pricesSum(); // planning $
                this.cardsCount(); // planning count
            },
            enqueHandler(item){
                this.testingArr.splice(this.testingArr.indexOf(item), 1);
                this.quened.push(item);
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
                this.testCheck(); // test
                this.pricesTotal(); //quened $
                this.quenedCount(); // quened tot
            },
            deleteTest(item){
                this.testingArr.splice(item, 1);
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
                this.testCheck(); // test check
                this.arrayTotal()
            },
            toCompleted(item){
                this.developmentArr.splice(this.developmentArr.indexOf(item), 1);
                this.completedArr.push(item);
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
                this.devCheck(); // dev check
                this.completedCount();
                this.completedPriceCount();
            },
            toTest(item){
                this.developmentArr.splice(this.developmentArr.indexOf(item), 1);
                this.testingArr.push(item);
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
                this.devCheck(); // dev check
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
            },
            toDesign(item){
                this.developmentArr.splice(this.developmentArr.indexOf(item), 1);
                this.designArr.push(item);
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
                this.devCheck(); // dev check
                this.designCount(); // design count
                this.designPriceCount(); // design price
            },
            toPlan(item){
                this.developmentArr.splice(this.developmentArr.indexOf(item), 1);
                this.planningArr.push(item);
                this.pricesSum(); // planning $
                this.cardsCount(); // planning count
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
                this.devCheck(); // dev check
            },
            deleteDev(item){
                this.developmentArr.splice(item, 1);
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
                this.devCheck();
                this.arrayTotal()
            },
            quenedTo(item){
                this.developmentArr.splice(this.developmentArr.indexOf(item), 1);
                this.quened.push(item);
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
                this.pricesTotal(); //quened $
                this.quenedCount(); // quened tot
                this.devCheck();
            },
            completedShift(item){
                this.designArr.splice(this.designArr.indexOf(item), 1);
                this.completedArr.push(item);
                this.designCount(); // design count
                this.designPriceCount(); // design price
                this.designCheck(); // design check
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
            },
            testShift(item){
                this.designArr.splice(this.designArr.indexOf(item), 1);
                this.testingArr.push(item);
                this.designCount(); // design count
                this.designPriceCount(); // design price
                this.designCheck(); // design check
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
            },
            developMove(item){
                this.designArr.splice(this.designArr.indexOf(item), 1);
                this.developmentArr.push(item);
                this.designCount(); // design count
                this.designPriceCount(); // design price
                this.designCheck(); // design check
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev $
            },
            planMove(item){
                this.designArr.splice(this.designArr.indexOf(item), 1);
                this.planningArr.push(item);
                this.designCount(); // design count
                this.designPriceCount(); // design price
                this.designCheck(); // design check
                this.pricesSum(); // planning $
                this.checkArr(); // check
                this.cardsCount(); // planning count
            },
            quenedMove(item){
                this.designArr.splice(this.designArr.indexOf(item), 1);
                this.quened.push(item);
                this.designCount(); // design count
                this.designPriceCount(); // design price
                this.designCheck();
                this.pricesTotal(); //quened $
                this.quenedCount()
            },
            deleteDesign(item){
                this.designArr.splice(item, 1);
                this.designCheck();
                this.designCount(); // design count
                this.designPriceCount(); // design price
                this.arrayTotal()
            },
            complMove(item){
                this.planningArr.splice(this.planningArr.indexOf(item), 1);
                this.completedArr.push(item);
                this.pricesSum(); // planning $
                this.checkArr(); // check
                this.cardsCount(); // planning count
                this.completedCount(); // completed count
                this.completedPriceCount(); // completed $
            },
            testingMove(item){
                this.planningArr.splice(this.planningArr.indexOf(item), 1);
                this.testingArr.push(item);
                this.pricesSum(); // planning $
                this.checkArr(); // check
                this.cardsCount(); // planning count
                this.testingPriceCount(); // $
                this.testingCount(); // testing count
            },
            moveDev(item){
                this.planningArr.splice(this.planningArr.indexOf(item), 1);
                this.developmentArr.push(item);
                this.pricesSum(); // planning $
                this.checkArr(); // check
                this.cardsCount(); // planning count
                this.developmentCount(); // dev count
                this.developmentPriceCount(); // dev price
            },
            moveDesign(item){
                this.planningArr.splice(this.planningArr.indexOf(item), 1);
                this.designArr.push(item);
                this.pricesSum(); // planning $
                this.checkArr(); // check
                this.cardsCount(); // planning count
                this.designPriceCount();
                this.designCount();
            },
            moveQue(item){
              this.planningArr.splice(this.planningArr.indexOf(item), 1);
              this.quened.push(item);
              this.pricesSum(); // planning $
              this.checkArr(); // check
              this.cardsCount(); // planning count
              this.pricesTotal(); //quened $
              this.quenedCount()
            },
            deletePlanning(item){
                this.planningArr.splice(item, 1);
                this.cardsCount();
                this.checkArr();
                this.pricesSum();
                this.arrayTotal()
            },
            indexHandler(item){
                this.quened.splice(item, 1);
                this.quenedCount();
                this.pricesTotal();
                this.arrayTotal()
            },
            indexPlanning(item){
                this.quened.splice(this.quened.indexOf(item), 1);
                this.planningArr.push(item);
                this.cardsCount();
                this.quenedCount();
                this.pricesTotal();
                this.pricesSum();
                this.quenedCheck();
            },
            designMove(item){
                this.quened.splice(this.quened.indexOf(item), 1);
                this.designArr.push(item);
                this.cardsCount();
                this.quenedCount();
                this.designCount();
                this.designPriceCount();
                this.pricesTotal();
                this.quenedCheck();
            },
            devMove(item){
                this.quened.splice(this.quened.indexOf(item), 1);
                this.developmentArr.push(item);
                this.cardsCount();
                this.quenedCount();
                this.developmentCount();
                this.developmentPriceCount();
                this.pricesTotal();
                this.quenedCheck();
            },
            testMove(item){
                this.quened.splice(this.quened.indexOf(item), 1);
                this.testingArr.push(item);
                this.cardsCount();
                this.quenedCount();
                this.testingCount();
                this.testingPriceCount();
                this.pricesTotal();
                this.quenedCheck();
            },
            completedMove(item){
                this.quened.splice(this.quened.indexOf(item), 1);
                this.completedArr.push(item);
                this.cardsCount();
                this.quenedCount();
                this.completedCount();
                this.completedPriceCount();
                this.pricesTotal();
                this.quenedCheck();
            },
            onMove ({relatedContext, draggedContext}) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            },
            pricesSum(){
                this.planningArr.reduce((prev, cur) => {
                    return this.planningTot = prev + cur.price
                }, 0);
                if(this.planningArr.length < 1){
                    this.planningTot = 0
                }
            },
            pricesTotal(){
                this.quened.reduce((prev, cur) => {
                    return this.totalQuen = prev + cur.price
                }, 0);
                if(this.quened.length < 1){
                    this.totalQuen = 0
                }
            },
            checkArr(){
                if(this.planningArr.length === 0) {
                    this.planningTot = 0
                }
            },
            quenedCheck(){
                if(this.quened.length === 0){
                    this.totalQuen = 0
                }
            },
            designCheck(){
                if(this.designArr.length === 0){
                    this.designTot = 0
                }
            },
            devCheck(){
                if(this.developmentArr.length === 0){
                    this.developTot = 0
                }
            },
            completedCheck(){
                if(this.completedArr.length === 0){
                    this.completedTot = 0;
                }
            },
            testCheck(){
                if(this.testingArr.length === 0){
                    this.testingTot = 0
                }
            },
            cardsCount(){
                return this.planningArrLength = this.planningArr.length
            },
            quenedCount(){
                return this.quenedTot = this.quened.length
            },
            designCount(){
                return this.designObj = this.designArr.length
            },
            designPriceCount(){
                this.designArr.reduce((prev, cur) => {
                    return this.designTot = prev + cur.price
                }, 0);
                if(this.designArr.length < 1){
                    this.designTot = 0
                }
            },
            developmentCount(){
                return this.developObj = this.developmentArr.length
            },
            developmentPriceCount(){
                this.developmentArr.reduce((prev, cur) => {
                    return this.developTot = prev + cur.price
                }, 0);
                if(this.developmentArr.length < 1){
                    this.developTot = 0
                }
            },
            testingCount(){
                return this.testingObj = this.testingArr.length
            },
            testingPriceCount(){
                this.testingArr.reduce((prev, cur) => {
                    return this.testingTot = prev + cur.price
                }, 0);
                if(this.testingArr.length < 1){
                    this.testingTot = 0
                }
            },
            completedCount(){
                return this.completedObj = this.completedArr.length
            },
            completedPriceCount(){
                this.completedArr.reduce((prev, cur) => {
                    return this.completedTot = prev + cur.price
                }, 0);
                if(this.completedArr.length < 1){
                    this.completedTot = 0
                }
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
            }
        },
        watch: {
            isDragging (newValue) {
                if (newValue){
                    this.delayedDragging = true;
                    return
                }
                this.$nextTick( () =>{
                    this.delayedDragging = false;
                    this.pricesSum();
                    this.pricesTotal();
                    this.checkArr();
                    this.cardsCount();
                    this.designCount();
                    this.designPriceCount();
                    this.developmentCount();
                    this.developmentPriceCount();
                    this.testingCount();
                    this.testingPriceCount();
                    this.completedCount();
                    this.completedPriceCount();
                    this.quenedCount();
                    this.quenedCheck();
                    this.designCheck();
                    this.devCheck();
                    this.testCheck();
                    this.completedCheck();
                })
            }
        },
        mounted(){
            this.pricesSum();
            this.pricesTotal();
            this.cardsCount();
            this.quenedCount();
            this.designCount();
            this.designPriceCount();
            this.developmentCount();
            this.developmentPriceCount();
            this.testingCount();
            this.testingPriceCount();
            this.completedCount();
            this.completedPriceCount();
            this.arrayTotal();
            this.getStore();
        }
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');

    .trello-wrap{
        background: #2b2d3c;
        flex-basis: 100%;
        padding: 45px;
        overflow-x: scroll;
        position: relative;
    }

    .select-block{
        padding-right: 100px;
        display: flex;
        align-items: center;

        .select{
            width: 120px;
            border-radius: 10px;
            font-size: 14px;
            border: 1px solid #ffff;
            background: #237cc7;
            color: #ffff;
            padding: 3px 8px;
        }

        span{
            font-size: 16px;
            padding-right: 15px;
        }
    }

    .top-part-page{
        background: #237cc7;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 18px;
        font-family: 'Montserrat', sans-serif;
        padding: 20px 0 20px 45px;

        span{
            color: white;
            padding-left: 30px;
        }
    }

    .wrapper-list{
        display: flex;
        flex-direction: column;
        font-family: 'Montserrat', sans-serif;

        .top-part{
            &__name{
                h4{
                    margin: 0;
                    font-size: 18px;
                    color: white;
                }
            }
            &__description{
                display: flex;
                margin-top: 10px;

                .project-count{
                    color: #9ea3b4;
                    font-size: 14px;
                    margin-right: 15px;
                }

                .total-price{
                    color: #228be1;
                    font-size: 14px;
                }
            }
        }

        .project{
            color: white;
            margin-bottom: 5px;
        }

        .project-description{
            font-size: 14px;
            color: #9ea3b4;
        }
    }

    .list-holder{
        display: flex;
        margin-top: 40px;
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
        min-height: 100px;
        padding: 0;
        list-style-type: none;
        margin-right: 20px;
        width: 250px;
        position: relative;

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