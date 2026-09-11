## 📱 APK বিল্ড গাইড - All In One Calculator

### ✅ স্বয়ংক্রিয় বিল্ড (GitHub Actions)

এখন আপনার প্রতিটি commit এ স্বয়ংক্রিয়ভাবে APK তৈরি হবে।

#### Step 1: Signing Key তৈরি করুন
```bash
# এটি একবার করুন
keytool -genkey -v -keystore release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias calculator
```

#### Step 2: GitHub Secrets যোগ করুন

GitHub Repository Settings → Secrets and variables → Actions এ এই secrets যোগ করুন:

1. **SIGNING_KEY**: 
   ```bash
   base64 -i release.jks | tr -d '\n' | xclip -selection clipboard
   # ফাইলের content copy করুন
   ```

2. **KEY_ALIAS**: `calculator` (আপনার keytool এ দেওয়া নাম)

3. **KEY_STORE_PASSWORD**: (আপনার password)

4. **KEY_PASSWORD**: (আপনার key password)

#### Step 3: APK তৈরি হোক

এখন যখন আপনি main branch এ push করবেন:
- ✅ Web app বিল্ড হবে
- ✅ APK তৈরি হবে
- ✅ স্বয়ংক্রিয়ভাবে Release তৈরি হবে

---

### 📥 APK ডাউনলোড করুন

1. যান: **https://github.com/dakrish960-wq/All-In-One-Calculator/releases**
2. সর্বশেষ রিলিজ খুলুন
3. APK ফাইল ডাউনলোড করুন
4. APKPure এ আপলোড করুন

---

### 🔧 ম্যানুয়াল বিল্ড (Local)

যদি GitHub Actions কাজ না করে:

```bash
# 1. Dependencies ইনস্টল করুন
npm install

# 2. Web app বিল্ড করুন
npm run build

# 3. Capacitor সিঙ্ক করুন
npx cap sync android

# 4. Android Studio খুলুন
npx cap open android

# 5. Android Studio এ: Build → Build Bundle(s) / APK(s) → Build APK(s)
```

---

### 🚀 মাল্টিপল রিলিজ তৈরি করুন

প্রতিটি নতুন version এর জন্য tag তৈরি করুন:

```bash
git tag -a v1.1.0 -m "Version 1.1.0 - Improved UI"
git push origin v1.1.0
```

তাহলে স্বয়ংক্রিয়ভাবে নতুন রিলিজ হবে।

---

### 📝 Version আপডেট করুন

`package.json` এ version আপডেট করুন:
```json
{
  "version": "1.0.1"
}
```

এবং `capacitor.config.ts` তেও:
```typescript
versionCode: 2,  // বাড়ান
```

---

### ⚠️ সাধারণ সমস্যা

#### GitHub Actions fail হচ্ছে?
- Check: secrets সঠিক আছে কি?
- Check: Java version 17 আছে কি?
- Check: Android SDK configured আছে কি?

#### APK signed না হচ্ছে?
- Secrets পুনরায় check করুন
- `release.jks` file সঠিক আছে কি check করুন

#### APK তৈরি হচ্ছে না?
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

---

### 📊 বর্তমান স্ট্যাটাস

- ✅ Capacitor configured
- ✅ GitHub Actions setup
- ✅ APK building ready
- ⏳ Secrets setup pending (আপনার side থেকে)

---

**পরবর্তী Step:** GitHub Repository Settings এ Secrets যোগ করুন! 🔑
