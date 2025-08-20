interface FooterProps {
  defaultFooter?: string;
  theme?: string;
}

export default function Footer({ defaultFooter, theme }: FooterProps) {
  // If defaultFooter HTML is provided, render it
  if (defaultFooter) {
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: defaultFooter }}
        style={{ backgroundColor: theme || '#f8f9fa' }}
      />
    );
  }

  // Fallback footer
  return (
    <footer 
      className="bg-gray-100 text-gray-600 p-4 border-t"
      style={{ backgroundColor: theme || '#f8f9fa' }}
    >
      <div className="container mx-auto text-center">
        <p>© 2025 – Built with DocStar</p>
      </div>
    </footer>
  );
}
  