import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {}

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: 'Please complete all required fields before sending.',
      })
    }

    const gmailUser = process.env.GMAIL_USER
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

    if (!gmailUser || !gmailAppPassword) {
      return res.status(500).json({
        message: 'Email service is not configured yet.',
      })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    })

    const mailOptions = {
      from: gmailUser,
      to: 'ariellecharlize26@gmail.com',
      replyTo: email,
      subject: `Portfolio contact: ${subject}`,
      text: [
        `Name: ${name}`,
        `Sender's Email: ${email}`,
        `Subject: ${subject}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <h2>Portfolio Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Sender's Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return res.status(200).json({
      message: 'Email sent successfully.',
    })
  } catch (error) {
    console.error('Contact form email error:', error)
    return res.status(500).json({
      message: 'Your message could not be sent right now. Please try again later.',
    })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
