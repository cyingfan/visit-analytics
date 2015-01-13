angular.module('RDash')
    .controller('PercentageCtrl', ['$scope', '$filter', function($scope, $filter) {
        var highChartsNg = {
            
            title : { text: ''},

            options: {
                chart: { type: 'bar' },
                xAxis: { categories: [] },
                yAxis: {
                    max: 100,
                    title: { 
                        text: 'Percent',
                        align: 'high'
                    },
                    labels: { overflow: 'justify' }
                },
                tooltip: { valueSuffix: ' %' },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                plotOptions: {
                    bar: {
                        dataLabels: { 
                            enabled: true,
                            format: "{y} %"
                        }
                    }
                }
            },

            series: []                        
        }

        // Converts text like "percent_qualified_visits" to "Qualified Visits"
        var extractTitle = function(txt) {
            var parts= txt.split("_");
            var output = "";
            for (var i=1; i<parts.length; i++) {
                output = output.concat(" ", $filter('capitalize')(parts[i]));
            }
            return output;
        }

        var types = [ 'percent_qualified_visits', 'percent_engaged_visits', 'percent_visits_potential' ];
        var _series = { 'name': '', data: [], id: ''}
        $scope.viewBy = 'types';

        $scope.loadGraph = function() {
            if ($scope.viewBy == 'types') {
                highChartsNg.title.text = "By Types";
                var table = {};
                var categories = [];
                for (i in types) {
                    var type = types[i];
                    categories.push(extractTitle(type));
                   
                    for (j in $scope.rawData["subloc_" + type]) {
                        data = $scope.rawData["subloc_" + type][j];

                        name = extractTitle(data[0]);
                        if (!table[name]) {
                            table[name] = [];
                        }
                        table[name].push(data[1]);

                    }

                }
            }

            else if ($scope.viewBy == "subloc") {
                highChartsNg.title.text = "By Sub Location";
                var table = {};
                var categories = [];
                for (i in types) {
                    var type = types[i];
                    var type_human = extractTitle(type);

                    for (j in $scope.rawData["subloc_" + type]) {
                        data = $scope.rawData["subloc_" + type][j];

                        name = extractTitle(data[0]);
                        if (categories.indexOf(name) == -1) {
                            categories.push(name);
                        }
                        if (!table[type_human]) {
                            table[type_human] = [];
                        }
                        table[type_human].push(data[1]);
                    }
                }
            }
            
            series = [];
            angular.forEach(table, function(value, key) {
                var s = angular.copy(_series);
                s.name = key;
                s.id = key;
                s.data = value;
                this.push(s);
            }, series);
            console.log(angular.toJson(series));
            highChartsNg.series = series;
            highChartsNg.options.xAxis.categories = categories;

        }

        $scope.highChartsNg = highChartsNg;
        $scope.loadGraph();

    }]);
