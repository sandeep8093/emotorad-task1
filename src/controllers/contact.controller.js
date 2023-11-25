const Contact = require('../models/Contact');

const identifyContact =  async (req, res) => {
    const { email, phoneNumber } = req.body;
  
    try {
      // Search for existing contacts
      let existingContact = await Contact.findOne({ $and: [{ email }, { phoneNumber },{linkPrecedence:"primary"}] });
  let primarydata,secondarydata;
      if (!existingContact) {
        // If no existing contact, create a new "primary" contact
        newPrimaryContact = await Contact.create({
          email,
          phoneNumber,
          linkPrecedence: 'primary',
        });
        primarydata={
            primaryContactId: newPrimaryContact._id,
            email: newPrimaryContact.email,
            phoneNumber: newPrimaryContact.phoneNumber,
            linkPrecedence: "primary",
            secondaryContactIds:[],
          }
        secondarydata = {}
      } else {
        // If existing contact, create a new "secondary" contact
        const newSecondaryContact = await Contact.create({
          email,
          phoneNumber,
          linkedId: existingContact._id,
          linkPrecedence: 'secondary',
        });
  
        // Update the existing contact with the new contact's ID
        existingContact.linkedId.push(newSecondaryContact._id);
        existingContact.linkPrecedence = 'primary';
        existingContact.updatedAt = Date.now();
        await existingContact.save();
        primarydata={
            primaryContactId: existingContact._id,
            emails: [existingContact.email],
            phoneNumbers: [existingContact.phoneNumber],
            linkPrecedence: "primary",
            secondaryContactIds: existingContact.linkedId ? [existingContact.linkedId] : [],
          }
        secondarydata = {
            secondaryContactId: newSecondaryContact._id,
            email: newSecondaryContact.email,
            phoneNumber: newSecondaryContact.phoneNumber,
            linkPrecedence: "secondary",
        }
      }
      
      res.status(200).json({
        primarydata,secondarydata
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports ={
    identifyContact
  }