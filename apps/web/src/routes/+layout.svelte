<script lang="ts">
  import '../app.css';
</script>

<div class="site-shell">
  <header class="topbar">
    <div class="topbar-inner">
      <a href="/" class="brand-wrap" aria-label="Housing_4_Raajje home">
        <span class="brand-mark">H4R</span>
        <span class="brand-text">Housing_4_Raajje</span>
      </a>

      <nav class="nav" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/properties">Properties</a>
        <a href="/applications">Applications</a>
        <a href="/branches">Branches</a>
        <a href="/login">Login</a>
      </nav>

      <div class="nav-actions">
        <button class="ghost-button" type="button">Light mode</button>
        <a class="pill-button" href="/dashboard">View system</a>
      </div>
    </div>
  </header>

  <main class="page-wrap">
    <slot />
  </main>
</div>
