const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export async function mintToken(to: string, id: number, amount: number) {
  const res = await fetch(`${API_URL}/mint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, id, amount }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Mint failed");
  }
  return res.json() as Promise<{ success: boolean; txHash: string; message: string }>;
}

export async function getBalance(address: string, id: number) {
  const res = await fetch(`${API_URL}/balance/${address}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch balance");
  return res.json() as Promise<{ address: string; tokenId: string; balance: string }>;
}
