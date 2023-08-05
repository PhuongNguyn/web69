const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'dhd2aqncc', 
  api_key: '949132721571138', 
  api_secret: 'JiBgdrE87Y83CI_omUjrE-ddA38' 
});

const uploadImage = async (file) => {
  const newFileName = `${new Date().getTime()}-${file.name}`
   return new Promise((resolve, reject)=>{
    cloudinary.uploader.upload_stream({resource_type: "image", filename_override: `${newFileName}`, use_filename: true, unique_filename: false}, (err) => reject(err)).end(file?.data, () => resolve(newFileName));
   })
    
  };

module.exports = {
    uploadImage
}