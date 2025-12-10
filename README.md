# Urban Semantic Search

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.0-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)
![MapLibre](https://img.shields.io/badge/MapLibre-GL-blue?style=flat-square)

A Digital Humanities project visualizing historical Venice through multimodal search, interactive maps, and temporal filtering.

## About The Project

This project is a modern frontend interface designed to explore the rich history of Venice. 

It connects to a vector search backend (Qdrant + FastAPI) to allow users to search through centuries of historical documents and map fragments.

The interface features a "Google Maps-like" experience tailored for historical data, enabling users to switch between textual archives and cartographic layers seamlessly.

## Key Features

* **Multimodal Search**: Support for Text-to-Text and Text-to-Image and Image-to-Image.
* **Interactive Map Visualization**:
    * Dynamic rendering of search results.
    * Support for historical map tiles and modern overlays.
    * 3D Heatmap integration for data density visualization.
* **Advanced Temporal Filtering**:
    * **Histogram Timeline**: A high-precision interactive slider showing data distribution over time (1000 AD - 2024 AD).
    * **Visual Feedback**: Real-time filtering with intersection-based highlighting logic.
* **Rich Detail Views**:
    * **Document Mode**: Archival style sheet displaying full transcripts and metadata.
    * **Map Mode**: Lens style view with image slice visualization and coordinate details.

## Tech Stack

* **Framework**: Next.js
* **UI Components**: Shadcn UI
* **Icons**: Lucide React
* **Map Engine**: React Map GL / MapLibre GL

## Getting Started

Follow these steps to get the frontend running locally.

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn or pnpm
* A running instance of the Backend API (FastAPI + Qdrant)

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/SheEagle/Urban-Semantic-Search-Frontend.git](https://github.com/SheEagle/Urban-Semantic-Search-Frontend.git)
    cd Urban-Semantic-Search-Frontend
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the development server**

    ```bash
    npm run dev
    ```

4.  **Open in Browser**

    Visit http://localhost:3000 to see the application.
