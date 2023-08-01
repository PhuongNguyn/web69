const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'dhd2aqncc', 
  api_key: '949132721571138', 
  api_secret: 'JiBgdrE87Y83CI_omUjrE-ddA38' 
});

const uploadImage = async (file) => {
    const image = await cloudinary.uploader.upload(
      file,
      (result) => result
    );
    return image;
  };

module.exports = {
    uploadImage
}