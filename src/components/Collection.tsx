import React from 'react';
import { MonchhichiData } from './UploadForm';

interface CollectionProps {
  collection: MonchhichiData[];
}

const Collection: React.FC<CollectionProps> = ({ collection }) => {
  if (collection.length === 0) {
    return (
      <div className="collection-content">
        <h2 className="section-title">Community Collection</h2>
        <div className="empty-collection">
          <div className="empty-icon">🐒</div>
          <p>No Monchhichi dolls in the collection yet!</p>
          <p>Be the first to share your beloved companion.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="collection-content">
      <h2 className="section-title">Community Collection</h2>
      <p className="section-subtitle">
        Discover the wonderful Monchhichi dolls shared by our community members
      </p>
      <div className="collection-stats">
        <span className="collection-count">
          {collection.length} Monchhichi{collection.length !== 1 ? 's' : ''} in our collection
        </span>
      </div>
      
      <div className="collection-grid">
        {collection.map((monchhichi) => (
          <div key={monchhichi.id} className="collection-card">
            <div className="card-image">
              <img 
                src={monchhichi.image} 
                alt={`${monchhichi.name} by ${monchhichi.ownerName}`}
              />
            </div>
            <div className="card-content">
              <h3 className="monchhichi-name">{monchhichi.name}</h3>
              <p className="owner-name">by {monchhichi.ownerName}</p>
              {monchhichi.description && (
                <p className="monchhichi-description">{monchhichi.description}</p>
              )}
              <div className="card-footer">
                <span className="date-added">
                  Added {monchhichi.dateAdded.toLocaleDateString()}
                </span>
                <div className="love-button">
                  <span className="heart">❤️</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection; 