import flux = require('flux');
import Action = require('../core/Action');
import { Store } from "../core/ComponentsBase";
import { ContactApi, Contact } from "../apis/ContactApi";

export class ListContactViewModel {
    contacts: Array<Contact>;
}

export class ListContactsStore extends Store<ListContactViewModel> {
    constructor(dispatcher: flux.Dispatcher<Action>) {
        super();
        this.viewModel = { contacts: Array<Contact>() };

        dispatcher.register((a: Action) => {  
            if (a instanceof NavigateToListContacts) {
                this.viewModel = { contacts: ContactApi.getContacts() };
                this.change();
            }
        });
   }
}

export class NavigateToListContacts extends Action {
    constructor() {
        super(Action.Source.View);
    }
}