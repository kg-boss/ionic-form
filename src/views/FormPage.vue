<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Formulaire</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-item>
          <ion-label>Civilité</ion-label>
          <ion-select interface="action-sheet" placeholder="Choisir Civilité" v-model="civility">
            <ion-select-option v-for="(option, index) in civility_options" :value="option" :key="index">{{option}}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Nom</ion-label>
          <ion-input type="text" placeholder="Entrez un nom..." v-model="lastname"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Prénom</ion-label>
          <ion-input placeholder="Entrez un prénom..." v-model="firstname"></ion-input>
        </ion-item>

        <ion-item lines="full">
          <ion-radio-group v-model="speciality">
            <ion-list-header>
              <ion-label>Spécialité</ion-label>
            </ion-list-header>
            <ion-item lines="none" v-for="(option, index) in speciality_options" :key="index">
              <ion-label>{{option}}</ion-label>
              <ion-radio slot="start" color="primary" :value="option"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-item>

        <ion-item lines="none">
          <ion-list>
            <ion-list-header>
              <ion-label>Matières</ion-label>
            </ion-list-header>
            <ion-item lines="none" v-for="(subject, index) in subjects" :key="index">
              <ion-checkbox slot="start" :value="subject.label" v-model="subject.checked"></ion-checkbox>
              <ion-label>{{subject.label}}</ion-label>
            </ion-item>
          </ion-list>
        </ion-item>

        <ion-button :router-link="{name:'Hello', params: {civility: civility, firstname: firstname, lastname: lastname, speciality: speciality, subjects: subjects.filter(s => s.checked).map(s => s.label) } }" expand="block" v-if="civility && firstname && lastname && speciality && subjects.filter(s => s.checked).length > 0">Confirmer</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonBackButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonLabel, IonItem, IonList, IonButton, IonSelect, IonCheckbox, IonRadio, IonRadioGroup } from '@ionic/vue';
import { defineComponent } from 'vue';
import Civility from '../models/civility';
import Speciality from '../models/speciality';
import Subject from '../models/subject';

export default defineComponent({
  name: 'FormPage',
  components: {
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonButton,
    IonToolbar,
    IonSelect,
    IonCheckbox,
    IonRadio, 
    IonRadioGroup
  },
  data() {

    return { 
      civility: '',
      firstname: '',  
      lastname: '',
      speciality: '',
      subjects: [],

      civility_options: [],
      speciality_options: [],
      
    };
  },
  methods: {
    load() {
      this.loadCivilityOptions();
      this.loadSpecialityOptions();
      this.loadSubjectOptions();
    },

    loadCivilityOptions  () {Civility  .all((civilities ) => {this.civility_options   = civilities ;});},
    loadSpecialityOptions() {Speciality.all((specialites) => {this.speciality_options = specialites;});},
    loadSubjectOptions   () {Subject   .all(( subjects  ) => {this.subjects = subjects.map(subject => {return ({"label": subject, "checked": false}) as never});});}

  },
  mounted() {
    this.load();
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
/*   position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%); */
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
