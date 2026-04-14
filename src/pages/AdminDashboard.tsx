import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, Users, DollarSign, Eye, Plus, Edit, Trash2, BarChart3, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { movies } from "@/lib/mock-data";

const stats = [
  { label: "Total Users", value: "1,247", icon: Users, change: "+12%" },
  { label: "Total Revenue", value: "2.4M RWF", icon: DollarSign, change: "+8%" },
  { label: "Total Movies", value: movies.length.toString(), icon: Film, change: "+3" },
  { label: "Total Views", value: "45.2K", icon: Eye, change: "+22%" },
];

const recentTransactions = [
  { user: "Jean Pierre", movie: "Crimson Horizon", amount: "500 RWF", date: "2024-12-14", status: "completed" },
  { user: "Marie Claire", movie: "Neon Rebellion", amount: "700 RWF", date: "2024-12-14", status: "completed" },
  { user: "Patrick N.", movie: "Love in Lagos", amount: "300 RWF", date: "2024-12-13", status: "pending" },
  { user: "Alice M.", movie: "Monthly Premium", amount: "5,000 RWF", date: "2024-12-13", status: "completed" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "movies", label: "Movies", icon: Film },
    { id: "users", label: "Users", icon: Users },
    { id: "payments", label: "Payments", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0 md:w-16"} transition-all duration-300 bg-card border-r border-border/50 flex flex-col overflow-hidden`}>
        <div className="p-4 flex items-center gap-3">
          <span className="text-xl font-extrabold text-gradient">Z</span>
          {sidebarOpen && <span className="text-lg font-bold">Admin</span>}
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === link.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{link.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <Link to="/" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Exit Admin</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-secondary">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
          </div>
        </header>

        <div className="p-6">
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <div key={i} className="glass rounded-xl p-5 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon className="w-5 h-5 text-primary" />
                      <span className="text-xs text-green-400 font-medium">{stat.change}</span>
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 text-muted-foreground font-medium">User</th>
                        <th className="text-left py-3 text-muted-foreground font-medium">Movie/Plan</th>
                        <th className="text-left py-3 text-muted-foreground font-medium">Amount</th>
                        <th className="text-left py-3 text-muted-foreground font-medium">Date</th>
                        <th className="text-left py-3 text-muted-foreground font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((t, i) => (
                        <tr key={i} className="border-b border-border/30">
                          <td className="py-3">{t.user}</td>
                          <td className="py-3">{t.movie}</td>
                          <td className="py-3 font-medium">{t.amount}</td>
                          <td className="py-3 text-muted-foreground">{t.date}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              t.status === "completed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                            }`}>
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "movies" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Movie Library</h2>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  <Plus className="w-4 h-4" /> Add Movie
                </Button>
              </div>
              <div className="glass rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 text-muted-foreground font-medium">Movie</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Category</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Price</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Rating</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.map((m) => (
                      <tr key={m.id} className="border-b border-border/30">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={m.thumbnail} alt={m.title} className="w-10 h-14 rounded object-cover" />
                            <span className="font-medium">{m.title}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{m.category}</td>
                        <td className="p-4">{m.price} RWF</td>
                        <td className="p-4">{m.rating}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 rounded hover:bg-secondary"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                            <button className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="glass rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">User Management</h2>
              <p className="text-muted-foreground text-sm">Connect Lovable Cloud to manage real users. Currently showing mock data.</p>
              <div className="mt-4 space-y-3">
                {["Jean Pierre", "Marie Claire", "Patrick Nkurunziza", "Alice Mukamana", "Eric Habimana"].map((name, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                        {name.charAt(0)}
                      </div>
                      <span className="text-sm">{name}</span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">Block</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="glass rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Payment History</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 text-muted-foreground font-medium">User</th>
                    <th className="text-left py-3 text-muted-foreground font-medium">Item</th>
                    <th className="text-left py-3 text-muted-foreground font-medium">Amount</th>
                    <th className="text-left py-3 text-muted-foreground font-medium">Date</th>
                    <th className="text-left py-3 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((t, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="py-3">{t.user}</td>
                      <td className="py-3">{t.movie}</td>
                      <td className="py-3 font-medium">{t.amount}</td>
                      <td className="py-3 text-muted-foreground">{t.date}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          t.status === "completed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                        }`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
