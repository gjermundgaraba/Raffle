if (Meteor.isClient) {

    Template.raffleList.events({
        'click #addRaffle': function () {
            Meteor.call('addRaffle');
        }
    })
}

Meteor.methods({
   addRaffle: function () {
       var emptyRaffle = {
           done: false,
           raffleDate: new Date(),
           winners: [],
           participants: [],
           losers: []
       };

       Raffles.insert(emptyRaffle, function (error, id) {
           if (!error && Meteor.isClient) {
               Router.go('/raffle/' + id);
           }
       });
   }
});