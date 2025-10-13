# ITTS

A web application for the **ITTS platform** with an integrated admin panel for content management.

### 🧩 Functionalities
- Manage Posts and Blogs  
- Create and take Tests  
- Upload and display YouTube videos  
- Full Admin Panel for content moderation and updates  


## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/NurmuhammadTukhtayev/ITTS.git
cd ITTS
```

2. Install Node.js Dependencies
```bash
npm install
```
3. Setup Python Dependency

Make sure Python 3 is installed. Then activate a virtual environment and install the required packages:

```bash
cd ./app/general/helpers/testify

python -m venv .venv

.venv/Scripts/activate

pip install -r requirements.txt
```
(If you’re on macOS/Linux, use ```source .venv/bin/activate instead.``` )

4. Copy the example file and update your credentials:

```bash
cp .env.example .env
```

Edit .env to include your database connection, port, and other settings.

5. Run the App
```bash
npm start

# or (if you use nodemon for development):

npm run dev
```

The app will be available.

The app uses a Python script located in ./app/general/helpers/testify to parse uploaded files and load them into MySQL using pandas, which is triggered by the Node.js backend.

📄 License
(Optional) Add your license info, e.g., MIT License.
