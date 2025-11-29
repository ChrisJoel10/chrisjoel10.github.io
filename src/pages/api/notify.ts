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
