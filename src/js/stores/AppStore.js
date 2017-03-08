var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var AppAPI = require('../utils/appApi');
var CHANGE_EVENT = 'change';

var _contacts = [];

var AppStore = assign({}, EventEmitter.prototype, {
	saveContact: function(contact) {
		_contacts.push(contact);
	},
	setContacts: function(contacts) {
		_contacts = contacts;
	},
	removeContact: function(contactID) {
		var idx = _contacts.findIndex(function(contact) {
			return contactID === contact.id;
		});
		if (idx !== -1) {
			_contacts.splice(idx, 1);
		}
	},
	getContacts: function() {
		return _contacts;
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb) {
		this.remove(CHANGE_EVENT, cb);
	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch (action.actionType) {
		case AppConstants.SAVE_CONTACT:
			console.log('Saving Contact');
			// store save
			AppStore.saveContact(action.contact);
			// save to api
			AppAPI.saveContact(action.contact);
			// emit change
			AppStore.emitChange();
			break;
		case AppConstants.RECV_CONTACTS:
			console.log('Receive Contacts');
			// set contacts
			AppStore.setContacts(action.contacts);
			// emit Change
			AppStore.emitChange();
			break;
		case AppConstants.REMOVE_CONTACT:
			console.log("Removing Contact");
			// api remove
			AppAPI.removeContact(action.contactID);
			// store remove
			AppStore.removeContact(action.contactID);
			// emitChange
			AppStore.emitChange();
			break;
	}
});

module.exports = AppStore;