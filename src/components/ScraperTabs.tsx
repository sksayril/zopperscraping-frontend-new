import { useState } from 'react';
import { Play, Pause, Download, RefreshCw, Search, Filter, Database, BarChart3 } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import AmazonScraper from './AmazonScraper';
import FlipkartScraper from './FlipkartScraper';
import MyntraScraper from './MyntraScraper';
import JioMartScraper from './JioMartScraper';
import AjioScraper from './AjioScraper';
import ChromaScraper from './ChromaScraper';
import VijaySalesScraper from './VijaySalesScraper';
import NykaaScraper from './NykaaScraper';
import OneMgScraper from './OneMgScraper';
import PharmEasyScraper from './PharmEasyScraper';
import NetmedsScraper from './NetmedsScraper';
import BlinkitScraper from './BlinkitScraper';
import SwiggyInstamartScraper from './SwiggyInstamartScraper';
import ZeptoScraper from './ZeptoScraper';
import BigBasketScraper from './BigBasketScraper';
import PepperfryScraper from './PepperfryScraper';
import HomeCentreScraper from './HomeCentreScraper';
import ShoppersStopScraper from './ShoppersStopScraper';
import UrbanicScraper from './UrbanicScraper';
import IKEAScraper from './IKEAScraper';
import BIBAScraper from './BIBAScraper';
import LifestyleStoresScraper from './LifestyleStoresScraper';
import MedPlusMartScraper from './MedPlusMartScraper';
import TruemedsScraper from './TruemedsScraper.tsx';
import ApolloPharmacyScraper from './ApolloPharmacyScraper';
import DMartScraper from './DMartScraper.tsx';
import LiciousScraper from './LiciousScraper';

interface ScraperConfig {
  name: string;
  url: string;
  status: 'idle' | 'running' | 'paused' | 'completed';
  lastRun: string;
  itemsScraped: number;
  color: string;
}

const scraperConfigs: ScraperConfig[] = [
  {
    name: 'Flipkart',
    url: ROUTES.EXTERNAL.FLIPKART,
    status: 'idle',
    lastRun: '2 hours ago',
    itemsScraped: 1250,
    color: 'bg-yellow-500'
  },
  {
    name: 'Amazon',
    url: ROUTES.EXTERNAL.AMAZON,
    status: 'running',
    lastRun: '5 minutes ago',
    itemsScraped: 2840,
    color: 'bg-orange-500'
  },
  {
    name: 'Myntra',
    url: ROUTES.EXTERNAL.MYNTRA,
    status: 'completed',
    lastRun: '1 hour ago',
    itemsScraped: 890,
    color: 'bg-pink-500'
  },
  {
    name: 'JioMart',
    url: ROUTES.EXTERNAL.JIOMART,
    status: 'idle',
    lastRun: '3 hours ago',
    itemsScraped: 650,
    color: 'bg-blue-500'
  },
  {
    name: 'Ajio',
    url: ROUTES.EXTERNAL.AJIO,
    status: 'idle',
    lastRun: '4 hours ago',
    itemsScraped: 420,
    color: 'bg-purple-500'
  },
  {
    name: 'Chroma',
    url: ROUTES.EXTERNAL.CHROMA,
    status: 'idle',
    lastRun: '5 hours ago',
    itemsScraped: 380,
    color: 'bg-orange-500'
  },
  {
    name: 'Vijay Sales',
    url: ROUTES.EXTERNAL.VIJAYSALES,
    status: 'idle',
    lastRun: '6 hours ago',
    itemsScraped: 290,
    color: 'bg-red-500'
  },
  {
    name: 'Nykaa',
    url: ROUTES.EXTERNAL.NYKAA,
    status: 'idle',
    lastRun: '7 hours ago',
    itemsScraped: 180,
    color: 'bg-pink-500'
  },
  {
    name: '1mg',
    url: ROUTES.EXTERNAL.ONEMG,
    status: 'idle',
    lastRun: '8 hours ago',
    itemsScraped: 150,
    color: 'bg-green-500'
  },
  {
    name: 'PharmEasy',
    url: ROUTES.EXTERNAL.PHARMEASY,
    status: 'idle',
    lastRun: '9 hours ago',
    itemsScraped: 120,
    color: 'bg-blue-500'
  },
  {
    name: 'Netmeds',
    url: ROUTES.EXTERNAL.NETMEDS,
    status: 'idle',
    lastRun: '10 hours ago',
    itemsScraped: 95,
    color: 'bg-green-500'
  },
  {
    name: 'Blinkit',
    url: ROUTES.EXTERNAL.BLINKIT,
    status: 'idle',
    lastRun: '11 hours ago',
    itemsScraped: 200,
    color: 'bg-orange-500'
  },
  {
    name: 'Swiggy Instamart',
    url: ROUTES.EXTERNAL.SWIGGY_INSTAMART,
    status: 'idle',
    lastRun: '12 hours ago',
    itemsScraped: 150,
    color: 'bg-orange-600'
  },
  {
    name: 'Zepto',
    url: ROUTES.EXTERNAL.ZEPTO,
    status: 'idle',
    lastRun: '13 hours ago',
    itemsScraped: 180,
    color: 'bg-blue-600'
  },
  {
    name: 'BigBasket',
    url: ROUTES.EXTERNAL.BIGBASKET,
    status: 'idle',
    lastRun: '14 hours ago',
    itemsScraped: 220,
    color: 'bg-green-600'
  },
  {
    name: 'Pepperfry',
    url: ROUTES.EXTERNAL.PEPPERFRY,
    status: 'idle',
    lastRun: '15 hours ago',
    itemsScraped: 180,
    color: 'bg-orange-600'
  },
  {
    name: 'HomeCentre',
    url: ROUTES.EXTERNAL.HOMECENTRE,
    status: 'idle',
    lastRun: '16 hours ago',
    itemsScraped: 150,
    color: 'bg-purple-600'
  },
  {
    name: 'ShoppersStop',
    url: ROUTES.EXTERNAL.SHOPPERSSTOP,
    status: 'idle',
    lastRun: '17 hours ago',
    itemsScraped: 200,
    color: 'bg-pink-600'
  },
  {
    name: 'Urbanic',
    url: ROUTES.EXTERNAL.URBANIC,
    status: 'idle',
    lastRun: '18 hours ago',
    itemsScraped: 180,
    color: 'bg-indigo-600'
  },
  {
    name: 'IKEA',
    url: ROUTES.EXTERNAL.IKEA,
    status: 'idle',
    lastRun: '19 hours ago',
    itemsScraped: 250,
    color: 'bg-yellow-600'
  },
  {
    name: 'BIBA',
    url: ROUTES.EXTERNAL.BIBA,
    status: 'idle',
    lastRun: '20 hours ago',
    itemsScraped: 180,
    color: 'bg-pink-600'
  },
  {
    name: 'Lifestyle Stores',
    url: ROUTES.EXTERNAL.LIFESTYLESTORES,
    status: 'idle',
    lastRun: '21 hours ago',
    itemsScraped: 220,
    color: 'bg-blue-600'
  },
  {
    name: 'MedPlusMart',
    url: ROUTES.EXTERNAL.MEDPLUSMART,
    status: 'idle',
    lastRun: '22 hours ago',
    itemsScraped: 160,
    color: 'bg-teal-600'
  },
  {
    name: 'Truemeds',
    url: ROUTES.EXTERNAL.TRUEMEDS,
    status: 'idle',
    lastRun: '23 hours ago',
    itemsScraped: 140,
    color: 'bg-emerald-600'
  },
  {
    name: 'Apollo Pharmacy',
    url: ROUTES.EXTERNAL.APOLLOPHARMACY,
    status: 'idle',
    lastRun: '24 hours ago',
    itemsScraped: 120,
    color: 'bg-blue-600'
  },
  {
    name: 'DMart',
    url: ROUTES.EXTERNAL.DMART,
    status: 'idle',
    lastRun: '25 hours ago',
    itemsScraped: 100,
    color: 'bg-orange-600'
  },
  {
    name: 'Licious',
    url: ROUTES.EXTERNAL.LICIOUS,
    status: 'idle',
    lastRun: '26 hours ago',
    itemsScraped: 80,
    color: 'bg-purple-600'
  }
];

export default function ScraperTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrapers, setScrapers] = useState(scraperConfigs);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleStatusToggle = (index: number) => {
    const newScrapers = [...scrapers];
    const scraper = newScrapers[index];
    
    if (scraper.status === 'idle' || scraper.status === 'paused') {
      scraper.status = 'running';
    } else if (scraper.status === 'running') {
      scraper.status = 'paused';
    }
    
    setScrapers(newScrapers);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Pause className="w-4 h-4" />;
      case 'paused':
        return <Play className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };


  // Filter scrapers based on search and status
  const filteredScrapers = scrapers.filter(scraper => {
    const matchesSearch = scraper.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || scraper.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const activeScraper = scrapers[activeTab];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Enhanced Tab Navigation */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="px-6 py-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">E-commerce Scrapers</h1>
            <div className="flex items-center space-x-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search scrapers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="running">Running</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="idle">Idle</option>
              </select>
              
              {/* Stats */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Active: {scrapers.filter(s => s.status === 'running').length}</span>
                </div>
                <span>•</span>
                <span>Showing: {filteredScrapers.length}/{scrapers.length}</span>
              </div>
            </div>
          </div>
          
          {/* Horizontal Scrollable Tabs */}
          <div className="relative">
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide pb-2">
              {filteredScrapers.map((scraper) => {
                const originalIndex = scrapers.findIndex(s => s.name === scraper.name);
                return (
                <button
                  key={scraper.name}
                  onClick={() => setActiveTab(originalIndex)}
                  className={`group relative flex-shrink-0 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    activeTab === originalIndex
                      ? 'bg-white shadow-md border-2 border-blue-500 text-blue-700 transform scale-105'
                      : 'bg-white/70 hover:bg-white hover:shadow-sm text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Status Indicator */}
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full ${scraper.color} shadow-sm`}></div>
                      {scraper.status === 'running' && (
                        <div className={`absolute inset-0 w-3 h-3 rounded-full ${scraper.color} animate-ping opacity-75`}></div>
                      )}
                    </div>
                    
                    {/* Platform Name */}
                    <span className="font-semibold">{scraper.name}</span>
                    
                    {/* Status Badge */}
                    <span className={`px-2 py-1 text-xs rounded-full font-medium transition-colors ${
                      scraper.status === 'running' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : scraper.status === 'paused'
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        : scraper.status === 'completed'
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      {scraper.status}
                    </span>
                    
                    {/* Items Count */}
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {scraper.itemsScraped.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Active Tab Indicator */}
                  {activeTab === originalIndex && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500"></div>
                  )}
                </button>
                );
              })}
            </div>
            
            {/* Scroll Indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
          </div>
          
          {/* No Results Message */}
          {filteredScrapers.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 text-sm">
                No scrapers found matching your criteria.
                {(searchQuery || filterStatus !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterStatus('all');
                    }}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${activeScraper.color} shadow-sm`}></div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <span>{activeScraper.name} Scraper</span>
                {activeScraper.status === 'running' && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-normal text-green-600">Live</span>
                  </div>
                )}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <span>Target:</span>
                  <a href={activeScraper.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                    {activeScraper.url}
                  </a>
                </span>
                <span>•</span>
                <span>Last run: {activeScraper.lastRun}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleStatusToggle(activeTab)}
              className={`group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeScraper.status === 'running'
                  ? 'bg-red-100 text-red-700 hover:bg-red-200 hover:shadow-md transform hover:scale-105'
                  : 'bg-green-100 text-green-700 hover:bg-green-200 hover:shadow-md transform hover:scale-105'
              }`}
            >
              {getStatusIcon(activeScraper.status)}
              <span>{activeScraper.status === 'running' ? 'Pause' : 'Start'}</span>
            </button>
            <button className="group flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 hover:shadow-md transition-all duration-200 transform hover:scale-105">
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span>Refresh</span>
            </button>
            <button className="group flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 hover:shadow-md transition-all duration-200 transform hover:scale-105">
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Items Scraped</p>
                <p className="text-2xl font-bold">{activeScraper.itemsScraped.toLocaleString()}</p>
                <p className="text-blue-200 text-xs mt-1">+12% from last week</p>
              </div>
              <Database className="w-8 h-8 text-blue-200 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="group bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold">94.2%</p>
                <p className="text-green-200 text-xs mt-1">+2.1% improvement</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-200 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="group bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Last Run</p>
                <p className="text-2xl font-bold">{activeScraper.lastRun}</p>
              </div>
              <RefreshCw className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search scraped data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 0 ? (
          // Flipkart Scraper Tab
          <FlipkartScraper />
        ) : activeTab === 1 ? (
          // Amazon Scraper Tab
          <AmazonScraper />
        ) : activeTab === 2 ? (
          // Myntra Scraper Tab
          <MyntraScraper />
        ) : activeTab === 3 ? (
          // JioMart Scraper Tab
          <JioMartScraper />
        ) : activeTab === 4 ? (
          // Ajio Scraper Tab
          <AjioScraper />
        ) : activeTab === 5 ? (
          // Chroma Scraper Tab
          <ChromaScraper />
        ) : activeTab === 6 ? (
          // Vijay Sales Scraper Tab
          <VijaySalesScraper />
        ) : activeTab === 7 ? (
          // Nykaa Scraper Tab
          <NykaaScraper />
        ) : activeTab === 8 ? (
          // 1mg Scraper Tab
          <OneMgScraper />
        ) : activeTab === 9 ? (
          // PharmEasy Scraper Tab
          <PharmEasyScraper />
        ) : activeTab === 10 ? (
          // Netmeds Scraper Tab
          <NetmedsScraper />
        ) : activeTab === 11 ? (
          // Blinkit Scraper Tab
          <BlinkitScraper />
        ) : activeTab === 12 ? (
          // Swiggy Instamart Scraper Tab
          <SwiggyInstamartScraper />
        ) : activeTab === 13 ? (
          // Zepto Scraper Tab
          <ZeptoScraper />
        ) : activeTab === 14 ? (
          // BigBasket Scraper Tab
          <BigBasketScraper />
        ) : activeTab === 15 ? (
          // Pepperfry Scraper Tab
          <PepperfryScraper />
        ) : activeTab === 16 ? (
          // HomeCentre Scraper Tab
          <HomeCentreScraper />
        ) : activeTab === 17 ? (
          // ShoppersStop Scraper Tab
          <ShoppersStopScraper />
        ) : activeTab === 18 ? (
          // Urbanic Scraper Tab
          <UrbanicScraper />
        ) : activeTab === 19 ? (
          // IKEA Scraper Tab
          <IKEAScraper />
        ) : activeTab === 20 ? (
          // BIBA Scraper Tab
          <BIBAScraper />
        ) : activeTab === 21 ? (
          // Lifestyle Stores Scraper Tab
          <LifestyleStoresScraper />
        ) : activeTab === 22 ? (
          // MedPlusMart Scraper Tab
          <MedPlusMartScraper />
        ) : activeTab === 23 ? (
          // Truemeds Scraper Tab
          <TruemedsScraper />
        ) : activeTab === 24 ? (
          // Apollo Pharmacy Scraper Tab
          <ApolloPharmacyScraper />
        ) : activeTab === 25 ? (
          // DMart Scraper Tab
          <DMartScraper />
        ) : activeTab === 26 ? (
          // Licious Scraper Tab
          <LiciousScraper />
        ) : (
          // Default Data Table for other scrapers
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Recent Scraped Data</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scraped At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Sample Product {item}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{(Math.random() * 10000 + 1000).toFixed(0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(Math.random() * 2 + 3).toFixed(1)} ⭐
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Math.floor(Math.random() * 60 + 1)} min ago
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}