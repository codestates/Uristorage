import React from "react";
import AWS from "aws-sdk";
import '../Pages/image.css'

function ImageUpload({ uploadImage, handleFileInput }) {
  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:86087323-20b2-4907-8a47-13b9522a678f", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  //   const [uploadImage, setUploadImage] = useState(null);

  //   const handleFileInput = (e) => {
  //     const file = e.target.files[0];
  //     if (!file) {
  //       return setUploadImage(null);
  //     }
  //     const upload = new AWS.S3.ManagedUpload({
  //       params: {
  //         Bucket: "uristorageimage", // 업로드할 대상 버킷명
  //         Key: file.name,
  //         Body: file, // 업로드할 파일 객체
  //       },
  //     });

  //     const promise = upload.promise();
  //     promise.then(
  //       function (data) {
  //         setUploadImage(data.Location);
  //         setWordcreate({ ...Wordcreate, image: data.Location });
  //       },
  //       function (err) {
  //         return alert("오류가 발생했습니다: ", err.message);
  //       }
  //     );
  //   };

  return (
    <div className="Content_Image">
      <input className="image-upload" type="file" accept="image/*" onChange={handleFileInput} />
      {uploadImage ? <img width="250" height="150" className="fileView" src={uploadImage} alt="preview-img" /> : null}
    </div>
  );
}

export default ImageUpload;
