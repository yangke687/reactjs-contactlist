var React = require('react');
var AppStore = require('../stores/AppStore');
var AddForm = require('./AddForm.js');
var EditForm = require('./EditForm.js');
var ContactsList = require('./ContactsList.js');
var AppAPI = require('../utils/appAPI.js');

AppAPI.getContacts();

function getAppState() {
	return {
		contacts: AppStore.getContacts(),
		contactToEdit: AppStore.getContactToEdit(),
	}
}

var App = React.createClass({

	getInitialState: function() {
		return getAppState();
	},
	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
	},
	componentWillUnmout: function() {
		AppStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getAppState());
	},
	render: function() {
		if (this.state.contactToEdit) {
			var form = <EditForm contact={this.state.contactToEdit} />;
		} else {
			var form = <AddForm />;
		}
		return (
			<div>
				{form}
				<ContactsList contacts={this.state.contacts} />
			</div>
		);
	}
});

module.exports = App;