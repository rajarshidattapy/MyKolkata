# MyKolkata 🌆

A modern app to explore, discover, and connect with Kolkata. Features dynamic ratings, external data, and a beautiful UI.

---

## Features

- **Home Dashboard:** News, marketplace, quick links
- **Places:** Cafes, attractions, destinations with user & external ratings
- **Pujo Special:** Durga Puja regions, interactive map, pandals
- **Transport Guide:** Local, metro, train info
- **Tinder Experience:** Swipeable cards, external ratings (Justdial), user feedback, ML sentiment analysis (VADER), dynamic app ratings
- **Community & Contribute:** Share stories, join communities
- **Modern UI/UX:** Responsive, dark/light mode, smooth transitions

---

## Getting Started

### Prerequisites
- Node.js v16+
- Python 3.8+
- MongoDB Atlas or local
- npm or yarn

### 1. Clone & Install
```bash
git clone <repository-url>
cd MyKolkata
npm install
```

### 2. Backend Setup
- In `backend/`, create a `.env` file:
  ```
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  ```
- Install Python dependencies:
  ```bash
  pip install -r requirements.txt
  ```

### 3. Seed Data
- Run seed scripts in `backend/`:
  ```bash
  node seedMarketplace.js
  node seedTinderProfiles.js
  # ...other seed scripts as needed
  ```

### 4. Start Services
- **Backend:**  
  ```bash
  node server.js
  ```
- **Frontend:**  
  ```bash
  npm run dev
  ```
- **Sentiment Service:**  
  ```bash
  uvicorn sentiment_service:app --reload
  ```

---

## API Endpoints
- `/api/communities` - Community data
- `/api/marketplace` - Marketplace items
- `/api/news` - News articles
- `/api/places` - Places with ratings
- `/api/pandals` - Puja pandals
- `/api/regions` - Kolkata regions
- `/api/tinder-profiles` - Swipeable experiences
- `/api/transport` - Transport info

---

## In Progress
- Real-time updates
- More external data sources
- Admin dashboard
- Enhanced authentication

---

Made with ❤️ for Kolkata
