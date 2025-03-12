"use client"

import { useEffect, useState } from "react"
import { Search, Download, FileText, Loader, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'
import AdUnit from "../AdUnit"

interface PdfFile {
  name: string
  url: string
  category?: string
}

const Resources = () => {
  const [search, setSearch] = useState<string>("")
  const [pdfs, setPdfs] = useState<PdfFile[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCategoryFilter, setShowCategoryFilter] = useState<boolean>(false)
  const itemsPerPage = 15 // 4 columns * 3 rows

  const GITHUB_API_URL = "https://api.github.com/repos/mutant138/open-pdfs/releases/tags/V1"

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        setLoading(true)
        const response = await fetch(GITHUB_API_URL)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }
        const data = await response.json()
        if (data.assets) {
          // Extract categories from file names
          const fetchedCategories = data.assets
            .filter((asset: any) => asset.name.endsWith(".pdf"))
            .map((asset: any) => asset.name.split('_')[0])
            .filter((category: string, index: number, self: string[]) => 
              category && self.indexOf(category) === index
            )
          
          setCategories(fetchedCategories)
          
          // Map PDFs with their categories
          const fetchedPdfs = data.assets
            .filter((asset: any) => asset.name.endsWith(".pdf"))
            .map((asset: any) => {
              const nameParts = asset.name.split('_')
              const category = nameParts[0]
              return {
                name: asset.name.replace(/_/g, " ").replace(".pdf", ""),
                url: asset.browser_download_url,
                category: category
              }
            })
            
          setPdfs(fetchedPdfs)
        } else {
          setPdfs([])
        }
      } catch (error) {
        console.error("Error fetching PDFs:", error)
        setError("Failed to load resources. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPdfs()
  }, [])

  // Reset to first page when search or category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedCategory])

  const displayPdfs = pdfs || []

  const filteredPdfs = displayPdfs.filter((pdf) => {
    const matchesSearch = pdf.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory ? pdf.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  const pageCount = Math.ceil(filteredPdfs.length / itemsPerPage)
  const paginatedPdfs = filteredPdfs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black min-h-screen flex flex-col relative">
      <div className="container mx-auto px-4 py-5 mt-10 flex-grow flex flex-col pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#00df9a] drop-shadow-lg">Learning Resources</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Download free PDF resources to enhance your development skills. All resources are carefully curated for
            developers at every level.
          </p>
        </div>

        {/* Banner Ad - Each ad unit needs a unique slot */}
        <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
          <AdUnit slot="1404403399" className="h-20 bg-gray-800 border border-gray-700" />
        </div>

        {/* Fixed Search Bar and Filters */}
        <div className="sticky top-15 z-10 bg-gradient-to-r from-black via-gray-900 to-black bg-opacity-90 backdrop-blur-sm py-4 mb-6 rounded-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent focus:outline-none transition-all duration-200"
                />
                {search && (
                  <button 
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              {/* Category Filter Button */}
              <div className="md:w-auto">
                <button
                  onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                  className={`w-full md:w-auto flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-all duration-200 ${
                    selectedCategory 
                      ? 'bg-[#00df9a] text-black border-[#00df9a]' 
                      : 'bg-gray-800 text-white border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Filter className="h-5 w-5" />
                  <span>{selectedCategory || "Filter by Category"}</span>
                  {selectedCategory && (
                    <X 
                      className="h-4 w-4 ml-2" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(null);
                      }} 
                    />
                  )}
                </button>
              </div>
            </div>
            
            {/* Category Filter Dropdown */}
            {showCategoryFilter && (
              <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-xl animate-fadeIn">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category === selectedCategory ? null : category);
                        setShowCategoryFilter(false);
                      }}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        category === selectedCategory
                          ? 'bg-[#00df9a] text-black'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader className="h-12 w-12 text-[#00df9a] animate-spin" />
                </div>
                <div className="absolute inset-0 border-t-4 border-[#00df9a] border-opacity-20 rounded-full animate-pulse"></div>
              </div>
              <p className="text-gray-300 mt-6 font-medium">Loading resources...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20 bg-gray-800/30 rounded-xl border border-gray-700">
              <div className="bg-red-500/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                <X className="h-10 w-10 text-red-400" />
              </div>
              <p className="text-red-400 mb-4 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#00df9a] hover:bg-[#00df9a]/80 text-black px-6 py-2 rounded-md font-medium transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          )}

          {/* PDF Grid */}
          {!loading && !error && (
            <>
              {/* Results Summary */}
              <div className="mb-6 flex justify-between items-center lg:mx-40">
                <p className="text-gray-400">
                  Showing {filteredPdfs.length > 0 ? `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredPdfs.length)}` : '0'} of {filteredPdfs.length} resources
                </p>
                {selectedCategory && (
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="text-[#00df9a] hover:text-[#00df9a]/80 flex items-center gap-1 text-sm"
                  >
                    <X className="h-4 w-4" /> Clear filter
                  </button>
                )}
              </div>
              
              {paginatedPdfs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mx-40 xl:grid-cols-3 gap-6 ">
                  {paginatedPdfs.map((pdf, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 border border-gray-700 hover:border-[#00df9a] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,223,154,0.3)] group"
                    >
                      <div className="p-4 pb-2">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-white text-sm font-semibold line-clamp-2">{pdf.name}</h3>
                          <div className="flex gap-2 flex-shrink-0">
                            {pdf.category && (
                              <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
                                {pdf.category}
                              </span>
                            )}
                            <span className="bg-[#00df9a] text-black text-xs font-medium px-2 py-1 rounded-full">
                              PDF
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pt-2">
                        <div className="w-full h-30 bg-gray-900 rounded-md flex items-center justify-center mb-4 group-hover:bg-gray-850 transition-all duration-300">
                          <FileText className="h-16 w-16 text-gray-600 group-hover:text-[#00df9a]/30 transition-all duration-300" />
                        </div>
                      </div>
                      <div className="p-4 pt-2">
                        <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="w-full block">
                          <button className="w-full bg-gray-900 hover:bg-[#00df9a]/10 text-[#00df9a] border border-gray-700 hover:border-[#00df9a]/50 rounded-md py-2 px-4 flex items-center justify-center transition-all duration-200">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-800/30 rounded-xl border border-gray-700">
                  <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No resources found</h3>
                  <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                  {(search || selectedCategory) && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setSelectedCategory(null);
                      }}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-200"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}

              {/* Bottom Ad - Use a different slot */}
              {!loading && !error && paginatedPdfs.length > 0 && (
                <div className="mt-8">
                  <AdUnit slot="2480476060" className="w-full h-24 bg-gray-800 border border-gray-700 rounded-lg shadow-lg" />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Fixed Pagination at Bottom */}
      {pageCount > 1 && !loading && !error && (
        <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-sm py-4 border-t border-gray-800 z-10">
          <div className="container mx-auto flex justify-center items-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition-colors flex items-center"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
                // Show first page, last page, current page, and pages around current
                let pageNum;
                if (pageCount <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                  if (i === 4) pageNum = pageCount;
                } else if (currentPage >= pageCount - 2) {
                  pageNum = pageCount - 4 + i;
                  if (i === 0) pageNum = 1;
                } else {
                  pageNum = currentPage - 2 + i;
                  if (i === 0) pageNum = 1;
                  if (i === 4) pageNum = pageCount;
                }
                
                // Determine if we need to show ellipsis
                const showEllipsis = pageCount > 5 && (
                  (i === 1 && pageNum !== 2) || 
                  (i === 3 && pageNum !== pageCount - 1)
                );
                
                return showEllipsis ? (
                  <span key={`ellipsis-${i}`} className="text-gray-500 px-2">...</span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#00df9a] text-black'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              className="p-2 rounded-md bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition-colors flex items-center"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Add custom styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Resources
