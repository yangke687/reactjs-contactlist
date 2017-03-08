var React = require('react');
var AppAPI = require('../utils/appAPI.js');

var Contact = React.createClass({
	render: function() {
		return (
			<tr>
				<td>{this.props.contact.name}</td>
				<td>{this.props.contact.phone}</td>
				<td>{this.props.contact.email}</td>
				<td>
					<button className="btn btn-default" onClick={this.handleEdit}>Edit</button>
					<button className="btn btn-danger" onClick={this.handleRemove.bind(this,this.props.contact.id)}>Remove</button>
				</td>
			</tr>
		);
	},
	handleRemove: function(id) {

	}
});

module.exports = Contact;