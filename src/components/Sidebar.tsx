import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Page = {
    id: string;
    name: string;
    urlName: string;
    parentId: string | null;
    child: string[];
    type: number;
};

type Collection = {
    id: string;
    name: string;
    rootParentId: string;
};

type SidebarProps = {
    data: {
        pages: Record<string, Page>;
        collections: Record<string, Collection>;
    };
};

const RenderPage = ({ page, pages }: { page: Page; pages: Record<string, Page> }) => {
    const children = (page.child || [])
        .map((childId) => pages[childId])
        .filter((child) => child && child.type !== 0);

    if (children.length > 0) {
        return (
            <AccordionItem value={page.id}>
                <AccordionTrigger>{page.name}</AccordionTrigger>
                <AccordionContent>
                    <div className="pl-4">
                        {children.map((child) => (
                            <RenderPage key={child.id} page={child} pages={pages} />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <div className="pl-4 py-1">
            <a href={`/${page.urlName}`} className="text-sm hover:underline">
                {page.name}
            </a>
        </div>
    );
};

export default function Sidebar({ data }: SidebarProps) {
    const { pages, collections } = data;

    const collectionList = Object.values(collections);
    if (collectionList.length === 0) return null;

    const collection = collectionList[0];
    const root = pages[collection.rootParentId];

    const rootChildren = (root?.child || [])
        .map((id) => pages[id])
        .filter((page) => page && page.type !== 0);

    return (
        <aside className="w-[25%] p-4 bg-gray-100 border-r h-full overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">🧭 Sidebar</h3>
            <Accordion type="multiple" className="w-full">
                {rootChildren.map((page) => (
                    <RenderPage key={page.id} page={page} pages={pages} />
                ))}
            </Accordion>
        </aside>
    );
}
