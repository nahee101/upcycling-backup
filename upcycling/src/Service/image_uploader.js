class ImageUploader {
    //🍎업로드 기능
    //사용자가 파일을 업로드 -> 서버에 url을 업로드 하고 -> 그 결과값을 return
    async upload(file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ggmeax4i");
        const result =await fetch('https://api.cloudinary.com/v1_1/dlizycik0/image/upload', 
        {
            method: "POST",
            body: data,
        }
        );
        return await result.json();
    }
}


export default ImageUploader;