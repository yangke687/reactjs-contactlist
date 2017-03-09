var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var AppAPI = require('../utils/appApi');
var CHANGE_EVENT = 'change';

var _contacts = [];
var _contact_to_edit = null;

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
	setContactToEdit: function(contact) {
		console.log('cur contact', contact);
		_contact_to_edit = contact;
	},
	getContactToEdit: function() {
		return _contact_to_edit;
	},
	updateContact: function(contact) {
		for (var i = 0; i < _contacts.length; i++) {
			if (_contacts[i].id === contact.id) {
				_contacts.splice(i, 1);
				_contacts.push(contact);
				return;
			}
		}
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
		case AppConstants.EDIT_CONTACT:
			console.log("Edit Contact");
			// store set 
			AppStore.setContactToEdit(action.contact);
			// emitChange
			AppStore.emitChange();
			break;
		case AppConstants.UPDATE_CONTACT:
			console.log("Updating Contact");
			// store update
			AppStore.updateContact(action.contact);
			// api update
			AppAPI.updateContact(action.contact);
			// emitChange
			AppStore.emitChange();
	}
});

module.exports = AppStore;