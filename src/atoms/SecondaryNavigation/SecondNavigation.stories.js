import React from 'react';

export default (asStory) => {
  asStory('ATOMS/SecondaryNavigation', module, (story, { SecondaryNavigation }) => {
    story
      .add('secondary navigation', () => (
        <SecondaryNavigation.Plate>
          <SecondaryNavigation.Item label="First item" />
          <SecondaryNavigation.Item label="Second item" className="active" />
          <SecondaryNavigation.Item label="Third item" />
          <SecondaryNavigation.Item label="Fourth item" />
        </SecondaryNavigation.Plate>
      ));
  });
};