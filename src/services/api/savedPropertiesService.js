class SavedPropertiesService {
  constructor() {
    this.storageKey = 'propview_saved_properties';
    this.savedProperties = this.loadFromStorage();
  }
  
  loadFromStorage() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved properties:', error);
      return [];
    }
  }
  
  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.savedProperties));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }
  
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.savedProperties];
  }
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const property = this.savedProperties.find(p => p.Id === id);
    if (!property) {
      throw new Error('Saved property not found');
    }
    return { ...property };
  }
  
  async create(propertyData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if already saved
    const existingIndex = this.savedProperties.findIndex(p => p.Id === propertyData.Id);
    if (existingIndex !== -1) {
      throw new Error('Property already saved');
    }
    
    const savedProperty = {
      ...propertyData,
      savedDate: new Date().toISOString()
    };
    
    this.savedProperties.push(savedProperty);
    this.saveToStorage();
    return { ...savedProperty };
  }
  
  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.savedProperties.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Saved property not found');
    }
    this.savedProperties[index] = { ...this.savedProperties[index], ...updates };
    this.saveToStorage();
    return { ...this.savedProperties[index] };
  }
  
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.savedProperties.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Saved property not found');
    }
    const deletedProperty = this.savedProperties.splice(index, 1)[0];
    this.saveToStorage();
    return { ...deletedProperty };
  }
}

export const savedPropertiesService = new SavedPropertiesService();