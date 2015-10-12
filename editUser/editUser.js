(function () {
    if (Meteor.isClient) {
        function changeName(event) {
            var newName = event.target.value;

            if(event.target.validity.valid) {
                Meteor.call('updateName', this._id, newName)
            }
        }

        Template.editUser.events({
            'keyup #nameInput': changeName
        });
    }
})();

Meteor.methods({
    updateName: function (userId, newName) {
        Users.update(userId, {
            $set: {name: newName}
        });
    }
});
