// 空殼首頁：Conduit 嘅頁面（Home、Login、Editor…）要你自己寫。
export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 32 }}>
      <h1>Hello RealWorld 👋</h1>
      <p>API: {process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api'}</p>
    </main>
  );
}
