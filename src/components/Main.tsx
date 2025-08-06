export default async function Main({ data }: { data: string }) {
    return (
        <main style={{ flex: 1, padding: '1rem' }}>
            <h2>📄 Main Content</h2>
            <pre>{data}</pre>
        </main>
    );
}
