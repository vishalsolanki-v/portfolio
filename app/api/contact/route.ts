import clientPromise from "@/lib/mongodb"
import { sendEmail } from "@/lib/mail"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // ✅ Validate input
    const { name, email, message } = body
    
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // 1️⃣ Store in MongoDB
    const client = await clientPromise
    const db = client.db("vishaldevflow") // replace with your DB name
    const collection = db.collection("portfolio")
    await collection.insertOne({ name, email, message, createdAt: new Date() })

    // 2️⃣ Send email notification
    await sendEmail(
      "vishalsolankiinfo@gmail.com", // replace with your email
      "New Contact Form Portfolio",
      `You have a new submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    )

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    
    return new Response(
      JSON.stringify({ ok: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

