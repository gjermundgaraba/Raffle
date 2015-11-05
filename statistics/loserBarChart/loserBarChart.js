(function () {
    if (Meteor.isClient) {

        Template.loserBarChart.rendered = function () {
            var ctx = $("#loserBarChartCanvas").get(0).getContext("2d");

            var usersWithStats = STATISTICS_COMMON.generateUsersStatistics(this.data.raffles);
            usersWithStats.sort(function (a, b) {
                var difference = b.numberOfTimesLost - a.numberOfTimesLost;

                if (difference === 0) {
                    difference = b.numberOfTimesParticipated - a.numberOfTimesParticipated;
                }

                return difference;
            });

            var labels= [];
            var lossData = [];
            var participatedData = [];
            for (var i = 0; i < usersWithStats.length; ++i) {
                var user = STATISTICS_COMMON.findUserInUserStats(usersWithStats[i].userId, this.data.users);
                labels.push(user.name);
                lossData.push(usersWithStats[i].numberOfTimesLost);
                participatedData.push(usersWithStats[i].numberOfTimesParticipated);
            }

            var data = {
                labels: labels,
                datasets: [
                    {
                        label: "Losses",
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(151,187,205,0.75)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: lossData
                    },
                    {
                        label: "Participated",
                        fillColor: "rgba(220,220,220,0.5)",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: participatedData
                    }
                ]
            };

            new Chart(ctx).Bar(data, {
                multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
            });
        };
    }

})();