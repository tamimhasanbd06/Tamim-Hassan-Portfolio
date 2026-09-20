import { notFound, redirect } from "next/navigation";
import SectionManager from "@/components/dashboard/SectionManager";
import { CONTENT_SECTIONS, isContentSection } from "@/lib/content-config";

type Props={params:Promise<{section:string}>};
export default async function DashboardSectionPage({params}:Props){const {section}=await params;if(section==='posts')redirect('/dashboard/posts');if(!isContentSection(section))notFound();return <SectionManager section={section} label={CONTENT_SECTIONS[section].label}/>}
