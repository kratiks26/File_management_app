// export async function uploadFile(file, folderId,) {
//     try {
//       const formData = new FormData();  
//       formData.append("file", file);
//       if(folderId){
//         formData.append("folder", folderId);
//       }
//       formData.append("name", file.name);
//       formData.append("description", "---");
  
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/files`, {
//         method: "POST",
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to upload file");
//       }
  
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       throw error;
//     }
//   }


export function uploadFile(file, folderId, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("file", file);
    if (folderId) {
      formData.append("folder", folderId);
    }
    formData.append("name", file.name);
    formData.append("description", "---");

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentCompleted = Math.round((event.loaded * 100) / event.total);
        if (onProgress) {
          onProgress(percentCompleted);
        }
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Failed to upload file"));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Failed to upload file"));
    });

    xhr.open("POST", `${process.env.REACT_APP_API_URL}/api/files`, true);
    xhr.send(formData);
  });
}

  export async function deleteFile(id) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/files/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete file");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }