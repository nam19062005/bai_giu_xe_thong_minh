html = r"""<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Architecture Diagrams - HCMUT Parking</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',sans-serif;background:#0f172a;color:#e2e8f0;padding:20px}
h1{text-align:center;padding:24px 0 6px;font-size:24px;color:#f8fafc}
.sub{text-align:center;color:#64748b;font-size:13px;margin-bottom:40px}
.sec{max-width:1100px;margin:0 auto 60px}
.sec-title{font-size:18px;font-weight:700;padding:12px 20px;border-radius:10px;
  background:#1e293b;border-left:4px solid #3b82f6;color:#f1f5f9;margin-bottom:24px}
.wrap{background:#1e293b;border-radius:16px;padding:28px;border:1px solid #334155}

/* DEPLOYMENT */
.tier{display:flex;gap:12px;margin-bottom:12px;align-items:stretch;flex-wrap:wrap}
.tier-lbl{writing-mode:vertical-rl;font-size:10px;font-weight:700;letter-spacing:2px;
  color:#475569;text-transform:uppercase;min-width:26px;text-align:center;padding:6px 0}
.tier-nodes{display:flex;gap:12px;flex:1;flex-wrap:wrap}
.node{border-radius:10px;padding:14px 18px;border:2px solid;flex:1;min-width:180px}
.node-title{font-weight:700;font-size:13px;margin-bottom:8px}
.node-body{font-size:11px;color:#94a3b8;line-height:1.8}
.node-body b{color:#cbd5e1}
.nc{background:#1e3a5f;border-color:#3b82f6}.nc .node-title{color:#60a5fa}
.ns{background:#1a2a1a;border-color:#22c55e}.ns .node-title{color:#4ade80}
.np{background:#2d1b4e;border-color:#a855f7}.np .node-title{color:#c084fc}
.nb{background:#1f2937;border-color:#f59e0b}.nb .node-title{color:#fbbf24}
.ni{background:#1c2a2a;border-color:#06b6d4}.ni .node-title{color:#22d3ee}
.arr{display:flex;align-items:center;justify-content:center;gap:10px;margin:4px 0}
.arr-lbl{font-size:11px;color:#475569}
.arr-line{flex:1;height:1px;max-width:200px;background:#334155;position:relative}
.arr-line::after{content:'▶';position:absolute;right:-8px;top:-8px;color:#475569;font-size:11px}
.note{margin-top:16px;padding:12px 16px;background:#0f172a;border-radius:8px;
  border:1px solid #1e293b;font-size:11px;color:#64748b;line-height:1.8}
.note b{color:#94a3b8}
.legend{display:flex;gap:20px;flex-wrap:wrap;margin-top:14px}
.leg-item{display:flex;align-items:center;gap:6px;font-size:11px;color:#64748b}
.leg-dot{width:10px;height:10px;border-radius:50%}

/* DEVELOPMENT */
.comp-grid{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start}
.pkg{border-radius:10px;border:2px solid;padding:14px;flex:1;min-width:180px}
.pkg-title{font-size:13px;font-weight:700;margin-bottom:10px}
.ci{background:rgba(255,255,255,0.04);border-radius:6px;padding:7px 10px;
  margin-bottom:6px;font-size:11px;border-left:3px solid}
.cn{font-weight:600;color:#e2e8f0}
.cd{font-size:10px;color:#64748b;margin-top:2px;line-height:1.5}
.p1{border-color:#3b82f6}.p1 .pkg-title{color:#60a5fa}.p1 .ci{border-left-color:#3b82f6}
.p2{border-color:#a855f7}.p2 .pkg-title{color:#c084fc}.p2 .ci{border-left-color:#a855f7}
.p3{border-color:#22c55e}.p3 .pkg-title{color:#4ade80}.p3 .ci{border-left-color:#22c55e}
.p4{border-color:#f59e0b}.p4 .pkg-title{color:#fbbf24}.p4 .ci{border-left-color:#f59e0b}
.p5{border-color:#06b6d4}.p5 .pkg-title{color:#22d3ee}.p5 .ci{border-left-color:#06b6d4}
.p6{border-color:#ef4444}.p6 .pkg-title{color:#f87171}.p6 .ci{border-left-color:#ef4444}
.flow{display:flex;align-items:center;flex-wrap:wrap;gap:0;margin-bottom:20px;
  justify-content:center}
.fb{background:#1e293b;border:1px solid #334155;border-radius:6px;
  padding:6px 12px;font-size:11px;font-weight:600}
.fa{font-size:16px;color:#475569;margin:0 4px}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
.tag{font-size:10px;padding:3px 10px;border-radius:20px;border:1px solid;font-weight:600}
.t1{background:#1e293b;border-color:#3b82f6;color:#60a5fa}
.t2{background:#1e293b;border-color:#a855f7;color:#c084fc}
.t3{background:#1e293b;border-color:#22c55e;color:#4ade80}
.t4{background:#1e293b;border-color:#f59e0b;color:#fbbf24}
.t5{background:#1e293b;border-color:#ef4444;color:#f87171}
.dep-flow{margin-top:20px;padding:16px;background:#0f172a;border-radius:8px;border:1px solid #1e293b}
.dep-title{font-size:12px;font-weight:700;color:#94a3b8;margin-bottom:10px}
</style>
</head>
<body>
<h1>🏗️ Kiến trúc Hệ thống Bãi đỗ xe Thông minh HCMUT</h1>
<p class="sub">Login System Integration — Deployment View &amp; Development View</p>

<!-- ========== DEPLOYMENT VIEW ========== -->
<div class="sec">
  <div class="sec-title">📡 1. Biểu đồ Triển khai (Deployment View)</div>
  <div class="wrap">

    <div class="tier">
      <div class="tier-lbl" style="color:#3b82f6">Người<br>dùng</div>
      <div class="tier-nodes">
        <div class="node nc">
          <div class="node-title">💻 Máy tính / PC</div>
          <div class="node-body">
            <b>Browser:</b> Chrome / Firefox / Edge<br>
            <b>Runtime:</b> React 18 SPA (JS engine)<br>
            <b>OS:</b> Windows / macOS / Linux<br>
            <b>URL:</b> https://parking.hcmut.edu.vn/
          </div>
        </div>
        <div class="node nc">
          <div class="node-title">📱 Thiết bị Di động</div>
          <div class="node-body">
            <b>Browser:</b> Safari / Chrome Mobile<br>
            <b>Runtime:</b> Cùng SPA bundle<br>
            <b>UI:</b> Responsive layout (Tailwind)<br>
            <b>OS:</b> iOS / Android
          </div>
        </div>
      </div>
    </div>

    <div class="arr">
      <div class="arr-line"></div>
      <div class="arr-lbl">HTTPS / TLS 1.3 (Port 443)</div>
      <div class="arr-line" style="transform:scaleX(-1)"></div>
    </div>

    <div class="tier">
      <div class="tier-lbl" style="color:#22c55e">Static<br>Server</div>
      <div class="tier-nodes">
        <div class="node ns" style="flex:2">
          <div class="node-title">🌐 Web / CDN Server</div>
          <div class="node-body">
            <b>Software:</b> Nginx / Vercel / Netlify<br>
            <b>Serves:</b> dist/index.html (0.52KB) + dist/assets/index.js (279KB) + dist/assets/index.css (97KB)<br>
            <b>Build:</b> Vite 6.3.5 — <code>npm run build</code><br>
            <b>Cache:</b> Content-hash filenames (immutable assets)<br>
            <b>Port:</b> 443 (HTTPS) / 80 → redirect 443
          </div>
        </div>
      </div>
    </div>

    <div class="arr">
      <div class="arr-line"></div>
      <div class="arr-lbl">REST API / OAuth / MQTT (kế hoạch tích hợp)</div>
      <div class="arr-line" style="transform:scaleX(-1)"></div>
    </div>

    <div class="tier">
      <div class="tier-lbl" style="color:#a855f7">Dịch vụ<br>ngoài</div>
      <div class="tier-nodes">
        <div class="node np">
          <div class="node-title">🔐 HCMUT_SSO</div>
          <div class="node-body">
            <b>Protocol:</b> OAuth 2.0 / SAML<br>
            <b>Users:</b> student, lecturer, staff, admin<br>
            <b>Domain:</b> sso.hcmut.edu.vn<br>
            <em>★ Hiện: mock trong AuthContext</em>
          </div>
        </div>
        <div class="node nb">
          <div class="node-title">💳 BKPay Gateway</div>
          <div class="node-body">
            <b>Protocol:</b> REST API / HTTPS<br>
            <b>Functions:</b> Nạp tiền, thanh toán phí<br>
            <b>Amounts:</b> 50K / 100K / 200K VNĐ<br>
            <em>★ Hiện: alert() placeholder</em>
          </div>
        </div>
        <div class="node ni">
          <div class="node-title">📡 IoT Sensor Network</div>
          <div class="node-body">
            <b>Devices:</b> 20 cảm biến (Khu A/B/C/D)<br>
            <b>Protocol:</b> MQTT / WebSocket<br>
            <b>Data:</b> Trạng thái, pin, timestamp<br>
            <em>★ Hiện: setInterval mock (3s)</em>
          </div>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="leg-item"><div class="leg-dot" style="background:#3b82f6"></div>HTTPS/TLS</div>
      <div class="leg-item"><div class="leg-dot" style="background:#22c55e"></div>Static File Delivery</div>
      <div class="leg-item"><div class="leg-dot" style="background:#a855f7"></div>SSO Auth</div>
      <div class="leg-item"><div class="leg-dot" style="background:#f59e0b"></div>Payment API</div>
      <div class="leg-item"><div class="leg-dot" style="background:#06b6d4"></div>IoT Stream</div>
    </div>

    <div class="note">
      ⚠️ <b>Trạng thái hiện tại:</b> Đây là <b>Frontend-only SPA</b>. Chưa có backend server hoặc database thực.
      Xác thực &amp; dữ liệu lưu trong <b>React State (in-memory)</b>, mất khi reload trang.<br>
      📌 <b>Production cần thêm:</b> Backend API (NestJS/Express) · Database (PostgreSQL) · SSO integration thực · BKPay SDK · IoT Gateway (MQTT Broker)
    </div>
  </div>
</div>

<!-- ========== DEVELOPMENT VIEW ========== -->
<div class="sec">
  <div class="sec-title">🧩 2. Biểu đồ Phát triển (Development / Implementation View)</div>
  <div class="wrap">

    <!-- Entry flow -->
    <div class="flow">
      <div class="fb" style="color:#64748b">📄 index.html</div>
      <div class="fa">→</div>
      <div class="fb" style="color:#60a5fa">main.tsx</div>
      <div class="fa">→</div>
      <div class="fb" style="color:#c084fc">App.tsx</div>
      <div class="fa">→</div>
      <div class="fb" style="color:#c084fc">AuthProvider</div>
      <div class="fa">→</div>
      <div class="fb" style="color:#4ade80">RouterProvider</div>
      <div class="fa">→</div>
      <div class="fb" style="color:#4ade80">routes.tsx</div>
    </div>

    <div class="comp-grid">

      <!-- Entry & Routing -->
      <div class="pkg p1" style="min-width:200px">
        <div class="pkg-title">🚦 Entry &amp; Routing</div>
        <div class="ci">
          <div class="cn">main.tsx</div>
          <div class="cd">createRoot → mount &lt;App/&gt; vào #root<br>Import: index.css</div>
        </div>
        <div class="ci">
          <div class="cn">App.tsx</div>
          <div class="cd">Root component<br>Bọc: AuthProvider → RouterProvider</div>
        </div>
        <div class="ci">
          <div class="cn">routes.tsx</div>
          <div class="cd">
            / → &lt;Login /&gt;<br>
            /dashboard → &lt;ProtectedRoute /&gt;<br>
            * → Navigate to="/"
          </div>
        </div>
      </div>

      <!-- Auth Context -->
      <div class="pkg p2" style="min-width:200px">
        <div class="pkg-title">🔐 Auth Context</div>
        <div class="ci">
          <div class="cn">AuthContext.tsx</div>
          <div class="cd">
            <b>Types:</b> UserRole, User, AuthContextType<br>
            <b>State:</b> user: User | null<br>
            <b>Mock users:</b> 4 tài khoản cứng<br>
            <b>Methods:</b><br>
            · login(email, password)<br>
            · loginSSO(email)<br>
            · loginGuest(name, phone)<br>
            · logout()<br>
            <b>Hook:</b> useAuth()
          </div>
        </div>
      </div>

      <!-- Pages -->
      <div class="pkg p3" style="min-width:200px">
        <div class="pkg-title">📄 Pages</div>
        <div class="ci">
          <div class="cn">Login.tsx</div>
          <div class="cd">
            3 modes: SSO / Guest / Manual<br>
            Handlers: handleSSOLogin,<br>
            handleManualLogin, handleGuestLogin
          </div>
        </div>
        <div class="ci">
          <div class="cn">StudentDashboard.tsx</div>
          <div class="cd">
            Tabs: Tổng quan/Bãi xe/Lịch sử/Thanh toán<br>
            Roles: student, lecturer, guest
          </div>
        </div>
        <div class="ci">
          <div class="cn">StaffDashboard.tsx</div>
          <div class="cd">
            Tabs: Giám sát/Vào bãi/Ra bãi<br>
            VehicleEntry interface
          </div>
        </div>
        <div class="ci">
          <div class="cn">AdminDashboard.tsx</div>
          <div class="cd">
            Tabs: Tổng quan/Users/Sensors/Giá/Báo cáo<br>
            Sensor interface, 20 IoT sensors
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div style="display:flex;flex-direction:column;gap:14px;flex:1;min-width:180px">

        <!-- Guard -->
        <div class="pkg p4">
          <div class="pkg-title">🛡️ Route Guard</div>
          <div class="ci">
            <div class="cn">ProtectedRoute.tsx</div>
            <div class="cd">
              user == null → Navigate "/"<br>
              role=admin → AdminDashboard<br>
              role=staff → StaffDashboard<br>
              khác → StudentDashboard
            </div>
          </div>
        </div>

        <!-- Shared Components -->
        <div class="pkg p4">
          <div class="pkg-title">🧱 Shared Components</div>
          <div class="ci">
            <div class="cn">ParkingMap.tsx</div>
            <div class="cd">
              100 ô đỗ xe (4 khu A–D)<br>
              Real-time mock: interval 3s<br>
              Props: interactive, onSpotClick<br>
              Export: ParkingSpot interface
            </div>
          </div>
          <div class="ci">
            <div class="cn">TransactionHistory.tsx</div>
            <div class="cd">
              20 giao dịch mock<br>
              Filter: all/entry/exit/payment<br>
              Export: Transaction interface
            </div>
          </div>
          <div class="ci">
            <div class="cn">figma/ImageWithFallback.tsx</div>
            <div class="cd">Hình ảnh với xử lý lỗi fallback</div>
          </div>
        </div>

        <!-- Styles -->
        <div class="pkg p6">
          <div class="pkg-title">🖌️ Styles</div>
          <div class="ci"><div class="cn">index.css</div><div class="cd">Entry stylesheet</div></div>
          <div class="ci"><div class="cn">tailwind.css</div><div class="cd">Tailwind v4 directives</div></div>
          <div class="ci"><div class="cn">theme.css</div><div class="cd">CSS variables &amp; design tokens</div></div>
          <div class="ci"><div class="cn">fonts.css</div><div class="cd">Web font imports</div></div>
        </div>

      </div>
    </div>

    <!-- UI Library -->
    <div class="pkg p5" style="margin-top:14px">
      <div class="pkg-title">🎨 UI Library — components/ui/ (48 files)</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">button</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">card</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">input</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">form</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">dialog</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">table</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">tabs</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">select</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">sidebar</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">chart</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">calendar</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">badge</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">avatar</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">tooltip</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">skeleton</span>
        <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:#0f172a;border:1px solid #164e63;color:#22d3ee">+ 33 more</span>
      </div>
      <div style="margin-top:8px;font-size:10px;color:#475569">Nguồn: Radix UI primitives + shadcn/ui pattern · Quản lý: class-variance-authority + tailwind-merge</div>
    </div>

    <!-- Dependencies -->
    <div style="margin-top:16px">
      <div style="font-size:12px;font-weight:700;color:#94a3b8;margin-bottom:8px">📦 Dependencies chính (package.json)</div>
      <div class="tags">
        <span class="tag t1">React 18.3</span>
        <span class="tag t1">TypeScript</span>
        <span class="tag t3">react-router v7</span>
        <span class="tag t2">Radix UI ×25</span>
        <span class="tag t2">MUI v7</span>
        <span class="tag t2">lucide-react</span>
        <span class="tag t4">react-hook-form</span>
        <span class="tag t2">motion (Framer)</span>
        <span class="tag t2">recharts</span>
        <span class="tag t5">Vite 6.3.5</span>
        <span class="tag t5">TailwindCSS v4</span>
        <span class="tag t5">@vitejs/plugin-react</span>
      </div>
    </div>

    <!-- Auth flow -->
    <div class="dep-flow">
      <div class="dep-title">🔄 Authentication Flow</div>
      <div class="flow" style="margin-bottom:0;justify-content:flex-start;gap:0;flex-wrap:wrap">
        <div class="fb" style="color:#60a5fa">User Input</div>
        <div class="fa">→</div>
        <div class="fb" style="color:#4ade80">Login.tsx</div>
        <div class="fa">→</div>
        <div class="fb" style="color:#c084fc">AuthContext.login()</div>
        <div class="fa">→</div>
        <div class="fb" style="color:#fbbf24">Mock validate</div>
        <div class="fa">→</div>
        <div class="fb" style="color:#c084fc">setUser()</div>
        <div class="fa">→</div>
        <div class="fb" style="color:#4ade80">navigate('/dashboard')</div>
        <div class="fa">→</div>
        <div class="fb" style="color:#fbbf24">ProtectedRoute</div>
        <div class="fa">→</div>
        <div class="fb" style="color:#4ade80">Dashboard theo role</div>
      </div>
    </div>

  </div>
</div>

<div style="text-align:center;padding:20px;font-size:11px;color:#475569">
  © 2026 HCMUT Smart Parking — Auto-generated from source code
</div>
</body>
</html>"""

with open('diagrams.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Done: diagrams.html created")
