import ContactUs from '../models/ContactUs.js';

const submitContactForm = async (req, res) => {
  const { name, landingNo,mobile,email,extension, comment } = req.body;

  try {
    const newContact = new ContactUs({ name, landingNo,mobile,email,extension, comment });
    await newContact.save();

    res.status(201).json({ message: 'Contact saved successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default { submitContactForm };
