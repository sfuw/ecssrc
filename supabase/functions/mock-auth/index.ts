import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/mock-auth/, "");

  try {
    // POST /login
    if (req.method === "POST" && path === "/login") {
      const { username, password } = await req.json();

      const { data, error } = await supabase.rpc("verify_mock_user", {
        p_username: username,
        p_password: password,
      });

      if (error || !data) {
        return new Response(
          JSON.stringify({ errors: [{ message: "Invalid username or password." }] }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const userId: number = data;

      // Create session token
      const { data: session, error: sessionError } = await supabase
        .from("mock_sessions")
        .insert({ user_id: userId })
        .select("token")
        .single();

      if (sessionError || !session) {
        return new Response(
          JSON.stringify({ errors: [{ message: "Failed to create session." }] }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ token: session.token, userId }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /me?token=...
    if (req.method === "GET" && path === "/me") {
      const token = url.searchParams.get("token") || req.headers.get("x-session-token");

      if (!token) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: session } = await supabase
        .from("mock_sessions")
        .select("user_id, expires_at, mock_users(id, username)")
        .eq("token", token)
        .gt("expires_at", new Date().toISOString())
        .single();

      if (!session) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const user = session.mock_users as { id: number; username: string };
      return new Response(
        JSON.stringify({ id: user.id, name: user.username }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
