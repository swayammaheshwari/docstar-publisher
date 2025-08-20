import { Clock, User, Tag } from 'lucide-react';

interface PublishedContent {
  meta: Record<string, any>;
  name: string;
  urlName: string;
  contents: string;
  type: number;
  id: string;
  collectionId: string;
  updatedBy: number;
}

interface MainData {
  publishedContent: PublishedContent;
}

export default function Main({ data }: { data: string }) {
  let mainData: MainData | null = null;
  
  try {
    mainData = JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse main data:', error);
  }

  if (!mainData || !mainData.publishedContent) {
    return (
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Tag className="w-8 h-8 opacity-60" />
            </div>
            <h2 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">No content available</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Select a page from the sidebar to view its content.</p>
          </div>
        </div>
      </main>
    );
  }

  const { publishedContent } = mainData;

  return (
    <main className="flex-1 bg-white dark:bg-gray-900 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-6">
        {/* Header */}
        <header className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {publishedContent.name}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Updated by User {publishedContent.updatedBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                {publishedContent.type === 1 ? 'Document' : 
                 publishedContent.type === 2 ? 'Version' : 
                 publishedContent.type === 3 ? 'Page' : 'Content'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>ID: {publishedContent.id}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <div 
            className="
              prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-semibold
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300
              prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ol:text-gray-700 dark:prose-ol:text-gray-300
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-gray-800 prose-blockquote:p-4
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-blue-600 dark:prose-code:text-blue-300 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-gray-900 dark:prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
            "
            dangerouslySetInnerHTML={{ __html: publishedContent.contents }}
          />
        </article>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div>
              <span>Collection: {publishedContent.collectionId}</span>
            </div>
            <div>
              <span>URL: /{publishedContent.urlName}</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
