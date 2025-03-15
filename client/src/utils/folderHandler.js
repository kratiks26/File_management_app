export async function createFolder(name, description, parentFolder = null) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, parentFolder }),
    });

    if (!response.ok) {
      throw new Error("Failed to create folder");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
}




export async function editFolder(id, name, description) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/folders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      throw new Error("Failed to edit folder");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing folder:", error);
    throw error;
  }
}



export async function deleteFolder(id) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/folders/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete folder");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting folder:", error);
    throw error;
  }
}


export async function getFolders(page = 1, limit = 8, filters = {}) {
  try {
    const { name, description, createdAt } = filters;
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(name && { name }),
      ...(description && { description }),
      ...(createdAt && { createdAt }),
    });

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/folders?${queryParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch folders");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
}

export async function countFileAndFolder() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/folders/count`);

    if (!response.ok) {
      throw new Error("Failed to fetch count");
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching count:", error);
    throw error;
  }

}