# How to Get Google Client ID and Secret for Supabase

Follow these steps to generate the keys needed for Google Login.

### Step 1: Create a Project on Google Cloud
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the dropdown next to the Google Cloud logo (top left) and click **"New Project"**.
3. Name it `ScriptGo` (or anything you like) and click **Create**.
4. Select the project you just created.

### Step 2: Configure Consent Screen
1. In the left menu, go to **APIs & Services** > **OAuth consent screen**.
2. Select **External** and play **Create**.
3. Fill in the required fields:
   - **App Name**: `ScriptGo`
   - **User Support Email**: Select your email.
   - **Developer Contact Information**: Enter your email again.
4. Click **Save and Continue** (you can skip "Scopes" and "Test Users" for now by just clicking Save and Continue).
5. On the Summary page, click **Back to Dashboard**.

### Step 3: Create Credentials
1. In the left menu, click **Credentials**.
2. Click **+ CREATE CREDENTIALS** (at the top) and select **OAuth client ID**.
3. For **Application type**, select **Web application**.
4. Name it `Supabase Login`.
5. **CRITICAL STEP:** Under **Authorized redirect URIs**, click **ADD URI**.
6. Paste this EXACT URL (this is your Supabase Callback link):
   ```
   https://jnoxfswftcbaihqlkzzc.supabase.co/auth/v1/callback
   ```
   *(Note: This URL allows Google to send the user back to Supabase safely).*
7. Click **Create**.

### Step 4: Copy Keys to Supabase
1. A popup will appear with your **Client ID** and **Client Secret**.
2. **Copy the Client ID.**
3. Go to your [Supabase Dashboard -> Auth -> Providers -> Google](https://supabase.com/dashboard/project/jnoxfswftcbaihqlkzzc/auth/providers).
4. Paste the **Client ID**.
5. Go back to Google tab, **Copy the Client Secret**.
6. Paste it into **Client Secret** in Supabase.
7. Toggle **Enable Google** to ON.
8. Click **Save**.

---
**Done!** Now try clicking the Google button on your website.
