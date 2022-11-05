<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Gallery</ion-title>
        <ion-progress-bar :value="uploading" v-if="uploading !== -1"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-grid>
          <ion-row v-for="(row, index) in photos" :key="index">
            <ion-col v-for="(col, i) in row" :key="i"><ion-img v-if="col" :src="col" :alt="col.split('/').reverse()[0]"></ion-img></ion-col>
          </ion-row>
        </ion-grid>


        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button @click="uploadPhoto()" :disabled="uploading !== -1">
            <ion-icon :icon="camera"></ion-icon>
          </ion-fab-button>
        </ion-fab>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { camera, trash, close } from 'ionicons/icons';
import { alertController , IonButtons, IonBackButton, IonContent, IonFab, IonFabButton, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonImg, IonProgressBar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useCamera } from '../composables/useCamera';
import UrlResolver from '../config/urls';

export default defineComponent({
  name: 'GalleryPage',
  components: {
    IonButtons,
    IonBackButton,
    IonContent,
    IonFab, 
    IonFabButton, 
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCol, IonGrid, IonRow, IonImg, IonProgressBar 
  },
  data() {

    const { takePhoto } = useCamera();

    const showAlert = async (message:string) => {
      const alert = await alertController.create({
        header: 'Alert',
        subHeader: 'Erreur lors de chargement',
        message: message,
        buttons: ['OK'],
      });

      await alert.present();
    };

    return { 
      photos: [],
      uploading: -1,

      showAlert,

      takePhoto,
      camera,
      trash,
      close,
    };
  },
  methods: {

    loadPhotos () {
      this.$http.get(UrlResolver.CAMERA_RESOURCE_CRUD_API).then((response) => {
        const columns = 3;

        let array = response.data.map((link:string) => UrlResolver.BASE_URL + link);
        let photos = [];

        // break the array into rows;
        for (let i = 0; i < array.length; i += columns) {
          let row = array.slice(i, i + columns);

          // round-up row length to fill all columns (will affect the last iteration only)
          while (row.length % columns !== 0)
            row = [...row, null];

          photos.push(row);
        }

        this.photos = (photos) as never[];
      });
    },

    uploadPhoto () {
      this.takePhoto((photo:File) => {
        
        let formData = new FormData();
        formData.append("photo", photo);

        this.uploading = 0;
        const onUploadProgress = (event:any) => {
          let loaded = 0, total = 1;
          if (event.loaded && Number.isInteger(event.loaded))
            loaded = event.loaded;
          if (event.total && Number.isInteger(event.total) && event.total != 0)
            total = event.total;
            this.uploading = loaded / total;
        };

        this.$http.post(UrlResolver.CAMERA_RESOURCE_CRUD_API, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress
        }).then((response) => {
          if (response.data.failed)
            this.showAlert(response.data.message);
          else
            this.loadPhotos();

          this.uploading = -1;
        });
      });
    }
  },

  mounted() {
    this.loadPhotos();
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

ion-col ion-img {
  aspect-ratio: 1/1;
  width: 100%;
  height: 100%;
}
</style>
