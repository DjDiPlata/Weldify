
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EpiGuide from './components/SafetyErgonomics/EpiGuide';
import SafetyChecklist from './components/SafetyErgonomics/SafetyChecklist';
import ErgonomicsGuide from './components/SafetyErgonomics/ErgonomicsGuide';
import WeldingSimulatorUI from './components/LearningSkills/WeldingSimulatorUI';
import TutorialsPage from './components/LearningSkills/TutorialsPage';
import MaterialsGuide from './components/LearningSkills/MaterialsGuide';
import ProcessEncyclopedia from './components/LearningSkills/ProcessEncyclopedia'; // New
import ParameterAssistant from './components/ParameterConfig/ParameterAssistant';
import AdvancedCalculators from './components/ParameterConfig/AdvancedCalculators';
import DefectDatabase from './components/DefectDiagnosis/DefectDatabase';
import DefectAnalyzer from './components/DefectDiagnosis/DefectAnalyzer';
import NdtGuide from './components/QualityControl/NdtGuide'; // New
import JobManagement from './components/EfficiencyOptimization/JobManagement';
import TraceabilityLog from './components/DataManagement/TraceabilityLog';
import BlueprintReader from './components/DataManagement/BlueprintReader';
import ConsumablesGuide from './components/AuxiliaryTools/ConsumablesGuide';
import MyStoryPage from './components/MyStoryPage'; 
import OriginStoryPage from './components/OriginStoryPage'; 
import AcknowledgementsPage from './components/AcknowledgementsPage'; 
import { APP_MODULES } from './constants';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Safety & Ergonomics */}
        <Route path={APP_MODULES.safety.features?.[0].path} element={<EpiGuide />} />
        <Route path={APP_MODULES.safety.features?.[1].path} element={<SafetyChecklist />} />
        <Route path={APP_MODULES.safety.features?.[2].path} element={<ErgonomicsGuide />} />

        {/* Learning & Skills */}
        <Route path={APP_MODULES.learning.features?.[0].path} element={<WeldingSimulatorUI />} />
        <Route path={APP_MODULES.learning.features?.[1].path} element={<TutorialsPage />} />
        <Route path={APP_MODULES.learning.features?.[2].path} element={<MaterialsGuide />} />
        <Route path={APP_MODULES.learning.features?.[3].path} element={<ProcessEncyclopedia />} />

        {/* Parameter Configuration */}
        <Route path={APP_MODULES.config.features?.[0].path} element={<ParameterAssistant />} />
        <Route path={APP_MODULES.config.features?.[1].path} element={<AdvancedCalculators />} />
        
        {/* Defect Diagnosis */}
        <Route path={APP_MODULES.defects.features?.[0].path} element={<DefectDatabase />} />
        <Route path={APP_MODULES.defects.features?.[1].path} element={<DefectAnalyzer />} />

        {/* Quality Control */}
        <Route path={APP_MODULES.quality.features?.[0].path} element={<NdtGuide />} />

        {/* Efficiency & Optimization */}
        <Route path={APP_MODULES.efficiency.features?.[0].path} element={<JobManagement />} />

        {/* Data Management */}
        <Route path={APP_MODULES.data.features?.[0].path} element={<TraceabilityLog />} />
        <Route path={APP_MODULES.data.features?.[1].path} element={<BlueprintReader />} />
        
        {/* Auxiliary Tools */}
        <Route path={APP_MODULES.auxiliary.features?.[0].path} element={<ConsumablesGuide />} />

        {/* My Story & Sub-pages */}
        <Route path={APP_MODULES['my-story'].path} element={<MyStoryPage />} />
        <Route path="/my-story/origin" element={<OriginStoryPage />} />
        <Route path="/my-story/acknowledgements" element={<AcknowledgementsPage />} />


        <Route path="*" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </Layout>
  );
};

export default App;
