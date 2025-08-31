import {auth} from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);