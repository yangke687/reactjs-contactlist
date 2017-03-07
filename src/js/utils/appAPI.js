var firebase = require('firebase');

module.exports = {
	saveContact: function(contact) {
		this.firebaseRef = new firebase('https://contactlist-2d3fd.firebaseio.com/');
		this.firebaseRef.push({
			contact: contact
		});
	}
}