angular.module('RDash')
    .controller('OverviewCtrl', ['$scope', '$rootScope', '$filter', function($scope, $rootScope, $filter) {
        $scope.startDate = new Date($scope.rawData.start);
        $scope.finishDate = new Date($scope.rawData.finish);

        var highChartsNg = {
            
            title : { text: ''},

            options: {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },

            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: { enabled: false },
                    showInLegend: true
                }
            }},

            series: [{
                type: 'pie',
                name: '',
                data: []
            }]
            
        };

        var charts = [
            // [title_or_series_name, json_data_object, scope_property_name]
            ['Total By Dwell', $scope.rawData.total_by_dwell, 'byDwellConfig'],
            ['Total By Frequency', $scope.rawData.total_by_freq, 'byFreqConfig'],
            ['Total By Dwell Bracket', $scope.rawData.total_by_dwell_bracket, 'byDwellBracketConfig']
        ];

        for (i in charts) {
            var conf = angular.copy(highChartsNg);
            conf.title.text= charts[i][0]
            conf.series[0].name = charts[i][0];
            
            angular.forEach(charts[i][1], function(value, key) {
                this.push([$filter('capitalize')(key), value]);
            }, conf.series[0].data);
            
            $scope[charts[i][2]] = conf;
        }

        $scope.charts = [
            '<highchart id="byDwellConfig" config="byDwellConfig"></highchart>',
            '<highchart id="byDwellConfig2" config="byDwellConfig2"></highchart>',
            '<highchart id="byDwellConfig3" config="byDwellConfig3"></highchart>'
        ];
    }]);
