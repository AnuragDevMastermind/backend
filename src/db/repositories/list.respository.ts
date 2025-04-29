import { Contact, ListModel } from "../../models/list.model";
import { Types } from "mongoose";

export const getListById = (
  id: string
) => ListModel.findById(id);

export const getListsByUserId = (
  userId: string
) => ListModel.find({ userId: new Types.ObjectId(userId) });

export const createList = (
  values: Record<string, any>
) => new ListModel(values).save().then((list) => list.toObject());


export const updateListName = (
  listId: string,
  name: string
) => ListModel.findByIdAndUpdate(
  listId,
  { name: name },
  { new: true, projection: { _id: 1, name: 1 } }
);


export const createContacts = (
  listId: string,
  contacts: Contact[]
) => ListModel.findByIdAndUpdate(
  listId,
  { $push: { contacts: { $each: contacts } } },
  { new: true, projection: { contacts: { $slice: -contacts.length } } }
);



export const getContactById = (
  listId: string,
  contactId: string
) => ListModel.aggregate([
  { $match: { _id: new Types.ObjectId(listId) } },
  { $unwind: "$contacts" },
  { $match: { "contacts._id": new Types.ObjectId(contactId) } },
  { $replaceRoot: { newRoot: "$contacts" } }
]).then(results => results[0] || null);

export const getListsWithContactsCount = (
  userId: string
) => ListModel.aggregate([
  { $match: { userId: new Types.ObjectId(userId) } },
  {
    $project: {
      _id: true,
      name: true,
      contactsCount: { $size: "$contacts" }
    }
  }
]);

export const getEmailsUsingListIds = (
  listIds: string[]
) => ListModel.aggregate([
  {
    $match: {
      _id: {
        $in: listIds.map((id) => new Types.ObjectId(id))
      }
    }
  },
  {
    $unwind: "$contacts"
  },
  {
    $group: {
      _id: null,
      emails: {
        $addToSet: "$contacts.email"
      }
    }
  },
  {
    $project: {
      _id: false,
      emails: true
    }
  }
]).then(results => results[0].emails || []);


