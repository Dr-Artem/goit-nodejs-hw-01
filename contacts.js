const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db/contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        console.table(JSON.parse(data));
    } catch (err) {
        console.log(err);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        const dataId = JSON.parse(data).filter((contact) => {
            return contact.id == contactId;
        });
        console.table(dataId);
    } catch (err) {
        console.log(err);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        const dataContactsList = JSON.parse(data).filter((contact) => {
            return contact.id != contactId;
        });
        fs.writeFile(contactsPath, JSON.stringify(dataContactsList, null, 2));
        console.table(dataContactsList);
    } catch (err) {
        console.log(err);
    }
}

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        const dataContactsList = JSON.parse(data);

        const contact = {
            id: `${dataContactsList.length + 1}`,
            name,
            email,
            phone,
        };

        dataContactsList.push(contact);
        await fs.writeFile(
            contactsPath,
            JSON.stringify(dataContactsList, null, 2)
        );
        console.table(dataContactsList);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
