import { type NextRequest } from "next/server";
import db from "../../../db";
import { arrayContains, ilike, or, sql } from "drizzle-orm";
import { advocates } from "@/db/schema";

const DEFAULT_LIMIT = 5;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const offsetParam = searchParams.get('offset');
  const limitParam = searchParams.get('limit');
  const queryString = searchParams.get('queryString');
  const offset = offsetParam ? parseInt(offsetParam, 10) : 0;
  const limit = limitParam ? parseInt(limitParam, 10) : DEFAULT_LIMIT;

  const data = await db.query.advocates.findMany({
    limit,
    offset,
    ...(queryString ? {
      where: or(
        ilike(advocates.firstName, `%${queryString}%`),
        ilike(advocates.lastName, `%${queryString}%`),
        ilike(advocates.city,`%${queryString}%`),
        ilike(advocates.degree,`%${queryString}%`)
      )
    } : {})
  });

  return Response.json({ data });
}
