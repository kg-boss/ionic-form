<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title>Bonjour</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-item>
          <ion-label>Bonjour {{civility}} {{this.firstname}} {{lastname}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Spécialité : {{speciality}}</ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-label>Matières: {{subjects.join(', ')}}</ion-label>
        </ion-item>        
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonButtons, IonBackButton, IonPage, IonTitle, IonToolbar, IonLabel, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloPage',
  components: {
    IonContent,
    IonHeader,
    IonButtons,
    IonBackButton,
    IonPage,
    IonTitle,
    IonLabel,
    IonItem,
    IonToolbar
  },
  props: {
    civility: String, 
    firstname: String,
    lastname: String,
    speciality: String,
    subjects: Array
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
