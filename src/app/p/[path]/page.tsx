

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import ThemeToggle from "@/components/ThemeToggle";

interface DocProperties {
  defaultTitle: string;
  defaultLogoUrl: string;
  defaultHeader: string;
  defaultFooter: string;
  cta: any[];
  links: any[];
  visibleComponents: Record<string, boolean>;
  viewType: number;
  pageTextColor: string;
  backgroundColor: string;
  chatBotConfig: Record<string, any>;
  titleFont: string;
  contentFont: string;
  additionalLanguage: string[];
  languages: string[];
  theme: string;
}

interface Collection {
  id: string;
  name: string;
  description: string | null;
  orgId: string;
  isPublic: boolean;
  customDomain: string | null;
  docProperties: DocProperties;
  gtmId: string | null;
  theme: string;
  environment: string | null;
  favicon: string;
  defaultView: string;
  createdBy: number;
  updatedBy: number;
  path: string | null;
  meta: Record<string, any>;
  type: string;
  rootParentId: string;
}

interface SidebarApiData {
  collections: Record<string, Collection>;
  pages: Record<string, any>;
}

export default async function Home({
  params,
  searchParams,
}: {
  params: { path: string };
  searchParams: { collectionId?: string };
}) {
  let sidebarApiData: SidebarApiData | null = null;
  let mainData = "";
  let docProperties: DocProperties | null = null;

  const collectionId = searchParams.collectionId;
  const path = decodeURIComponent(params.path);

  if (!collectionId) {
    return (
      <>
        <Header />
        <div style={{ display: "flex", minHeight: "80vh", alignItems: "center", justifyContent: "center" }}>
          <p>Collection ID is required. Please provide ?collectionId in the URL.</p>
        </div>
        <Footer />
      </>
    );
  }

  try {
    const [sidebarRes, mainRes] = await Promise.all([
      fetch(`http://localhost:2000/p/getSideBarData?collectionId=${collectionId}`, {
        cache: "no-store",
      }),
      fetch(`http://localhost:2000/p/getPublishedDataByPath?collectionId=${collectionId}&path=${encodeURIComponent(path)}`, {
        cache: "no-store",
      }),
    ]);

    if (!sidebarRes.ok || !mainRes.ok) {
      console.error("💥 Layout fetch failed");
    }

    const [sidebarText, mainText] = await Promise.all([sidebarRes.text(), mainRes.text()]);
    
    // Parse sidebar data to extract docProperties
    try {
      sidebarApiData = JSON.parse(sidebarText);
      if (sidebarApiData?.collections?.[collectionId]) {
        docProperties = sidebarApiData.collections[collectionId].docProperties;
      }
    } catch (parseError) {
      console.error("Failed to parse sidebar data:", parseError);
    }
    
    mainData = mainText;
  } catch (err) {
    console.error("💥 Layout fetch failed", err);
  }

  return (
    <>
      <Header 
        defaultHeader={docProperties?.defaultHeader} 
        theme={docProperties?.theme}
        logoUrl={docProperties?.defaultLogoUrl}
        title={docProperties?.defaultTitle}
      />
      <div style={{ display: "flex", minHeight: "80vh" }}>
        <Sidebar data={sidebarApiData ? JSON.stringify(sidebarApiData) : ""} />
        <Main data={mainData} />
      </div>
      <Footer 
        defaultFooter={docProperties?.defaultFooter}
        theme={docProperties?.theme}
      />
      <ThemeToggle />
    </>
  );
}
