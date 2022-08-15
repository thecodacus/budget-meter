import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig | any = {
  appId: 'com.codacus.budgetmeter',
  appName: 'Budget Meter',
  webDir: 'dist',
  bundledWebRuntime: false,
  clientId: "1056763945939-euvn7639jr03uufc8akgar0gagn0jcm1.apps.googleusercontent.com",
  plugins: {
    GoogleAuth: {
      scopes: [
        "profile",
        "email"
      ],
      serverClientId: "1056763945939-euvn7639jr03uufc8akgar0gagn0jcm1.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
