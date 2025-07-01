export const filterProperties = (properties, filters, searchTerm = '') => {
  let filtered = [...properties];

  // Apply search term
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filtered = filtered.filter(property =>
      property.title.toLowerCase().includes(searchLower) ||
      property.address.city.toLowerCase().includes(searchLower) ||
      property.address.state.toLowerCase().includes(searchLower) ||
      property.propertyType.toLowerCase().includes(searchLower) ||
      property.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply price filters
  if (filters.priceMin && filters.priceMin !== '') {
    filtered = filtered.filter(property => property.price >= parseInt(filters.priceMin));
  }
  if (filters.priceMax && filters.priceMax !== '') {
    filtered = filtered.filter(property => property.price <= parseInt(filters.priceMax));
  }

  // Apply property type filter
  if (filters.propertyTypes && filters.propertyTypes.length > 0) {
    filtered = filtered.filter(property => 
      filters.propertyTypes.includes(property.propertyType)
    );
  }

  // Apply bedroom filter
  if (filters.bedroomsMin && filters.bedroomsMin !== '') {
    filtered = filtered.filter(property => 
      property.bedrooms >= parseInt(filters.bedroomsMin)
    );
  }

  // Apply bathroom filter
  if (filters.bathroomsMin && filters.bathroomsMin !== '') {
    filtered = filtered.filter(property => 
      property.bathrooms >= parseInt(filters.bathroomsMin)
    );
  }

  // Apply amenities filter
  if (filters.amenities && filters.amenities.length > 0) {
    filtered = filtered.filter(property =>
      filters.amenities.some(amenity => property.amenities.includes(amenity))
    );
  }

  // Apply keywords filter
  if (filters.keywords && filters.keywords !== '') {
    const keywordsLower = filters.keywords.toLowerCase();
    filtered = filtered.filter(property =>
      property.description.toLowerCase().includes(keywordsLower) ||
      property.amenities.some(amenity => 
        amenity.toLowerCase().includes(keywordsLower)
      )
    );
  }

  return filtered;
};

export const sortProperties = (properties, sortBy) => {
  const sorted = [...properties];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate));
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.listingDate) - new Date(b.listingDate));
    case 'bedrooms-desc':
      return sorted.sort((a, b) => b.bedrooms - a.bedrooms);
    case 'bedrooms-asc':
      return sorted.sort((a, b) => a.bedrooms - b.bedrooms);
    case 'sqft-desc':
      return sorted.sort((a, b) => b.squareFeet - a.squareFeet);
    case 'sqft-asc':
      return sorted.sort((a, b) => a.squareFeet - b.squareFeet);
    default:
      return sorted;
  }
};