# Ionic 6 / VueJS - demo project
---
This project tests the behaviour of *VueJS basics* with *Ionic 6*.

## Implementation

> If you are only interested in `src` directory please switch to `main` branch 

### Loading Project

```sh
git clone -b master https://github.com/kg-boss/ionic-form.git
cd NAME_OF_CLONED_REPO
npm install
# (optional) in case json-server is not installed and you wanna test the APIs
npm install -g json-server
```

### Necessary Changes
In `src/config/urls.ts` please change the `YOUR_IP_ADDRESS` to your actual IP address to test APIs. Refer to `2- Usin API # Testing` for more informations
```JS
{
    CIVILITIES_ALL_API  : "http://YOUR_PC_IP_ADDRESS:3000/civilites",
    SPECIALITIES_ALL_API: "http://YOUR_PC_IP_ADDRESS:3000/specialites",
    SUBJECTS_ALL_API    : "http://YOUR_PC_IP_ADDRESS:3000/subjects"
}
```
In `src/config/one-signal.ts` please change the `YOUR_ONESIGNAL_APP_ID` to your OneSignal app ID to use Notifcations. Refer to `4- Notifications` for more informations
```JS
OneSignal.setAppId("YOUR_ONESIGNAL_APP_ID");
```
> *NOTE*: Running App on browser WILL FAIL as long as OneSignal is configured. To test other functionalities locally please comment out the `OneSignalInit()` function call in `src/App.vue # line-19` 

### Running
*Required to run APIs*
```sh
json-server --host YOUR_IP_ADDRESS public/db.json
```

*Running in Browser (NOTIFICATIONS DISABLED)*
```sh
ionic serve
```

*Building and running in Android Studio Emulator (Recommended)*
```sh
ionic build
npx cap copy & npx cap sync
npx cap open android 
```
> **IMPORTANT** some changes are required as mentioned in `3- Deployment` further down!

---
## Additional Info
There are some *IMPORTANT TIPS & NOTES* that you definitely wanna read in this *README.md* file.
This files covers
1. UI Components
2. Using API
3. Deployment
4. Notifications

---

## 1 - UI Components
This project covers the use of the following components
+ [IonButton](https://ionicframework.com/docs/api/button)
+ [IonInput](https://ionicframework.com/docs/api/input)
+ [IonLabel](https://ionicframework.com/docs/api/label)
+ [IonItem](https://ionicframework.com/docs/api/item)
+ [IonList](https://ionicframework.com/docs/api/list)
+ [IonSelect](https://ionicframework.com/docs/api/select)
+ [IonCheckbox](https://ionicframework.com/docs/api/checkbox)
+ [IonRadio](https://ionicframework.com/docs/api/radio)
+ [IonRadioGroup](https://ionicframework.com/docs/api/radio-group)

#### NOTE:
> The checkbox array behaviour is not supported in Ionic! So instead of putting the same `v-model` for all checkbox, We had to merge the *value* and the *v-model* for each one.
#### Example

###### In VueJS
In the script we could put
```JS
...
data() {
  ...
  checkboxValues = ['item1', 'item2', 'item3'],
  selected = [],
  ...
}
...
```
In template we could put
```HTML
<ion-item v-for="(val, index) in checkboxValues" :key="index">
  <ion-checkbox slot="start" :value="val" v-model="selected"></ion-checkbox>
  <ion-label>{{val}}</ion-label>
</ion-item>
```
---
###### In Ionic
In the script we should put
```JS
...
data() {
  ...
  checkboxValues = [
    {
      val: 'item1',
      selected: false
    },
    {
      val: 'item2',
      selected: false
    },
    {
      val: 'item3',
      selected: false
    }
  ],
  ...
}
...
```
In template we should put
```HTML
<ion-item v-for="(checkbox, index) in checkboxValues" :key="index">
  <ion-checkbox slot="start" :value="checkbox.val" v-model="checkbox.selected"></ion-checkbox>
  <ion-label>{{checkbox.val}}</ion-label>
</ion-item>
```
To get the an array as in VueJS we could simply use TypeScript array functions like this
```JS
 /* 
  * checkboxValues is an Array of Objects as declared in data()
  * filter(checkbox => checkbox.selected) this function filters the first array leaving only the objects with attribute selected set to true
  * Example: if we only select the second and last checkbox the result is like the following: [{ val: 'item2', selected: true }, { val: 'item3', selected: true }]
  * map(checkbox => checkbox.val) this function changes the filtered replacing the object by its val, 
  * Example: the object { val: 'item1', selected: false } becomes the string 'item1' 
  */
  let selected = checkboxValues.filter(checkbox => checkbox.selected).map(checkbox => checkbox.val);
```
---
## 2 - Using APIs
The Library we're going to use for this job is [Vue-Axios](https://www.npmjs.com/package/vue-axios)
###### Downloding with npm
```sh
npm install --save axios vue-axios
```
###### Adding axios to project 
In the file `main.ts`
```js
...
// Add these imports
import VueAxios from 'vue-axios';
import axios from 'axios';
...

...
const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(VueAxios, axios); // This line is added
...
```
###### Usage in Vue
```JS
this.$http.get(api).then((response) => {
  console.log(response.data)
})
```
###### Testing
For this purpose, we'll use [json-server](https://www.npmjs.com/package/json-server) to simulate an actual server.

*Downloading Json-Server with npm*
```SH
npm install -g json-server
```
*Running Json-Server*
```SH
json-server --host YOUR_IP_ADDRESS YOUR_JSON_FILE
# example json-server --host 192.168.1.10 public/db.json
```
---
## 3 - Deployment
For this project we'll focus on deploying to Android only!

###### Adding Android to Project
```SH
npx cap add android
```
###### Building
```SH
ionic build
npx cap copy & npx cap sync
```
###### Open In Android Studio
```SH
npx cap open android
```
### NOTE
###### *Important* in newer Android Versions
Add the following *line* in `AndroidManifest.xml` file
```XML
...
<application
             ...
             android:usesCleartextTraffic="true"
             ...
             />
...
```
---

## 4 - Notifications
For this project we'll use [OneSignal](https://documentation.onesignal.com/docs/ionic-sdk-setup) to Push our Notifications
###### Downloding with npm
```SH
npm install onesignal-cordova-plugin
npx cap sync
```

###### Adding OneSignal to Project
For code organization purpose We chose to put the `OneSignalInit` function in a separate file. You can find it in `src/config/one-signal.ts`
##### File Content
```JS
import OneSignal from 'onesignal-cordova-plugin';

// Call this function when your app starts
export function OneSignalInit(): void {
  // Uncomment to set OneSignal device logging to VERBOSE  
  // OneSignal.setLogLevel(6, 0);

  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId("YOUR_ONESIGNAL_APP_ID");
  OneSignal.setNotificationOpenedHandler(function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });

  // Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
  OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
  });
}
```
##### Usage
In `src/App.vue` file
```HTML
<script lang="ts">
...
import { OneSignalInit } from './config/one-signal';
...
  
export default defineComponent({
  ...
  created() {
    OneSignalInit();
  }
  ...
});
</script>
```
##### Backend
please refer to the *Documentation Page* following this [Link](https://documentation.onesignal.com/docs/ionic-sdk-setup)
