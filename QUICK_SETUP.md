# Quick Setup Guide - Get Your Contact Form Working in 5 Minutes

## Follow These Steps:

### Step 1: Create EmailJS Account (2 minutes)
1. Go to: https://www.emailjs.com/
2. Click **"Sign Up"** button (top right)
3. Sign up with your email (use: **ekhlasabdulmelik@gmail.com**)
4. Verify your email address when you receive the verification email
5. Log in to the dashboard: https://dashboard.emailjs.com/

---

### Step 2: Add Email Service (1 minute)
1. In the EmailJS dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"** button
3. Select **"Gmail"** (or your email provider)
4. Follow the connection steps (you may need to allow access)
5. After it connects, you'll see a **Service ID** (looks like: `service_xxxxxxxxx`)
   - **COPY THIS SERVICE ID** - You'll need it in Step 5

---

### Step 3: Create Email Template (2 minutes)
1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"** button
3. Fill in the template like this:

   **Template Name:** `Portfolio Contact Form`
   
   **Service:** Select the service you just created
   
   **To Email:** `ekhlasabdulmelik@gmail.com`
   
   **From Name:** `{{from_name}}`
   
   **From Email:** `{{from_email}}`
   
   **Subject:** `New Contact Form Message from {{from_name}}`
   
   **Content (Body):**
   ```
   You have a new message from your portfolio contact form.
   
   Name: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```

4. Click **"Save"** button
5. You'll see a **Template ID** (looks like: `template_xxxxxxxxx`)
   - **COPY THIS TEMPLATE ID** - You'll need it in Step 5

---

### Step 4: Get Public Key (30 seconds)
1. Click **"Account"** → **"General"** (or click "Integration" in left sidebar)
2. Find **"Public Key"** section
3. You'll see a long string (looks like: `abc123xyz456...`)
   - **COPY THIS PUBLIC KEY** - You'll need it in Step 5

---

### Step 5: Update Your Code (30 seconds)
1. Open `js/custom.js` file in your project
2. Find these 3 lines (around line 104-106):
   ```javascript
   const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
   const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
   const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
   ```

3. Replace them with your actual values:
   ```javascript
   const EMAILJS_PUBLIC_KEY = "paste-your-public-key-here";
   const EMAILJS_SERVICE_ID = "service_xxxxxxxxx"; // paste your service ID
   const EMAILJS_TEMPLATE_ID = "template_xxxxxxxxx"; // paste your template ID
   ```

4. **Save the file**

---

### Step 6: Test It!
1. Open your website (refresh the page if it's already open)
2. Go to the Contact section
3. Fill out the form:
   - Name: Test
   - Email: test@example.com
   - Message: This is a test
4. Click **"Send"**
5. You should see: **"Thank you! Your message has been sent successfully..."**
6. Check your email inbox (ekhlasabdulmelik@gmail.com) for the message!

---

## ✅ That's It!

Your contact form is now fully working! Anyone who fills it out will have their message sent directly to your email.

## ❓ Having Issues?

**Problem:** Still seeing "Contact form is not configured yet"
- **Solution:** Make sure you replaced ALL THREE values in `js/custom.js` and saved the file

**Problem:** Getting an error when clicking Send
- **Solution:** Check the browser console (Press F12, go to Console tab) and look for error messages

**Problem:** Not receiving emails
- **Solution:** 
  - Check your spam/junk folder
  - Make sure you verified your EmailJS account email
  - Check the EmailJS dashboard for any error messages

**Need Help?**
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Dashboard: https://dashboard.emailjs.com/

---

## What You Need to Copy:

Make sure you have these 3 values from EmailJS:
1. ✅ **Public Key** (from Account → General)
2. ✅ **Service ID** (from Email Services, looks like `service_xxxxx`)
3. ✅ **Template ID** (from Email Templates, looks like `template_xxxxx`)

Then paste them into `js/custom.js` file!

