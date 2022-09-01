const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const getContactFilterById = JSON.parse(data).filter(
      (item) => item.id === contactId
    );
    console.log(getContactFilterById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');

    const removeContactFilterById = JSON.parse(data).filter(
      (item) => item.id !== contactId
    );

    const stringifyContacts = JSON.stringify(removeContactFilterById);

    await fs.writeFile(contactsPath, stringifyContacts, 'utf8');
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');

    const parseData = JSON.parse(data);
    const lastId = parseData.slice(-1)[0].id;
    const newContact = {
      id: (Number(lastId) + 1).toString(),
      name,
      email,
      phone,
    };
    const newMass = [...parseData, newContact];

    const stringifyContacts = JSON.stringify(newMass);
    await fs.writeFile(contactsPath, stringifyContacts, 'utf8');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
