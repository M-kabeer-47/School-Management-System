"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// For pdfjs-dist v5.x (React-PDF v10+)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewerPage() {
  const searchParams = useSearchParams();
  const pdfUrl =
    searchParams.get("url") ||
    "https://mahesararslan-merge-bucket.s3.eu-north-1.amazonaws.com/room-files/77f26d1c-26cb-418c-b98c-3c7391dcef8b/1765735147127-e3bb11be-f6af-48e8-870a-688d243d34f3.pdf";
  const title = searchParams.get("title") || "Challan";

  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadError(error: Error) {
    setError(error.message);
    setLoading(false);
  }

  if (!pdfUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-error mb-2">
            No PDF URL provided
          </h1>
          <p className="text-text-secondary">Please provide a valid PDF URL.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.close()}
              className="text-text-secondary hover:text-text-primary transition-colors"
              title="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <h1 className="text-lg md:text-xl font-bold text-text-primary">
              {title}
            </h1>
          </div>

          {/* Page Count */}
          {!loading && !error && numPages > 0 && (
            <span className="text-sm text-text-secondary">
              {numPages} {numPages === 1 ? "page" : "pages"}
            </span>
          )}
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex flex-col items-center p-4 md:p-8 gap-4">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
            <p className="mt-4 text-text-secondary">Loading PDF...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-error mb-2">
              Error Loading PDF
            </h2>
            <p className="text-text-secondary">{error}</p>
          </div>
        )}

        {!error && (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`} className="mb-4">
                <Page
                  pageNumber={index + 1}
                  className="shadow-2xl"
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </div>
            ))}
          </Document>
        )}
      </div>
    </div>
  );
}
