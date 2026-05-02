import { Resend } from 'resend';

// Email is optional — Resend is initialized only if API key is present
let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

interface OrderDetails {
  paymentIntentId: string;
  option: number;
  quantity: number;
  unitPrice: number;
  total: number;
  shipping: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    address: string;
    city: string;
    postalCode: string;
    courierNote?: string;
  };
  customizations: Array<{
    photoUrl?: string;
    features: string;
    clothingChoice: 'upload' | 'describe';
    clothingPhotoUrl?: string;
    clothingDescription?: string;
    additionalNotes?: string;
  }>;
}

export async function sendOrderConfirmation(order: OrderDetails) {
  if (!resend) {
    console.log('Email skipped — RESEND_API_KEY not configured');
    return { success: true };
  }
  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM || 'solnichki@gmail.com',
    to: ['solnichki@gmail.com'],
    subject: `Нова поръчка #${order.paymentIntentId.slice(-8)} — ${order.quantity} снички`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: 'Manrope', sans-serif; background: #f5f1e6; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            h1 { font-family: 'Cormorant Garamond', serif; color: #044465; font-size: 28px; margin-bottom: 24px; }
            h2 { font-family: 'Cormorant Garamond', serif; color: #0A699D; font-size: 20px; margin-top: 24px; margin-bottom: 12px; }
            p { color: #333; line-height: 1.6; }
            .label { font-weight: 600; color: #044465; }
            .note { font-size: 14px; color: #666; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🫙 Нова поръчка от Солнички</h1>

            <p><strong>ID на плащането:</strong> ${order.paymentIntentId}</p>
            <p><strong>Продукт:</strong> ${order.quantity} солнички — €${order.total.toFixed(2)}</p>

            <h2>Доставка</h2>
            <p>${order.shipping.fullName}</p>
            <p>${order.shipping.address}</p>
            <p>${order.shipping.city}, ${order.shipping.postalCode}</p>
            <p>${order.shipping.country}</p>
            <p>📞 ${order.shipping.phone}</p>
            <p>✉️ ${order.shipping.email}</p>
            ${order.shipping.courierNote ? `<p><em>Бележка за куриер: ${order.shipping.courierNote}</em></p>` : ''}

            <h2>Персонализация</h2>
            ${order.customizations.map((c, i) => `
              <div style="margin-bottom: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px;">
                <strong>Солничка ${i + 1}:</strong>
                <p><span class="label">Характерни черти:</span> ${c.features}</p>
                ${c.clothingChoice === 'upload'
                  ? '<p><span class="label">Снимка на облекло:</span> Качено (виж прикрепено)</p>'
                  : `<p><span class="label">Описание на облекло:</span> ${c.clothingDescription || '—'}</p>`
                }
                ${c.additionalNotes ? `<p><span class="label">Допълнителни бележки:</span> ${c.additionalNotes}</p>` : ''}
              </div>
            `).join('')}

            <div class="note">
              <p>⏱️ Време за изработка: до 6 работни дни след плащане.</p>
              <p>📧 Този имейл е генериран автоматично. Отговорът не се наблюдава.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    attachments: order.customizations
      .filter(c => c.photoUrl)
      .map((c, i) => ({ filename: `person-${i + 1}.jpg`, content: c.photoUrl })),
  });

  if (result.error) {
    console.error('Failed to send order email:', result.error);
    return { success: false, error: result.error.message || 'Failed to send email' };
  }

  console.log('Order confirmation email sent:', order.paymentIntentId);
  return { success: true };
}
