import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Users from "@/components/Users";

export const metadata: Metadata = {
  title: "Cirebon visual data",
  description: "Website resmi Diskominfo Kabupaten Cirebon",
};

const UsersPage = () => {
  return (
    <DefaultLayout>

      <div className="flex flex-col gap-10">
        <Users />
      </div>
    </DefaultLayout>
  );
};

export default UsersPage





// import React, { useState } from 'react';
// import { ImageCrop } from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import Dropzone from 'react-dropzone';

// const CropImage = () => {
//   const [image, setImage] = useState(null);
//   const [crop, setCrop] = useState({ aspect: 1 / 1 });

//   const handleDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleCrop = (croppedImage) => {
//     // Kirim gambar yang sudah di-crop ke API
//     console.log('Gambar yang akan dikirim:', croppedImage);
//   };

//   return (
//     <div>
//       <Dropzone onDrop={handleDrop} accept="image/*" multiple={false}>
//         {({ getRootProps, getInputProps }) => (
//           <section>
//             <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
//               <input {...getInputProps()} />
//               <p>Drag 'n' drop gambar di sini, atau klik untuk memilih gambar</p>
//             </div>
//           </section>
//         )}
//       </Dropzone>
//       {image && (
//         <div style={{ marginTop: '20px' }}>
//           <ReactCrop src={image} crop={crop} onChange={setCrop} />
//           <button onClick={() => handleCrop(image)}>Kirim ke API</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CropImage;

