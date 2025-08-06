import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Main({ data }: { data: any }) {
  const { name, contents } = data.publishedContent || {};

  return (
    <main className="flex-1 p-6">
      <Card className="prose max-w-none">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">{name}</h1>
          <Separator className="mb-4" />
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: contents || `<p>🚧 No content available yet.</p>`,
            }}
          />
        </CardContent>
      </Card>
    </main>
  );
}
