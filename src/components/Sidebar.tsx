'use client';

import { ChevronRight, ChevronDown, FileText, Folder, Home } from 'lucide-react';
import { useState } from 'react';

interface Page {
  id: string;
  name: string;
  urlName: string;
  parentId: string | null;
  child: string[];
  state: number;
  isPublished: boolean;
  type: number;
}

interface SidebarData {
  collections: Record<string, any>;
  pages: Record<string, Page>;
}

function PageItem({ page, pages, level = 0 }: { page: Page; pages: Record<string, Page>; level?: number }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = page.child && page.child.length > 0;
  const indent = level * 16;

  const getPageIcon = (type: number) => {
    switch (type) {
      case 0: return <Home className="w-4 h-4" />;
      case 1: return <Folder className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="select-none">
      <div 
        className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group"
        style={{ paddingLeft: `${16 + indent}px` }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-1">
          {hasChildren && (
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors">
              {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
            </button>
          )}
          {!hasChildren && <div className="w-6" />}
          <div className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            {getPageIcon(page.type)}
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {page.name}
          </span>
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="ml-1 border-l border-gray-300 dark:border-gray-700 pl-2">
          {page.child.map((childId) => {
            const childPage = pages[childId];
            if (!childPage) return null;
            return (
              <PageItem 
                key={childId} 
                page={childPage} 
                pages={pages} 
                level={level + 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ data }: { data: string }) {
  let sidebarData: SidebarData | null = null;
  
  try {
    sidebarData = JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse sidebar data:', error);
  }

  if (!sidebarData || !sidebarData.pages) {
    return (
      <aside className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 opacity-60" />
          </div>
          <p className="text-sm font-medium">No content available</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Check your collection ID</p>
        </div>
      </aside>
    );
  }

  const { pages } = sidebarData;
  const rootPages = Object.values(pages).filter(page => !page.parentId);

  return (
    <aside className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full shadow-xl">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Folder className="w-5 h-5 text-white" />
          </div>
          Documentation
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        <nav className="space-y-1">
          {rootPages.map((page) => (
            <PageItem key={page.id} page={page} pages={pages} />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-950">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          {Object.keys(pages).length} pages available
        </div>
      </div>
    </aside>
  );
}
