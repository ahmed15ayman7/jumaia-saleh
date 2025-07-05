
// import { promises as fs } from "fs";
// import path from "path";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const { locale, namePage, titleKey, descKey, titleValue, descValue } = body;

//   try {
//     const filePath = path.join(process.cwd(), "messages", `${locale}.json`);
//     const file = await fs.readFile(filePath, "utf-8");
//     const data = JSON.parse(file);

//     // تأكد من أن المفتاح موجود
//     if (!data[namePage]) data[namePage] = {};

//     // أضف العناوين الجديدة
//     data[namePage][titleKey.split(".")[0]] = {"title": titleValue, "desc": descValue};

//     // احفظ الملف بعد التعديل
//     await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error updating file:", error);
//     return NextResponse.json({ success: false, error: "Failed to write to file" }, { status: 500 });
//   }
// }
// export async function DELETE(req: NextRequest) {
//   const body = await req.json();
//   const { locale, namePage, titleKey } = body;
//   try {
//     const filePath = path.join(process.cwd(), "messages", `${locale}.json`);
//     const file = await fs.readFile(filePath, "utf-8");
//     const data = JSON.parse(file);
//     delete data[namePage][titleKey.split(".")[0]];
//     await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     return NextResponse.json({ success: false, error: "Failed to delete file" }, { status: 500 });
//   }
// }
