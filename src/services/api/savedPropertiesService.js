class SavedPropertiesService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    this.tableName = 'saved_property_c';
  }

  getApperClient() {
    const { ApperClient } = window.ApperSDK;
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "coordinates_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "squareFeet_c" } },
          { field: { Name: "propertyType_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "yearBuilt_c" } },
          { field: { Name: "listingDate_c" } },
          { field: { Name: "savedDate_c" } }
        ],
        orderBy: [
          {
            fieldName: "savedDate_c",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching saved properties:", error?.response?.data?.message);
      } else {
        console.error("Error fetching saved properties:", error.message);
      }
      throw error;
    }
  }

  async getById(id) {
    try {
      const apperClient = this.getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "coordinates_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "squareFeet_c" } },
          { field: { Name: "propertyType_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "yearBuilt_c" } },
          { field: { Name: "listingDate_c" } },
          { field: { Name: "savedDate_c" } }
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching saved property with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching saved property with ID ${id}:`, error.message);
      }
      throw error;
    }
  }

  async create(propertyData) {
    try {
      const apperClient = this.getApperClient();
      
      // Only include Updateable fields for create operation
      const params = {
        records: [
          {
            Name: propertyData.Name || propertyData.title_c,
            title_c: propertyData.title_c,
            price_c: parseFloat(propertyData.price_c),
            address_c: propertyData.address_c,
            coordinates_c: propertyData.coordinates_c,
            bedrooms_c: parseInt(propertyData.bedrooms_c),
            bathrooms_c: parseInt(propertyData.bathrooms_c),
            squareFeet_c: parseInt(propertyData.squareFeet_c),
            propertyType_c: propertyData.propertyType_c,
            images_c: propertyData.images_c,
            description_c: propertyData.description_c,
            amenities_c: propertyData.amenities_c,
            yearBuilt_c: parseInt(propertyData.yearBuilt_c),
            listingDate_c: propertyData.listingDate_c,
            savedDate_c: new Date().toISOString()
          }
        ]
      };

      const response = await apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} saved properties:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating saved property:", error?.response?.data?.message);
      } else {
        console.error("Error creating saved property:", error.message);
      }
      throw error;
    }
  }

  async update(id, updates) {
    try {
      const apperClient = this.getApperClient();
      
      // Only include Updateable fields for update operation
      const updateData = {
        Id: id
      };

      if (updates.Name !== undefined) updateData.Name = updates.Name;
      if (updates.title_c !== undefined) updateData.title_c = updates.title_c;
      if (updates.price_c !== undefined) updateData.price_c = parseFloat(updates.price_c);
      if (updates.address_c !== undefined) updateData.address_c = updates.address_c;
      if (updates.coordinates_c !== undefined) updateData.coordinates_c = updates.coordinates_c;
      if (updates.bedrooms_c !== undefined) updateData.bedrooms_c = parseInt(updates.bedrooms_c);
      if (updates.bathrooms_c !== undefined) updateData.bathrooms_c = parseInt(updates.bathrooms_c);
      if (updates.squareFeet_c !== undefined) updateData.squareFeet_c = parseInt(updates.squareFeet_c);
      if (updates.propertyType_c !== undefined) updateData.propertyType_c = updates.propertyType_c;
      if (updates.images_c !== undefined) updateData.images_c = updates.images_c;
      if (updates.description_c !== undefined) updateData.description_c = updates.description_c;
      if (updates.amenities_c !== undefined) updateData.amenities_c = updates.amenities_c;
      if (updates.yearBuilt_c !== undefined) updateData.yearBuilt_c = parseInt(updates.yearBuilt_c);
      if (updates.listingDate_c !== undefined) updateData.listingDate_c = updates.listingDate_c;
      if (updates.savedDate_c !== undefined) updateData.savedDate_c = updates.savedDate_c;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} saved properties:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating saved property:", error?.response?.data?.message);
      } else {
        console.error("Error updating saved property:", error.message);
      }
      throw error;
    }
  }

  async delete(id) {
    try {
      const apperClient = this.getApperClient();
      
      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} saved properties:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting saved property:", error?.response?.data?.message);
      } else {
        console.error("Error deleting saved property:", error.message);
      }
      throw error;
    }
  }
}

export const savedPropertiesService = new SavedPropertiesService();