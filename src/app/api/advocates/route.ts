import { type NextRequest } from "next/server";
import db from "../../../db";

const DEFAULT_LIMIT = 5;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const offsetParam = searchParams.get('offset');
  const limitParam = searchParams.get('limit');
  const offset = offsetParam ? parseInt(offsetParam, 10) : 0;
  const limit = limitParam ? parseInt(limitParam, 10) : DEFAULT_LIMIT;

  const data = await db.query.advocates.findMany({
    limit,
    offset
  });

  return Response.json({ data });
}
