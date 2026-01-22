"use client"
import dynamic from 'next/dynamic';
const PDFViewerPage = dynamic(() => import('../dynamic-pages/ViewPDF'), {
  ssr: false,
});

export default function PDFViewer() {
  return <PDFViewerPage />;
}