import flux = require('flux');
import * as React from "react";
import { Link } from 'react-router-dom';
import Action = require('../core/Action');
import { NavigateToListContacts } from '../stores/ListContactsStore';

export interface MenuProps {
	dispatcher: flux.Dispatcher<Action>;
}

export const Menu = (props: MenuProps) => (
	<ul>
		<li className="menu-item">
			<Link to="/">Home</Link>
		</li>
		<li className="menu-item">
			<Link to="/contacts" onClick={() => { props.dispatcher.dispatch(new NavigateToListContacts()) }}>List contacts</Link>
		</li>
		<li className="menu-item">
			<Link to="/addcontact">Add contact</Link>
		</li>
	</ul>);