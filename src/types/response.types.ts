import { Flowchart } from "../models/suquence.model";

export type ListItem = {
  name: string;
  contactsSize: number;
}

export type LoginStatusResponse = {
  data: {
    isUserLoggedIn: boolean;
  }
};

export type LoginResponse = {
  message: string;
}

export type SignupResponse = {
  message: string;
}

export type ListWithContactsCountResponse = {
  message: string;
  data: {
    _id: string;
    name: string;
    contactsCount: number;
  }[]
}

export type ContactResponse = {
  _id: string;
  name: string;
  email: string;
  number: string;
};

export type ListByIdResponse = {
  message: string;
  data: {
    userId: string;
    name: string;
    contacts: ContactResponse[];
  }
}

export type SequenceResponse = {
  id: string,
  userId: string;
  name: string;
  flowchart: Flowchart;
};

