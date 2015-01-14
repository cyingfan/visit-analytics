angular.module('RDash')
    .controller('AverageCtrl', ['$scope', function($scope) {
        var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        var highChartsNg = {

            title : { text: ''},

            options: {
                xAxis: { categories: [] },
                yAxis: {
                    title: { text: 'Visits' },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#404040'
                    }]
                },
                legend: { enabled: false },
                plotOptions: {
                    line: {
                        dataLabels: { enabled: true }
                    }
                }
            },

            series: [{
                name: '',
                data: []
            }]

        }

        $scope.periodType = 'day';

        $scope.loadGraph = function() {
            if ($scope.periodType == 'day') {
                highChartsNg.title.text = 'Average By Weekday';
                highChartsNg.options.xAxis.categories = weekDays;
                highChartsNg.series[0].name = 'byWeekDay';
                highChartsNg.series[0].data = $scope.rawData.avg_days;
            }
            else if ($scope.periodType == 'hour') {
                highChartsNg.title.text = 'Average By Hour';
                highChartsNg.options.xAxis.categories = $scope.rawData.avg_hours.keys();
                highChartsNg.series[0].name = 'byHour';
                highChartsNg.series[0].data = $scope.rawData.avg_hours;
           }
        };

        $scope.highChartsNg = highChartsNg;
        $scope.loadGraph();

        $scope.$watch('periodType', function(newValue, oldValue) {
            if (newValue === oldValue) return;
            $scope.loadGraph();
        });
    }]);
