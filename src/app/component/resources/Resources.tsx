"use client";

import { useEffect, useState } from "react";
import {
  FiSearch,
  FiDownload,
  FiFileText,
  FiLoader,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import AdUnit from "../AdUnit";

interface PdfFile {
  name: string;
  url: string;
}

const Resources = () => {
  const [search, setSearch] = useState<string>("");
  const [pdfs, setPdfs] = useState<PdfFile[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [adsLoaded, setAdsLoaded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12; // 4 columns * 3 rows

  const GITHUB_API_URL =
    "https://api.github.com/repos/mutant138/open-pdfs/releases/tags/V1";

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        setLoading(true);
        const response = await fetch(GITHUB_API_URL);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();

        if (data.assets) {
          const fetchedPdfs = data.assets
            .filter((asset: any) => asset.name.endsWith(".pdf"))
            .map((asset: any) => ({
              name: asset.name.replace(/_/g, " ").replace(".pdf", ""),
              url: asset.browser_download_url,
            }));

          setPdfs(fetchedPdfs);
        } else {
          setPdfs([]);
        }
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
    const timer = setTimeout(() =>{
      setAdsLoaded(true);
    },1000);
    return () => clearTimeout(timer);
  }, []);

  // Fallback to static data if API fails
  const staticPdfFiles: PdfFile[] = [
    { name: "React Hooks Guide", url: "/pdfs/react-hooks.pdf" },
    { name: "JavaScript Basics", url: "/pdfs/javascript-basics.pdf" },
    { name: "CSS Flexbox", url: "/pdfs/css-flexbox.pdf" },
    { name: "Node.js Crash Course", url: "/pdfs/nodejs-crash-course.pdf" },
    { name: "MongoDB Essentials", url: "/pdfs/mongodb-essentials.pdf" },
    { name: "TypeScript Handbook", url: "/pdfs/typescript-handbook.pdf" },
    { name: "GraphQL Fundamentals", url: "/pdfs/graphql-fundamentals.pdf" },
    { name: "Docker for Beginners", url: "/pdfs/docker-beginners.pdf" },
    { name: "Vue.js Essentials", url: "/pdfs/vuejs-essentials.pdf" },
    { name: "Python Data Science", url: "/pdfs/python-data-science.pdf" },
    { name: "AWS Cloud Practitioner", url: "/pdfs/aws-cloud-practitioner.pdf" },
    { name: "Machine Learning Basics", url: "/pdfs/ml-basics.pdf" },
    { name: "Angular Framework Guide", url: "/pdfs/angular-guide.pdf" },
    { name: "Rust Programming Language", url: "/pdfs/rust-lang.pdf" },
    { name: "iOS App Development", url: "/pdfs/ios-development.pdf" },
    { name: "Kubernetes in Action", url: "/pdfs/kubernetes-action.pdf" },
  ];

  const displayPdfs = pdfs || staticPdfFiles;

  const filteredPdfs = displayPdfs.filter((pdf) =>
    pdf.name.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredPdfs.length / itemsPerPage);
  const paginatedPdfs = filteredPdfs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black min-h-screen flex flex-col relative">
      <div className="container mx-auto px-1 py-5 mt-10 flex-grow flex flex-col pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#00df9a] drop-shadow-lg">
            Learning Resources
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Download free PDF resources to enhance your development skills. All
            resources are carefully curated for developers at every level.
          </p>
        </div>

        {/* Banner Ad */}
        <div className="mb-6 rounded-lg overflow-hidden">
          <AdUnit
            slot="2480476060"
            className="w-full h-20 bg-gray-800 border border-gray-700"
          />
        </div>

        {/* Fixed Search Bar */}
        <div className="sticky top-0 z-10 bg-black bg-opacity-80 py-4 mb-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 flex-grow overflow-hidden">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-40 shrink-0">
            <div className="sticky top-2">
              <div className="w-full h-[800px] bg-gray-800 border border-gray-700 rounded-lg text-white flex items-center justify-center">
                <span className="text-gray-400 rotate-90 lg:rotate-0">
                  Vertical Ad
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-grow overflow-y-auto">
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <FiLoader className="h-12 w-12 text-[#00df9a] animate-spin mb-4" />
                <p className="text-gray-300">Loading resources...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#00df9a] hover:bg-[#00df9a]/80 text-black px-4 py-2 rounded-md font-medium"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* PDF Grid */}
            {!loading && !error && (
              <>
                {paginatedPdfs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedPdfs.map((pdf, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 border border-gray-700 hover:border-[#00df9a] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,223,154,0.3)]"
                      >
                        <div className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <h3 className="text-white text-sm font-semibold line-clamp-3">
                              {pdf.name}
                            </h3>
                            <span className="bg-[#00df9a] text-black text-xs font-medium px-2 py-1 rounded-full">
                              PDF
                            </span>
                          </div>
                        </div>
                        <div className="px-4 pt-2">
                          <div className="w-full h-32 bg-gray-900 rounded-md flex items-center justify-center mb-4">
                            <FiFileText className="h-16 w-16 text-gray-600" />
                          </div>
                        </div>
                        <div className="p-4">
                          <a
                            href={pdf.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block"
                          >
                            <button className="w-full bg-gray-900 hover:bg-gray-800 text-[#00df9a] border border-gray-700 rounded-md py-2 px-4 flex items-center justify-center">
                              <FiDownload className="mr-2 h-4 w-4" />
                              Download PDF
                            </button>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-gray-800/50 rounded-lg border border-gray-700">
                    <FiFileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">
                      No resources found
                    </h3>
                    <p className="text-gray-400">
                      Try adjusting your search or check back later for new
                      resources
                    </p>
                  </div>
                )}

                {/* Bottom Ad */}
                {!loading && !error && paginatedPdfs.length > 0 && (
                  <div className="mt-8">
                    <AdUnit
                      slot="2480476060"
                      className="w-full h-24 bg-gray-800 border border-gray-700 rounded-lg"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block w-40 shrink-0">
            <div className="sticky top-2">
              {adsLoaded && (
                <AdUnit
                  slot="2480476060"
                  format="vertical"
                  className="w-full h-[600px] bg-gray-800 border border-gray-700 rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Pagination at Bottom */}
      {pageCount > 1 && !loading && !error && (
        <div className="bottom-0 left-0 w-full bg-black/80 py-4 border-t border-gray-800">
          <div className="container mx-auto flex justify-center items-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition-colors"
            >
              <FiChevronLeft />
            </button>
            <span className="text-white">
              Page {currentPage} of {pageCount}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
              disabled={currentPage === pageCount}
              className="p-2 rounded-md bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition-colors"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
