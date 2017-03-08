var firebase = require('firebase');
var AppActions = require('../actions/AppActions');

module.exports = {
	saveContact: function(contact) {
		this.firebaseRef = new firebase('https://contactlist-2d3fd.firebaseio.com/');
		this.firebaseRef.push({
			contact: contact
		});
	},
	getContacts: function() {
		this.firebaseRef = new firebase('https://contactlist-2d3fd.firebaseio.com/');
		this.firebaseRef.once('value', function(snapshots) {
			let contacts = [];
			snapshots.forEach((snapshot) => {
				let contact = {
					id: snapshot.key(),
					name: snapshot.val().contact.name,
					phone: snapshot.val().contact.phone,
					email: snapshot.val().contact.email
				};
				contacts.push(contact);
				AppActions.recvContacts(contacts);
			});
		});
	},
	removeContact: function(contactID) {
		console.log("api removing", contactID);
		this.firebaseRef = new firebase("https://contactlist-2d3fd.firebaseio.com/" + contactID);
		this.firebaseRef.remove();
	}
}