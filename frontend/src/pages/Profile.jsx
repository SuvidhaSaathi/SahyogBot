import React from 'react';
import ProfileWizard from '../components/ProfileWizard';
import VoiceAccess from '../components/VoiceAccess';

function Profile() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      <ProfileWizard />
      <VoiceAccess />
    </div>
  );
}

export default Profile;
