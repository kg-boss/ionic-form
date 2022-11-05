<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-list lines="full">
          <ion-item button detail="true" router-link="/form">
            <ion-icon :icon="documentTextOutline" slot="start"></ion-icon>
            <ion-label>
              <h3>Formulaire</h3>
              <p>Remplir un formulaire - tester UI &amp; axios API</p>
            </ion-label>
          </ion-item>
          <ion-item button detail="true" router-link="/gallery">
            <ion-icon :icon="imageOutline" slot="start"></ion-icon>
            <ion-label>
              <h3>Gallery</h3>
              <p>Prendre &amp; voir des photos</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { imageOutline, documentTextOutline } from 'ionicons/icons';
import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonLabel,
    IonItem,
    IonList,
    IonToolbar
  },
  data() {
    return {
      documentTextOutline,
      imageOutline
    };
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
