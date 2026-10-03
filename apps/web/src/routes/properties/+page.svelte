<script lang="ts">
  const properties = [
    { title: 'Ocean View Apartment', location: 'Malé', rooms: 2, rent: 'MVR 18,000', status: 'available' },
    { title: 'Harbour Residence', location: 'Hulhumalé', rooms: 3, rent: 'MVR 22,000', status: 'rented' },
    { title: 'Villingili Courtyard', location: 'Villingili', rooms: 1, rent: 'MVR 13,500', status: 'pending' }
  ];
</script>

<div class="container">
  <section class="section">
    <div class="section-header">
      <h2>Property inventory</h2>
    </div>

    <div class="grid">
      {#each properties as property}
        <article class="property-card">
          <div class="property-image"></div>
          <div class="property-body">
            <span class="status {property.status}">{property.status}</span>
            <h3>{property.title}</h3>
            <p>{property.location} • {property.rooms} rooms • {property.rent}</p>
          </div>
        </article>
      {/each}
    </div>
  </section>
</div>
