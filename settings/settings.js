(function () {
    if (Meteor.isClient) {

        function getTrueFalseSetting(setting) {
            return getSettingsValue.call(this, setting) ? "checked" : '';
        }

        function getSettingsValue(setting) {
            var settingsObject = getSettingsWithName(this.settingsObj, setting);

            if (typeof settingsObject !== 'undefined') {
                return settingsObject.value;
            }
        }

        function changeSetting(event) {
            var newValue = $(event.target).is(':checked');
            var settingsName = $(event.target).attr('id');

            var settings = getSettingsWithName(this.settingsObj, settingsName);
            if (typeof settings !== 'undefined') {
                Meteor.call('updateSetting', settings._id, newValue);
            } else {
                Meteor.call('addSetting', settingsName, newValue);
            }
        }

        function getSettingsWithName(settingsObj, settingsName) {
            for (var i = 0; i < settingsObj.length; ++i) {
                if (settingsObj[i].settingsName === settingsName) {
                    return settingsObj[i];
                }
            }
        }

        Template.settings.helpers({
            'getTrueFalseSetting': getTrueFalseSetting,
            'getSettingsValue': getSettingsValue
        });

        Template.settings.events({
            'click .mdl-switch__input': changeSetting
        });

    }
})();

Meteor.methods({
    addSetting: function (settingsName, settingsValue) {
        var newSettingObj = {
            'settingsName': settingsName,
            'value': settingsValue
        };

        Settings.insert(newSettingObj);
    },
    updateSetting: function (settingsId, updatedValue) {
        Settings.update(settingsId, {
            $set: {value: updatedValue}
        });
    }
});
