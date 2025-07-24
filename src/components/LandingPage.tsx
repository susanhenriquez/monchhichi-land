import React, { useState } from 'react';
import UploadForm, { MonchhichiData } from './UploadForm';
import Collection from './Collection';

const LandingPage: React.FC = () => {
  const [collection, setCollection] = useState<MonchhichiData[]>([]);

  const handleMonchhichiSubmit = async (data: Omit<MonchhichiData, 'id' | 'dateAdded'>) => {
    // Create new Monchhichi entry with unique ID and current date
    const newMonchhichi: MonchhichiData = {
      ...data,
      id: `monchhichi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      dateAdded: new Date()
    };

    // Add to collection
    setCollection(prev => [newMonchhichi, ...prev]);
  };

  return (
    <div className="landing-page">
      <div className="main-content">
        <div className="upload-section">
          <UploadForm onSubmit={handleMonchhichiSubmit} />
        </div>
        <div className="collection-section">
          <Collection collection={collection} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;