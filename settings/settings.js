(function () {
    if (Meteor.isClient) {

        function getCheckBoxTrueFalseSetting(setting) {
            return getSettingsValue.call(this, setting) ? "checked" : '';
        }

        function getSettingsValue(setting) {
            var settingsObject = getSettingsWithName(this.settingsObj, setting);

            if (typeof settingsObject !== 'undefined') {
                return settingsObject.value;
            }
        }

        function changeSettingSwitchValue(event) {
            var newValue = $(event.target).is(':checked');
            var settingsName = $(event.target).attr('id');

            changeSetting.call(this, settingsName, newValue);
        }

        function changeSettingTextValue(event) {
            var settingsName = $(event.target).attr('id');
            var newValue = event.target.value;

            if(event.target.validity.valid) {
                changeSetting.call(this, settingsName, newValue);
            }
        }

        function changeSetting(settingsName, newValue) {
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
            'getCheckBoxTrueFalseSetting': getCheckBoxTrueFalseSetting,
            'getSettingsValue': getSettingsValue
        });

        Template.settings.events({
            'click .mdl-switch__input': changeSettingSwitchValue,
            'keyup .mdl-textfield__input': changeSettingTextValue
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
