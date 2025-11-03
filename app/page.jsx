"use client";
import React from "react";
import { motion } from "framer-motion";

/*
  Aurora Metals — Landing (app/page.jsx)
  This version avoids external UI libs (no shadcn) so it runs out-of-the-box.
*/

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 antialiased">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-indigo-600 flex items-center justify-center text-white font-bold">AM</div>
          <div>
            <h1 className="text-lg font-semibold">Aurora Metals</h1>
            <p className="text-xs text-slate-500">Real-time metal prices • Premium APIs</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <a className="text-sm text-slate-600 hover:text-slate-900" href="#features">Features</a>
          <a className="text-sm text-slate-600 hover:text-slate-900" href="#pricing">Pricing</a>
          <a className="text-sm text-slate-600 hover:text-slate-900" href="#contact">Contact</a>
          <button onClick={() => window.location.href = "/signup"} className="ml-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm shadow">Get API Access</button>
        </nav>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <section>
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Real-time metal prices & analytics — <span className="text-indigo-600">built for pros</span>
          </motion.h2>

          <motion.p initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="mt-6 text-lg text-slate-600 max-w-xl">
            Aurora Metals provides clean, reliable market data, fast API licensing, and beautiful dashboards so you can power trading desks, marketplaces, and analytic products with confidence.
          </motion.p>

          <div className="mt-8 flex gap-4 items-center">
            <button onClick={() => window.location.href = "/docs"} className="px-4 py-2 rounded-md bg-indigo-600 text-white shadow">Explore API Docs</button>
            <button onClick={() => window.location.href = "/demo"} className="px-4 py-2 rounded-md border bg-white text-slate-700">Live Demo</button>
          </div>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <li>• Millisecond updates from multiple sources</li>
            <li>• Historical & intraday time series</li>
            <li>• Enterprise SLAs & whitelisted IPs</li>
            <li>• Simple JSON + SDKs (Python, Node)</li>
          </ul>
        </section>

        {/* Example visual / card */}
        <aside className="order-first lg:order-last">
          <div className="rounded-lg shadow-lg bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">Gold / 24K</div>
                <div className="text-2xl font-semibold">₹ 5,180 / g</div>
                <div className="text-sm text-emerald-600">+0.72% (24h)</div>
              </div>
              <div className="text-xs text-slate-400">Updated: 2m ago</div>
            </div>

            <div className="mt-4 h-36 bg-gradient-to-r from-slate-100 to-white rounded-lg flex items-center justify-center text-slate-400">[Interactive chart placeholder]</div>

            <div className="mt-4 flex gap-3">
              <button onClick={() => window.location.href = "/signup"} className="flex-1 px-3 py-2 rounded-md bg-indigo-600 text-white">Get API Key</button>
              <button onClick={() => window.location.href = "/pricing"} className="flex-1 px-3 py-2 rounded-md border">View Plans</button>
            </div>
          </div>
        </aside>
      </main>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold">Why Aurora Metals</h3>
        <p className="text-slate-600 mt-2 max-w-2xl">Everything teams need to build fast, reliable, and beautiful products around precious and base metal pricing.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold">Accuracy & Sourcing</h4>
            <p className="mt-2 text-sm text-slate-600">Multiple verified sources combined with normalization routines for higher accuracy.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold">Enterprise API</h4>
            <p className="mt-2 text-sm text-slate-600">Low-latency endpoints, bulk exports, and commercial licensing for businesses and exchanges.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold">Beautiful Dashboard</h4>
            <p className="mt-2 text-sm text-slate-600">Prebuilt visualizations and widgets so non-technical stakeholders can monitor markets at a glance.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-12 bg-slate-50">
        <h3 className="text-2xl font-bold">Pricing</h3>
        <p className="text-slate-600 mt-2 max-w-2xl">Transparent pricing for hobbyists to enterprise. API licensing and custom SLAs available.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-slate-500">Hobby</div>
            <div className="text-2xl font-bold mt-2">₹999 / month</div>
            <p className="mt-2 text-sm text-slate-600">Basic endpoints, limited requests, email support.</p>
            <div className="mt-4">
              <button onClick={() => window.location.href = "/signup?hobby=true"} className="px-4 py-2 rounded-md bg-indigo-600 text-white">Choose</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-slate-500">Pro</div>
            <div className="text-2xl font-bold mt-2">₹6,999 / month</div>
            <p className="mt-2 text-sm text-slate-600">Higher rate limits, historical exports, priority support.</p>
            <div className="mt-4">
              <button onClick={() => window.location.href = "/signup?pro=true"} className="px-4 py-2 rounded-md bg-indigo-600 text-white">Choose</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-slate-500">Enterprise</div>
            <div className="text-2xl font-bold mt-2">Custom</div>
            <p className="mt-2 text-sm text-slate-600">Custom SLAs, dedicated support, white-label options.</p>
            <div className="mt-4">
              <button onClick={() => window.location.href = "/contact"} className="px-4 py-2 rounded-md border">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold">Trusted by</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="font-semibold">\"Saved our trading desk hours every day\"</div>
            <div className="text-sm text-slate-600 mt-2">— Arjun, Head of Trading at Nova Metals</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="font-semibold">\"Reliable, fast, and beautifully designed.\"</div>
            <div className="text-sm text-slate-600 mt-2">— Priya, Product Manager at BullionX</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="font-semibold">\"Enterprise-grade SLAs with personal support.\"</div>
            <div className="text-sm text-slate-600 mt-2">— Sameer, CTO at ExchangePro</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="max-w-7xl mx-auto px-6 py-8 border-t">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <div className="font-semibold">Aurora Metals</div>
            <div className="text-sm text-slate-600 mt-1">contact@aurorametals.ai</div>
            <div className="text-sm text-slate-600">+91 90000 00000</div>
          </div>

          <div className="flex gap-6">
            <div>
              <div className="font-semibold">Product</div>
              <div className="text-sm text-slate-600 mt-1">API Docs</div>
              <div className="text-sm text-slate-600">Demo</div>
            </div>
            <div>
              <div className="font-semibold">Company</div>
              <div className="text-sm text-slate-600 mt-1">About</div>
              <div className="text-sm text-slate-600">Careers</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-slate-500">© {new Date().getFullYear()} Aurora Metals — All rights reserved.</div>
      </footer>
    </div>
  );
}
