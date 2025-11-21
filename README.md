# 🌟 RV Tracker  
*A lightweight tool designed to help Jehovah’s Witnesses organize, track, and navigate return visits.*

RV Tracker is a simple, offline-friendly web application that allows users to record return visits (RVs), save notes, set deadlines, store precise GPS locations, and navigate directly to a return visit using Google Maps.  
It is fast, clean, responsive, and built with pure **HTML, CSS, and JavaScript**.

> **Disclaimer:**  
> This tool is **not an official application of Jehovah’s Witnesses** or the Watch Tower Bible and Tract Society.  
> It is a personal project built to help Witnesses stay organized during the ministry.

---

## ✨ Features

### ✅ Add New Return Visits  
- Save a person’s name  
- Add notes or details  
- Set a return date/time (deadline)

### ✅ Precise Location Tracking  
- Save your **exact current GPS location** using high-accuracy geolocation  
- Reverse-geocoding converts coordinates into short readable addresses  
- Addresses are automatically cleaned and shortened  

### ✅ Google Maps Navigation  
- Navigate straight to an RV location  
- Automatic origin detection (your current position)  
- Supports coordinate-based navigation or text-based locations  

### ✅ LocalStorage Persistence  
All return visits are saved on your device automatically —  
no sign-in, no server, no internet required (except for navigation + reverse geocoding).

### ✅ Beautiful UI  
- Animated background video  
- Smooth modals  
- Clean typography  
- Responsive on mobile  
- Styled info/disclaimer popup  

### ✅ Countdown Notifications  
- Each RV has a countdown timer  
- Browser-based notifications warn you before the RV deadline  
- Mobile support enabled (with permission)

---

## 📸 Screenshots
*(Add screenshots here if you want — recommended for GitHub)*

---

## 🛠️ Tech Stack
- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **Geolocation API**
- **Google Maps Directions API (URL form)**
- **Nominatim Reverse Geocoding**
- **LocalStorage**

---

## 🚀 How It Works

### 1. Add a Return Visit
Click the **“New RV”** button → fill in:
- Name  
- Notes  
- Deadline  
- (Optional) Save your precise location  

### 2. Save GPS Location
Click **“Set Location”** →  
The app:
- Gets your exact coordinates  
- Shows a loading animation  
- Converts it to a readable address  
- Saves it under that RV card  

### 3. Navigate to a Visit
Every saved RV includes a **Navigate** button.

It automatically sets:
- **origin** → your current location  
- **destination** → saved coordinates or text location  

---

## 📍 Location Format
Long reverse-geocoded strings like:  



Njugu Lane, City Centre sublocation, Starehe location, CBD division, Starehe, Nairobi...


Are automatically shortened to:  

Njugu Lane


For cleaner display and easier navigation.

---

## 🔔 Notifications
The app requests notification permission and triggers alerts shortly before deadlines.

---

## ⚠️ Disclaimer
This project is **not** affiliated with Jehovah’s Witnesses or the Watch Tower Society.  
It is *purely a helpful tool for personal use* in field service.

---

## 📦 Installation
Clone the project:

```sh
git clone https://github.com/Geremi57/rv-tracker.git

