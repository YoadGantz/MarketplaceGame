import Axios from 'axios';

export default async function uploadImg(ev) {
    const CLOUD_NAME = 'dfdvfunfj';
    const PRESET_NAME = 'zc8aff64';
    const type = ev.target.files[0].type.split('/')
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type[0]}/upload`;
    const formData = new FormData();
    formData.append('file', ev.target.files[0]);
    formData.append('upload_preset', PRESET_NAME);
    try {
        const url = await Axios.post(UPLOAD_URL, formData)
        return await url.data
    }
    catch (err) {
        throw err
    }
}