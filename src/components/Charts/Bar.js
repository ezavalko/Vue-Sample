import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    //mixins: [reactiveProp],
    props: ["data", "options"],
    mounted() {
        this.renderBarChart();
    },
    computed: {
        chartData: function() {
            return this.data;
        }
    },
    methods: {
        renderBarChart: function() {
            this.renderChart({
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: '#505464',
                            hoverBackgroundColor: '#2196f3',
                            data: this.chartData
                        }
                    ]
                },
                { responsive: true, maintainAspectRatio: false }
            );
        }
    },
    watch: {
        data: function() {
            this._chart.destroy();
            this.renderBarChart();
        }
    }
}