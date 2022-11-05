//import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

export function useCamera() {
  const dataUrlToBlob = (dataUrl:string) => {
    // convert base64 to raw binary data held in a string
    const byteString = atob(dataUrl.split(',')[1]); 

    // separate out the mime component
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length); 
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], {type: mimeString});
  }

  const takePhoto = async (callback: (file: File) => void) => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });

    if(!photo.dataUrl)
      return;
      
    /* 
     * Create a file with photo data
     * file name is not important so we'll stick with 'photo.jpeg'
     * MIME type: 'image/jpeg'
     * lastModified: now
     */
    const photoFile = new File([dataUrlToBlob(photo.dataUrl), new Uint16Array([33])], 'photo.jpeg', {type: 'image/jpeg', lastModified: new Date().getTime()});

    callback(photoFile);

  };


  return {
    takePhoto,
  };
}