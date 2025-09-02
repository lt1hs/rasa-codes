import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import IntegrationsSettings from './IntegrationsSettings';
import BackupSettings from './BackupSettings';

const SettingsManagement: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="general" replace />} />
      <Route path="general" element={<GeneralSettings />} />
      <Route path="security" element={<SecuritySettings />} />
      <Route path="integrations" element={<IntegrationsSettings />} />
      <Route path="backup" element={<BackupSettings />} />
    </Routes>
  );
};

export default SettingsManagement;