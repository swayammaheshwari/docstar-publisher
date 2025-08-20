interface HeaderProps {
  defaultHeader?: string;
  theme?: string;
  logoUrl?: string;
  title?: string;
}

export default function Header({ defaultHeader, theme, logoUrl, title }: HeaderProps) {
  // If defaultHeader HTML is provided, render it
  if (defaultHeader) {
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: defaultHeader }}
        style={{ backgroundColor: theme || '#37352f' }}
      />
    );
  }

  // Fallback header
  return (
    <header 
      className="bg-gray-800 text-white p-4"
      style={{ backgroundColor: theme || '#37352f' }}
    >
      <div className="container mx-auto flex items-center gap-4">
        {logoUrl && (
          <img 
            src={logoUrl} 
            alt="Logo" 
            className="h-8 w-auto"
          />
        )}
        <h1 className="text-xl font-semibold">
          {title || 'DocStar'}
        </h1>
      </div>
    </header>
  );
}
  