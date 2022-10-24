# Ionic 6 / VueJS - demo project
---
This project tests the behaviour of *VueJS basics* with *Ionic 6*

## UI Components
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
> The checkbox array behaviour is not supported in ionic! So instead of putting the same `v-model` for all checkbox, We had to merge the *label* and the *v-model* for each one.
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
  let selected = checkboxValues.filter(checkbox => checkbox.selected).map(checkbox => checkbox.val)
```
