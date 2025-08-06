export default async function Sidebar({ data }: { data: string }) {
    return (
        <aside style={{ width: '25%', padding: '1rem', background: '#f3f3f3' }}>
            <h3>🧭 Sidebar</h3>
            <pre>{data}</pre>
        </aside>
    );
}
