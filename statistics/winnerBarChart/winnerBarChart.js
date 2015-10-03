(function () {
    if (Meteor.isClient) {

        Template.winnerBarChart.rendered = function () {
            var ctx = $("#winnerBarChartCanvas").get(0).getContext("2d");

            var usersWithStats = STATISTICS_COMMON.generateUsersStatistics(this.data.raffles);
            usersWithStats.sort(function (a, b) {
                var difference = b.numberOfTimesWon - a.numberOfTimesWon;

                if (difference === 0) {
                    difference = a.numberOfTimesParticipated - b.numberOfTimesParticipated;
                }

                return difference;
            });

            var labels= [];
            var winsData = [];
            var participatedData = [];
            for (var i = 0; i < usersWithStats.length; ++i) {
                var user = STATISTICS_COMMON.findUserInUserStats(usersWithStats[i].userId, this.data.users);
                labels.push(user.name);
                winsData.push(usersWithStats[i].numberOfTimesWon);
                participatedData.push(usersWithStats[i].numberOfTimesParticipated);
            }

            var data = {
                labels: labels,
                datasets: [
                    {
                        label: "Wins",
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(151,187,205,0.75)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: winsData
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