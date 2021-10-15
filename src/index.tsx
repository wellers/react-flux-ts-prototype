import flux = require('flux');
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { Hello } from "./components/Hello";
import { Welcome } from "./components/Welcome";
import { AddContact } from "./components/AddContact";
import { ListContacts } from "./components/ListContacts";
import { Menu } from "./components/Menu";
import { AddContactStore, UserRequestedEdit, AddContactViewModel } from "./stores/AddContactStore";
import { ListContactsStore } from "./stores/ListContactsStore";
import Action = require('./core/Action');

var dispatcher = new flux.Dispatcher<Action>();
var addContactStore = new AddContactStore(dispatcher);
var viewContactStore = new ListContactsStore(dispatcher);

ReactDOM.render(
	<div>
		<Hello compiler="TypeScript" framework="React" />
		<Router>
			<Menu dispatcher={dispatcher} />
			<div>
				<Switch>
					<Route exact path="/" component={() => <Welcome username="Paul" />} />
					<Route exact path="/contacts" component={() => listContacts()} />
					<Route exact path="/addcontact" component={() => addContacts()} />
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	</div>,
	document.getElementById("root")
);

function addContacts() {
	return (
		<AddContact
			dispatcher={dispatcher}
			store={addContactStore}
			onChange={(model: AddContactViewModel) => { dispatcher.dispatch(new UserRequestedEdit(model)); }}
			onSubmit={(model: AddContactViewModel) => { dispatcher.dispatch(new UserRequestedEdit({ ...model, saveRequested: true })); }}>
		</AddContact>
	);
}

function listContacts() {
	return (
		<ListContacts
			dispatcher={dispatcher}
			store={viewContactStore}>
		</ListContacts>
	);
}