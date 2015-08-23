if (Meteor.isClient) {

    function usernameAlreadyExists(existingUsers, username) {
        var usersWithSameName = existingUsers.filter(function (user) {
            return user.name === username;
        });

        return usersWithSameName.length !== 0;
    }

    Template.userManager.events({
        'submit .add-user': function (event) {
            event.preventDefault();

            var nameInputValue = event.target.name.value;

            if (usernameAlreadyExists(this.users.fetch(), nameInputValue)) {
                alert('Name already exists!');
            } else {
                var newUser = {
                    name: nameInputValue
                };

                Users.insert(newUser);
                event.target.reset();
            }
        }
    });
}