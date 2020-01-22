import Axios from 'axios';

export default async function uploadImg(files) {
  const prms=[]
 for (let i = 0; i < files.length; i++) {
    const CLOUD_NAME = 'dfdvfunfj';
    const PRESET_NAME = 'zc8aff64';
    const type = files[i].type.split('/')
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type[0]}/upload`;
    const formData = new FormData();
    formData.append('file', files[i])
    formData.append('upload_preset', PRESET_NAME);
    try {
     prms.push(  Axios.post(UPLOAD_URL, formData)
          )
    }
    catch (err) {
        throw err
    }

 }
 const filesData=await Promise.all(prms)
    const urls=filesData.map((file)=>{
        return    file.data.url
    })
    return urls
}