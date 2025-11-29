import type { APIRoute } from 'astro';
import { siteConfig } from '../../config';

export const POST: APIRoute = async ({ request, clientAddress }) => {
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
        return new Response(JSON.stringify({ error: 'RESEND_API_KEY is not set' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Attempt to get location from Vercel headers
    const city = request.headers.get('x-vercel-ip-city');
    const country = request.headers.get('x-vercel-ip-country');
    const ip = request.headers.get('x-forwarded-for') || clientAddress;

    let locationString = "Location: Unknown";

    if (city && country) {
        locationString = `Location: ${city}, ${country}`;
    } else if (ip && ip !== '::1' && ip !== '127.0.0.1') {
        try {
            // Fallback to IP-based geolocation for non-Vercel environments
            const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
            const geoData = await geoRes.json();
            if (geoData.status === 'success') {
                locationString = `Location: ${geoData.city}, ${geoData.country}`;
            }
        } catch (e) {
            console.error("Failed to resolve IP location", e);
        }
    } else {
        locationString = "Location: Localhost / Development";
    }

    try {
        console.log("Attempting to send email with key length:", RESEND_API_KEY?.length);
        console.log("Detected info:", locationString, "IP:", ip);

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'Portfolio Notification <onboarding@resend.dev>',
                to: siteConfig.social.alertEmail,
                subject: 'New Portfolio Visit',
                html: `
                    <h2>New Visitor Detected!</h2>
                    <p>Someone has opened your portfolio site.</p>
                    <p><strong>${locationString}</strong></p>
                    <p><small>IP Address: ${ip}</small></p>
                `,
            }),
        });

        const data = await res.json();
        console.log("Resend API Response:", res.status, JSON.stringify(data));

        if (!res.ok) {
            return new Response(JSON.stringify(data), {
                status: res.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Fetch error:", error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
