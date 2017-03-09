var React = require('react');
var AppActions = require('../actions/AppActions.js');

var Contact = React.createClass({
	render: function() {
		return (
			<tr>
				<td>{this.props.contact.name}</td>
				<td>{this.props.contact.phone}</td>
				<td>{this.props.contact.email}</td>
				<td>
					<button className="btn btn-default" onClick={this.handleEdit.bind(this,this.props.contact)}>Edit</button>
					<button className="btn btn-danger" onClick={this.handleRemove.bind(this,this.props.contact.id)}>Remove</button>
				</td>
			</tr>
		);
	},
	handleRemove: function(id) {
		AppActions.removeContact(id);
	},
	handleEdit: function(contact) {
		AppActions.editContact(contact);
	}
});

module.exports = Contact;