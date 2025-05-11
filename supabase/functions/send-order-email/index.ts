// @deno-types="npm:@types/nodemailer"
import { createTransport } from "npm:nodemailer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface OrderItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
  size?: string;
  variant?: {
    name: string;
  };
}

interface OrderDetails {
  items: OrderItem[];
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
  total: number;
}

// Configure SMTP settings
const smtpConfig = {
  service: 'gmail',
  auth: {
    user: "jihanahmed486@gmail.com",
    pass: "uuql vcoh jlmg jpcm"
  }
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderDetails } = await req.json() as { orderDetails: OrderDetails };

    const transporter = createTransport(smtpConfig);

    const itemsList = orderDetails.items
      .map(
        (item) =>
          `${item.product.name} ${
            item.variant ? `(${item.variant.name})` : ""
          } ${
            item.size ? `- Size: ${item.size}` : ""
          } - Quantity: ${item.quantity} - Price: ৳${item.product.price * item.quantity}`
      )
      .join("\n");

    const emailContent = `
New Order Received!

Order Details:
-------------
Customer Information:
Name: ${orderDetails.shipping.firstName} ${orderDetails.shipping.lastName}
Email: ${orderDetails.shipping.email}
Phone: ${orderDetails.shipping.phone}
Address: ${orderDetails.shipping.address}
City: ${orderDetails.shipping.city}
Postal Code: ${orderDetails.shipping.postalCode}

Payment Method: ${orderDetails.paymentMethod}

Items Ordered:
-------------
${itemsList}

Total Amount: ৳${orderDetails.total}
    `;

    await transporter.sendMail({
      from: "jihanahmed486@gmail.com",
      to: "jihanahmed486@gmail.com",
      subject: "New Order Received - Hena's Collection",
      text: emailContent,
    });

    return new Response(
      JSON.stringify({ message: "Order notification sent successfully" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send order notification", 
        details: error.message 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});