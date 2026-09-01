import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { messageId } = await req.json();

    if (!messageId) {
      throw new Error("messageId is required.");
    }

    const supabaseUrl =
      Deno.env.get("SUPABASE_URL");

    const serviceRoleKey =
      Deno.env.get(
        "SUPABASE_SERVICE_ROLE_KEY"
      );

    const resendApiKey =
      Deno.env.get("RESEND_API_KEY");

    const emailFrom =
      Deno.env.get(
        "CONTACT_EMAIL_FROM"
      );

    const officeEmail =
      Deno.env.get(
        "CONTACT_OFFICE_EMAIL"
      );

    if (
      !supabaseUrl ||
      !serviceRoleKey ||
      !resendApiKey ||
      !emailFrom ||
      !officeEmail
    ) {
      throw new Error(
        "Missing Edge Function environment variables."
      );
    }

    const admin = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    // Get the saved inquiry
    const {
      data: inquiry,
      error: inquiryError,
    } = await admin
      .from("contact_messages")
      .select(
        `
        id,
        first_name,
        last_name,
        email,
        subject,
        message,
        created_at
      `
      )
      .eq("id", messageId)
      .single();

    if (inquiryError || !inquiry) {
      console.error(
        "Inquiry error:",
        inquiryError
      );

      throw new Error(
        "Could not retrieve inquiry."
      );
    }

    const firstName =
      escapeHtml(
        inquiry.first_name
      );

    const lastName =
      escapeHtml(
        inquiry.last_name
      );

    const visitorEmail =
      escapeHtml(
        inquiry.email
      );

    const subject =
      escapeHtml(
        inquiry.subject
      );

    const message =
      escapeHtml(
        inquiry.message
      ).replaceAll("\n", "<br />");

    const submittedAt =
      inquiry.created_at
        ? new Date(
          inquiry.created_at
        ).toLocaleString(
          "en-PH",
          {
            timeZone:
              "Asia/Manila",
            dateStyle:
              "medium",
            timeStyle:
              "short",
          }
        )
        : "";

    // Send ONLY to the office
    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${resendApiKey}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          from: emailFrom,

          to: [
            officeEmail,
          ],

          // Clicking Reply in Gmail
          // will reply to the visitor.
          reply_to:
            inquiry.email,

          subject:
            `New Website Inquiry: ${inquiry.subject}`,

          html: `
            <div
              style="
                background:#f8fafc;
                padding:32px 16px;
                font-family:Arial,sans-serif;
                color:#334155;
              "
            >
              <div
                style="
                  max-width:620px;
                  margin:0 auto;
                  background:#ffffff;
                  border:1px solid #e2e8f0;
                  border-radius:18px;
                  overflow:hidden;
                "
              >

                <div
                  style="
                    background:#003F6A;
                    padding:24px 28px;
                  "
                >
                  <div
                    style="
                      color:#ffffff;
                      font-size:20px;
                      font-weight:700;
                    "
                  >
                    DOST Innovation Hubs
                  </div>

                  <div
                    style="
                      color:#bae6fd;
                      font-size:13px;
                      margin-top:4px;
                    "
                  >
                    New Website Inquiry
                  </div>
                </div>

                <div
                  style="
                    padding:28px;
                  "
                >

                  <h2
                    style="
                      color:#003F6A;
                      font-size:19px;
                      margin:0 0 22px;
                    "
                  >
                    ${subject}
                  </h2>

                  <table
                    style="
                      width:100%;
                      border-collapse:collapse;
                      margin-bottom:22px;
                    "
                  >
                    <tr>
                      <td
                        style="
                          width:90px;
                          padding:6px 0;
                          color:#94a3b8;
                          font-size:13px;
                        "
                      >
                        From
                      </td>

                      <td
                        style="
                          padding:6px 0;
                          color:#334155;
                          font-size:14px;
                          font-weight:600;
                        "
                      >
                        ${firstName} ${lastName}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:6px 0;
                          color:#94a3b8;
                          font-size:13px;
                        "
                      >
                        Email
                      </td>

                      <td
                        style="
                          padding:6px 0;
                          color:#334155;
                          font-size:14px;
                        "
                      >
                        ${visitorEmail}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:6px 0;
                          color:#94a3b8;
                          font-size:13px;
                        "
                      >
                        Submitted
                      </td>

                      <td
                        style="
                          padding:6px 0;
                          color:#334155;
                          font-size:14px;
                        "
                      >
                        ${submittedAt}
                      </td>
                    </tr>
                  </table>

                  <div
                    style="
                      font-size:11px;
                      font-weight:700;
                      text-transform:uppercase;
                      letter-spacing:.06em;
                      color:#94a3b8;
                      margin-bottom:8px;
                    "
                  >
                    Message
                  </div>

                  <div
                    style="
                      padding:18px;
                      background:#f8fafc;
                      border:1px solid #e2e8f0;
                      border-radius:12px;
                      color:#475569;
                      font-size:14px;
                      line-height:1.7;
                    "
                  >
                    ${message}
                  </div>

                  <p
                    style="
                      margin-top:20px;
                      margin-bottom:0;
                      color:#94a3b8;
                      font-size:12px;
                    "
                  >
                    Reply to this email to respond directly to ${firstName}.
                  </p>

                </div>
              </div>
            </div>
          `,
        }),
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      console.error(
        "Resend error:",
        result
      );

      throw new Error(
        result?.message ||
        "Email notification failed."
      );
    }

    console.log(
      "Inquiry notification sent:",
      result
    );

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error.",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  }
});