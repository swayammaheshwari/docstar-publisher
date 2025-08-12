
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

export default async function Home() {
  let sidebarData = "";
  let mainData = "";

  try {
    const [sidebarRes, mainRes] = await Promise.all([
      fetch("http://localhost:2000/p/getSideBarData?collectionId=DMpXizA8GSFb", {
        cache: "no-store",
      }),
      fetch("http://localhost:2000/p/getPublishedDataByPath?collectionId=DMpXizA8GSFb", {
        cache: "no-store",
      }),
    ]);

    if (!sidebarRes.ok || !mainRes.ok) {
      console.error("💥 Layout fetch failed");
    }

    [sidebarData, mainData] = await Promise.all([sidebarRes.text(), mainRes.text()]);
  } catch (err) {
    console.error("💥 Layout fetch failed", err);
  }

  return (
    <>
      <Header />
      <div style={{ display: "flex", minHeight: "80vh" }}>
        <Sidebar data={sidebarData} />
        <Main data={mainData} />
      </div>
      <Footer />
    </>
  );
}
