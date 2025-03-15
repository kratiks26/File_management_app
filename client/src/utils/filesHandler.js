export async function uploadFile(file, folderId,) {
    try {
      const formData = new FormData();  
      formData.append("file", file);
      if(folderId){
        formData.append("folder", folderId);
      }
      formData.append("name", file.name);
      formData.append("description", "---");
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/files`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
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