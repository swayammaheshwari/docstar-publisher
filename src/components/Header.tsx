//app/components/Header.tsx

export default function Header({ sidebarData }: { sidebarData: any }) {

  const collection = Object.values(sidebarData.collections)[0];

  return (
    <header style={{ padding: '1rem', background: '#eee' }}>
      {/* <h1>{collection.name}</h1> */}
    </header>
  );
}
