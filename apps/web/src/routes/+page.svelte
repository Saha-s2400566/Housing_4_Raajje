<div class="container">
  <section class="hero">
    <div>
      <div class="kicker">New category: micro-interactions</div>
      <h1>Creative property operations for modern real-estate teams.</h1>
      <p class="hero-copy">
        Housing_4_Raajje combines branch intelligence, owner workflows, client discovery and lease automation into one premium property management platform designed for faster decisions and cleaner operations.
      </p>

      <div class="btn-row">
        <a class="btn primary" href="/dashboard">Browse components</a>
        <a class="btn" href="/properties">View listings</a>
      </div>

      <ul class="inline-stats">
        <li>210+ workflow views</li>
        <li>Multi-branch overview</li>
        <li>Free forever</li>
      </ul>
    </div>

    <div class="preview-panel" aria-label="System preview panel">
      <div class="preview-header">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <pre class="code-block">{`import { ColorBends } from '@components/ColorBends';

function App() {
  return (
    <ColorBends
      color="#A855F7"
      speed={0.2}
      frequency={1.0}
      intensity={1.3}
    />
  )
}`}</pre>

      <div class="preset-row">
        <span class="preset-chip active">Nebula</span>
        <span class="preset-chip">Aurora</span>
        <span class="preset-chip">Ember</span>
        <span class="preset-chip">Ice</span>
      </div>
    </div>
  </section>

  <section class="metrics">
    <article class="card">
      <span class="metric-label">Properties</span>
      <div class="metric-value">127</div>
    </article>
    <article class="card">
      <span class="metric-label">Applications</span>
      <div class="metric-value">56</div>
    </article>
    <article class="card">
      <span class="metric-label">Active leases</span>
      <div class="metric-value">91</div>
    </article>
    <article class="card">
      <span class="metric-label">Maintenance</span>
      <div class="metric-value">12</div>
    </article>
  </section>

  <section class="section">
    <div class="section-header">
      <h2>Featured properties</h2>
      <a href="/properties">View all</a>
    </div>

    <div class="grid">
      <article class="property-card">
        <div class="property-image"></div>
        <div class="property-body">
          <span class="status available">Available</span>
          <h3>Ocean View Apartment</h3>
          <p>Malé • 2 bedrooms • MVR 18,000</p>
        </div>
      </article>
      <article class="property-card">
        <div class="property-image"></div>
        <div class="property-body">
          <span class="status rented">Rented</span>
          <h3>Harbour Residence</h3>
          <p>Hulhumalé • 3 bedrooms • MVR 22,000</p>
        </div>
      </article>
      <article class="property-card">
        <div class="property-image"></div>
        <div class="property-body">
          <span class="status pending">Pending approval</span>
          <h3>Villingili Courtyard</h3>
          <p>Villingili • 1 bedroom • MVR 13,500</p>
        </div>
      </article>
    </div>
  </section>
</div>
