# All In One Calculator - APK Build Guide for Multiple App Stores

**App Details:**
- **App Name:** All In One Calculator
- **Package Name:** com.calculator.allinone
- **Version:** 1.0.0
- **Start.io Ad ID:** 208473910
- **Privacy Policy:** https://raw.githubusercontent.com/dakrish960-wq/All-In-One-Calculator/main/PRIVACY_POLICY.md

---

## 📋 Prerequisites

আপনার কম্পিউটারে এগুলো ইনস্টল করতে হবে:

```bash
# Required:
- Node.js (v18+)
- npm (v9+)
- Java Development Kit (JDK 11+)
- Android Studio
- Gradle
```

---

## 🚀 Step 1: Local Setup

### 1.1 Repository ক্লোন করুন
```bash
git clone https://github.com/dakrish960-wq/All-In-One-Calculator.git
cd All-In-One-Calculator
```

### 1.2 Dependencies ইনস্টল করুন
```bash
npm install
```

### 1.3 Web Build করুন
```bash
npm run build
```

---

## 📱 Step 2: Capacitor Setup (Android এর জন্য)

### 2.1 Capacitor Initialize করুন (প্রথমবার)
```bash
npm run cap:init
```

যখন prompt আসবে:
- **App name:** All In One Calculator
- **App ID:** com.calculator.allinone
- **Directory:** dist

### 2.2 Android Platform যোগ করুন
```bash
npm run cap:android
```

এটি `android/` ফোল্ডার তৈরি করবে।

### 2.3 Changes Sync করুন
```bash
npx cap sync android
```

---

## 🔑 Step 3: Signing Key তৈরি করুন (Samsung, Huawei এর জন্য প্রয়োজন)

### 3.1 Keystore তৈরি করুন
```bash
keytool -genkey -v -keystore android/app/release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias release \
  -storepass calculator123 \
  -keypass calculator123
```

**যখন জিজ্ঞাসা করবে:**
```
What is your first and last name? → Your Name
What is the name of your organizational unit? → Mobile Dev
What is the name of your organization? → Your Company
What is the name of your City or Locality? → Your City
What is the name of your State or Province? → Your State
What is the two-letter country code for this unit? → BD
Is CN=Your Name correct? → yes
```

### 3.2 Keystore Details সংরক্ষণ করুন (গুরুত্বপূর্ণ!)
```
Keystore Path: android/app/release-key.jks
Keystore Password: calculator123
Key Alias: release
Key Password: calculator123
```

---

## 🏗️ Step 4: APK বিল্ড করুন

### 4.1 Android Studio দিয়ে (সহজ উপায়)

```bash
# Android Studio খুলুন
android/
```

**বা কমান্ড দিয়ে:**
```bash
cd android
./gradlew bundleRelease
```

### 4.2 Release APK তৈরি হবে এখানে:
```
android/app/build/outputs/bundle/release/app-release.aab
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📦 Step 5: প্রতিটি Store এর জন্য Upload করুন

### **Samsung Galaxy Store**
1. https://seller.samsungapps.com/ এ যান
2. Account তৈরি করুন
3. **App Registration** → Upload APK/AAB
4. **Package Name:** com.calculator.allinone
5. **Version:** 1.0.0
6. **Privacy Policy:** https://raw.githubusercontent.com/dakrish960-wq/All-In-One-Calculator/main/PRIVACY_POLICY.md
7. Submit করুন

### **Huawei AppGallery**
1. https://developer.huawei.com/consumer/cn/appgallery_publish/ এ যান
2. Account তৈরি করুন
3. Create App → Upload APK
4. Same details দিন

### **APKPure**
1. https://apkpure.com/submit-app এ যান
2. APK Upload করুন
3. Screenshots যোগ করুন
4. Description দিন

### **Amazon Appstore**
1. https://developer.amazon.com/apps-and-games/ এ যান
2. My Apps → Add New App
3. Upload APK

### **F-Droid** (Open Source)
1. https://f-droid.org/en/docs/Adding_Apps_for_Inclusion/ এ যান
2. GitHub source link দিন

---

## 📱 App Store Information

### Short Description
```
All-in-one calculator app with standard, age, gold rate, weight, 
currency converter and more. Fast, offline & user-friendly!
```

### Long Description
```
Welcome to All In One Calculator - Your Ultimate Calculation Companion!

🎯 Features:
✨ Standard Calculator - Basic arithmetic operations
🎂 Age Calculator - Calculate exact age with zodiac sign
💰 Gold Rate Calculator - Calculate gold price by weight & karat
📊 Viral Calculator - Analyze video engagement on social media
⚖️ Weight Calculator - BMI calculator, ideal weight & calorie needs
💱 Currency Converter - Real-time multi-currency conversion
💕 Love Calculator - Compatibility checker for couples

🌟 Why Choose Us?
✅ 100% Offline - No internet required
✅ Fast & Smooth - Lightning-fast calculations
✅ Beautiful UI - Modern & intuitive interface
🌙 Dark Mode - Easy on the eyes
🌐 Multi-Language - Support for Bengali & English
📱 Responsive - Works on all devices

🎁 Free Download - No ads, no payments, pure functionality!

Download now and enjoy unlimited calculations!
```

### Privacy Policy
```
https://raw.githubusercontent.com/dakrish960-wq/All-In-One-Calculator/main/PRIVACY_POLICY.md
```

### Screenshots (Required)
- App icons
- Calculator screenshots
- Feature demonstrations

---

## 🔧 Troubleshooting

### Build Failed?
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Try again
npm run build
npm run cap:sync android
```

### APK too large?
```bash
# Enable minification
cd android
./gradlew bundleRelease --minify
```

### Permission Issues?
```bash
# Make gradle executable
chmod +x android/gradlew
```

---

## 📊 Build Output

**Successful build এর পর আপনি পাবেন:**

```
✅ android/app/build/outputs/bundle/release/app-release.aab (3-5 MB)
✅ android/app/build/outputs/apk/release/app-release.apk (2-4 MB)
✅ Signed & Ready for upload
```

---

## 📝 Upload Checklist

প্রতিটি store এ upload করার আগে:

- [ ] APK/AAB file সিগন্ড
- [ ] Package Name: com.calculator.allinone
- [ ] Version: 1.0.0
- [ ] Privacy Policy URL যোগ করেছেন
- [ ] Screenshots (3-5) যোগ করেছেন
- [ ] Description & short description সঠিক
- [ ] App Icon (512x512) যোগ করেছেন
- [ ] Category সিলেক্ট করেছেন (Productivity/Tools)
- [ ] Start.io Ad ID verified: 208473910

---

## 🎉 আপনার App এখন সব Store এ Live!

**সব Store এ আপনার App পাবেন:**
- ✅ Samsung Galaxy Store
- ✅ Huawei AppGallery
- ✅ APKPure
- ✅ Amazon Appstore
- ✅ F-Droid
- ✅ এবং আরও অনেক জায়গা!

---

## 📞 Support

যদি কোনো সমস্যা হয়:
- Email: dakrish960@gmail.com
- GitHub: https://github.com/dakrish960-wq/All-In-One-Calculator

---

**Happy Building! 🚀**
