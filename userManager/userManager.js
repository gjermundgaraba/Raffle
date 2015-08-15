if (Meteor.isClient) {

    Template.userManager.events({
        'submit .add-user': function (event) {
            event.preventDefault();

            var nameValue = event.target.name.value;
            var newUser = {
                name: nameValue
            };

            Users.insert(newUser);
            event.target.reset();
        }
    });
}