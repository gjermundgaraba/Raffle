
(function () {
    if (Meteor.isClient) {

        Template.valueBarChart.rendered = function () {
            var ctx = $("#valueBarChartCanvas").get(0).getContext("2d");

            var usersWithStats = STATISTICS_COMMON.generateUsersStatistics(this.data.raffles);
            usersWithStats.sort(function (a, b) {
                return (b.numberOfTimesWon/b.numberOfTimesParticipated) - (a.numberOfTimesWon/a.numberOfTimesParticipated);
            });

            var labels= [];
            var winsParticipatedRatioData = [];
            for (var i = 0; i < usersWithStats.length; ++i) {
                var user = STATISTICS_COMMON.findUserInUserStats(usersWithStats[i].userId, this.data.users);
                labels.push(user.name);
                winsParticipatedRatioData.push(usersWithStats[i].numberOfTimesWon/usersWithStats[i].numberOfTimesParticipated);
            }

            var data = {
                labels: labels,
                datasets: [
                    {
                        label: "Win-Participated Ratio",
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(151,187,205,0.75)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: winsParticipatedRatioData
                    }
                ]
            };

            new Chart(ctx).Bar(data, {
                multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
            });
        };
    }

})();