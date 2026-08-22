import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../utils/supabase";
import type { NewsArticle } from "../types";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "form">("all");

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // News data state
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [fetchingNews, setFetchingNews] = useState(false);

  // News form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [readTime, setReadTime] = useState("5 min read");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const fetchNews = useCallback(async () => {
    setFetchingNews(true);
    const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setNewsList(data as NewsArticle[]);
    }
    setFetchingNews(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) fetchNews();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchNews();
    });

    return () => subscription.unsubscribe();
  }, [fetchNews]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setLoginError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setReadTime("5 min read");
    setDate("");
    setAuthor("");
    setRegion("");
    setProvince("");
    setImgUrl("");
    setContent("");
    setSubmitStatus("");
  };

  const handleEditClick = (article: NewsArticle) => {
    setEditingId(article.id);
    setTitle(article.title);
    setReadTime(article.read_time);
    setDate(article.date);
    setAuthor(article.author);
    setRegion(article.region);
    setProvince(article.province);
    setImgUrl(article.img_url);
    setContent(article.content || "");
    setSubmitStatus("");
    setActiveTab("form");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this news article?")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (!error) {
      fetchNews();
    } else {
      alert(`Error deleting article: ${error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("Submitting...");

    const payload = { title, read_time: readTime, date, author, region, province, img_url: imgUrl, content };

    let error;
    if (editingId) {
      const { error: updateError } = await supabase.from("news").update(payload).eq("id", editingId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("news").insert([payload]);
      error = insertError;
    }

    if (error) {
      setSubmitStatus(`Error: ${error.message}`);
    } else {
      setSubmitStatus(`News article ${editingId ? "updated" : "published"} successfully!`);
      if (!editingId) resetForm();
      fetchNews();
      // After successful save, go back to the list after a short delay
      setTimeout(() => {
        setActiveTab("all");
        resetForm();
      }, 1500);
    }
  };

  if (loading) return <div className="flex-1 p-24 text-center">Loading...</div>;

  if (!session) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-12 min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">iHub Focal Login</h2>
          {loginError && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
            </div>
            <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 rounded-lg transition-colors">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">CMS Dashboard</h2>
          <button onClick={handleLogout} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            Sign out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-200">
          <button
            onClick={() => { setActiveTab("all"); resetForm(); }}
            className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "all" ? "border-sky-500 text-sky-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            All News
          </button>
          <button
            onClick={() => setActiveTab("form")}
            className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "form" ? "border-sky-500 text-sky-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            {editingId ? "Edit News Article" : "Add News Article"}
          </button>
        </div>

        {activeTab === "all" && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            {fetchingNews ? (
              <div className="p-12 text-center text-slate-500">Loading news...</div>
            ) : newsList.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                No news articles found. <button onClick={() => setActiveTab("form")} className="text-sky-500 hover:underline">Create one</button>.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-medium">
                    <th className="py-4 px-6">Title</th>
                    <th className="py-4 px-6">Author</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList.map((article) => (
                    <tr key={article.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-800">{article.title}</td>
                      <td className="py-4 px-6 text-slate-600">{article.author}</td>
                      <td className="py-4 px-6 text-slate-600">{article.date}</td>
                      <td className="py-4 px-6 text-slate-600">{article.region}, {article.province}</td>
                      <td className="py-4 px-6 text-right space-x-3">
                        <button onClick={() => handleEditClick(article)} className="text-sky-500 hover:text-sky-700 font-medium text-sm">Edit</button>
                        <button onClick={() => handleDelete(article.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "form" && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold mb-6">{editingId ? "Edit News Article" : "Add News Article"}</h3>

            {submitStatus && (
              <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${submitStatus.includes("Error") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                {submitStatus}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Region</label>
                  <input
                    type="text"
                    required
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="e.g. Region VI"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Province</label>
                  <input
                    type="text"
                    required
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="e.g. Iloilo"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    required
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                  {imgUrl && (
                    <div className="mt-3 relative w-40 aspect-[16/10] rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                      <img
                        src={imgUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                          if (sibling) sibling.style.display = 'flex';
                        }}
                        onLoad={(e) => {
                          const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                          if (sibling) sibling.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 hidden items-center justify-center text-xs text-red-500 font-medium text-center px-2 bg-red-50">
                        Image failed to load — link may be blocked or invalid
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content (Optional)</label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => { setActiveTab("all"); resetForm(); }} className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors shadow-sm">
                  {editingId ? "Save Changes" : "Publish News"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
