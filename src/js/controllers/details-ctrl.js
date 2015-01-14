angular.module('RDash')
    .controller('DetailsCtrl', ['$scope', '$filter',  function($scope, $filter) {
        var highChartsNg = {

            title : { text: 'Visit Details'},

            options: {
                xAxis: { type: 'datetime' },
                yAxis: {
                    title: { text: 'Visits' },
                    type: 'logarithmic',
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#404040'
                    }]
                },
                plotOptions: {
                    line: {
                        dataLabels: { enabled: true }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    borderWidth: 0,
                    floating: true
                }
            },

            series: []

        };

        var dimensions = ["walkby", "bounce", "qualified", "engaged", "once", "seen", "freq", "potential", "pep", "pev"];

        $scope.dimensions = {};
        for (i in dimensions) {
            $scope.dimensions[dimensions[i]] = false;
        }
        $scope.dimensions.freq = true;

        var _series = { name: '', data: [], id: '' };
        $scope.loadGraph = function() {

            var table = {};
            var series = [];
            for (i in $scope.rawData.visits) {
                var visit = $scope.rawData.visits[i];
                var datetime = new Date(visit.ts).getTime();

                angular.forEach($scope.dimensions, function(value, key) {
                    if (value) {
                        if (!table[key]) {
                            table[key] = [];
                        }
                        table[key].push([datetime, visit[key]]);
                    }
                }, table);

            }
            angular.forEach(table, function(value, key) {
                var s = angular.copy(_series);
                s.data = value;
                s.name = $filter('capitalize')(key);
                s.id = s.name;
                series.push(s);
            }, series);
            highChartsNg.series = series;
        };

        $scope.loadGraph();
        $scope.highChartsNg = highChartsNg;

        $scope.$watch('dimensions', function(newValue, oldValue) {
            if (newValue === oldValue) return;
            $scope.loadGraph();
        }, true);


    }]);
