import React, { useState } from 'react';

interface MonchhichiData {
  id: string;
  image: string;
  name: string;
  description: string;
  ownerName: string;
  dateAdded: Date;
}

interface UploadFormProps {
  onSubmit: (data: Omit<MonchhichiData, 'id' | 'dateAdded'>) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ownerName: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image || !formData.name || !formData.ownerName) {
      alert('Please fill in all required fields and upload an image');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        ownerName: '',
        image: ''
      });
      setImagePreview('');
      
      // Reset file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your Monchhichi. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="upload-form-section">
      <div className="container">
        <h2 className="section-title">Share Your Monchhichi</h2>
        <p className="section-subtitle">
          Upload a photo of your beloved Monchhichi doll and add it to our community collection!
        </p>
        
        <form onSubmit={handleSubmit} className="upload-form" role="form">
          <div className="form-grid">
            <div className="upload-area">
              <div 
                className="image-upload-container"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Monchhichi preview" />
                    <button 
                      type="button" 
                      className="change-image-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('image-upload')?.click();
                      }}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">📷</div>
                    <p>Click to upload your Monchhichi photo</p>
                    <p className="upload-hint">JPG, PNG, or GIF (max 5MB)</p>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
            
            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="monchhichi-name">Monchhichi Name *</label>
                <input
                  id="monchhichi-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="What's your Monchhichi's name?"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="owner-name">Your Name *</label>
                <input
                  id="owner-name"
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  placeholder="What's your name?"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Tell us about your Monchhichi! Where did you get it? What makes it special?"
                  rows={4}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding to Collection...' : 'Add to Collection'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadForm;
export type { MonchhichiData }; 