import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Declared here rather than via vercel.json "functions", whose glob has to
// match the compiled output and fails the deploy when it doesn't.
export const maxDuration = 30;
export const runtime = 'nodejs';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/** Escape user-supplied text before it is interpolated into the email HTML. */
function esc(value: unknown): string {
  if (value === undefined || value === null || value === '') return '—';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function rows(entries: [string, unknown][]): string {
  return `<table style="width: 100%; border-collapse: collapse;">${entries
    .map(
      ([label, value]) =>
        `<tr><td style="padding: 8px 0; color: #666; width: 160px; vertical-align: top;">${esc(
          label
        )}</td><td style="padding: 8px 0; color: #111;">${esc(value)}</td></tr>`
    )
    .join('')}</table>`;
}

function shell(heading: string, inner: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #111; padding: 32px; border-radius: 16px; border: 1px solid #eee;">
      <h1 style="color: #E21F26; font-size: 22px; margin-bottom: 24px;">${heading}</h1>
      ${inner}
      <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
      <p style="color: #999; font-size: 12px;">Sefaköy Final LGS Dershanesi — Web Sitesi Formu</p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...data } = body;

    let subject = '';
    let html = '';

    if (type === 'analysis') {
      subject = `📋 Yeni Ön Görüşme Talebi — ${data.path === 'existing' ? 'Kayıtlı Öğrenci Velisi' : 'Yeni Kayıt'}`;
      html = shell(
        '📋 Yeni Ön Görüşme Talebi',
        `
          <p style="color: #555; margin-bottom: 24px;"><strong style="color: #111;">Talep tipi:</strong> ${esc(
            data.path === 'existing' ? 'Kayıtlı öğrenci velisi' : 'Yeni kayıt'
          )}</p>
          ${
            data.path === 'existing'
              ? rows([
                  ['Web Sitesi', data.website],
                  ['Ad Soyad', data.name],
                  ['E-posta', data.email],
                  ['Telefon', data.phone],
                ])
              : rows([
                  ['İlgi Alanı / Sınıf', data.sector],
                  ['Detay', data.projectDetail],
                  ['İlgilenilen Programlar', (data.services || []).join(', ')],
                  ['Ad Soyad', data.name],
                  ['E-posta', data.email],
                  ['Telefon', data.phone],
                ])
          }
          <h2 style="color: #E21F26; font-size: 16px; margin-top: 24px;">Talep / Mesaj</h2>
          <p style="background: #faf7f7; padding: 16px; border-radius: 8px; color: #111; border-left: 3px solid #E21F26; white-space: pre-line;">${esc(
            data.request
          )}</p>
        `
      );
    } else {
      // Contact page, LetsWork section and the /form ad-campaign landing page.
      subject = data.subject
        ? `📝 ${data.subject}`
        : `💬 Yeni İletişim Mesajı — ${data.name || 'İsimsiz'}`;
      html = shell(
        data.subject ? `📝 ${esc(data.subject)}` : '💬 Yeni İletişim Mesajı',
        `
          ${rows([
            ['Ad Soyad', data.name],
            ['E-posta', data.email],
            ['Telefon', data.phone],
          ])}
          <h2 style="color: #E21F26; font-size: 16px; margin-top: 24px;">Mesaj</h2>
          <p style="background: #faf7f7; padding: 16px; border-radius: 8px; color: #111; border-left: 3px solid #E21F26; white-space: pre-line;">${esc(
            data.message
          )}</p>
        `
      );
    }

    await transporter.sendMail({
      from: '"Sefaköy Final LGS Dershanesi" <sefakoy.finalabd@gmail.com>',
      to: 'sefakoy.finalabd@gmail.com',
      subject,
      html,
    });

    // Deliberately not logging `data` — it holds names, phone numbers and
    // e-mail addresses that should not end up in the platform logs.
    console.log('[Contact API] Email sent:', subject);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API] Error:', err);
    // Don't surface SMTP internals to the browser.
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
