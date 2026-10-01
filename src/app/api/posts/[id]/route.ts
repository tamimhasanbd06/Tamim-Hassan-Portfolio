import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { cleanText, validateHttpUrl, validateImageValue } from "@/lib/content-security";
import { ensurePostSchema, getDb } from "@/lib/db";
type RouteContext={params:Promise<{id:string}>};
export async function PATCH(request:NextRequest,context:RouteContext){
  try{
    if(!isAdminRequest(request)) return NextResponse.json({success:false,message:"Admin login required."},{status:401});
    await ensurePostSchema(); const {id}=await context.params; const body=await request.json();
    const title=cleanText(body.title,200), content=cleanText(body.content,10000);
    const imageUrl=body.imageUrl?validateImageValue(body.imageUrl):null; const linkUrl=body.linkUrl?validateHttpUrl(body.linkUrl):null;
    if(!content&&!imageUrl&&!linkUrl) return NextResponse.json({success:false,message:"Add text, an image, or a link."},{status:400});
    if(body.imageUrl&&!imageUrl) return NextResponse.json({success:false,message:"Invalid image or image is too large."},{status:400});
    if(body.linkUrl&&!linkUrl) return NextResponse.json({success:false,message:"Enter a valid http(s) link."},{status:400});
    const sql=getDb(); const rows=await sql`UPDATE posts SET title=${title},content=${content},image_url=${imageUrl},link_url=${linkUrl} WHERE id=${id} RETURNING id`;
    if(!rows.length) return NextResponse.json({success:false,message:"Post not found."},{status:404});
    return NextResponse.json({success:true});
  }catch(error){console.error(error);return NextResponse.json({success:false,message:"Could not update post."},{status:500});}
}
export async function DELETE(request:NextRequest,context:RouteContext){
  try{if(!isAdminRequest(request)) return NextResponse.json({success:false,message:"Admin login required."},{status:401}); await ensurePostSchema(); const {id}=await context.params; const sql=getDb(); const rows=await sql`DELETE FROM posts WHERE id=${id} RETURNING id`; if(!rows.length) return NextResponse.json({success:false,message:"Post not found."},{status:404}); return NextResponse.json({success:true});}catch(error){console.error(error);return NextResponse.json({success:false,message:"Could not delete post."},{status:500});}
}
