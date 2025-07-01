import { properties } from '@/services/mockData/properties.json';

class PropertyService {
  constructor() {
    this.properties = [...properties];
  }
  
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.properties];
  }
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const property = this.properties.find(p => p.Id === id);
    if (!property) {
      throw new Error('Property not found');
    }
    return { ...property };
  }
  
  async create(propertyData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...this.properties.map(p => p.Id)) + 1;
    const newProperty = {
      ...propertyData,
      Id: newId,
      listingDate: new Date().toISOString()
    };
    this.properties.push(newProperty);
    return { ...newProperty };
  }
  
  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = this.properties.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    this.properties[index] = { ...this.properties[index], ...updates };
    return { ...this.properties[index] };
  }
  
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.properties.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    const deletedProperty = this.properties.splice(index, 1)[0];
    return { ...deletedProperty };
  }
}

export const propertyService = new PropertyService();