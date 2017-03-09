var React = require('react');
var AppActions = require('../actions/AppActions.js');

var EditForm = React.createClass({
	getInitialState: function() {
		return this.props.contact
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState(nextProps.contact);
	},
	render: function() {
		return (
			<div>
				<div className="well">
					<h3>Edit Contact</h3>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<input type="text" ref="name" className="form-control" placeholder="Add Contact Name" value={this.state.name} onChange={this.handleChange.bind(this,'name')} />
						</div>
						<div className="form-group">
							<input type="text" ref="phone" className="form-control" placeholder="Add Phone Number" value={this.state.phone} onChange={this.handleChange.bind(this,'phone')} />
						</div>
						<div className="form-group">
							<input type="text" ref="email" className="form-control" placeholder="Add Email Address" value={this.state.email}  onChange={this.handleChange.bind(this,'email')} />
						</div>
						<button type="submit" className="btn btn-primary">Update</button>
					</form>
				</div>
			</div>
		);
	},
	handleChange: function(fieldName, evt) {
		var newState = this.state;
		newState[fieldName] = evt.target.value;
		this.setState(newState);
	},
	handleSubmit: function(evt) {
		evt.preventDefault();
		var contact = {
			id: this.state.id,
			name: this.state.name,
			phone: this.state.phone,
			email: this.state.email
		};
		AppActions.updateContact(contact);
	}
});

module.exports = EditForm;