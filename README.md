# Amazon Product Scraper Frontend

A modern React TypeScript application for scraping and displaying Amazon product information with a beautiful, responsive UI.

## Features

### 🛍️ E-commerce Product Scraping
- **Amazon Product Scraping**: Enter any Amazon product URL to scrape detailed product information
- **Flipkart Product Scraping**: Scrape Flipkart products with comprehensive data extraction
- **Myntra Product Scraping**: Scrape Myntra fashion products with detailed specifications and offers
- **JioMart Product Scraping**: Scrape JioMart grocery and retail products with detailed information
- **Comprehensive Product Data**: Displays product name, pricing, ratings, specifications, images, and more
- **Interactive Image Gallery**: Image carousel with thumbnail navigation for all platforms
- **Product History**: Keep track of recently scraped products from all platforms

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional Theme**: Clean, modern interface with Amazon-inspired orange accent colors
- **Interactive Components**: Smooth animations and hover effects
- **Error Handling**: User-friendly error messages and loading states

### 🔧 Technical Features
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Beautiful, customizable icons
- **API Integration**: RESTful API communication with proper error handling
- **Utility Functions**: Reusable helper functions for data formatting and validation

## API Integration

The application integrates with a backend API running on `https://7cvccltb-3100.inc1.devtunnels.ms` with the following endpoint:

### Scrape Amazon Product
- **Endpoint**: `POST /api/amazon/scrape-product`
- **Request Body**:
  ```json
  {
    "url": "https://www.amazon.in/product-url"
  }
  ```
- **Response**: Complete product data including images, specifications, pricing, and more

### Scrape Flipkart Product
- **Endpoint**: `POST /api/flipkart/scrape-product`
- **Request Body**:
  ```json
  {
    "url": "https://www.flipkart.com/product-url"
  }
  ```
- **Response**: Complete product data including images, specifications, pricing, offers, and seller information

### Scrape Myntra Product
- **Endpoint**: `POST /api/myntra/scrape-product`
- **Request Body**:
  ```json
  {
    "url": "https://www.myntra.com/product-url"
  }
  ```
- **Response**: Complete product data including images, specifications, pricing, offers, sizes, and delivery information

### Scrape JioMart Product
- **Endpoint**: `POST /api/jiomart/scrape`
- **Request Body**:
  ```json
  {
    "url": "https://www.jiomart.com/p/groceries/product-url"
  }
  ```
- **Response**: Complete product data including images, specifications, pricing, seller information, and delivery details

## Project Structure

```
src/
├── components/
│   ├── AmazonScraper.tsx      # Amazon scraping interface
│   ├── FlipkartScraper.tsx    # Flipkart scraping interface
│   ├── MyntraScraper.tsx      # Myntra scraping interface
│   ├── ProductDisplay.tsx     # Amazon product details display
│   ├── FlipkartProductDisplay.tsx # Flipkart product details display
│   ├── MyntraProductDisplay.tsx # Myntra product details display
│   ├── ScraperTabs.tsx        # Tab navigation with all scrapers
│   ├── Dashboard.tsx          # Main dashboard layout
│   ├── LoginForm.tsx          # Authentication form
│   └── Sidebar.tsx            # Navigation sidebar
├── services/
│   └── api.ts                 # API service layer
├── utils/
│   └── helpers.ts             # Utility functions
├── App.tsx                    # Main application component
└── main.tsx                   # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API server running on `https://7cvccltb-3100.inc1.devtunnels.ms`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zopperscraping-frontend-new
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Scraping Amazon Products

1. **Navigate to the Amazon tab** in the scraper interface
2. **Enter a valid Amazon product URL** in the input field
3. **Click "Scrape"** to fetch product data
4. **View the results** in the detailed product display
5. **Access scrape history** to view previously scraped products

### Supported URL Formats
- `https://www.amazon.in/product-name/dp/B0F945QD5Z/...`
- `https://www.amazon.com/product-name/dp/B0F945QD5Z/...`
- Any Amazon URL containing `/dp/` (product identifier)

## Key Components

### AmazonScraper Component
- Handles URL input and validation
- Manages API calls and loading states
- Displays error messages and success notifications
- Maintains scrape history

### ProductDisplay Component
- Shows comprehensive product information
- Interactive image gallery with navigation
- Expandable specifications and offers
- Responsive layout for all screen sizes

### API Service
- Centralized API communication
- Type-safe request/response handling
- Error handling and retry logic
- Request/response type definitions

## Styling and Theming

The application uses Tailwind CSS with a custom color scheme:
- **Primary**: Orange (#f97316) - Amazon-inspired
- **Secondary**: Blue (#3b82f6) - Professional
- **Success**: Green (#10b981) - Positive actions
- **Error**: Red (#ef4444) - Error states
- **Neutral**: Gray scale for text and backgrounds

## Error Handling

The application includes comprehensive error handling:
- **Network errors**: Connection issues with the API server
- **Validation errors**: Invalid Amazon URLs
- **API errors**: Server-side scraping failures
- **Image loading errors**: Fallback placeholder images

## Performance Optimizations

- **Lazy loading**: Components load only when needed
- **Image optimization**: Proper image sizing and fallbacks
- **Efficient re-renders**: Optimized state management
- **Bundle optimization**: Tree-shaking and code splitting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository or contact the development team.
