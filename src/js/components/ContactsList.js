var React = require('react');
var Contact = require('./Contact.js');

var ContactsList = React.createClass({
	render: function() {
		return (
			<div>
				<h3>Contacts</h3>
				<table className="table table-striped">
					<thead>
						<tr>
							<td>Name</td>
							<td>Phone</td>
							<td>Email</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{ this.props.contacts.map(function(con,idx){
							return (
								<Contact contact={con} key={idx} />
							)
						}) }
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = ContactsList;