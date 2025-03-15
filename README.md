## **Architecture Decisions**

### **1. Tech Stack**
- **Frontend**: React.js with Redux for state management.
- **Backend**: Node.js with Express.js for REST API.
- **Database**: MongoDB for flexible data storage.

### **2. Folder Structure**
- Organized into `routes/`, `controllers/`, `models/`, and `config/` for clean code management.

### **3. API Design**
- Follows RESTful principles with proper HTTP methods (GET, POST, PUT, DELETE).

### **4. Real-time Updates**
- Uses WebSockets (`socket.io`) for live data updates (e.g., folder/file changes).

### **5. Performance**
- Pagination for large datasets.

---

### **Summary**
| **Category**       | **Decision**                              |
|--------------------|-------------------------------------------|
| **Frontend**       | React.js with Redux                       |
| **Backend**        | Node.js with Express.js                   |
| **Database**       | MongoDB                                   |
| **Folder Structure**| Organized (`routes/`, `models/`, etc.)   |
| **API Design**     | RESTful with proper HTTP methods          |
| **Real-time**      | WebSockets (`socket.io`)                  |
| **Performance**    | Pagination,                               |





# **File Management App**

A full-stack app built with **React.js** (frontend) and **Node.js** (backend) for managing folders and files.

---

## **Features**
- Create, edit, delete folders.
- Upload and delete files.
- Real-time updates with WebSockets.

---

## **Tech Stack**
- **Frontend**: React.js, Redux
- **Backend**: Node.js, Express.js, MongoDB
- **File Storage**: Cloudinary

---

## **Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/kratiks26/File_management_app.git
cd File_management_app
```

### **2. Backend Setup**
1. Go to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/file_management
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server:
   ```bash
   npm start
   or
   npm run dev
   ```

### **3. Frontend Setup**
1. Go to the `client` folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```

---

## **Run the App**
1. Start the backend:
   ```bash
   cd server
   npm start
   ```
2. Start the frontend:
   ```bash
   cd ../client
   npm start
   ```
3. Open `http://localhost:3000` in your browser.

---

## **Folder Structure**
- **Backend (`server/`)**: `routes/`, `controllers/`, `models/`, `config/`.
- **Frontend (`client/`)**: `src/components/`, `src/utils/`, `src/redux/`.

---

## **API Endpoints**
- **Folders**: `POST /api/folders`, `PUT /api/folders/:id`, `DELETE /api/folders/:id`, `GET /api/folders`.
- **Files**: `POST /api/files`, `DELETE /api/files/:id`.

---


## **Contact**
- **Kratik Sahu**
- GitHub: [kratiks26](https://github.com/kratiks26)

---

Enjoy! 🚀